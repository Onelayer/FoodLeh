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
              <div class="input-group mb-3">
                <div class="input-group-append">
                  <span class="input-group-text"
                    ><i class="fas fa-user"></i
                  ></span>
                </div>
                    <input v-model="stallName" placeholder="stallname" class="form-control input_pass"/>
              </div>
              <div class="input-group mb-2">
                <div class="input-group-append">
                  <span class="input-group-text"
                    ><i class="fas fa-key"></i
                  ></span>
                </div>
                <input
                  class="form-control input_pass"
                  value=""
                  placeholder="phone number"
                  v-model="hpNumber"
                />
              </div>
              <div class="d-flex justify-content-center mt-3 login_container">
                <button class="btn login_btn" @click.prevent="saveSettings">Set Profile</button> 
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ObtainStallSettings from '../services/ObtainStallSettings'

export default {
    data() {
        return {
            stallName: '',
            hpNumber: '',
            submitted: false,
        }
    },
    methods: {
        saveSettings() {

            let data = {
                StallName: this.stallName,
                MobileNumber: this.hpNumber,
            }

            ObtainStallSettings.update(data)
                .then(() => {
                console.log("Settings Updated Successfully");
                this.submitted = true;
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
            
            this.stallName = stallnamedb;
            this.hpNumber = mobilenumberdb;

        },

    },
    mounted() {
        ObtainStallSettings.getAllForStore().on("value", this.onDataChange);
    },
}

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
