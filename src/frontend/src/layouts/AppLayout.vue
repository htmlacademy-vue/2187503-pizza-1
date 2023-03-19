<template>
  <transition name="slide" mode="out-in">
    <component :is="layout" :auth="auth" :pizza-order="pizzaOrder">
      <slot />
    </component>
  </transition>
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
  computed: {
    layout() {
      const layout = this.$route.meta.layout || defaultLayout;
      return () => import(`@/layouts/${layout}.vue`);
    },
  },
};
</script>
<style>
.slide-enter-active {
  transition: all 0.4s;
}
.slide-enter {
  opacity: 0;
  margin-left: 90px;
}
.slide-leave-active {
  transition: all 0.4s;
  opacity: 0;
  margin-left: -100px;
}
</style>
