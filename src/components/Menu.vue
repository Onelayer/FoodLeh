<template>
  <div>
    <div class="navspacing">
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
          <a href="" @click.prevent="addItemToCart(post)" target="blank">
            <img v-bind:src="post.img" alt="" />
            <table class="product-font">
              <tbody> 
              <tr>
                <td>{{ post.title }}</td>

              </tr>
              <tr>
                <td>{{ post.description }}</td>
              </tr>
              <tr>
                <td class="product-price">${{ post.cost }}</td>
              </tr>
              </tbody>
            </table>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ObtainStallMenu from "../services/ObtainStallMenu";

export default {
  data() {
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
      this.$fire({
        title: "Success!",
        text: "Item has been added to cart!",
        type: "success",
        timer: 3000
      }).then(function(r) {
        console.log(r.value);
      });
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
          quantity: 1,
        });
      });

      this.cardList = _card_list;
    },
  },
  mounted() {
    ObtainStallMenu.getAll().on("value", this.onDataChange);
    if (localStorage.getItem("cart")) {
      try {
        this.cart = JSON.parse(localStorage.getItem("cart"));
      } catch (e) {
        localStorage.removeItem("cart");
      }
    }
  },
  beforeDestroy() {
    ObtainStallMenu.getAll().off("value", this.onDataChange);
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

<style scoped>
.product-font {
  color: black;
  justify-self: 'left';
  font-size: 1.2rem;
  margin-top: 0.2rem;
  flex: row;
}

.product-price {
  color: black;
  justify-content: right;
  font-size: 0.9rem;
  margin-left: 10rem;
}

.product-addtocart {
  color: black;
  font-size: 0.9rem;
}
</style>