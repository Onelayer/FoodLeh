<template>
  <div>
    <div class="navspacing">
      <!-- <Modal
      v-show="isModalVisible"
      @close="closeModal"
    >
      <template v-slot:title>
        This is a new modal header.
      </template>

      <template v-slot:body>
        This is a new modal body.
      </template>

      <template v-slot:footer>
        This is a new modal footer.
      </template>
    </Modal> -->
    </div>
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
import ObtainStalls from "../services/ObtainStalls";
import { mapGetters } from "vuex";

export default {
  name: "Menu",
  data() {
    return {
      cart: [],
      cardList: [],
      keyword: "",
      cardListProps: [],
    };
  },
  methods: {
    retrieveMenu() {
      this.cardListProps = this.menu;
      //not the most ideal, need to make it more responsive
      //and should already render it out by url... not store.js
      console.log(this.menu, "mapGetters Menu");
      console.log(this.cardListProps);
      this.onDataChange(this.cardListProps);
    },
    async addItemToCart(product) {
      console.log(product.description);
      //it is called post in the template
      const { value: text } = await this.$swal
        .fire({
          title: "Adding " + product.title + " to cart",
          // imageUrl: product.img,
          // imageWidth: 100,
          // imageHeight: 100,
          input: "textarea",
          inputLabel: "Message to stall:",
          inputPlaceholder: "No chilli, less vinegar etc..",
          showCancelButton: true,
          backdrop: true,
          confirmButtonText: 'Done',
          confirmButtonColor: '#1abc9c'
        })
        .then((result) => {
          if (result.isConfirmed) {
            if (text) product.description = text;
            else product.description = '';
            console.log(product.description);

            this.cart.push(product);
            this.saveCart();
            this.$swal.fire({
              toast: true,
              position: 'top-start',
              showConfirmButton: false,
              timer: 2000,
              timerProgressBar: true,
              icon: 'success',
              title: 'Item added to cart',
            })
            //create toast to say it has been added to cart
          } else if (result.isDismissed) {
          }
        });

      // eventBus.$emit('addItemToCart', product);
    },
    // Old add item to cart
    // addItemToCart(product) {
    //   //it is called post in the template
    //   this.cart.push(product);
    //   this.$fire({
    //     title: "Success!",
    //     text: "Item has been added to cart!",
    //     type: "success",
    //     timer: 3000
    //   }).then(function(r) {
    //     console.log(r.value);
    //   });
    //   this.saveCart();
    //   // eventBus.$emit('addItemToCart', product);
    // },
    saveCart() {
      let parsedArray = JSON.stringify(this.cart);
      localStorage.setItem("cart", parsedArray);
    },
    onDataChange(items) {
      let _card_list = [];

      Object.entries(items).forEach((item) => {
        console.log(item, "item");
        console.log(items, "items");
        //over here, item refers to an array of 2 : [key, {menu object}]
        //hence, we access the data with item[1];
        let data = item[1];
        console.log(data, "object accessed");

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
      console.log(this.cardList, "cardlist");
    },
  },
  mounted() {
    setTimeout(() => {
      this.retrieveMenu();
    }, 15);
    // this.$nextTick(() => {
    //   this.onDataChange(this.$root.menuData);
    // })
    // ObtainStalls.getAllStallMenu(this.$root.menuUid).on("value", this.onDataChange);
    if (localStorage.getItem("cart")) {
      try {
        this.cart = JSON.parse(localStorage.getItem("cart"));
      } catch (e) {
        localStorage.removeItem("cart");
      }
    }
  },
  beforeDestroy() {
    ObtainStalls.getAll().off("value", this.onDataChange);
  },
  computed: {
    filteredList() {
      return this.cardList.filter((post) =>
        post.title.toLowerCase().includes(this.keyword.toLowerCase())
      );
    },
    ...mapGetters({
      menu: "menuData",
    }),
  },
};
</script>

<style scoped>
.container {
  max-width: 60px;
}

.product-font {
  color: black;
  justify-self: "left";
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
