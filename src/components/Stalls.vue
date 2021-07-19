<template>
  <section class="page-section portfolio" id="portfolio">
    <div class="container">
      <!-- Stalls Section Heading -->
      <h2
        class="
          page-section-heading
          text-center text-uppercase text-secondary
          mb-0
        "
      >
        Stalls
      </h2>
      <!-- Icon Divider -->
      <div class="divider-custom">
        <div class="divider-custom-line"></div>
      </div>
      <!-- Stall Grid Items -->
      <div class="row justify-content-center">
        <!-- Rendering Stall Items -->
        <div
          class="col-md-6 col-lg-4 mb-5"
          v-for="(obj, key) in stallList"
          :key="key"
          @click="passMenuData(obj.menu, obj.key)"
        >
          <!-- <router-link :to="{ path: obj.routerLink, params: obj.menu }" > -->
          <router-link :to="{ path: obj.routerLink, params: { menu: obj.menu } }" >
          <div
            class="portfolio-item mx-auto"
            data-bs-toggle="modal"
            data-bs-target="#portfolioModal1"
          >
            <div
              class="
                portfolio-item-caption
                d-flex
                align-items-center
                justify-content-center
                h-100
                w-100
              "
            >
              <div
                class="portfolio-item-caption-content text-center text-white"
              >
                <strong>{{ obj.caption }}</strong>
              </div>
            </div>
            <img class="img-fluid" :src="obj.img" alt="..." />
            <h6 style="margin: 1rem; color: black">{{ obj.title }}</h6>
          </div>
          </router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import ObtainStalls from '../services/ObtainStalls'

export default {


  data() {
    return {
      stallList: [],
      }
    },

  methods: {
      passMenuData(data, uid){
        this.$store.commit("setStallEntered", data);
        this.$store.commit("setUid", uid);
        console.log(this.$store.state.hawker.uid, "uid");
        console.log(this.$store.state.menu.data, 'Menu stored in store.js');
      },
      onDataChange(items) {
      let _stallList = [];

      items.forEach((item) => {
        let data = item.val();
        console.log(data,'Checking stall retrieval');
        console.log(item.key);

        _stallList.push({
          key: item.key,
          title: data.Settings.StallName,
          img: data.Settings.url, 
          caption: 'Select',
          routerLink: '/' + data.Settings.StallName + '/menu',
          menu: data.Menu,
        });
      });

      this.stallList = _stallList;
    },
  },
  mounted() {
    ObtainStalls.getAll().on("value", this.onDataChange);
  }
};
</script>

<style lang="css"></style>
