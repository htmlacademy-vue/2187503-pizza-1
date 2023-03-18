<template>
  <div class="layout__sidebar sidebar">
    <router-link class="logo layout__logo" to="/">
      <img
        src="../img/logo.svg"
        alt="V!U!E! Pizza logo"
        width="90"
        height="40"
      />
    </router-link>

    <router-link class="layout__link" to="/orders"
      >История заказов
    </router-link>
    <router-link class="layout__link" to="/profile">Мои данные </router-link>
  </div>
</template>

<script>
export default {
  name: "AppLayoutUserDataSidebar",
};
</script>
