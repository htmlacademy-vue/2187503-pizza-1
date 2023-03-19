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
            <transition-group name="list" tag="div">
              <div
                v-for="item in pizza.ingredients.filter(
                  (item) => item.quantity >= 1
                )"
                :key="item.ingredientId"
                :class="
                  `pizza__filling pizza__filling--` + calcIngredient(item)
                "
                data-test="pizza-filling-1"
              />
            </transition-group>
            <transition-group name="list" tag="div">
              <div
                v-for="item in pizza.ingredients.filter(
                  (item) => item.quantity >= 2
                )"
                :key="item.ingredientId"
                :class="
                  `pizza__filling pizza__filling--` +
                  calcIngredient(item) +
                  ` pizza__filling--second`
                "
                data-test="pizza-filling-2"
              />
            </transition-group>
            <transition-group name="list" tag="div">
              <div
                v-for="item in pizza.ingredients.filter(
                  (item) => item.quantity === 3
                )"
                :key="item.ingredientId"
                :class="
                  `pizza__filling pizza__filling--` +
                  calcIngredient(item) +
                  ` pizza__filling--third`
                "
                data-test="pizza-filling-3"
              />
            </transition-group>
          </div>
        </div>
      </div>

      <BuilderPriceCounter :pizza-name="pizza.name" />
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
    calcIngredient(ingredient) {
      let inrgedientNameEng =
        ingredientStatuses[
          this.pizzaParam.ingredients.find(
            (el) => el.id == ingredient.ingredientId
          ).name
        ];
      return inrgedientNameEng;
    },
    moveIngredient(ingredientId) {
      this.addItem(ingredientId);
    },
    inputPizzaName(e) {
      this.updatePizzaName(e.target.value);
    },
  },
  computed: {
    ...mapState("Builder", ["pizza", "pizzaParam"]),
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
<style>
.list-item {
  display: inline-block;
  margin-right: 10px;
}
.list-enter-active,
.list-leave-active {
  transition: all 1s;
}
.list-enter, .list-leave-to /* .list-leave-active до версии 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}
</style>
