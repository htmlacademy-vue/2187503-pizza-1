<template>
  <AppDrop @drop="moveIngredient">
    <div class="content__pizza">
      <label class="input">
        <span class="visually-hidden">Название пиццы</span>
        <input
          type="text"
          name="pizza_name"
          placeholder="Введите название пиццы"
          v-model="pizzaName"
          required
        />
      </label>

      <div class="content__constructor">
        <div class="pizza" :class="pizzaFoundation">
          <div class="pizza__wrapper">
            <div v-for="item in recipe.ingredients" :key="item.id">
              <div
                class="pizza__filling"
                :class="calcIngredient(item, 1)"
              ></div>
              <div
                class="pizza__filling"
                :class="calcIngredient(item, 2)"
              ></div>
              <div
                class="pizza__filling"
                :class="calcIngredient(item, 3)"
              ></div>
            </div>
          </div>
        </div>
      </div>

      <BuilderPriceCounter
        :recipe="recipe"
        :pizzaName="pizzaName"
        @onCook="onCook"
      />
    </div>
  </AppDrop>
</template>

<script>
import BuilderPriceCounter from "@/builder/components/BuilderPriceCounter";
import pizza from "@/static/pizza.json";
import doughStatuses from "@/common/enums/doughStatuses";
import sauceStatuses from "@/common/enums/sauceStatuses";
import ingredientStatuses from "@/common/enums/ingredientStatuses";
import AppDrop from "@/common/components/AppDrop";
export default {
  name: "BuilderPizzaView",
  components: {
    BuilderPriceCounter,
    AppDrop,
  },
  props: {
    recipe: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      pizza,
      pizzaName: "",
      doughStatuses,
      sauceStatuses,
      ingredientStatuses,
    };
  },
  methods: {
    getIngredientCountStyle(itemCount, divNum) {
      var result = "";
      if (divNum === 1) {
        result = "";
      } else if ((itemCount === 2 || itemCount === 3) && divNum === 2) {
        result = " pizza__filling--second";
      } else if (itemCount === 3 && divNum === 3) {
        result = " pizza__filling--third";
      }
      return result;
    },
    calcIngredient(ingredient, divNum) {
      return (
        "pizza__filling--" +
        ingredientStatuses[ingredient.ingredientId] +
        this.getIngredientCountStyle(ingredient.itemCount, divNum)
      );
    },
    onCook(pizzaOrder) {
      this.$emit("onCook", pizzaOrder);
    },
    moveIngredient(ingredientId) {
      var findedInd = -1;
      for (var i = 0; i < this.recipe.ingredients.length; i = i + 1) {
        if (this.recipe.ingredients[i].ingredientId === ingredientId) {
          findedInd = i;
          if (this.recipe.ingredients[i].itemCount < 3) {
            this.$emit("AddItemCount", i);
          }
        }
      }
      if (findedInd === -1) {
        this.$emit("AddNewItem", ingredientId);
      }
    },
  },
  computed: {
    pizzaFoundation: function () {
      return {
        "pizza--foundation--big-creamy":
          doughStatuses[this.recipe.doughId] === "large" &&
          sauceStatuses[this.recipe.sauceId] === "creamy",
        "pizza--foundation--big-tomato":
          doughStatuses[this.recipe.doughId] === "large" &&
          sauceStatuses[this.recipe.sauceId] === "tomato",
        "pizza--foundation--small-creamy":
          doughStatuses[this.recipe.doughId] === "light" &&
          sauceStatuses[this.recipe.sauceId] === "creamy",
        "pizza--foundation--small-tomato":
          doughStatuses[this.recipe.doughId] === "light" &&
          sauceStatuses[this.recipe.sauceId] === "tomato",
      };
    },
  },
};
</script>
