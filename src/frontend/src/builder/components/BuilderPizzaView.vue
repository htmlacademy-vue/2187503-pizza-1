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
            <div v-for="item in ingredients" :key="item.id">
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

      <BuilderPriceCounter :pizzaName="pizzaName" />
    </div>
  </AppDrop>
</template>

<script>
import BuilderPriceCounter from "@/builder/components/BuilderPriceCounter";
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
      pizzaName: "",
      doughStatuses,
      sauceStatuses,
      ingredientStatuses,
    };
  },
  methods: {
    ...mapMutations("Builder", ["addItem"]),
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
    moveIngredient(ingredientId) {
      this.addItem(ingredientId);
    },
  },
  computed: {
    ...mapState("Builder", ["doughId", "sauceId", "ingredients"]),
    pizzaFoundation: function () {
      return {
        "pizza--foundation--big-creamy":
          doughStatuses[this.doughId] === "large" &&
          sauceStatuses[this.sauceId] === "creamy",
        "pizza--foundation--big-tomato":
          doughStatuses[this.doughId] === "large" &&
          sauceStatuses[this.sauceId] === "tomato",
        "pizza--foundation--small-creamy":
          doughStatuses[this.doughId] === "light" &&
          sauceStatuses[this.sauceId] === "creamy",
        "pizza--foundation--small-tomato":
          doughStatuses[this.doughId] === "light" &&
          sauceStatuses[this.sauceId] === "tomato",
      };
    },
  },
};
</script>
