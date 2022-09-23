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
          <div class="pizza__filling pizza__filling--ananas"></div>
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
    };
  },
  computed: {
    pizzaFoundation: function () {
      return {
        "pizza--foundation--big-creamy":
          this.recipe.dough === "large" && this.recipe.sauce === "creamy",
        "pizza--foundation--big-tomato":
          this.recipe.dough === "large" && this.recipe.sauce === "tomato",
        "pizza--foundation--small-creamy":
          this.recipe.dough === "light" && this.recipe.sauce === "creamy",
        "pizza--foundation--small-tomato":
          this.recipe.dough === "light" && this.recipe.sauce === "tomato",
      };
    },
  },
};
</script>
