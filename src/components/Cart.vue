<template>
  <div class="cart navspacing">
    <div class="d-flex justify-content-center mb-3">
    <div class="card" style="min-width: 65%; max-width:90%;">
    <div class="card-body">
      <h5 class="card-title">
        <div class="d-flex justify-content-left">
          <h1 class="title">Cart</h1>
        </div>
      </h5>
      <h6 class="card-subtitle mb-2 text-muted">          
        <p v-show="!cart.length">
            <i>Your cart is empty!</i>
            <i>
              <a @click="$router.go(-1)" class="ml-3"><u>Go shopping</u></a>
            </i>
        </p>
        <p>
          {{ message }}
        </p>
      </h6>
      <p class="card-text">
        <table class="table" v-show="cart.length">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col" style="min-width:120px" >Quantity</th>
              <th scope="col">Price</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody v-for="(p, index) in cart" :key="index">
            <tr>
              <td scope="row" style="margin:auto;">{{ p.title }}</td>
              <td style="min-width:120px; line-height: 30px;"><button type="button" class="btn btn-light mr-1" @click="addItemToCart(p)">+</button>{{ p.quantity }}<button type="button" class="btn btn-light ml-1" @click="removeItemFromCart(p)">-</button></td>
              <td>${{ subtotal(p) }}</td>
              <td></td>
            </tr>
            <tr v-show="p.comment">
              <td>
                <img src="https://image.flaticon.com/icons/png/512/4692/4692155.png" style="max-width:15px; margin-right:1%;">
                <i>Description: </i> <p>- {{ p.comment }}</p>
              </td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
          <tbody>
            <th scope="row">Total Price</th>
            <th></th>
            <th>${{ total }}</th>
            <th></th>
          </tbody>
        </table>
      </p>
    </div>
    </div>
  </div>
    <div v-show="cart.length">
      <form @submit.prevent="generateOrderUrl()">
      <div class="d-flex justify-content-center" >
        <div>
        <div class="mb-2">
          <select v-model="options" class="form-select mb-2" aria-label="Default select example" required>
            <option value="Pick Up">Self Pick-Up</option>
            <option value="Delivery">Delivery</option>
          </select>
          <select v-model="timing" v-if="options === 'Pick Up'" class="form-select" aria-label="Default select example" required>
            <option value="default">Please choose a timing</option>
            <option 
              v-for="(time,idx) in listTimings" 
              :value="time" 
              :key="idx"
            >{{ time }}</option>
          </select>
        </div>
        <i v-show="options === 'Delivery'">{{ deliveryMessage }}</i>
        <div class="input-group mb-3">
          <span class="input-group-text" id="inputGroup-sizing-default">Name</span>
          <input type="text" v-model="name" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" required>
        </div>
        <div class="input-group mb-3">
          <span class="input-group-text" id="inputGroup-sizing-default">Phone Number</span>
          <input type="text" v-model="hpNumber" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" required>
        </div>
        <!-- <div class="inputFields">
          <input type="text" v-model="name" placeholder="Name">
          <input type="number" v-model="hpNumber" placeholder="Phone Number">     
        </div> -->
        <br/>
        <p>
          <!-- <button
            class="button is-primary"
            @click.prevent="checkOut"
          >
            Checkout
          </button> -->
        </p>
        <i>{{ error }}</i>
        <div class="d-flex justify-content-center">
          <vs-button type="submit" color="rgb(23,208,85)" >Checkout Via Whatsapp<img src="https://image.flaticon.com/icons/png/512/2504/2504957.png" style="max-width:20px; margin-left: 5px;"></vs-button>
        </div>
        </div>
      </div>
      </form>
    </div>
  </div>
</template>

