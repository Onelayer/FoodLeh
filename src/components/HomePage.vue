<template>
  <div class="container-homepage">
    <vs-card>
      <template #title>
        <h3>Total Customers</h3>
      </template>
      <template #img>
        <img src="..\assets\customers.png" alt="" />
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
      <template #img>
        <img src="..\assets\revenue.png" alt="" />
      </template>
      <template #text>
        <p>
          {{ totalRevenue }}
        </p>
      </template>
    </vs-card>
    <vs-card>
      <template #title>
        <h3>Today's Customers</h3>
      </template>
      <template #img>
        <img src="..\assets\customers2.png" alt="" />
      </template>
      <template #text>
        <p>
          {{ todayOrders }}
        </p>
      </template>
    </vs-card>
    <vs-card>
      <template #title>
        <h3>Today's Revenue</h3>
      </template>
      <template #img>
        <img src="..\assets\revenue2.png" alt="" />
      </template>
      <template #text>
        <p>
          {{ todayRevenue }}
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
      diff: [],
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
      todayRevenue: 0,
      todayOrders: 0,
    };
  },
  methods: {
    // onDataChange(items) {
    //   let _tutorials = [];
    //   let _totalRevenue = 0;
    //   let menuItems = {};

    //   items.forEach((item) => {
    //     let key = item.key;
    //     let data = item.val();

    //     let _orders = [];
    //     let orderss = data.cart;
    //     orderss.forEach((order) => {
    //       let data2 = order;
    //       _totalRevenue += parseInt(data2.cost * data2.quantity);
    //       _orders.push({
    //         title: data2.title,
    //         description: data2.description,
    //         cost: data2.cost,
    //         comment: data2.comment,
    //         quantity: data2.quantity,
    //       });
    //     });

    //     _tutorials.push({
    //       key: key,
    //       name: data.name,
    //       hpNumber: data.hpNumber,
    //       orderNumber: data.orderNumber,
    //       option: data.option,
    //       time: data.time,
    //       orders: _orders,
    //     });
    //   });

    //   _tutorials.sort(function (a, b) {
    //     return new Date(a.time) - new Date(b.time);
    //   });

    //   this.tutorials = _tutorials;
    //   this.totalOrders = _tutorials.length;
    //   this.totalRevenue = _totalRevenue;
    // },

    onDataChange(items) {
      let _tutorials = [];
      let _diff = [];
      let _totalRevenue = 0;
      let _todayRevenue = 0;
      let menuItems = {};

      items.forEach((item) => {
        let key = item.key;
        let data = item.val();

        let _orders = [];
        let _diffOrders = [];
        let orderss = data.cart;
        if (data.date === this.currentDate()) {
          orderss.forEach((order) => {
            let data2 = order;
            _totalRevenue += parseInt(data2.cost * data2.quantity);
            _todayRevenue += parseInt(data2.cost * data2.quantity);
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
            date: data.date,
            orders: _orders,
          });
        } else {
          orderss.forEach((order) => {
            let data2 = order;
            _totalRevenue += parseInt(data2.cost * data2.quantity);
            _diffOrders.push({
              title: data2.title,
              description: data2.description,
              cost: data2.cost,
              comment: data2.comment,
              quantity: data2.quantity,
            });
          });

          _diff.push({
            key: key,
            name: data.name,
            hpNumber: data.hpNumber,
            orderNumber: data.orderNumber,
            option: data.option,
            time: data.time,
            date: data.date,
            orders: _diffOrders,
          });
        }
      });

      _tutorials.sort(function (a, b) {
        return new Date(a.time) - new Date(b.time);
      });

      _diff.sort(function (a, b) {
        return new Date(a.time) - new Date(b.time);
      });

      _diff.sort(function (a, b) {
        return new Date(a.date) - new Date(b.date);
      });

      this.tutorials = _tutorials;
      this.diff = _diff;
      this.totalOrders = _tutorials.length;
      this.totalRevenue = _totalRevenue;
      this.todayOrders = _diff.length;
      this.todayRevenue = _todayRevenue;
    },

    refreshList() {
      this.currentTutorial = null;
      this.currentIndex = -1;
    },

    setActiveTutorial(tutorial, index) {
      this.currentTutorial = tutorial;
      this.currentIndex = index;
    },

    currentDate() {
      //do i need date?
      const current = new Date();
      const date = `${current.getFullYear()}/${
        current.getMonth() + 1
      }/${current.getDate()}`;
      return date;
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

<style scoped>
.container-homepage {
  display: flex;
  flex-direction: row;
  margin-left: 50px;
  margin-top: 20px;
}
</style>
