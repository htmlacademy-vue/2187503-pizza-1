<template>
  <component
    :is="layout"
    :auth="auth"
    :pizzaOrder="pizzaOrder"
    @onCook="onCook"
  >
    <slot />
  </component>
</template>

<script>
const defaultLayout = "AppLayoutDefault";

export default {
  name: "AppLayout",
  props: {
    pizzaOrder: {
      type: Object,
      required: true,
    },
    auth: {
      type: Boolean,
      required: true,
    },
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
