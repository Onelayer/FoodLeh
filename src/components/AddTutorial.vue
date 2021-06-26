<template>
  <div class="container h-100">
    <div class="d-flex justify-content-center h-100">
      <div class="user_card">
        <div class="d-flex justify-content-center">
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
                    type="text"
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
                    type="number"
                    class="form-control"
                    id="cost"
                    required
                    v-model="tutorial.cost"
                    name="cost"
                    placeholder="Cost"
                  />
                </div>
                <upload
                  :myUrl="tutorial.url"
                  @getUrl="tutorial.url = $event"
                ></upload>
                <div>
                  <h5>Image Url:</h5>
                  {{ tutorial.url }}
                </div>
                <br />
                <button @click="saveTutorial" class="btn btn-success">
                  Submit
                </button>
              </div>

              <div v-else>
                <h4>You submitted successfully!</h4>
                <button class="btn btn-success" @click="newTutorial">
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
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
  height: 750px;
  width: 500px;
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
