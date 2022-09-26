<template>
  <div class="content__pizza">
    <label class="input">
      <span class="visually-hidden">Название пиццы</span>
      <input
        type="text"
        name="pizza_name"
        placeholder="Введите название пиццы"
      />
    </label>

    <div class="content__constructor">
      <div class="pizza" :class="pizzaFoundation">
        <div class="pizza__wrapper">
          <div
            v-if="'a' === 'a'"
            class="pizza__filling pizza__filling--ananas"
          ></div>
          <div class="pizza__filling pizza__filling--bacon"></div>
          <div class="pizza__filling pizza__filling--cheddar"></div>
        </div>
      </div>
    </div>

    <BuilderPriceCounter :recipe="recipe" />
  </div>
</template>

<script>
import BuilderPriceCounter from "@/builder/components/BuilderPriceCounter";
import pizza from "@/static/pizza.json";
import doughStatuses from "@/common/enums/doughStatuses";
import sauceStatuses from "@/common/enums/sauceStatuses";
export default {
  name: "BuilderPizzaView",
  components: {
    BuilderPriceCounter,
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
      doughStatuses,
      sauceStatuses,
    };
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
