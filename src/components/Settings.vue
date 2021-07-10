<template>
  <div>
    <div class="container h-100">
      <div class="d-flex justify-content-center h-100">
        <div class="user_card">
          <div class="d-flex justify-content-center form_container">
            <div class="brand_logo_container">
              <img
                :src="this.url"
                class="brand_logo"
                alt="logo"
              />
            </div>
            <form @submit.prevent="register">
              <div class="center content-inputs">
                <vs-input
                  type="text"
                  value=""
                  v-model="stallName"
                  label-placeholder="Stall Name"
                />
              </div>
              <br />
              <div class="center content-inputs">
                <vs-input
                  type="text"
                  name=""
                  value=""
                  label-placeholder="Phone number"
                  v-model="hpNumber"
                >
                </vs-input>
              </div>
              <div>
                <br>
                Upload an image:
                <input type="file" @change="previewImage" accept="image/*" />
              </div>
              <button @click="onUpload">Upload</button>
              <div class="d-flex justify-content-center mt-3 login_container">
                <button class="btn login_btn" @click.prevent="saveSettings">
                  Update Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ObtainStallSettings from "../services/ObtainStallSettings";
import Upload from "./Upload.vue";
import firebase from "firebase";
import store from '../store';
import { mapGetters } from 'vuex';

export default {
  components: { Upload },
  props: {
    url: {
      type: String,
    },
  },
  data() {
    return {
      stallName: "",
      hpNumber: "",
      url: "",
      submitted: false,
      imageData: null,
      picture: null,
      uploadValue: 0,
    };
  },
  methods: {
    saveSettings() {
      let data = {
        StallName: this.stallName,
        MobileNumber: this.hpNumber,
        url: this.url,
      };

      ObtainStallSettings.set(this.$store.getters.user.data.uid, data)
        .then(() => {
          console.log("Settings Updated Successfully");
          this.submitted = true;
          alert("Successfully updated your profile");
        })
        .catch((e) => {
          console.log(e);
        });
    },
    onDataChange(snapshot) {
      // this.stallName = items.val().stallName;
      // this.hpNumber = items.val().hpNumber;
      const dataSettingsDB = snapshot.val();

      let stallnamedb = dataSettingsDB.StallName;
      let mobilenumberdb = dataSettingsDB.MobileNumber;
      let urldb = dataSettingsDB.url;

      this.stallName = stallnamedb;
      this.hpNumber = mobilenumberdb;
      this.url = url;
    },
    previewImage(event) {
      this.uploadValue = 0;
      this.picture = null;
      this.imageData = event.target.files[0];
    },

    onUpload() {
      this.picture = null;
      const storageRef = firebase
        .storage()
        .ref(`${this.imageData.name}`)
        .put(this.imageData);
      storageRef.on(
        `state_changed`,
        (snapshot) => {
          this.uploadValue =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },
        (error) => {
          console.log(error.message);
        },
        () => {
          this.uploadValue = 100;
          storageRef.snapshot.ref.getDownloadURL().then((url) => {
            this.picture = url;
            this.url = url;
            this.$emit("getUrl", this.url);
          });
        }
      );
    },
  },
  computed: {
    getStore() {
      return this.$store.getters.user.data.uid;
    },
    ...mapGetters({
      user: 'user',
    })
  },
  mounted() {

    console.log(this.$store.getters.user.data.uid, 'attemping to mount');
    ObtainStallSettings.getAllForStore(this.$store.getters.user.data.uid).on("value", this.onDataChange);
    console.log('mounted settings')
  },
  beforeDestroy() {
    ObtainStallSettings.getAllForStore(this.$store.getters.user.data.uid).off("value", this.onDataChange);
  },
};
</script>

<style scoped>
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
  height: 100%;
  background: #60a3bc !important;
}
.user_card {
  height: 550px;
  width: 400px;
  margin-top: 80px;
  margin-bottom: auto;
  background: white;
  position: relative;
  display: flex;
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
  top: 10px;
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
