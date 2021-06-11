<template>
    <div id="app">
        <router-view></router-view>
    </div>

</template>

<script>
import firebase from 'firebase';
import Home from './views/Home.vue'
// import Stalls from './components/Stalls.vue';
// import Navigation from './components/Navigation.vue';
// import Pagetop from './components/Pagetop.vue';
// import Mission from './components/Mission.vue';
// import Contact from './components/Contact.vue';
// import Footer from './components/Footer.vue';



export default {
    name: 'App',
    data: () => {
        return {
            links: [
                {
                    id: 0,
                    text: 'Login',
                    page: '/login',
                },
                            {
                    id: 1,
                    text: 'Register',
                    page: '/register',
                },
            ]
        }
    },
    components:{
        Home,
        // Stalls,
        // Navigation,
        // Pagetop,
        // Mission,
        // Contact,
        // Footer
    },
    methods: {
        logout() {
            firebase
                .auth()
                .signOut()
                .then(() => {
                    alert('Successfully logged out');
                    this.$router.push('/login');
                })
                .catch(error => {
                    alert(error.message);
                    this.$router.push('/login');
                });
        },
    },
};
</script>

<style>

</style>