<template>
  <div class="app-layout-main">
    <AppLayoutHeader :pizzaOrder="pizzaOrder" />
    <div class="content">
      <slot />
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
  props: {
    pizzaOrder: {
      type: Object,
      required: true,
    },
  },
};
</script>
