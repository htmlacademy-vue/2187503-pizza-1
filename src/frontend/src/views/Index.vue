<template>
  <main class="content">
    <form action="#" method="post">
      <div class="content__wrapper">
        <h1 class="title title--big">Конструктор пиццы</h1>

        <BuilderDoughSelector v-model="doughCurrent" />

        <BuilderSizeSelector v-model="diameterRadioButton" />

        <div class="content__ingredients">
          <div class="sheet">
            <h2 class="title title--small sheet__title">
              Выберите ингредиенты
            </h2>

            <div class="sheet__content ingredients">
              <div class="ingredients__sauce">
                <p>Основной соус:</p>

                <label
                  v-for="sauce in pizza.sauces"
                  :key="sauce.id"
                  class="radio ingredients__input"
                >
                  <RadioButton
                    name="sauce"
                    :value="sauceStatuses[sauce.id]"
                    v-model="sauceCurrent"
                  />
                  <span>{{ sauce.name }}</span>
                </label>
              </div>

              <div class="ingredients__filling">
                <p>Начинка:</p>

                <ul class="ingredients__list">
                  <li
                    v-for="ingredient in pizza.ingredients"
                    :key="ingredient.id"
                    class="ingredients__item"
                  >
                    <span
                      class="filling"
                      :class="`filling--${ingredientStatuses[ingredient.id]}`"
                      >{{ ingredient.name }}</span
                    >
                    <ItemCounter />
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

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

          <div class="content__result">
            <p>Итого: 0 ₽</p>
            <button type="button" class="button" disabled>Готовьте!</button>
          </div>
        </div>
      </div>
    </form>
  </main>
</template>
<script>
import misc from "@/static/misc.json";
import pizza from "@/static/pizza.json";
import user from "@/static/user.json";
import sizeStatuses from "@/common/enums/sizeStatuses";
import sauceStatuses from "@/common/enums/sauceStatuses";
import ingredientStatuses from "@/common/enums/ingredientStatuses";
import RadioButton from "@/common/components/RadioButton";
import BuilderDoughSelector from "@/builder/components/BuilderDoughSelector";
import BuilderSizeSelector from "@/builder/components/BuilderSizeSelector";
import ItemCounter from "../common/components/ItemCounter.vue";
export default {
  name: "IndexHome",
  components: {
    RadioButton,
    ItemCounter,
    BuilderDoughSelector,
    BuilderSizeSelector,
  },
  data() {
    return {
      misc,
      pizza,
      user,
      sizeStatuses,
      sauceStatuses,
      ingredientStatuses,
      doughCurrent: "light",
      diameterRadioButton: "small",
      sauceCurrent: "tomato",
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
<style></style>
