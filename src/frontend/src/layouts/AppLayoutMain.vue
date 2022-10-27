<template>
  <div class="app-layout-main">
    <header class="header">
      <div class="header__logo">
        <a href="index.html" class="logo">
          <img
            src="img/logo.svg"
            alt="V!U!E! Pizza logo"
            width="90"
            height="40"
          />
        </a>
      </div>
      <div class="header__cart">
        <router-link to="/cart">{{ pizzaOrder.price }} ₽</router-link>
      </div>
      <div class="header__user">
        <router-link to="/login" class="header__login"
          ><span>Войти</span></router-link
        >
      </div>
    </header>
    <div class="content">
      <IndexHome @onCook="onCook" />
    </div>
  </div>
</template>

<script>
import IndexHome from "@/views/Index";

export default {
  name: "AppLayoutMain",
  components: {
    IndexHome,
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
