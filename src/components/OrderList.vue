<template>
  <div>
    <div class="center" style="margin-left: 50px">
      <br>
      <H3>Today's Orders</H3>
      <vs-table v-model="selected">
        <template #header>
          <vs-input v-model="search1" border placeholder="Search" />
        </template>
        <template #thead>
          <vs-tr>
            <vs-th
              sort
              @click="tutorials = $vs.sortData($event, tutorials, 'name')"
            >
              Name
            </vs-th>
            <vs-th
              sort
              @click="tutorials = $vs.sortData($event, tutorials, 'hpNumber')"
            >
              Phone Number
            </vs-th>
            <vs-th
              sort
              @click="
                tutorials = $vs.sortData($event, tutorials, 'orderNumber')
              "
            >
              Order Number
            </vs-th>
            <vs-th
              sort
              @click="tutorials = $vs.sortData($event, tutorials, 'option')"
            >
              Option
            </vs-th>
            <vs-th
              sort
              @click="tutorials = $vs.sortData($event, tutorials, 'time')"
            >
              Time
            </vs-th>
            <vs-th
              sort
              @click="tutorials = $vs.sortData($event, tutorials, 'date')"
            >
              Date
            </vs-th>
            <vs-th>
              <vs-checkbox
                :indeterminate="selected1.length == tutorials.length"
                v-model="allCheck"
                @change="selected = $vs.checkAll(selected, tutorials)"
              />
            </vs-th>
            <vs-th>
              <vs-button danger @click="removeAllTutorials"> X All </vs-button>
            </vs-th>
          </vs-tr>
        </template>
        <template #tbody>
          <!--<vs-tr :key="i" v-for="(tr, i) in tutorials">-->
          <vs-tr
            :key="i"
            v-for="(tr, i) in $vs.getPage(
              $vs.getSearch(tutorials, search1),
              page,
              max
            )"
            :data="tr"
            :is-selected="!!selected1.includes(tr)"
            not-click-selected1
            open-expand-only-td
          >
            <vs-td>
              {{ tr.name }}
            </vs-td>
            <vs-td>
              {{ tr.hpNumber }}
            </vs-td>
            <vs-td>
              {{ tr.orderNumber }}
            </vs-td>
            <vs-td>
              {{ tr.option }}
            </vs-td>
            <vs-td>
              {{ tr.time }}
            </vs-td>
            <vs-td>
              {{ tr.date }}
            </vs-td>
            <vs-td checkbox>
              <vs-checkbox :val="tr" v-model="selected1" />
            </vs-td>
            <vs-td>
              <vs-button danger @click="deleteTutorial(tr.key)"> x </vs-button>
            </vs-td>

            <template #expand>
              <div class="con-content">
                <vs-table>
                  <template #thead>
                    <vs-tr>
                      <vs-th> Order </vs-th>
                      <vs-th> Description </vs-th>
                      <vs-th> Comment </vs-th>
                      <vs-th> Cost </vs-th>
                      <vs-th> Quantity </vs-th>
                    </vs-tr>
                  </template>
                  <template #tbody>
                    <vs-tr :key="j" v-for="(rr, j) in tr.orders">
                      <vs-td>
                        {{ rr.title }}
                      </vs-td>
                      <vs-td>
                        {{ rr.description }}
                      </vs-td>
                      <vs-td>
                        {{ rr.comment }}
                      </vs-td>
                      <vs-td>
                        {{ rr.cost * rr.quantity }}
                      </vs-td>
                      <vs-td>
                        {{ rr.quantity }}
                      </vs-td>
                    </vs-tr>
                  </template>
                </vs-table>
              </div>
            </template>
          </vs-tr>
        </template>
        <template #footer>
          <vs-pagination
            v-model="page"
            :length="$vs.getLength($vs.getSearch(tutorials, search1), max)"
          />
        </template>
      </vs-table>
    </div>
    <br />
    <br />
    <br />
    <div class="center" style="margin-left: 50px">
      <H3>Past Orders</H3>
      <vs-table v-model="selected">
        <template #header>
          <vs-input v-model="search2" border placeholder="Search" />
        </template>
        <template #thead>
          <vs-tr>
            <vs-th sort @click="diff = $vs.sortData($event, diff, 'name')">
              Name
            </vs-th>
            <vs-th sort @click="diff = $vs.sortData($event, diff, 'hpNumber')">
              Phone Number
            </vs-th>
            <vs-th
              sort
              @click="diff = $vs.sortData($event, diff, 'orderNumber')"
            >
              Order Number
            </vs-th>
            <vs-th sort @click="diff = $vs.sortData($event, diff, 'option')">
              Option
            </vs-th>
            <vs-th sort @click="diff = $vs.sortData($event, diff, 'time')">
              Time
            </vs-th>
            <vs-th sort @click="diff = $vs.sortData($event, diff, 'date')">
              Date
            </vs-th>
            <vs-th>
              <vs-checkbox
                :indeterminate="selected2.length == diff.length"
                v-model="allCheck"
                @change="selected = $vs.checkAll(selected, diff)"
              />
            </vs-th>
            <vs-th>
              <vs-button danger @click="removeAllTutorials"> X All </vs-button>
            </vs-th>
          </vs-tr>
        </template>
        <template #tbody>
          <!--<vs-tr :key="i" v-for="(tr, i) in tutorials">-->
          <vs-tr
            :key="i"
            v-for="(dr, i) in $vs.getPage(
              $vs.getSearch(diff, search2),
              page,
              max
            )"
            :data="dr"
            :is-selected="!!selected2.includes(dr)"
            not-click-selected2
            open-expand-only-td
          >
            <vs-td>
              {{ dr.name }}
            </vs-td>
            <vs-td>
              {{ dr.hpNumber }}
            </vs-td>
            <vs-td>
              {{ dr.orderNumber }}
            </vs-td>
            <vs-td>
              {{ dr.option }}
            </vs-td>
            <vs-td>
              {{ dr.time }}
            </vs-td>
            <vs-td>
              {{ dr.date }}
            </vs-td>
            <vs-td checkbox>
              <vs-checkbox :val="dr" v-model="selected" />
            </vs-td>
            <vs-td>
              <vs-button danger @click="deleteTutorial(dr.key)"> x </vs-button>
            </vs-td>

            <template #expand>
              <div class="con-content">
                <vs-table>
                  <template #thead>
                    <vs-tr>
                      <vs-th> Order </vs-th>
                      <vs-th> Description </vs-th>
                      <vs-th> Comment </vs-th>
                      <vs-th> Cost </vs-th>
                      <vs-th> Quantity </vs-th>
                    </vs-tr>
                  </template>
                  <template #tbody>
                    <vs-tr :key="j" v-for="(dd, j) in dr.orders">
                      <vs-td>
                        {{ dd.title }}
                      </vs-td>
                      <vs-td>
                        {{ dd.description }}
                      </vs-td>
                      <vs-td>
                        {{ dd.comment }}
                      </vs-td>
                      <vs-td>
                        {{ dd.cost * dd.quantity }}
                      </vs-td>
                      <vs-td>
                        {{ dd.quantity }}
                      </vs-td>
                    </vs-tr>
                  </template>
                </vs-table>
              </div>
            </template>
          </vs-tr>
        </template>
        <template #footer>
          <vs-pagination
            v-model="page"
            :length="$vs.getLength($vs.getSearch(diff, search2), max)"
          />
        </template>
      </vs-table>
    </div>
  </div>
