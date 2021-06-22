<template>
  <div class="coms">
    <H2>Add Food to Menu</H2>
    <div class="submit-form">
      <div v-if="!submitted">
        <div class="form-group">
          <label for="title">Title</label>
          <input
            type="text"
            class="form-control"
            id="title"
            required
            v-model="tutorial.title"
            name="title"
          />
        </div>

        <div class="form-group">
          <label for="description">Description</label>
          <input
            class="form-control"
            id="description"
            required
            v-model="tutorial.description"
            name="description"
          />
        </div>

        <div class="form-group">
          <label for="cost">Cost</label>
          <input
            class="form-control"
            id="cost"
            required
            v-model="tutorial.cost"
            name="cost"
          />
        </div>

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

export default {
  name: "add-tutorial",
  data() {
    return {
      tutorial: {
        title: "",
        description: "",
        cost: "",
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
        published: false,
      };
    },
  },
};
</script>

<style scoped>
.coms {
  position: fixed;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
