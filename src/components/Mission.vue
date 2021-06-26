<template>
  <div>
    <section class="page-section bg-primary text-white mb-0">
      <div class="container">
        <!-- About Section Heading-->
        <h2 class="page-section-heading text-center text-uppercase text-white">
          About
        </h2>
        <!-- Icon Divider-->
        <div class="divider-custom divider-light">
          <div class="divider-custom-line"></div>
        </div>
        <!-- About Section Content-->
        <div class="row">
          <div class="col-lg-4 ms-auto">
            <p class="lead">
              The COVID-19 pandemic has brought about more takeaways and working from 
              home, affecting the food industry greatly.
              FoodLeh aims to provide a centralized platform for smaller local F&B
              businesses to consolidate and provide a web-based ordering system. 
            </p>
          </div>
          <div class="col-lg-4 me-auto">
            <p class="lead">
              Owners will be able to manage the menu items, description and cost 
              of their individual menu items they put on their stallfront through a 
              personalised dashboard. What are you waiting for? Sign up today with us!
            </p>
          </div>
        </div>
        <!-- About Section Button-->
        <div class="text-center mt-4">
          <router-link to="/register">
            <a
              class="btn-light btn-xl btn-outline-light"
              >
                Register Your Store Now!
            </a>
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>
