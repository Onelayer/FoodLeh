<template>
  <section>
    <div>
      <!-- <nav class="navbar navbar-expand-lg bg-secondary text-uppercase fixed-top" id="mainNav"> Uncomment this to fix navbar to top of screen when scrolling-->
      <nav
        class="navbar navbar-expand-lg bg-secondary text-uppercase fixed-top"
        id="mainNav"
      >
        <div class="container">
          <a class="navbar-brand" href="#page-top">FoodLeh</a>
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
          <div class="collapse navbar-collapse" id="navbarResponsive">
            <ul class="navbar-nav ms-auto">
              <li class="nav-item mx-0 mx-lg-1">
                <!-- <div class="dropdown">
                                <button class="dropbtn"><a href="">Stall Owners</a></button> -->
                <!-- <div class="dropdown-content">
                                        <router-link to="/login">Login</router-link> |
                                        <router-link to="/register">Register</router-link> |
                                        <router-link to="/dashboard">Dashboard</router-link> |
                                        <router-link to="/addorder">AddOrder</router-link>
                                        <button @click="logout">Logout</button>
                                    </div> -->

                <!-- <div class="dropdown-content" v-for="link in links" :key="link.id">
                                        <router-link :key="link.id" :to="`${link.page}`">{{ link.text }}</router-link>
                                    </div> -->
                <!-- </div>
                            <router-view/> -->
              </li>
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

              <!-- <li class="nav-item mx-0 mx-lg-1"><a class="nav-link py-3 px-0 px-lg-3 rounded" @click="navigateToLogin">Stall Owners</a></li> -->
              <router-link to="/login" tag="li"
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
export default {
  methods: {
    navigateToLogin() {
      this.$router.push({ name: Login });
    },
  },
};
</script>
