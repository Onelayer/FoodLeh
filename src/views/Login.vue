<template>
    <div class="container">
        <div class="row">
            <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
                <form @submit.prevent="login" class="">
                    <h2>Login</h2>
                        <label> Email: </label>
                        <input
                            type="email"
                            placeholder="Email Address"
                            v-model="email"
                        />
                        <label> Password: </label>
                        <input
                            type="password"
                            placeholder="Password"
                            v-model="password"
                        />
                    <button class="btn btn-primary" type="submit">Login</button>
                </form>
                <div>
                    <button class="btn" @click="navigateToRegister">Register Now</button>
                    <button class="btn btn-secondary">Login with Google</button>
                    <!-- Future Implementation of Google login API -->

                </div>
                <hr>
                <button class="btn btn-primary" @click="navigateToHome">Back to home</button>

                
                <br>
                <!-- <img src="../assets/logo.jpg" alt="FoodLeh logo"> -->
            </div>
        </div>
    </div>
</template>

<script>
    import firebase from 'firebase';
    export default {
        data() {
            return {
                email: '',
                password: '',
            };
        },
        methods: {
            login() {
                firebase
                    .auth()
                    .signInWithEmailAndPassword(this.email, this.password)
                    .then(() => {
                        alert('Successfully logged in');
                        this.$router.push('/dashboard');
                    })
                    .catch(error => {
                        alert(error.message);
                    });
            },
            navigateToHome() {
            this.$router.push('/'); //for button presses, similar to the router-link to= thingy

            },
            navigateToRegister() {
            this.$router.push('/register'); //for button presses, similar to the router-link to= thingy

            },
        },
    };
</script>