<template>
  <li class="additional-list__item sheet">
    <p class="additional-list__description">
      <img src="img/cola.svg" width="39" height="60" :alt="miscItem.name" />
      <span>{{ miscItem.name }}</span>
    </p>

    <div class="additional-list__wrapper">
      <div class="counter additional-list__counter">
        <button
          type="button"
          class="counter__button counter__button--minus"
          @click="dropMisc"
          :disabled="miscItem.count == 0"
        >
          <span class="visually-hidden">Меньше</span>
        </button>
        <input
          type="text"
          name="counter"
          class="counter__input"
          :value="miscItem.count"
        />
        <button
          type="button"
          class="counter__button counter__button--plus counter__button--orange"
          @click="addMisc"
        >
          <span class="visually-hidden">Больше</span>
        </button>
      </div>

      <div class="additional-list__price">
        <b>× {{ miscItem.price }} ₽</b>
      </div>
    </div>
  </li>
</template>
<script>
import { mapGetters, mapMutations } from "vuex";
export default {
  name: "CartEditMisc",
  props: {
    miscItem: { type: Object, required: true },
    miscInd: {
      type: Number,
      required: true,
    },
  },
  computed: {
    ...mapGetters("Builder", [
      "getSizeName",
      "getSauceName",
      "getIngredientsName",
    ]),
  },
  methods: {
    ...mapMutations("Cart", [
      "addMiscInOrder",
      "reduceMiscInOrder",
      "changePizza",
    ]),
    ...mapMutations("Builder", [
      "updateSauceId",
      "updateDoughId",
      "updateSizeId",
      "updateIngredients",
    ]),
    getDoughInfo(doughId) {
      if (doughId === 1) {
        return "на тонком тесте";
      } else if (doughId === 2) {
        return "на толстом тесте";
      }
    },
    addMisc() {
      this.addMiscInOrder(this.miscItem.id);
    },
    dropMisc() {
      this.reduceMiscInOrder(this.miscItem.id);
    },
    changePizzaOrder() {
      this.updateDoughId(this.pizzaOrder.doughId);
      this.updateSizeId(this.pizzaOrder.sizeId);
      this.updateSauceId(this.pizzaOrder.sauceId);
      this.updateIngredients(this.pizzaOrder.ingredients);
    },
  },
};
</script>
