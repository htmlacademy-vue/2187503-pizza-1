<template>
  <div id="app">
    <AppLayout :pizzaOrder="pizzaOrder" :auth="auth">
      <router-view />
    </AppLayout>
  </div>
</template>

<script>
import AppLayout from "@/layouts/AppLayout";

export default {
  name: "App",
  components: {
    AppLayout,
  },
  created() {
    // Note: fetch initial data
    this.$store.dispatch("init");
  },
  data() {
    return {
      pizzaOrder: { name: null, recipe: null, price: 0 },
      auth: false,
    };
  },
  computed: {},
};
</script>

<style lang="scss">
@import "~@/assets/scss/app";
</style>
