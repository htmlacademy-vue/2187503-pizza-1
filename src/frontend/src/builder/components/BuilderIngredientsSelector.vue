<template>
  <div class="content__ingredients">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите ингредиенты</h2>

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
              :value="sauce.id"
              :modelValue="value.sauceId"
              @change="setSauce"
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
              <AppDrag :transfer-data="ingredient.id">
                <span
                  class="filling"
                  :class="`filling--${ingredientStatuses[ingredient.id]}`"
                  >{{ ingredient.name }}</span
                >
              </AppDrag>
              <ItemCounter :ingredientId="ingredient.id" :recipe="value" />
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import RadioButton from "@/common/components/RadioButton";
import ItemCounter from "@/common/components/ItemCounter.vue";
import ingredientStatuses from "@/common/enums/ingredientStatuses";
import sauceStatuses from "@/common/enums/sauceStatuses";
import pizza from "@/static/pizza.json";
import AppDrag from "@/common/components/AppDrag";
export default {
  name: "BuilderIngredientsSelector",
  props: {
    value: {
      type: Object,
      required: true,
    },
  },
  components: {
    RadioButton,
    ItemCounter,
    AppDrag,
  },
  data() {
    return {
      pizza,
      ingredientStatuses,
      sauceStatuses,
      itemCount: null,
      ingredients: [],
    };
  },

  methods: {
    setSauce(sauceId) {
      this.value.sauceId = sauceId;
    },
  },
};
</script>
