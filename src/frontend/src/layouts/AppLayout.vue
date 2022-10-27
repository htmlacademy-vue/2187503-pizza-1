<template>
  <component :is="layout">
    <slot />
  </component>
</template>

<script>
const defaultLayout = "AppLayoutDefault";

export default {
  name: "AppLayout",
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
  computed: {
    layout() {
      const layout = this.$route.meta.layout || defaultLayout;
      return () => import(`@/layouts/${layout}.vue`);
    },
  },
};
</script>
