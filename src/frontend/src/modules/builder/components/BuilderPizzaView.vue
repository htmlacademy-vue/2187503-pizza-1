<template>
  <AppDrop @drop="moveIngredient">
    <div class="content__pizza">
      <label class="input">
        <span class="visually-hidden">Название пиццы</span>
        <input
          type="text"
          name="pizza_name"
          placeholder="Введите название пиццы"
          :value="pizza.name"
          @input="inputPizzaName"
          required
        />
      </label>

      <div class="content__constructor">
        <div class="pizza" :class="pizzaFoundation">
          <div class="pizza__wrapper">
            <div v-for="item in pizza.ingredients" :key="item.id">
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

      <BuilderPriceCounter :pizzaName="pizza.name" />
    </div>
  </AppDrop>
</template>

<script>
import BuilderPriceCounter from "@/modules/builder/components/BuilderPriceCounter";
import doughStatuses from "@/common/enums/doughStatuses";
import sauceStatuses from "@/common/enums/sauceStatuses";
import ingredientStatuses from "@/common/enums/ingredientStatuses";
import AppDrop from "@/common/components/AppDrop";
import { mapState, mapMutations } from "vuex";
export default {
  name: "BuilderPizzaView",
  components: {
    BuilderPriceCounter,
    AppDrop,
  },
  data() {
    return {
      doughStatuses,
      sauceStatuses,
      ingredientStatuses,
    };
  },
  methods: {
    ...mapMutations("Builder", ["addItem", "updatePizzaName"]),
    getIngredientCountStyle(quantity, divNum) {
      var result = "";
      if (divNum === 1) {
        result = "";
      } else if ((quantity === 2 || quantity === 3) && divNum === 2) {
        result = " pizza__filling--second";
      } else if (quantity === 3 && divNum === 3) {
        result = " pizza__filling--third";
      }
      return result;
    },
    calcIngredient(ingredient, divNum) {
      return (
        "pizza__filling--" +
        ingredientStatuses[ingredient.ingredientId] +
        this.getIngredientCountStyle(ingredient.quantity, divNum)
      );
    },
    moveIngredient(ingredientId) {
      this.addItem(ingredientId);
    },
    inputPizzaName(e) {
      this.updatePizzaName(e.target.value);
    },
  },
  computed: {
    ...mapState("Builder", ["pizza"]),
    pizzaFoundation: function () {
      return {
        "pizza--foundation--big-creamy":
          doughStatuses[this.pizza.doughId] === "large" &&
          sauceStatuses[this.pizza.sauceId] === "creamy",
        "pizza--foundation--big-tomato":
          doughStatuses[this.pizza.doughId] === "large" &&
          sauceStatuses[this.pizza.sauceId] === "tomato",
        "pizza--foundation--small-creamy":
          doughStatuses[this.pizza.doughId] === "light" &&
          sauceStatuses[this.pizza.sauceId] === "creamy",
        "pizza--foundation--small-tomato":
          doughStatuses[this.pizza.doughId] === "light" &&
          sauceStatuses[this.pizza.sauceId] === "tomato",
      };
    },
  },
};
</script>
