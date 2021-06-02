import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import firebase from 'firebase';

Vue.use(VueRouter);

const routes = [
    {
        path: '/login',
        name: 'Home',
        component: Home,
    },
    {
        path: '/register',
        name: 'Register',
        component: () => import('../views/About.vue'),
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: () =>
            import('../components/TutorialsList.vue'),
        meta: {
            authRequired: true,
        },
    },
    {
        path: '/addorder',
        name: 'AddOrder',
        component: () => import('../components/AddTutorial.vue'),
    },
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
});

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.authRequired)) {
        if (firebase.auth().currentUser) {
            next();
        } else {
            alert('You must be logged in to see this page');
            next({
                path: '/',
            });
        }
    } else {
        next();
    }
});

export default router;
