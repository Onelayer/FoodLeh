<template>
  <div>
    <NavigationStalls></NavigationStalls>
    <router-view />
  </div>
</template>

<script>
import NavigationStalls from "../components/NavigationStalls";

export default {
  components: {
    NavigationStalls,
  },
  data: () => {
    return {};
  },
};
</script>
