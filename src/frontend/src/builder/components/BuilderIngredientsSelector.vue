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
              :modelValue="sauceId"
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
              <ItemCounter
                :ingredientId="ingredient.id"
                :recipe="recipe"
                @AddItem="AddItem"
                @DropItem="DropItem"
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
import { mapState, mapMutations } from "vuex";
import AppDrag from "@/common/components/AppDrag";
export default {
  name: "BuilderIngredientsSelector",
  props: {
    recipe: {
      type: Object,
      required: true,
    },
  },
  components: {
    RadioButton,
    ItemCounter,
    AppDrag,
  },
  computed: mapState("Builder", ["pizza", "sauceId"]),
  data() {
    return {
      ingredientStatuses,
      sauceStatuses,
      itemCount: null,
    };
  },

  methods: {
    ...mapMutations("Builder", ["updateSauceId"]),
    setSauce(sauceId) {
      this.updateSauceId(sauceId);
    },
    AddItem(ingredientId) {
      var cnt = 0;
      for (var i = 0; i < this.recipe.ingredients.length; i = i + 1) {
        if (this.recipe.ingredients[i].ingredientId === ingredientId) {
          cnt = this.recipe.ingredients[i].itemCount;
          this.$emit("AddItemCount", i);
        }
      }
      if (cnt === 0) {
        this.$emit("AddNewItem", ingredientId);
      }
    },
    DropItem(ingredientId) {
      var cnt = 0;
      var findedInd = -1;
      for (var i = 0; i < this.recipe.ingredients.length; i = i + 1) {
        if (this.recipe.ingredients[i].ingredientId === ingredientId) {
          this.$emit("DropItemCount", i);

          findedInd = i;
          cnt = this.recipe.ingredients[i].itemCount;
        }
      }
      if (findedInd > -1 && cnt === 0) {
        this.$emit("DropItem", findedInd);
      }
    },
  },
};
</script>
