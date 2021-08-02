<template>
  <div>
    <div class="navspacing">
      <div class="d-flex justify-content-center">
        <div class="card border-light mb-3 mt-3" style="min-width: 70%; max-width:90%;">
          <div class="card-header">{{ stallTitle }}</div>
          <div class="card-body">
            <h5 class="card-title">Description</h5>
            <p class="card-text">{{ stallDescription }}</p>
            <p><img src="https://image.flaticon.com/icons/png/512/684/684809.png" style="max-width: 18px" class="mr-3">{{ location }}</p>
          </div>
        </div>
      </div>
      <div class="search-wrapper d-flex justify-content-center">
        <label for="search" class="mr-3">Search:</label>
        <input
          type="text"
          autocomplete="off"
          v-model="keyword"
          placeholder="Search Food Item..."
          name="search"
        />
      </div>
      <div class="wrapper d-flex justify-content-center">
        <div class="card mb-3 ml-3 mr-3" style="max-width: 560px;" v-for="post in filteredList" :key="post.title">
          <div class="row g-0">
            <div class="col-md-4">
              <img v-bind:src="post.img" class="img-fluid rounded-start" alt="...">
            </div>
            <div class="col-md-8">
              <div class="card-body">
                <h5 class="card-title">{{ post.title }}</h5>
                <p class="card-text">{{ post.description }} </p>
                <p class="card-text"><small class="text-muted">${{ post.cost }}</small></p>
                <button type="button" class="btn btn-success" @click.prevent="addItemToCart(post)">Add to Cart</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ObtainStallSettings from "../services/ObtainStallSettings";
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
      stallTitle: 'Stall Title',
      stallDescription: 'Stall Description',
      location: 'Location'
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
      localStorage.setItem(cartuid, parsedArray);
      
      //For navbar's badge to detect changes in the items in cart
      window.dispatchEvent(new CustomEvent('added-item-to-cart',  {
        detail: {
          storage: localStorage.getItem(cartuid)
        }
      }));
      console.log(localStorage.getItem(cartuid), 'Item passed to nav stalls')
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
    onDataChangeSettings(settings) {
      
      const dataSettingsDB = settings.val();


      this.stallTitle = dataSettingsDB.StallName;
      this.stallDescription = dataSettingsDB.StallDescription;
      this.location = dataSettingsDB.Address;
    }
  },
  mounted() {
    setTimeout(() => {
      this.retrieveMenu();
      ObtainStallSettings.getAllForStore(this.hawkeruid).on("value",this.onDataChangeSettings);
      console.log(this.hawkeruid, "Menu: On mount, hawker uid is this"); 
      if (localStorage.getItem(this.hawkeruid + "cart")) {
        try {
          this.cart = JSON.parse(localStorage.getItem(this.hawkeruid + "cart"));
        } catch (e) {
          localStorage.removeItem(this.hawkeruid + "cart");
        }
      }
    }, 5);

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
