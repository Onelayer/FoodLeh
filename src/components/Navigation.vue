<template>
  <section>
    <div>
      <!-- <nav class="navbar navbar-expand-lg bg-secondary text-uppercase fixed-top" id="mainNav"> Uncomment this to fix navbar to top of screen when scrolling-->
      <nav
        class="navbar navbar-expand-lg bg-secondary text-uppercase fixed-top"
        id="mainNav"
      >
        <div class="container">
        <a href="#page-top" class="navbar-brand">
          <img
            style="margin-left:6%; width:40%;"
            :src="logo"
            alt="FoodLeh Logo"
          />
        </a>
          <!-- <a class="navbar-brand"  >

          </a> -->
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
              <a href="#stalls">Order Now</a>
              <a href="#about">About</a>
              <a href="#contact">Contact</a>
              <router-link to="/dashboard/orderlist">Stall Owners</router-link>  
            </div>
          </div>
          <div class="collapse navbar-collapse" id="navbarResponsive">
            <ul class="navbar-nav ms-auto">

                <!-- <div class="dropdown-content" v-for="link in links" :key="link.id">
                                        <router-link :key="link.id" :to="`${link.page}`">{{ link.text }}</router-link>
                                    </div>
                </div>
                            <router-view/> -->

              <li class="nav-item mx-0 mx-lg-1">
                <a class="nav-link py-3 px-0 px-lg-3 rounded" href="#stalls"
                  >Order Now</a
                >
              </li>
              <li class="nav-item mx-0 mx-lg-1">
                <a class="nav-link py-3 px-0 px-lg-3 rounded" href="#about"
                  >About</a
                >
              </li>
              <li class="nav-item mx-0 mx-lg-1">
                <a class="nav-link py-3 px-0 px-lg-3 rounded" href="#contact"
                  >Contact</a
                >
              </li>
              <router-link to="/dashboard/orderlist" tag="li"
                ><a class="nav-link py-3 px-0 px-lg-3 rounded"
                  >Stall Owners</a
                ></router-link
              >
            </ul>
          </div>
        </div>
      </nav>
    </div>
    <router-view></router-view>
  </section>
</template>

<script>
import logo from '../../public/img/foodleh_text_only2.png'

export default {
  data() {
    return {
      logo: logo,
    }
  },
};
</script>
