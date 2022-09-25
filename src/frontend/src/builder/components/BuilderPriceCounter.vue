<template>
  <div class="content__result">
    <p>Итого: {{ price }} ₽</p>
    <button type="button" class="button" disabled>Готовьте!</button>
  </div>
</template>

<script>
export default {
  name: "BuilderPriceCounter",
  props: {
    recipe: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {};
  },
  methods: {
    getDoughPrice() {
      var doughPrice = 0;
      if (this.recipe.dough === "light") {
        doughPrice = 300;
      } else if (this.recipe.dough === "large") {
        doughPrice = 300;
      }
      return doughPrice;
    },
    getSaucePrice() {
      var saucePrice = 0;
      if (this.recipe.sauce === "tomato") {
        saucePrice = 50;
      } else if (this.recipe.sauce === "creamy") {
        saucePrice = 50;
      }
      return saucePrice;
    },
    getSizeCoeff() {
      var diameterCoeff = 0;
      if (this.recipe.diameter === "small") {
        diameterCoeff = 1;
      } else if (this.recipe.diameter === "normal") {
        diameterCoeff = 2;
      } else if (this.recipe.diameter === "big") {
        diameterCoeff = 3;
      }
      return diameterCoeff;
    },
    calcPriceByIngredient(ingredientId) {
      var ingredientPrice = 0;
      if (ingredientId === 1) {
        ingredientPrice = 33;
      } else if (ingredientId === 2) {
        ingredientPrice = 42;
      } else if (ingredientId === 3) {
        ingredientPrice = 42;
      } else if (ingredientId === 4) {
        ingredientPrice = 42;
      } else if (ingredientId === 5) {
        ingredientPrice = 25;
      } else if (ingredientId === 6) {
        ingredientPrice = 42;
      } else if (ingredientId === 7) {
        ingredientPrice = 35;
      } else if (ingredientId === 8) {
        ingredientPrice = 21;
      } else if (ingredientId === 9) {
        ingredientPrice = 21;
      } else if (ingredientId === 10) {
        ingredientPrice = 25;
      } else if (ingredientId === 11) {
        ingredientPrice = 25;
      } else if (ingredientId === 12) {
        ingredientPrice = 50;
      } else if (ingredientId === 13) {
        ingredientPrice = 35;
      } else if (ingredientId === 14) {
        ingredientPrice = 35;
      } else if (ingredientId === 15) {
        ingredientPrice = 50;
      }
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
  },
  computed: {
    price: function () {
      return (
        //мультипликатор размера х (стоимость теста + соус + ингредиенты).
        this.getSizeCoeff() *
        (this.getDoughPrice() +
          this.getSaucePrice() +
          this.getIngredientsPrice())
      );
    },
  },
};
</script>
