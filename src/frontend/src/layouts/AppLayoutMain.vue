<template>
  <div class="app-layout-main">
    <AppLayoutHeader :pizzaOrder="pizzaOrder" />
    <div class="content">
      <router-view />
    </div>
  </div>
</template>

<script>
import AppLayoutHeader from "@/layouts/AppLayoutHeader";
export default {
  name: "AppLayoutMain",
  components: {
    AppLayoutHeader,
  },
  data() {
    return {
      pizzaOrder: { name: null, recipe: null, price: 0 },
    };
  },
  methods: {
    onCook(pizzaOrder) {
      this.pizzaOrder = pizzaOrder;
    },
  },
};
</script>
