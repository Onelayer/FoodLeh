<template>
    <div>
        <h2>Dashboard</h2>
        <p>Add menu:</p>
        <add-tutorial></add-tutorial>
        <tutorials-list></tutorials-list>
    </div>
</template>

<script>
import AddTutorial from '../components/AddTutorial.vue';
import TutorialsList from '../components/TutorialsList.vue';

export default {
    name: 'Dashboard',
    components: {
        AddTutorial,
        TutorialsList,
    }   
};
</script>

<style lang="scss" scoped></style>