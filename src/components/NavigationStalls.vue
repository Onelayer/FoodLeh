<template>
  <section>
    <div>
      <!-- <nav class="navbar navbar-expand-lg bg-secondary text-uppercase fixed-top" id="mainNav"> Uncomment this to fix navbar to top of screen when scrolling-->
      <nav
        class="navbar navbar-expand-lg bg-secondary text-uppercase fixed-top"
        id="mainNav"
      >
        <div class="container">
          <router-link to="/" class="navbar-brand">FoodLeh</router-link>
          <div class="dropdown              
              navbar-toggler">
          <button
            class="
              navbar-toggler
              text-uppercase
              font-weight-bold
              bg-primary
              text-white
              rounded
            "
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarResponsive"
            aria-controls="navbarResponsive"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            Menu
          <i class="fas fa-bars"></i>
          </button>
            <div class="dropdown-content">
              <router-link to="menu">Menu</router-link>  
              <!-- <router-link to="Cart">Cart</router-link>   -->
              <router-link to="Cart">Cart <span class="badge badge-secondary">{{ cartBadge }}</span></router-link>  

            </div>
          </div>
          <div class="collapse navbar-collapse" id="navbarResponsive">
            <ul class="navbar-nav ms-auto">
              <li class="nav-item mx-0 mx-lg-1">
              </li>
              <router-link to="menu" tag="li"
                ><a class="nav-link py-3 px-0 px-lg-3 rounded"
                  >Menu</a
                ></router-link
              >

              <router-link to="cart" tag="li"
                ><a class="nav-link py-3 px-0 px-lg-3 rounded">Cart <span class="badge badge-secondary">{{ cartBadge }}</span></a></router-link>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex';

export default {

  data() {
    return {
      cart: [],
      // cartBadge: 0,
    }
  },
  methods: {
    calculateCartBadge() {
      let sum_items = 0;
      console.log(this.cart, 'The cart when computing the badge');
      for (var i = 0; i < this.cart.length; i++){
        sum_items += this.cart[i].quantity;
        console.log(sum_items);
      }
      console.log(sum_items);
    }
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
    window.addEventListener('added-item-to-cart', (event) => {
      this.cart = this.cart = JSON.parse(event.detail.storage);
      console.log(this.cart, 'cart received');
      this.calculateCartBadge;
    })
  },
  computed: {
    cartBadge() {
      let sum_items = 0;
      console.log(this.cart, 'The cart when computing the badge');
      for (var i = 0; i < this.cart.length; i++){
        sum_items += this.cart[i].quantity;
        console.log(sum_items);
      }
      return sum_items;
    },
    ...mapGetters({
      hawkeruid: "uid",
    }),
  },
};
</script>