<script>
import OrderDataService from "../services/OrderDataService";
import { mapGetters } from "vuex";

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
      timing: 'default',
      stallOpeningHours: 9, //hardcoded to 9am and 10pm for receiving of self-pickup, 
      stallClosingHours: 24, //but stalls should be able to modify this from backend if wanted
      hawkerHpNumber: 6590604838,
      deliveryMessage: 'Delivery will be liased with the vendor through text.',
      cartDict: [],
    };
  },
  methods: {
    dosomething() {

    },
    scanCart(){
      var dict = {};
      let _cartDict = [];
      for (var i = 0; i < this.cart.length; i++){
        // dict[this.cart[i].title] = {};
        if ((dict[this.cart[i].title]) && (dict[this.cart[i].title].description === this.cart[i].description)) {
            dict[this.cart[i].title].quantity += 1;
        } else {
          let data = {
            quantity: 1,
            description: this.cart[i].description,
            cost: this.cart[i].cost,
          }
          dict[this.cart[i].title] = data;
        }
      }
      console.log(dict);

      Object.entries(dict).forEach((item) => {
        console.log(item, "item");
        console.log(dict, "dict");
        //over here, item refers to an array of 2 : [key, {menu object}]
        //hence, we access the data with item[1];
        let data = item[1];

        _cartDict.push({
          title: item[0],
          cost: data.cost*data.quantity,
          description: data.description,
          quantity: data.quantity,
        });
      });

      this.cartDict = _cartDict;
      console.log(this.cartDict);

    },
    
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
      const date = `${current.getFullYear()}/${current.getMonth()+1}/${current.getDate()}`;
      return date;
    },
    emptyCart() {
      this.cart.splice(0, this.cart.length);
      this.saveCart();
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
          date: this.currentDate(),
        };
        console.log(data);
        OrderDataService.update(this.$store.state.hawker.uid, orderID, data)
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
    addItemToCart(product){
      const index = this.cart.indexOf(product);
      this.cart[index].quantity += 1;
      this.saveCart();
    },

    removeItemFromCart(product) {
      this.$confirm("Are you sure you want to remove this item?")
        .then(() => {
          const index = this.cart.indexOf(product);
          if (product.quantity === 1) {
            this.cart.splice(index, 1); //2nd param is the number of elements to remove
          } else {
            this.cart[index].quantity -= 1;
          }
          this.saveCart();
      });
      this.saveCart();
    },
    updateCartBadge() {
      window.dispatchEvent(new CustomEvent('added-item-to-cart',  {
        detail: {
          storage: localStorage.getItem(cartuid)
        }
      }));
    },
    saveCart() {
      let parsedArray = JSON.stringify(this.cart);
      let cartuid = this.hawkeruid + "cart";
      localStorage.setItem(cartuid, parsedArray);
      
      //For navbar's badge to detect changes in the items in cart
      window.dispatchEvent(new CustomEvent('added-item-to-cart',  {
        detail: {
          storage: localStorage.getItem(cartuid)
        }
      }));
      console.log(localStorage.getItem(cartuid), 'Item passed to nav stalls')
    },
    encodeOrder() {
      const orderID = this.generateCode(4);
      let cartMessage = [];
      for (var i = 0; i < this.cart.length; i++) {
        cartMessage.push(
          '\n' + '- ' + this.cart[i].title + '  Qty: ' + this.cart[i].quantity + '\n' + 'Comments: ' + this.cart[i].comment 
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
        data.option + ' ' + data.time + '\n' +
        data.cart + ' ' + '\n'
        );
      return message;
    },
    generateOrderUrl() {
    //"https://wa.me/6590604838?text=I'm%20testing%20whatsapp%20checkout."
      let urlStart = "https://wa.me/";
      let text = "?text=";
      let urlEncodedMsg = this.encodeOrder();
      this.checkOut();
      return window.open(urlStart + '65' + this.$store.state.hawkerhp.hpnumber + text + urlEncodedMsg, "_blank");
    },
    subtotal(product) {
      return product.cost * product.quantity;
    },
  },
  mounted() {
    setTimeout(() => {
      console.log(this.hawkeruid, "Cart: On mount, hawker uid is this"); 
      if (localStorage.getItem(this.hawkeruid + "cart")) {
        try {
          this.cart = JSON.parse(localStorage.getItem(this.hawkeruid + "cart"));
        } catch (e) {
          localStorage.removeItem(this.hawkeruid + "cart");
        }
      }
      // this.scanCart();
    }, 15);
    this.generateTimings();
  },
  computed: {
    total() {
      return this.cart.reduce((total, p) => {
        return total + p.cost * p.quantity;
      }, 0);
    },
    ...mapGetters({
      hawkeruid: "uid",
    }),
  },

};
</script>

<style scoped>
.table-labels {
  font-size: 1.1rem;
}

.table-items {
  font-size: 0.9rem;
}

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
