<template>
  <div>
    <section class="page-section">
      <div class="container">
        <!-- Contact Section Heading-->
        <h2
          class="
            page-section-heading
            text-center text-uppercase text-secondary
            mb-0
          "
        >
          Contact Me
        </h2>
        <!-- Icon Divider-->
        <div class="divider-custom">
          <div class="divider-custom-line"></div>
          <!-- <div class="divider-custom-icon"><i class="fas fa-star"></i></div>
                    <div class="divider-custom-line"></div> -->
        </div>

        <!-- Contact Section Form-->
        <div class="row justify-content-center">
          <div class="col-lg-8 col-xl-7">
            <form @submit.prevent="submitForm">
              <div class="mt-3">

                <select 
                  class="form-select mb-3"
                  aria-label=".form-select-sm example"
                  v-model="storeSelected"
                  required
                >
                  <option value="default">Choose a stall...</option>

                  <option
                    v-for="(stall,idx) in stallList"
                    :value="stall.key"
                    :key="idx"
                  >{{stall.title}}</option>
                </select>

              </div>
              <div class="form-floating">
                <input
                  class="form-control"
                  id="inputName"
                  type="text"
                  placeholder="Enter your name..."
                  v-model="name"
                  required
                />
                <label for="inputName">Name</label>
              </div>
              <div class="form-floating">
                <input
                  class="form-control"
                  id="inputEmail"
                  type="email"
                  placeholder="Enter your email..."
                  v-model="email"
                  required
                />
                <label for="inputEmail">Email address</label>
              </div>
              <div class="form-floating">
                <input
                  class="form-control"
                  id="inputPhone"
                  type="tel"
                  placeholder="Enter your phone number..."
                  v-model="phone"
                  required
                />
                <label for="inputPhone">Phone Number</label>
              </div>
              <div class="form-floating">
                <textarea
                  class="form-control"
                  id="inputMessage"
                  placeholder="Enter your message here..."
                  style="height: 12rem"
                  v-model="message"
                  required
                ></textarea>
                <label for="inputMessage">Message</label>
              </div>
              <br />
              <p v-show="error">{{ error }}</p>
              <button class="btn btn-primary btn-xl" type="submit">Send</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import ObtainStalls from '../services/ObtainStalls'
import OrderDataService from '../services/OrderDataService'

export default {
  data() {
    return {
      name:'',
      email: '',
      phone: '',
      storeSelected: 'default',
      message: '',
      stallList: [],
      error: ''
    }
  },
  methods: {
    submitForm() {
      let data = {
        name: this.name,
        email: this.email,
        phone: this.phone,
        message: this.message,
      }
      if (this.storeSelected !== 'default'){
        console.log(this.storeSelected, 'Store UID')
        OrderDataService.createFeedback(this.storeSelected, data)
          .then(() => {
            this.error = ''
            this.name = '';
            this.email = '';
            this.phone = '';
            this.message = '';
            this.storeSelected = 'default';
            // const Toast = this.$swal.fire({
            //   toast: true,
            //   position: 'top-end',
            //   timer: 3000,
            //   showConfirmButton: false,
            // });
            // Toast.$fire({
            //   icon: 'success',
            //   title: 'Submitted',
            // });
            this.$swal.fire({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
              icon: 'success',
              title: 'Submitted'
            })
          });
      } else {
        this.error = 'Please select a store.'
      }
    },
    onDataChange(items) {
      let _stallList = [];

      items.forEach((item) => {
        let data = item.val();
        console.log(data,'Checking stall retrieval');
        console.log(item.key);

        _stallList.push({
          key: item.key,
          title: data.Settings.StallName,
        });
      });

      this.stallList = _stallList;
    },
  },
  mounted() {
    ObtainStalls.getAll().on("value", this.onDataChange);
  }
}
</script>

