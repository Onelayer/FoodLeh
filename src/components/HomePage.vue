<template>
  <div class="center" style="margin-left: 50px">
    <vs-card>
      <template #title>
        <h3>Number of Customers</h3>
      </template>
      <template #text>
        <p>
          {{ totalOrders }}
        </p>
      </template>
    </vs-card>
    <vs-card>
      <template #title>
        <h3>Total Revenue</h3>
      </template>
      <template #text>
        <p>
          {{ totalRevenue }}
        </p>
      </template>
    </vs-card>
  </div>
</template>

<script>
import TutorialDataService from "../services/ObtainOrder";
import { mapGetters } from "vuex";

export default {
  name: "tutorials-list",
  //  components: { TutorialDetails },
  data() {
    return {
      tutorials: [],
      currentTutorial: null,
      currentIndex: -1,
      editActive: false,
      edit: null,
      editProp: {},
      search: "",
      allCheck: false,
      page: 1,
      max: 5,
      active: 0,
      selected: [],
      totalRevenue: 0,
      totalOrders: 0,
    };
  },
  methods: {
    onDataChange(items) {
      let _tutorials = [];
      let _totalRevenue = 0;
      let menuItems = {};

      items.forEach((item) => {
        let key = item.key;
        let data = item.val();

        let _orders = [];
        let orderss = data.cart;
        orderss.forEach((order) => {
          let data2 = order;
          _totalRevenue += parseInt(data2.cost * data2.quantity);
          _orders.push({
            title: data2.title,
            description: data2.description,
            cost: data2.cost,
            comment: data2.comment,
            quantity: data2.quantity,
          });
        });

        _tutorials.push({
          key: key,
          name: data.name,
          hpNumber: data.hpNumber,
          orderNumber: data.orderNumber,
          option: data.option,
          time: data.time,
          orders: _orders,
        });
      });

      _tutorials.sort(function (a, b) {
        return new Date(a.time) - new Date(b.time);
      });

      this.tutorials = _tutorials;
      this.totalOrders = _tutorials.length;
      this.totalRevenue = _totalRevenue;
    },

    refreshList() {
      this.currentTutorial = null;
      this.currentIndex = -1;
    },

    setActiveTutorial(tutorial, index) {
      this.currentTutorial = tutorial;
      this.currentIndex = index;
    },

    removeAllTutorials() {
      TutorialDataService.deleteAll(this.$store.getters.user.data.uid)
        .then(() => {
          this.refreshList();
        })
        .catch((e) => {
          console.log(e);
        });
    },
    deleteTutorial(key) {
      TutorialDataService.delete(this.$store.getters.user.data.uid, key)
        .then(() => {
          this.$emit("refreshList");
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  mounted() {
    TutorialDataService.getAllForStore(this.$store.getters.user.data.uid).on(
      "value",
      this.onDataChange
    );
  },
  beforeDestroy() {
    TutorialDataService.getAllForStore(this.$store.getters.user.data.uid).off(
      "value",
      this.onDataChange
    );
  },
  computed: {
    ...mapGetters({
      user: "user",
    }),
  },
};
</script>
