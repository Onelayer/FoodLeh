<template>
  <div class="cart navspacing">
    <h1 class="title">Your Cart</h1>
    <p v-show="!cart.length">
      <i>Your cart is empty!</i>
      <router-link to="/ordering/menu">Go shopping</router-link>
    </p>
    <p>
      {{ message }}
    </p>
    <table class="table is-striped" v-show="cart.length">
      <thead>
        <tr>
          <td>Name</td>
          <td>Price</td>
          <td>Quantity</td>
          <td></td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(p, index) in cart" :key="index">
          <td>{{ p.title }}</td>
          <td>${{ p.cost }}</td>
          <td>{{ p.quantity }}</td>
          <td><button @click="removeItemFromCart(p)">Remove Item</button></td>
        </tr>
        <tr>
          <td><b>Total:</b></td>
          <td></td>
          <td>
            <b>${{ total }}</b>
          </td>
          <td></td>
        </tr>
      </tbody>
    </table>
    <div class="d-flex justify-content-center" v-show="cart.length">
      <div>
      <div>
        <select v-model="options">
          <option value="pickUp">Self Pick-Up</option>
          <option value="delivery">Delivery</option>
        </select>
        <select v-model="timing" v-if="options === 'pickUp'">
          <option 
            v-for="(time,idx) in listTimings" 
            :value="listTimings" 
            :key="idx"
          >{{ time }}</option>
        </select>
      </div>
      <br/>
      <div class="inputFields">
        <input type="text" required v-model="name" placeholder="Name">
        <input type="number" required v-model="hpNumber" placeholder="Phone Number">     
      </div>
      <br/>
      <p>
        <button
          class="button is-primary"
          @click.prevent="checkOut"
        >
          Checkout
        </button>
      </p>
      <!-- <p>Name is {{ name }}, HP Number is {{ hpNumber }}</p> -->
      <button @click="generateTimings">Generate List</button>
      </div>
    </div>
  </div>
</template>

<script>
import OrderDataService from "../services/OrderDataService";

export default {
  data: () => {
    return {
      cart: [],
      message: "",
      date: 1,
      counter: `100`,
      name: '',
      hpNumber: '',
      options: 'pickUp', //set pickup by default
      listTimings: [],
      timing: 1200,
      stallOpeningHours: 9, //hardcoded to 9am for receiving of self-pickup, but stalls could modify this from backend if wanted
      stallClosingHours: 22,
    };
  },
  methods: {
    generateTimings() {
      const todaysTime = new Date();
      let _timings = [];
      for (var i = (todaysTime.getHours() > this.stallOpeningHours) ? todaysTime.getHours() : this.stallOpeningHours; i < this.stallClosingHours; i++) {
        let time = i*100;
        // var isCurrentHour = new Boolean(todaysTime.getHours() === i);
        // console.log(todaysTime.getHours());
        // console.log(i);
        // console.log(isCurrentHour);
        // console.log(Math.ceil((todaysTime.getMinutes())/15));
        for (var j = ((todaysTime.getHours() > this.stallOpeningHours) && (todaysTime.getHours() === i)) ? Math.ceil((todaysTime.getMinutes())/15) : 0; j <= 3; j++) {
          time += j*15;
          _timings.push(time);
          time -= j*15;
        }
      }
      this.listTimings = _timings;
    },
    generateCode(length) {
      var result = '';
      var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      var charactersLength = characters.length;
      for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
      return result;
    },
    currentDate() { //do i need date?
      const current = new Date();
      const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
      return date;
    },
    emptyCart() {
      this.cart.splice(0, this.cart.length);
      this.saveCart();
    },
    saveCart() {
      let parsedArray = JSON.stringify(this.cart); //saves the array locally after parsing
      localStorage.setItem("cart", parsedArray);
    },
    checkOut() {
      if (this.cart.length === 0) {
        this.message = "Please add an item before checking out";
      } else {
        const orderID = this.generateCode(4);
        let data = {
          orderNumber: orderID,
          name: this.name,
          hpNumber: this.hpNumber,
          option: this.options,
          cart: this.cart,
        };
        console.log(data);
        OrderDataService.update(orderID, data)
          .then(() => {
            this.message = "Checkout successful.";
          })
          .catch((e) => {
            console.log(e);
          });
        this.emptyCart();
      }
    },
    retrieveCart() {
      console.log(this.cart);
    },
    removeItemFromCart(product) {
      this.$confirm("Are you sure you want to remove this item?")
        .then(() => {
          const index = this.cart.indexOf(product);
          this.cart.splice(index, 1); //2nd param is the number of elements to remove
          this.saveCart();
      });
    },
  },
  mounted() {
    if (localStorage.getItem("cart")) {
      try {
        this.cart = JSON.parse(localStorage.getItem("cart"));
      } catch (e) {
        localStorage.removeItem("cart");
      }
    }
  },
  computed: {
    total() {
      return this.cart.reduce((total, p) => {
        return total + p.cost * p.quantity;
      }, 0);
    },
  },
};
</script>

<style scoped>
.products {
  display: grid;
  grid-template-columns: 1fr 1fr;
}

header {
  height: 100px;
  color: "blue";
  text-align: right;
}
</style>
