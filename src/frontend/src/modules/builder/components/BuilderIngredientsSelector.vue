<template>
  <div class="content__ingredients">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите ингредиенты</h2>

      <div class="sheet__content ingredients">
        <div class="ingredients__sauce">
          <p>Основной соус:</p>

          <label
            v-for="sauce in pizzaParam.sauces"
            :key="sauce.id"
            class="radio ingredients__input"
          >
            <RadioButton
              name="sauce"
              :value="sauce.id"
              :modelValue="pizza.sauceId"
              @change="setSauce"
            />
            <span>{{ sauce.name }}</span>
          </label>
        </div>

        <div class="ingredients__filling">
          <p>Начинка:</p>

          <ul class="ingredients__list">
            <li
              v-for="ingredient in pizzaParam.ingredients"
              :key="ingredient.id"
              class="ingredients__item"
            >
              <AppDrag :transfer-data="ingredient.id">
                <span
                  class="filling"
                  :class="`filling--${ingredientStatuses[ingredient.name]}`"
                  >{{ ingredient.name }}</span
                >
              </AppDrag>
              <ItemCounter :ingredientId="ingredient.id" />
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
import { mapState, mapMutations } from "vuex";
import AppDrag from "@/common/components/AppDrag";
export default {
  name: "BuilderIngredientsSelector",
  components: {
    RadioButton,
    ItemCounter,
    AppDrag,
  },
  computed: mapState("Builder", ["pizzaParam", "pizza", "sauceStatuses"]),
  data() {
    return {
      ingredientStatuses,
    };
  },

  methods: {
    ...mapMutations("Builder", ["updateSauceId"]),
    setSauce(sauceId) {
      this.updateSauceId(sauceId);
    },
  },
};
</script>
