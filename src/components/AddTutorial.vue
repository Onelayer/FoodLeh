<template>
  <div class="coms">
    <H1>Add Food to Menu</H1>
    <div class="submit-form">
      <div v-if="!submitted">
        <div class="form-group">
          <input
            type="text"
            class="form-control"
            id="title"
            required
            v-model="tutorial.title"
            name="title"
            placeholder="Title"
          />
        </div>

        <div class="form-group">
          <input
            class="form-control"
            id="description"
            required
            v-model="tutorial.description"
            name="description"
            placeholder="Description"
          />
        </div>

        <div class="form-group">
          <input
            class="form-control"
            id="cost"
            required
            v-model="tutorial.cost"
            name="cost"
            placeholder="Cost"
          />
        </div>
        <upload :myUrl="tutorial.url" @getUrl="tutorial.url = $event"></upload>
        <div>
          <h5>Image Url:</h5>
          {{ tutorial.url }}
        </div>
        <br />
        <button @click="saveTutorial" class="btn btn-success">Submit</button>
      </div>

      <div v-else>
        <h4>You submitted successfully!</h4>
        <button class="btn btn-success" @click="newTutorial">Add</button>
      </div>
    </div>
  </div>
</template>

<script>
import TutorialDataService from "../services/TutorialDataService";
import Upload from "./Upload.vue";

export default {
  components: { Upload },
  name: "add-tutorial",
  data() {
    return {
      tutorial: {
        title: "",
        description: "",
        cost: "",
        url: "",
        published: false,
      },
      submitted: false,
    };
  },
  methods: {
    saveTutorial() {
      var data = {
        title: this.tutorial.title,
        description: this.tutorial.description,
        cost: this.tutorial.cost,
        url: this.tutorial.url,
        published: false,
      };

      TutorialDataService.create(data)
        .then(() => {
          console.log("Created new item successfully!");
          this.submitted = true;
        })
        .catch((e) => {
          console.log(e);
        });
    },

    newTutorial() {
      this.submitted = false;
      this.tutorial = {
        title: "",
        description: "",
        cost: "",
        url: "",
        published: false,
      };
    },
    getUrl() {
      this.url = "fornow";
    },
  },
};
</script>

<style scoped>
.coms {
  padding-top: 50px;
  padding-left: 70px;
}
</style>
