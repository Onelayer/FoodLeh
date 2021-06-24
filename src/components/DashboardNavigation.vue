<template>
  <div class="hidden">
    <vs-sidebar
      background="dark"
      textWhite
      absolute
      hover-expand
      reduce
      v-model="active"
      open
    >
      <template #logo>
        <img
          src="../assets/foodlehlogo.png"
          class="brand_logo"
          alt="FoodLeh logo"
        />
      </template>
      <vs-sidebar-item id="Instagram">
        <template #icon>
          <i class="bx bxl-instagram"></i>
        </template>
        <router-link to="/dashboard/orderlist">Order List</router-link>
      </vs-sidebar-item>
      <vs-sidebar-item id="market">
        <template #icon>
          <i class="bx bx-grid-alt"></i>
        </template>
        <router-link to="/dashboard/addmenu">Add Menu</router-link>
      </vs-sidebar-item>
      <vs-sidebar-item id="Music">
        <template #icon>
          <i class="bx bxs-music"></i>
        </template>
        <router-link to="/dashboard/menulist">Menu List</router-link>
      </vs-sidebar-item>
      <template #footer>
        <vs-row justify="space-between">
          <vs-sidebar-item id="Facebook">
            <vs-button
              type="submit"
              @click="logout()"
              badge-position="top-right"
            >
              Log out
            </vs-button>
          </vs-sidebar-item>
        </vs-row>
      </template>
    </vs-sidebar>
  </div>
</template>

<!--<template>
  <div>
    <header> 
      <nav>
        <ul>
          <li>
            <router-link to="/dashboard/addmenu">Add Menu</router-link>
          </li>
          <li>
            <router-link to="/dashboard/menulist">Menu List</router-link>
          </li>
          <li>
            <router-link to="/dashboard/orderlist">Order List</router-link>
          </li>
        </ul>
      </nav>
    </header>
  </div>
</template> -->

<script>
import firebase from "firebase";

export default {
  data: () => ({
    active: "home",
  }),
  methods: {
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          alert("Successfully logged out");
          this.$router.push("/login");
        })
        .catch((error) => {
          alert(error.message);
          this.$router.push("/login");
        });
    },
  },
};
</script>

<style scoped>
a {
  text-decoration: none;
  color: #fff;
}
/* header {
  width: 100%;
  height: 5rem;
  background-color: #11005c;
}

nav {
  height: 100%;
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

li {
  margin: 0 2rem;
}

a {
  text-decoration: none;
  background: transparent;
  border: 1px solid transparent;
  cursor: pointer;
  color: white;
  padding: 0.5rem 1.5rem;
  display: inline-block;
}

a:hover,
a:active {
  color: #f1a80a;
  border-color: #f1a80a;
  background-color: #1a037e;
} */
</style>
