<template>
  <div class="app-layout-main">
    <AppLayoutHeader :auth="auth" :pizza-order="pizzaOrder" />
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

    auth: {
      type: Boolean,
      required: true,
    },
  },
};
</script>
