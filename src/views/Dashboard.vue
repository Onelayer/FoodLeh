<template>
  <div>
    <h2>Dashboard</h2>
    <p>Add menu:</p>
    <add-tutorial></add-tutorial>
    <upload></upload>
    <tutorials-list></tutorials-list>
    <order-list></order-list>
    <button type="submit" class="btn btn-primary" @click="logout()">
      Log out
    </button>
  </div>
</template>

<script>
import AddTutorial from "../components/AddTutorial.vue";
import TutorialsList from "../components/TutorialsList.vue";
import firebase from "firebase";
import Upload from "../components/Upload.vue";
import OrderList from "../components/OrderList.vue";

export default {
  name: "Dashboard",
  data: function() {
    return {
      pictureUrl:'',
    }
  },
  components: {
    AddTutorial,
    TutorialsList,
    Upload,
    OrderList,
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

<style lang="scss" scoped></style>
