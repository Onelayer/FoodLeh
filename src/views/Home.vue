<template>
    <div>
    <!-- Navigation-->
    <section id="navigation_bar">
        <Navigation></Navigation>
    </section>
    <!-- Masthead-->
    <section id="page-top">
        <Pagetop></Pagetop>
    </section>
    <!-- List of Stalls Section-->
    <section id="stalls">
        <Stalls></Stalls>
    </section>
    <!-- About Section-->
    <section id="about">
        <Mission></Mission>
    </section>
    <!-- Contact Section-->
    <section id="contact">
        <Contact></Contact>
    </section>
    <!-- Footer-->
    <Footer></Footer>
    </div>
</template>


<script>
import firebase from 'firebase';
import Stalls from '../components/Stalls.vue';
import Navigation from '../components/Navigation.vue';
import Pagetop from '../components/Pagetop.vue';
import Mission from '../components/Mission.vue';
import Contact from '../components/Contact.vue';
import Footer from '../components/Footer.vue';



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
        Stalls,
        Navigation,
        Pagetop,
        Mission,
        Contact,
        Footer
    },
};
</script>