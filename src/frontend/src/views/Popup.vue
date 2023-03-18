<template>
  <div class="popup" @click="clearPizza">
    <a class="close">
      <span class="visually-hidden">Закрыть попап</span>
    </a>
    <div class="popup__title">
      <h2 class="title">Спасибо за заказ</h2>
    </div>
    <p>Мы начали готовить Ваш заказ, скоро привезём его вам ;</p>
    <div class="popup__button">
      <a class="button">Отлично, я жду!</a>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "Popup",
  computed: {
    ...mapState(["Auth"]),
    isAuthenticated() {
      return this.Auth.isAuthenticated;
    },
  },

  methods: {
    ...mapMutations("Builder", ["clearPizzaData"]),
    ...mapMutations("Cart", ["clearPizzaOrderData"]),
    clearPizza() {
      this.clearPizzaData();
      this.clearPizzaOrderData();
      if (this.isAuthenticated) {
        this.$router.push({ path: `/orders` });
      } else {
        this.$router.push({ path: `/` });
      }
    },
  },
};
</script>
