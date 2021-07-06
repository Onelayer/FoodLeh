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
    <div v-show="cart.length">
      <div class="d-flex justify-content-center" >
        <div>
        <div>
          <select v-model="options">
            <option value="Pick Up">Self Pick-Up</option>
            <option value="Delivery">Delivery</option>
          </select>
          <select v-model="timing" v-if="options === 'Pick Up'">
            <option 
              v-for="(time,idx) in listTimings" 
              :value="time" 
              :key="idx"
            >{{ time }}</option>
          </select>
        </div>
        <br/>
        <i v-show="options === 'Delivery'">{{ deliveryMessage }}</i>
        <br/>
        <div class="inputFields">
          <input type="text" v-model="name" placeholder="Name">
          <input type="number" v-model="hpNumber" placeholder="Phone Number">     
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
        <i>{{ error }}</i>
        <button @click="generateOrderUrl">Checkout Via Whatsapp</button>

        </div>
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
      options: 'Pick Up', //set pickup by default
      error: '',
      listTimings: [],
      timing: '1230',
      stallOpeningHours: 9, //hardcoded to 9am and 10pm for receiving of self-pickup, 
      stallClosingHours: 24, //but stalls should be able to modify this from backend if wanted
      hawkerHpNumber: 6590604838,
      deliveryMessage: 'Delivery will be liased with the vendor through text.',
    };
  },
  methods: {
    generateTimings() {
      const todaysTime = new Date();
      let _timings = [];
      for (var i = (todaysTime.getHours() > this.stallOpeningHours) ? todaysTime.getHours() : this.stallOpeningHours; i < this.stallClosingHours; i++) {
        let time = i*100;
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
      } else  if (!this.name) {
        this.error = "Please fill in your name before checking out";
      } else  if (!this.hpNumber) {
        this.error = "Please fill in your mobile number before checking out";
      } else  if ((!this.timing) && (this.options === 'pickUp')) {
        this.error = "Please fill in your pick-up time before checking out";
      } else {
        const orderID = this.generateCode(4);
        let data = {
          orderNumber: orderID,
          name: this.name,
          hpNumber: this.hpNumber,
          option: this.options,
          cart: this.cart,
          time: this.timing,
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
    encodeOrder() {
      const orderID = this.generateCode(4);
      let cartMessage = [];
      for (var i = 0; i < this.cart.length; i++) {
        cartMessage.push(
          this.cart[i].title + ' ' + this.cart[i].quantity
        );
      }
        let data = {
          orderNumber: orderID,
          name: this.name,
          hpNumber: this.hpNumber,
          option: this.options,
          cart: cartMessage,
          time: this.timing,
          //need to include total too
        };
      console.log(data.time);
      const message = encodeURI(
        '*Order number: * ' + data.orderNumber + '\n' +
        data.name + ' ' + data.hpNumber + '\n' +
        data.option + ' ' + data.timing + '\n' +
        data.cart + ' ' + '\n'
        );
      return message;
    },
    generateOrderUrl() {
    //"https://wa.me/6590604838?text=I'm%20testing%20whatsapp%20checkout."
      let urlStart = "https://wa.me/";
      let text = "?text=";
      let urlEncodedMsg = this.encodeOrder();
      return window.open(urlStart + this.hawkerHpNumber + text + urlEncodedMsg, "_blank");
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
    this.generateTimings();
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
