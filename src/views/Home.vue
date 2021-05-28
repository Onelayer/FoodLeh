<template>
    <div>
        <form @submit.prevent="login">
            <h2>Login</h2>
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
            <button type="submit">Login</button>
        </form>
        
        <br>
        <!-- <img src="../assets/logo.jpg" alt="FoodLeh logo"> -->
    </div>
</template>

<script>
    import firebase from 'firebase';
    export default {
        name: 'Home',
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
        },
    };
</script>