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
            <form @submit.prevent>
              <div class="input-group mb-3">
                <div class="input-group-append">
                  <span class="input-group-text"
                    ><i class="fas fa-user"></i
                  ></span>
                </div>
                <input
                  type="text"
                  name=""
                  class="form-control input_user"
                  value=""
                  placeholder="email"
                  v-model="email"
                />
              </div>
              <div class="d-flex justify-content-center mt-3 login_container">
                <button
                  type="submit"
                  @click="sendEmail"
                  name="button"
                  class="btn login_btn"
                >
                  Reset password
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
  <section>
    <h1 class="text-center mb-4 font-bold text-lg">Forgot Password</h1>
    <article class="md:w-1/3 p-5 border rounded bg-gray-100 mx-auto">
      <transition name="fade">
        <p
          class="bg-red-100 p-5 my-5 border border-red-200 rounded text-red-500"
          v-if="error"
        >
          {{ error }}
        </p>
      </transition>
      <form @submit.prevent>
        <div class="mb-4">
          <label for="email" class="font-bold text-gray-700">Email</label>
          <input
            type="email"
            placeholder="joe@bloggs.com"
            v-model="email"
            id="email"
            class="bg-white px-4 py-2 border rounded w-full"
            required
          />
        </div>
        <div class="mb-4">
          <button
            type="submit"
            @click="sendEmail"
            class="
              bg-green-500
              px-4
              py-2
              rounded
              text-white
              border border-green-600
              transition
              duration-500
              ease-in-out
              hover:bg-green-600
            "
          >
            <transition name="fade" mode="out-in">
              <span v-if="!emailSending">Send</span>
              <span v-else>Sending...</span>
            </transition>
          </button>
        </div>
      </form>
    </article>
  </section>
</template> -->

<script>
import firebase from "firebase";
export default {
  data() {
    return {
      email: "",
      error: null,
      emailSending: false,
    };
  },
  methods: {
    sendEmail() {
      if (!this.email) {
        this.error = "Please type in a valid email address.";
        return;
      }
      this.error = null;
      this.emailSending = true;
      firebase
        .auth()
        .sendPasswordResetEmail(this.email)
        .then(() => {
          this.emailSending = false;
          alert(
            "Instructions on how to change your password has been sent to your email."
          );
          this.$router.push("/login");
        })
        .catch((error) => {
          this.emailSending = false;
          this.error = error.message;
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
