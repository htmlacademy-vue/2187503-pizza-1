<template>
  <div id="app">
    <AppLayout :pizza-order="pizzaOrder" :auth="auth">
      <router-view />
    </AppLayout>
    <AppNotifications />
  </div>
</template>

<script>
import AppLayout from "@/layouts/AppLayout";
import AppNotifications from "@/common/components/AppNotifications";
import { setAuth } from "@/common/helpers";

export default {
  name: "App",
  components: {
    AppLayout,
    AppNotifications,
  },
  created() {
    window.onerror = function (msg, url, line, col, error) {
      console.error(error);
    };
    if (this.$jwt.getToken()) {
      setAuth(this.$store);
    }
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
