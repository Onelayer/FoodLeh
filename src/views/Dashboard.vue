<template>
  <div>
    <dashboard-navigation></dashboard-navigation>
    <router-view></router-view>
    <upload></upload>
    <button type="submit" class="btn btn-primary" @click="logout()">
      Log out
    </button>
  </div>
</template>

<script>
import firebase from "firebase";
import Upload from "../components/Upload.vue";
import DashboardNavigation from "../components/DashboardNavigation.vue";

export default {
  name: "Dashboard",
  components: {
    Upload,
    DashboardNavigation,
  },
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
