<template>
  <li class="cart-list__item">
    <div class="product cart-list__product">
      <img
        src="img/product.svg"
        class="product__img"
        width="56"
        height="56"
        :alt="pizzaOrder.name"
      />
      <div class="product__text">
        <h2>{{ pizzaOrder.pizzaName }}</h2>
        <ul>
          <li>
            {{ getSizeName(pizzaOrder.sizeId) }},
            {{ getDoughInfo(pizzaOrder.doughId) }}
          </li>
          <li>Соус: {{ getSauceName(pizzaOrder.sauceId) }}</li>
          <li>Начинка: {{ getIngredientsName(pizzaOrder.ingredients) }}</li>
        </ul>
      </div>
    </div>

    <div class="counter cart-list__counter">
      <button
        type="button"
        class="counter__button counter__button--minus"
        @click="dropPizza"
        :disabled="pizzaOrder.quantity == 0"
      >
        <span class="visually-hidden">Меньше</span>
      </button>
      <input
        type="text"
        name="counter"
        class="counter__input"
        :value="pizzaOrder.quantity"
      />
      <button
        type="button"
        class="counter__button counter__button--plus counter__button--orange"
        @click="addPizza"
      >
        <span class="visually-hidden">Больше</span>
      </button>
    </div>

    <div class="cart-list__price">
      <b>{{ getPizzaPrice(pizzaOrder) * pizzaOrder.quantity }}</b>
    </div>

    <div class="cart-list__button">
      <router-link to="/"
        ><button
          type="button"
          class="cart-list__edit"
          @click="changePizzaOrder"
        >
          Изменить
        </button>
      </router-link>
    </div>
  </li>
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
