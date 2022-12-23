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
  computed: { ...mapState("Builder", ["userId"]) },
  methods: {
    ...mapMutations("Builder", ["clearPizzaData"]),
    clearPizza() {
      this.clearPizzaData();

      if (this.userId != null) {
        this.$router.push({ path: `/orders` });
      } else {
        this.$router.push({ path: `/` });
      }
    },
  },
};
</script>
