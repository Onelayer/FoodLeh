<template>
    <div>
        <form @submit.prevent="register">
            <h2>Register</h2>
            <label> Email: </label>
            <input
                type="email"
                placeholder="Email address..."
                v-model="email"
            />
            <label> Password: </label>
            <input
                type="password"
                placeholder="password..."
                v-model="password"
            />
            <button type="submit">Register</button>
        </form>
        <hr>
        <button class="btn btn-primary" @click="navigateToHome">Back to home</button>
        <button class="btn btn-primary" @click="navigateToLogin">Back to login</button>
        <br>
        <!-- <img src="../assets/logo.jpg" alt="FoodLeh logo"> -->
    </div>
</template>
<script>
import firebase from 'firebase';
export default {
    name: 'Register',
    data() {
        return {
            email: '',
            password: '',
        };
    },
    methods: {
        register() {
            firebase
                .auth()
                .createUserWithEmailAndPassword(this.email, this.password)
                .then(() => {
                    alert('Successfully registered! Please login.');
                    this.$router.push('/login');
                })
                .catch(error => {
                    alert(error.message);
                    this.$router.push('/login');
                });
        },
        navigateToHome() {
            this.$router.push('/'); //for button presses, similar to the router-link to= thingy
        },
        navigateToLogin() {
            this.$router.push('/login');
        }
    },
};
</script>