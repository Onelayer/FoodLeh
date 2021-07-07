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
      <router-link to="/dashboard/orderlist">
        <vs-sidebar-item id="Instagram">
          <template #logo>
            <img
              src="../assets/foodlehlogo.png"
              class="brand_logo"
              alt="FoodLeh logo"
            />
          </template>
          Order List
        </vs-sidebar-item>
      </router-link>
      <router-link to="/dashboard/addmenu">
        <vs-sidebar-item id="market">
          <template #logo>
            <img
              src="../assets/foodlehlogo.png"
              class="brand_logo"
              alt="FoodLeh logo"
            />
          </template>
          Add Menu
        
        </vs-sidebar-item>
      </router-link>
      <router-link to="/dashboard/menulist">
        <vs-sidebar-item id="Music">
        
          <template #logo>
            <img
              src="../assets/foodlehlogo.png"
              class="brand_logo"
              alt="FoodLeh logo"
            />
          </template>
          Menu List
        </vs-sidebar-item>
      </router-link>
      <router-link to="/dashboard/settings">
        <vs-sidebar-item id="Settings">
        <template #logo>
          <img
            src="../assets/foodlehlogo.png"
            class="brand_logo"
            alt="FoodLeh logo"
          />
        </template>
        Settings
        </vs-sidebar-item>
      </router-link>
      <template #footer>
        <vs-row>
          <vs-sidebar-item id="Facebook">
            <vs-button
              type="submit"
              @click="logout()"
              badge-position="top-right"
            >
              Logout
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
import { mapGetters } from 'vuex';

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
  computed: {
    ...mapGetters({
      user: "user"
    })
  },
};
</script>

<style scoped>
a {
  text-decoration: none;
  color: #fff;
}
</style>
