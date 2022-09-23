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
              :value="sauceStatuses[sauce.id]"
              :modelValue="value.sauce"
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
              <span
                class="filling"
                :class="`filling--${ingredientStatuses[ingredient.id]}`"
                >{{ ingredient.name }}</span
              >
              <ItemCounter
                :ingredientId="ingredient.id"
                @setItemCount="setItemCount"
              />
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
    setSauce(sauce) {
      this.value.sauce = sauce;
    },
    setItemCount(ingredientId, itemCount) {
      this.itemCount = itemCount;

      var findedInd = -1;
      for (var i = 0; i < this.value.ingredients.length; i = i + 1) {
        if (this.value.ingredients[i].ingredientId === ingredientId) {
          findedInd = i;
          this.value.ingredients[i].itemCount = itemCount;
        }
      }
      if (findedInd === -1 && itemCount != 0) {
        this.value.ingredients.push({
          ingredientId: ingredientId,
          itemCount: itemCount,
        });
      } else if (findedInd > -1 && itemCount === 0) {
        this.value.ingredients.splice(findedInd, 1);
      }
    },
  },
};
</script>
