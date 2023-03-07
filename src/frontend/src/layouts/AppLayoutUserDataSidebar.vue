<template>
  <div class="sidebar">
    <router-link class="layout__link" to="/orders"
      >История заказов
    </router-link>
    <router-link class="layout__link" to="/profile">Мои данные </router-link>
  </div>
</template>

<script>
export default {
  name: "AppLayoutMainSidebar",
};
</script>
