<template>
    <div>
        <h2>Dashboard</h2>
        <p>Add menu:</p>
        <add-tutorial></add-tutorial>
        <tutorials-list></tutorials-list>
        <button type="submit" class="btn btn-primary" @click = "logout()">Log out</button>
    </div>
</template>

<script>
    import AddTutorial from '../components/AddTutorial.vue';
    import TutorialsList from '../components/TutorialsList.vue';
    import firebase from 'firebase';

    export default {
        name: 'Dashboard',
        components: {
            AddTutorial,
            TutorialsList,
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

<style lang="scss" scoped></style>