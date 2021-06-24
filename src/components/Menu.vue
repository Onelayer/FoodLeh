<template>
  <div>
    <div class="navspacing">
      <!-- <div class='search-wrapper'>
        <div id='labelText'>Send Newsletter to {{ email }} in <span idf='city-span'> {{ city }} </span></div>
        <input id='email' type="text" v-model='email' placeholder='Sign Up for Email Updates'><button id='emailBtn'>Submit</button>
            <input type="text" id='zipCode' placeholder='Enter Zip Code' v-model='zip'>
        </div> -->

      <div class="search-wrapper d-flex justify-content-center">
        <label for="search">Search Title:</label>
        <input
          type="text"
          autocomplete="off"
          v-model="keyword"
          placeholder="Search Title..."
          name="search"
        />
      </div>
      <div class="wrapper d-flex justify-content-center">
        <div class="card" v-for="post in filteredList" :key="post.title">
          <!-- <button @click="addItemToCart">Add to Cart</button> -->
          <a href="" @click.prevent="addItemToCart(post)" target="blank">
            <img v-bind:src="post.img" alt="" /><small>{{ post.cost }}</small>
            {{ post.title }}
          </a>

          <small id="description"
            >{{ post.description }}<small>...</small></small
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TutorialDataService from "../services/TutorialDataService";

export default {
  data: () => {
    return {
      cart: [],
      cardList: [],
      keyword: "",
    };
  },
  methods: {
    addItemToCart(product) {
      //it is called post in the template
      this.cart.push(product);
      this.saveCart();
      // eventBus.$emit('addItemToCart', product);
    },
    saveCart() {
      let parsedArray = JSON.stringify(this.cart);
      localStorage.setItem("cart", parsedArray);
    },
    onDataChange(items) {
      let _card_list = [];

      items.forEach((item) => {
        let data = item.val();

        _card_list.push({
          title: data.title,
          link: "", //if we want to expand to modals
          cost: data.cost,
          img: data.url,
          description: data.description,
        });
      });

      this.cardList = _card_list;
    },
  },
  mounted() {
    TutorialDataService.getAll().on("value", this.onDataChange);
    if (localStorage.getItem("cart")) {
      try {
        this.cart = JSON.parse(localStorage.getItem("cart"));
      } catch (e) {
        localStorage.removeItem("cart");
      }
    }
  },
  beforeDestroy() {
    TutorialDataService.getAll().off("value", this.onDataChange);
  },
  computed: {
    filteredList() {
      return this.cardList.filter((post) =>
        post.title.toLowerCase().includes(this.keyword.toLowerCase())
      );
    },
  },
};
</script>
