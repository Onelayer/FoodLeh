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
      <router-link to="/dashboard/homepage">
        <vs-sidebar-item id="homepage">
          <template #icon>
            <img
              src="../assets/baseline_home_white_24dp.png"
              class="brand_logo"
              alt="FoodLeh logo"
            />
          </template>
          Home Page
        </vs-sidebar-item>
      </router-link>
      <router-link to="/dashboard/orderlist">
        <vs-sidebar-item id="Instagram">
          <template #icon>
            <img
              src="../assets/file-list-2-line.png"
              class="brand_logo"
              alt="FoodLeh logo"
            />
          </template>
          Order List
        </vs-sidebar-item>
      </router-link>
      <router-link to="/dashboard/addmenu">
        <vs-sidebar-item id="Add Menu">
          <template #icon>
            <img
              src="../assets/add-box-line.png"
              class="brand_logo"
              alt="FoodLeh logo"
            />
          </template>
          Add Menu
        </vs-sidebar-item>
      </router-link>
      <router-link to="/dashboard/menulist">
        <vs-sidebar-item id="Music">
          <template #icon>
            <img
              src="../assets/baseline_list_white_24dp.png"
              class="brand_logo"
              alt="FoodLeh logo"
            />
          </template>
          Menu List
        </vs-sidebar-item>
      </router-link>
      <router-link to="/dashboard/feedback">
        <vs-sidebar-item id="Feedback">
          <template #icon>
            <img
              src="../assets/baseline_feedback_white_24dp.png"
              class="brand_logo"
              alt="FoodLeh logo"
            />
          </template>
          Feedback
        </vs-sidebar-item>
      </router-link>
      <router-link to="/dashboard/settings">
        <vs-sidebar-item id="Settings">
          <template #icon>
            <img
              src="../assets/baseline_settings_white_24dp.png"
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
            <template #icon>
              <img
                src="../assets/baseline_logout_white_24dp.png"
                class="brand_logo"
                alt="FoodLeh logo"
              />
            </template>
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
import { mapGetters } from "vuex";

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
      user: "user",
    }),
  },
};
</script>

<style scoped>
a {
  text-decoration: none;
  color: #fff;
}
</style>
