<template>
  <div>
    <div class="navspacing">
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
      resultPlaceholder: false,
      textPlaceholder: '',
      cartDict: [],
    };
  },
  methods: {
    retrieveMenu() {
      this.cardListProps = this.menu;
      //not the most ideal, need to make it more responsive
      //and should already render it out by url... not store.js
      this.onDataChange(this.cardListProps);
    },

    addItemToCart(product) {
      console.log(product);
      //it is called post in the template
      const { value: text } = this.$swal
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
          console.log(result);
          if (result.isConfirmed) {
            let newProduct = {
              title: product.title,
              description: product.description,
              cost: product.cost,
              quantity: 1,
              comment: '',
            }
            if (result.value) newProduct.comment = result.value;
            else newProduct.comment = '';
            console.log(newProduct, 'New Product');
            this.scanCart(newProduct)
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

          }
        });
    },
    scanCart(product){
      console.log('scanning cart');

      var i = 0;
      let isInCart = false;

      do {
        if(this.cart.length && ((this.cart[i].title === product.title) && (this.cart[i].comment === product.comment))) {
          this.cart[i].quantity += 1;
          console.log('Item quantity increased');
          isInCart = true;
        } 
        i++;
      } while((i < this.cart.length) && !isInCart);

      if (!isInCart) {
        this.cart.push(product);
      }


    },
    saveCart() {
      let parsedArray = JSON.stringify(this.cart);
      let cartuid = this.hawkeruid + "cart";
      console.log(cartuid);
      localStorage.setItem(cartuid, parsedArray);
      console.log(localStorage.getItem(this.hawkeruid + "cart", "Local Storage: uid + cart"));
    },
    onDataChange(items) {
      console.log('onDataChange() is running');
      let _card_list = [];

      Object.entries(items).forEach((item) => {
        console.log(item, "item");
        console.log(items, "items");
        //over here, item refers to an array of 2 : [key, {menu object}]
        //hence, we access the data with item[1];
        let data = item[1];

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
    setTimeout(() => {
      this.retrieveMenu();
    }, 15);
    // this.$nextTick(() => {
    //   this.onDataChange(this.$root.menuData);
    // })
    // ObtainStalls.getAllStallMenu(this.$root.menuUid).on("value", this.onDataChange);
    setTimeout(() => {
      console.log(this.hawkeruid, "Menu: On mount, hawker uid is this"); 
      if (localStorage.getItem(this.hawkeruid + "cart")) {
        try {
          this.cart = JSON.parse(localStorage.getItem(this.hawkeruid + "cart"));
        } catch (e) {
          localStorage.removeItem(this.hawkeruid + "cart");
        }
      }
    }, 15);
  },
  beforeDestroy() {
    // ObtainStalls.getAll().off("value", this.onDataChange);
  },
  computed: {
    filteredList() {
      return this.cardList.filter((post) =>
        post.title.toLowerCase().includes(this.keyword.toLowerCase())
      );
    },
    ...mapGetters({
      menu: "menuData",
      hawkeruid: "uid",
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
