<template>
  <div>
    <div class="container h-100">
      <div class="d-flex justify-content-center h-100">
        <div class="user_card">
          <div class="d-flex justify-content-center">
            <div class="brand_logo_container">
              <img
                src="../assets/logo.jpg"
                class="brand_logo"
                alt="FoodLeh logo"
              />
            </div>
          </div>
          <div class="d-flex justify-content-center form_container">
            <form @submit.prevent="register">
              <div class="center content-inputs">
                <vs-input
                  type="text"
                  name=""
                  value=""
                  label-placeholder="Email" 
                  v-model="email"
                >
                </vs-input>
              </div>
              <br>
              <div class="center content-inputs">
                <vs-input
                  type="password"
                  v-model="password"
                  label-placeholder="Password"
                  :progress="getProgress"
                  :visiblePassword="hasVisiblePassword"
                  icon-after
                  @click-icon="hasVisiblePassword = !hasVisiblePassword"
                >
                  <template #icon>
                    <i v-if="!hasVisiblePassword" class="bx bx-show-alt"></i>
                    <i v-else class="bx bx-hide"></i>
                  </template>

                  <template v-if="getProgress >= 100" #message-success>
                    Secure password
                  </template>
                </vs-input>
              </div>
              <div class="d-flex justify-content-center mt-3 login_container">
                <button type="submit" name="button" class="btn login_btn">
                  Register
                </button>
              </div>
            </form>
          </div>
          <br />
          <br />
          <br />
          <div class="google_container">
            <button class="btn btn-primary" @click="navigateToHome">
              Back to home
            </button>
            <button class="btn btn-primary" @click="navigateToLogin">
              Back to login
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<!-- <template>
  <div>
    <form @submit.prevent="register">
      <h2>Register</h2>
      <label> Email: </label>
      <input type="email" placeholder="Email address..." v-model="email" />
      <label> Password: </label>
      <input type="password" placeholder="password..." v-model="password" />
      <button type="submit">Register</button>
    </form>
    <hr />
    <button class="btn btn-primary" @click="navigateToHome">
      Back to home
    </button>
    <button class="btn btn-primary" @click="navigateToLogin">
      Back to login
    </button>
    <br />
     <img src="../assets/logo.jpg" alt="FoodLeh logo"> 
  </div>
</template> -->

<script>
import firebase from "firebase";
export default {
  name: "Register",
  data() {
    return {
      email: "",
      password: "",
      hasVisiblePassword: false,
    };
  },
  computed: {
    getProgress() {
      let progress = 0;

      // at least one number

      if (/\d/.test(this.password)) {
        progress += 20;
      }

      // at least one capital letter

      if (/(.*[A-Z].*)/.test(this.password)) {
        progress += 20;
      }

      // at menons a lowercase

      if (/(.*[a-z].*)/.test(this.password)) {
        progress += 20;
      }

      // more than 5 digits

      if (this.password.length >= 6) {
        progress += 20;
      }

      // at least one special character

      if (/[^A-Za-z0-9]/.test(this.password)) {
        progress += 20;
      }

      return progress;
    },
  },
  methods: {
    register() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(() => {
          alert("Successfully registered! Please login.");
          this.$router.push("/login");
        })
        .catch((error) => {
          alert(error.message);
          this.$router.push("/login");
        });
    },
    navigateToHome() {
      this.$router.push("/"); //for button presses, similar to the router-link to= thingy
    },
    navigateToLogin() {
      this.$router.push("/login");
    },
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
