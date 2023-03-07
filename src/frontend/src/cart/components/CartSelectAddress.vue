<template>
  <label class="cart-form__select">
    <span class="cart-form__label">Получение заказа:</span>
    <select name="test" class="select">
      <option value="1">Заберу сам</option>
      <option value="2">Новый адрес</option>
      <option value="3">Дом</option>
    </select>
    <select name="test" class="select" v-model="howGetOrder">
      <option value="1">Заберу сам</option>
      <option value="2">Новый адрес</option>
      <option
        v-show="isAuthenticated"
        v-for="(address, index) in addresses"
        :value="(index + 3).toString()"
        :key="index"
      >
        {{ address.name }}
      </option>
    </select>
  </label>
</template>
<script>
import { mapGetters, mapMutations } from "vuex";
export default {
  name: "CartEditPizza",
  props: {
    pizzaOrder: { type: Object, required: true },
    pizzaOrderInd: {
      type: Number,
      required: true,
    },
  },
  computed: {
    ...mapGetters("Builder", [
      "getSizeName",
      "getSauceName",
      "getIngredientsName",
      "getPizzaPrice",
    ]),
  },
  methods: {
    ...mapMutations("Cart", [
      "addPizzaOrderCount",
      "recducePizzaOrderCount",
      "changePizza",
    ]),
    ...mapMutations("Builder", [
      "updateSauceId",
      "updateDoughId",
      "updateSizeId",
      "updateIngredients",
      "updatePizzaName",
      "updatePizzaOrder",
    ]),
    getDoughInfo(doughId) {
      if (doughId === 1) {
        return "на тонком тесте";
      } else if (doughId === 2) {
        return "на толстом тесте";
      }
    },
    addPizza() {
      this.addPizzaOrderCount(this.pizzaOrderInd);
    },
    dropPizza() {
      this.recducePizzaOrderCount(this.pizzaOrderInd);
    },
    changePizzaOrder() {
      this.updateDoughId(this.pizzaOrder.doughId);
      this.updateSizeId(this.pizzaOrder.sizeId);
      this.updateSauceId(this.pizzaOrder.sauceId);
      this.updateIngredients(this.pizzaOrder.ingredients);
      this.updatePizzaName(this.pizzaOrder.name);
      this.updatePizzaOrder(this.pizzaOrderInd);
    },
  },
};
</script>
