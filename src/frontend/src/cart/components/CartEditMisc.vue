<template>
  <li class="additional-list__item sheet">
    <p class="additional-list__description">
      <img
        :src="getMiscById(miscItem.miscId).image"
        width="39"
        height="60"
        :alt="getMiscById(miscItem.miscId).name"
      />
      <span>{{ getMiscById(miscItem.miscId).name }}</span>
    </p>

    <div class="additional-list__wrapper">
      <div class="counter additional-list__counter">
        <button
          type="button"
          class="counter__button counter__button--minus"
          @click="dropMisc"
          :disabled="miscItem.quantity == 0"
        >
          <span class="visually-hidden">Меньше</span>
        </button>
        <input
          type="text"
          name="counter"
          class="counter__input"
          :value="miscItem.quantity"
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
        <b>× {{ getMiscById(miscItem.miscId).price }} ₽</b>
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
    ...mapGetters("Cart", ["getMiscById"]),
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
      this.addMiscInOrder(this.miscItem.miscId);
    },
    dropMisc() {
      this.reduceMiscInOrder(this.miscItem.miscId);
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
