<template>
  <header class="header">
    <div class="header__logo">
      <router-link to="/">
        <img
          src="img/logo.svg"
          alt="V!U!E! Pizza logo"
          width="90"
          height="40"
        />
      </router-link>
    </div>
    <div class="header__cart">
      <router-link to="/cart"
        >{{ $calcPrice(order.pizzas, order.misc) }} ₽</router-link
      >
    </div>
    <div class="header__user">
      <router-link
        v-if="!isAuthenticated"
        key="is-not-auth"
        to="/login"
        class="header__login"
        ><span>Войти</span></router-link
      >
      <router-link v-else key="is-auth" to="/profile" class="header__login"
        ><a href="#">
          <picture>
            <img :src="user.avatar" :alt="user.name" width="32" height="32" />
          </picture>
          <span>{{ user.name }}</span>
        </a></router-link
      ><a
        v-if="isAuthenticated"
        href="#"
        class="header__logout"
        @click="$logout"
      >
        <span>Выйти</span>
      </a>
    </div>
  </header>
</template>
<script>
import { mapState } from "vuex";
import { logout } from "@/common/mixins";
import orderPrice from "@/common/mixins/orderPrice";
export default {
  name: "AppLayoutHeader",
  mixins: [logout, orderPrice],
  props: {
    auth: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    pushOnEnter() {
      return this.auth;
    },
  },
  computed: {
    ...mapState(["Auth"]),
    ...mapState("Cart", ["order"]),
    isAuthenticated() {
      return this.Auth.isAuthenticated;
    },
    user() {
      return this.Auth.user || {};
    },
  },
};
</script>
