<template>
  <div class="center" style="margin-left: 50px">
    <vs-table v-model="selected">
      <template #header>
        <vs-input v-model="search" border placeholder="Search" />
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
            @click="tutorials = $vs.sortData($event, tutorials, 'orderNumber')"
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
          <vs-th>
            <vs-checkbox
              :indeterminate="selected.length == tutorials.length"
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
            $vs.getSearch(tutorials, search),
            page,
            max
          )"
          :data="tr"
          :is-selected="!!selected.includes(tr)"
          not-click-selected
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
          <vs-td checkbox>
            <vs-checkbox :val="tr" v-model="selected" />
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
                      {{ rr.cost }}
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
          :length="$vs.getLength($vs.getSearch(tutorials, search), max)"
        />
      </template>
    </vs-table>
  </div>
</template>
<!-- <template>
  <div class="container h-100">
    <div class="d-flex justify-content-center h-100">
      <div class="user_card">
        <div class="d-flex justify-content-center">
          <div class="coms">
            <div class="list row">
              <div class="col-md-6">
                <h1>Order</h1>
                <ul class="list-group">
                  <li
                    class="list-group-item"
                    :class="{ active: index == currentIndex }"
                    v-for="(tutorial, index) in tutorials"
                    :key="index"
                    @click="setActiveTutorial(tutorial, index)"
                  >
                    {{ tutorial.title }}
                  </li>
                </ul>

                <button
                  class="m-3 btn btn-sm btn-danger"
                  @click="removeAllTutorials"
                >
                  Remove All
                </button>
              </div>
              <div class="col-md-6">
                <div v-if="currentTutorial">
                  <tutorial-details
                    :tutorial="currentTutorial"
                    @refreshList="refreshList"
                  />
                </div>
                <div v-else>
                  <br />
                  <p>Please click on a food order...</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template> -->

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
    };
  },
  methods: {
    onDataChange(items) {
      let _tutorials = [];

      items.forEach((item) => {
        let key = item.key;
        let data = item.val();

        let _orders = [];
        let orderss = data.cart;
        orderss.forEach((order) => {
          let data2 = order;
          _orders.push({
            title: data2.title,
            description: data2.description,
            cost: data2.cost,
            comment: data2.comment,
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
