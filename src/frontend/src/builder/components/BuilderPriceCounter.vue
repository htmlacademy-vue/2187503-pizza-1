<template>
  <div class="content__result">
    <p>Итого: {{ price }} ₽</p>
    <button
      type="button"
      class="button"
      :disabled="buttonCookDisabled"
      @click="onCook()"
    >
      Готовьте!
    </button>
  </div>
</template>

<script>
import { mapState } from "vuex";
import doughStatuses from "@/common/enums/doughStatuses";
export default {
  name: "BuilderPriceCounter",
  props: {
    recipe: {
      type: Object,
      required: true,
    },
    pizzaName: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      doughStatuses,
      pizzaOrder: { name: null, recipe: null, price: 0 },
    };
  },
  methods: {
    getDoughPrice() {
      var doughPrice = 0;
      doughPrice = this.pizza.dough.find((el) => el.id === this.doughId).price;
      return doughPrice;
    },
    getSaucePrice() {
      var saucePrice = 0;
      saucePrice = this.pizza.sauces.find(
        (el) => el.id === this.recipe.sauceId
      ).price;
      return saucePrice;
    },
    getSizeCoeff() {
      var multiplier = 0;

      multiplier = this.pizza.sizes.find(
        (el) => el.id === this.recipe.sizeId
      ).multiplier;

      return multiplier;
    },
    calcPriceByIngredient(ingredientId) {
      var ingredientPrice = 0;
      ingredientPrice = this.pizza.ingredients.find(
        (el) => el.id === ingredientId
      ).price;
      return ingredientPrice;
    },

    getIngredientsPrice() {
      var ingredientPrice = 0;
      for (var i = 0; i < this.recipe.ingredients.length; i = i + 1) {
        ingredientPrice =
          ingredientPrice +
          this.calcPriceByIngredient(this.recipe.ingredients[i].ingredientId) *
            this.recipe.ingredients[i].itemCount;
      }
      return ingredientPrice;
    },
    onCook() {
      if (this.pizzaName == null) {
        alert("Название пиццы обязательно для заполнения");
      } else {
        this.pizzaOrder.name = this.pizzaName;
        this.pizzaOrder.recipe = this.recipe;
        this.pizzaOrder.price = this.price;
        this.$emit("onCook", this.pizzaOrder);
      }
    },
  },
  computed: {
    ...mapState("Builder", ["pizza", "doughId"]),
    price: function () {
      return (
        //мультипликатор размера х (стоимость теста + соус + ингредиенты).
        this.getSizeCoeff() *
        (this.getDoughPrice() +
          this.getSaucePrice() +
          this.getIngredientsPrice())
      );
    },
    buttonCookDisabled: function () {
      return (
        this.getIngredientsPrice() === 0 ||
        this.pizzaName === null ||
        this.pizzaName === ""
      );
    },
  },
};
</script>
