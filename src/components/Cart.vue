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
          <td><button v-on:click="removeItemFromCart(p)">Remove Item</button></td>
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
    <p>
      <button
        v-show="cart.length"
        class="button is-primary"
        @click.prevent="checkOut"
      >
        Checkout
      </button>
    </p>
  </div>
  <!-- <div>
    <br />
    <br />
    <br />
    <br />
    <br />
    <header>
      {{ cart.length }} in cart
      <button @click="retrieveCart">Retrieve cart info</button>
      <button @click="checkOut">Check Out</button>
      <button @click="emptyCart">Remove All</button>
    </header>
    <div>
      <h1>Your Cart</h1>
      <div class="cart" v-for="(post, index) in cart" :key="index">
        {{ post.title }}
        {{ post.description }}
        <img :src="post.img" />
        <div>{{ post.cost }}</div>
        <button v-on:click="removeItemFromCart(post)">Remove Item</button>
      </div>
    </div>
    <h2>{{ message }}</h2>
  </div> -->
</template>

<script>
import OrderDataService from "../services/OrderDataService";

export default {
  data: () => {
    return {
      cart: [],
      message: "",
    };
  },
  methods: {
    // addItemToCart(product) {
    //     this.cart.push(product);
    //     console.log(this.cart);

    // },
    emptyCart() {
      this.cart.splice(0, this.cart.length);
      this.saveCart();
    },
    saveCart() {
      let parsedArray = JSON.stringify(this.cart);
      localStorage.setItem("cart", parsedArray);
    },
    checkOut() {
      if (this.cart.length === 0) {
        this.message = "Please add an item before checking out";
      } else {
        let data = this.cart;
        OrderDataService.update(data)
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
          console.log(index);
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
    // ...mapGetters({
    //     products: 'cartProducts'
    // }),
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
