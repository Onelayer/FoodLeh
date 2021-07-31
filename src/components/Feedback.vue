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
            @click="tutorials = $vs.sortData($event, tutorials, 'email')"
          >
            Email
          </vs-th>
          <vs-th>
            <vs-checkbox
              :indeterminate="selected.length == tutorials.length"
              v-model="allCheck"
              @change="selected = $vs.checkAll(selected, tutorials)"
            />
          </vs-th>
          <vs-th>
            <vs-button danger @click="removeAllTutorials">
              X All
            </vs-button>
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
            {{ tr.email }}
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
                    <vs-th> Feedback </vs-th>
                  </vs-tr>
                </template>
                <template #tbody>
                    <vs-td>
                      {{ tr.message }}
                    </vs-td>
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

<script>
import TutorialDataService from "../services/FeedbackService";
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

        _tutorials.push({
          key: key,
          name: data.name,
          hpNumber: data.phone,
          email: data.email,
          message: data.message,
        });
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
    TutorialDataService.getAllForFeedback(this.$store.getters.user.data.uid).on(
      "value",
      this.onDataChange
    );
  },
  beforeDestroy() {
    TutorialDataService.getAllForFeedback(this.$store.getters.user.data.uid).off(
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