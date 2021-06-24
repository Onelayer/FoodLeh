<template>
  <div>
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
      <div v-for="(post, index) in cart" :key="index">
        {{ post.title }}
        {{ post.description }}
        <img :src="post.img" />
        <div>{{ post.cost }}</div>
        <button v-on:click="removeItemFromCart(post)">Remove Item</button>
      </div>
    </div>
    <h2>{{ message }}</h2>
  </div>
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
      const index = this.cart.indexOf(product);
      this.cart.splice(index, 1); //2nd param is the number of elements to remove
      this.saveCart();
    },
  },
  created() {
    // eventBus.$on("addItemToCart", (product) => {
    //     this.cart.push(product);
    //     console.log(this.cart);
    // })
  },
  mounted() {
    if (localStorage.getItem("cart")) {
      try {
        this.cart = JSON.parse(localStorage.getItem("cart"));
      } catch (e) {
        localStorage.removeItem("cart");
      }
    }
    // if(localStorage.getItem('cart')) {
    //     this.cart = localStorage.getItem('cart');
    // }
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