</template>


<script>
import TutorialDataService from "../services/ObtainOrder";
//import TutorialDetails from "./Order";
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
      search1: "",
      search2: "",
      allCheck: false,
      page: 1,
      max: 5,
      active: 0,
      selected1: [],
      selected2: [],
    };
  },
  methods: {
    onDataChange(items) {
      let _tutorials = [];
      let _diff = [];

      items.forEach((item) => {
        let key = item.key;
        let data = item.val();

        let _orders = [];
        let _diffOrders = [];
        let orderss = data.cart;
        if (data.date === this.currentDate()) {
          orderss.forEach((order) => {
            let data2 = order;
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
    currentDate() {
      //do i need date?
      const current = new Date();
      const date = `${current.getFullYear()}/${
        current.getMonth() + 1
      }/${current.getDate()}`;
      return date;
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
.coms {
}
/* "scoped" attribute limit the CSS to this component only */
.social-button {
  width: 75px;
  background: white;
  padding: 10px;
  border-radius: 100%;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
  outline: 0;
  border: 0;
}
.social-button:active {
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
}
.social-button img {
  width: 100%;
}

body,
html {
  margin: 0;
  padding: 0;
  background: #60a3bc !important;
}
.user_card {
  height: 500px;
  width: 600px;
  margin-top: 10px;
  background: white;
  justify-content: center;
  flex-direction: column;
  padding: 10px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  -webkit-box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2),
    0 6px 20px 0 rgba(0, 0, 0, 0.19);
  -moz-box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2),
    0 6px 20px 0 rgba(0, 0, 0, 0.19);
  border-radius: 5px;
}

.google_container {
  padding: 10px;
  text-align: center;
}

.brand_logo_container {
  position: absolute;
  height: 170px;
  width: 170px;
  top: 0px;
  border-radius: 50%;
  padding: 10px;
  text-align: center;
}
.brand_logo {
  height: 150px;
  width: 150px;
  border-radius: 50%;
}
.form_container {
  margin-top: 100px;
}
.login_btn {
  width: 100%;
  background: #c0392b !important;
  color: white !important;
}
.login_btn:focus {
  box-shadow: none !important;
  outline: 0px !important;
}
.login_container {
  padding: 0 2rem;
}
.input-group-text {
  background: #c0392b !important;
  color: white !important;
  border: 0 !important;
  border-radius: 0.25rem 0 0 0.25rem !important;
}
.input_user,
.input_pass:focus {
  box-shadow: none !important;
  outline: 0px !important;
}
.custom-checkbox .custom-control-input:checked ~ .custom-control-label::before {
  background-color: #c0392b !important;
}
</style>
