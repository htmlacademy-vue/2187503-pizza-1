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
  </div>
</template>

<script>
import pizza from "@/static/pizza.json";
export default {
  name: "BuilderPizzaView",
  props: {
    doughCurrent: {
      type: String,
      required: true,
    },
    sauceCurrent: {
      type: String,
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
          this.doughCurrent === "large" && this.sauceCurrent === "creamy",
        "pizza--foundation--big-tomato":
          this.doughCurrent === "large" && this.sauceCurrent === "tomato",
        "pizza--foundation--small-creamy":
          this.doughCurrent === "light" && this.sauceCurrent === "creamy",
        "pizza--foundation--small-tomato":
          this.doughCurrent === "light" && this.sauceCurrent === "tomato",
      };
    },
  },
};
</script>
