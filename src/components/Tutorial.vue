<template>
  <div v-if="currentTutorial" class="edit-form">
    <h4>Food Item</h4>
    <form>
      <div class="form-group">
        <label for="title">Title</label>
        <input
          type="text"
          class="form-control"
          id="title"
          v-model="currentTutorial.title"
        />
      </div>

      <div class="form-group">
        <label for="description">Description</label>
        <input
          type="text"
          class="form-control"
          id="description"
          v-model="currentTutorial.description"
        />
      </div>

      <div class="form-group">
        <label for="cost">Cost</label>
        <input
          type="text"
          class="form-control"
          id="cost"
          v-model="currentTutorial.cost"
        />
      </div>

      <div class="image">
        <img
          v-bind:src="currentTutorial.url"
          width="240"
          height="240"
          alt="Food Image"
        />
      </div>

      <div class="form-group">
        <label><strong>Status:</strong></label>
        {{ currentTutorial.published ? "Published" : "Pending" }}
      </div>
    </form>

    <button
      class="badge badge-primary mr-2"
      v-if="currentTutorial.published"
      @click="updatePublished(false)"
    >
      UnPublish
    </button>
    <button
      v-else
      class="badge badge-primary mr-2"
      @click="updatePublished(true)"
    >
      Publish
    </button>

    <button class="badge badge-danger mr-2" @click="deleteTutorial">
      Delete
    </button>

    <button type="submit" class="badge badge-success" @click="updateTutorial">
      Update
    </button>
    <p>{{ message }}</p>
  </div>

  <div v-else>
    <br />
    <p>Please click on a food item...</p>
  </div>
</template>

<script>
import ObtainStallMenu from "../services/ObtainStallMenu";

export default {
  name: "tutorial",
  props: ["tutorial"],
  data() {
    return {
      currentTutorial: null,
      message: "",
    };
  },
  watch: {
    tutorial: function (tutorial) {
      this.currentTutorial = { ...tutorial };
      this.message = "";
    },
  },
  methods: {
    updatePublished(status) {
      ObtainStallMenu.update(this.$store.getters.user.data.uid, this.currentTutorial.key, {
        published: status,
      })
        .then(() => {
          this.currentTutorial.published = status;
          this.message = "The status was updated successfully!";
        })
        .catch((e) => {
          console.log(e);
        });
    },

    updateTutorial() {
      const data = {
        title: this.currentTutorial.title,
        description: this.currentTutorial.description,
        cost: this.currentTutorial.cost,
        url: this.currentTutorial.url,
      };

      ObtainStallMenu.update(this.$store.getters.user.data.uid, this.currentTutorial.key, data)
        .then(() => {
          this.message = "The food item was updated successfully!";
        })
        .catch((e) => {
          console.log(e);
        });
    },

    deleteTutorial() {
      ObtainStallMenu.delete(this.$store.getters.user.data.uid, this.currentTutorial.key)
        .then(() => {
          this.$emit("refreshList");
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  mounted() {
    this.message = "";
    this.currentTutorial = { ...this.tutorial };
  },
};
</script>
