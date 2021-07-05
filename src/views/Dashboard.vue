<template>
  <div>
    <dashboard-navigation></dashboard-navigation>
    <router-view></router-view>
    <!--<button type="submit" class="btn btn-primary" @click="logout()">
      Log out
    </button>-->
  </div>
</template>

<script>
import DashboardNavigation from "../components/DashboardNavigation.vue";
import { mapGetters } from 'vuex';

export default {
  name: "Dashboard",
  data: function () {
    return {
      pictureUrl: "",
    };
  },
  computed: {
    ...mapGetters({
      user: "user"
    })
  },
  components: {
    DashboardNavigation,
  },
};
//methods: {
//logout() {
//firebase
//.auth()
//.signOut()
//.then(() => {
//alert("Successfully logged out");
//this.$router.push("/login");
//})
//.catch((error) => {
//alert(error.message);
//this.$router.push("/login");
//});
//},
//},
</script>
