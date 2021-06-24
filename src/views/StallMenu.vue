<template>
  <div>
    <NavigationStalls></NavigationStalls>
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
            <img v-bind:src="post.img" alt="" /><small>{{ post.price }}</small>
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
import NavigationStalls from "../components/NavigationStalls";
import TutorialDataService from "../services/TutorialDataService";

// class Post {
//   constructor(title, link, price, img, description) {
//     this.title = title;
//     this.link = link;
//     this.price = price;
//     this.img = img;
//     this.description = description;
//   }
// }

export default {
  components: {
    NavigationStalls,
  },
  data: () => {
    return {
      cart: [],
      cardList: [],
      keyword: "",
      // postList: [
      //   new Post(
      //     "Roasted Chicken Rice",
      //     "https://vuejs.org/", //link to modal
      //     "",
      //     "https://vuejs.org//images/logo.png",
      //     "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis malesuada tincidunt dui, non congue odio feugiat volutpat. Ut fermentum vitae nunc vitae pulvinar. Aenean sapien dui, viverra at sapien ut, scelerisque tempus eros. Nullam est ex, dictum non feugiat at, semper a purus."
      //   ),
      // ],
    };
  },
  methods: {
    // retrieveCardList(){
    //   console.log(this.cardList);
    // },
    addItemToCart(product) { //it is called post in the template
      this.cart.push(product);
      console.log(this.cart);
    },
    onDataChange(items) {
      let _card_list = [];

      items.forEach((item) => {
        let data = item.val();

        _card_list.push({
          title: data.title,
          link: "https://vuejs.org/",
          price: data.cost,
          img: data.url,
          description: data.description,
        });
      });

      this.cardList = _card_list;
    },
  },
  mounted() {
    TutorialDataService.getAll().on("value", this.onDataChange);
  },
  beforeDestroy() {
    TutorialDataService.getAll().off("value", this.onDataChange);
  },
  computed: {
    filteredList() {
      return this.cardList.filter((post) =>
        post.title.toLowerCase().includes(this.keyword.toLowerCase())
      );
      // console.log(this.cardList);
    },
  },
};
</script>
