<template>
  <section class="page-section portfolio" id="portfolio">
    <div class="container">
      <!-- Portfolio Section Heading-->
      <h2
        class="
          page-section-heading
          text-center text-uppercase text-secondary
          mb-0
        "
      >
        Stalls
      </h2>
      <!-- Icon Divider-->
      <div class="divider-custom">
        <div class="divider-custom-line"></div>
        <!-- <div class="divider-custom-icon"><i class="fas fa-star"></i></div>
                <div class="divider-custom-line"></div> -->
      </div>
      <!-- Portfolio Grid Items-->
      <div class="row justify-content-center">
        <!-- Portfolio Item 1-->
        <div
          class="col-md-6 col-lg-4 mb-5"
          v-for="(obj, key) in stallsJSON"
          :key="key"
        >
          <router-link to="/ordering/menu">
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
            <img class="img-fluid" :src="`${obj.img}`" alt="..." />
            <h6 style="margin: 1rem; color: black">{{ obj.title }}</h6>
          </div>
          </router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data: () => ({
    stallsJSON: [
      {
        img: require("/public/img/stalls/chicken_rice_stall.png"),
        caption: "Select",
        title: "Yishun 925 Food Center",
      },
      {
        img: require("/public/img/stalls/mookata_stall.png"),
        caption: "Select",
        title: "Clementi West 2 Mookata",
      },
      {
        img: require("/public/img/stalls/bishan_hawker_stall.png"),
        caption: "Select",
        title: "Bishan Street 12 Tze Char",
      },
    ],
  }),
};
</script>

<style lang="css"></style>
