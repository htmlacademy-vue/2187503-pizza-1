<template>
  <div id="app">
    <AppLayout :pizzaOrder="pizzaOrder" :auth="auth">
      <router-view @onCook="onCook" />
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
  data() {
    return {
      pizzaOrder: { name: null, recipe: null, price: 0 },
      auth: false,
    };
  },
  computed: {},
  methods: {
    onCook(pizzaOrder) {
      this.pizzaOrder = pizzaOrder;
    },
  },
};
</script>

<style lang="scss">
@import "~@/assets/scss/app";
</style>
