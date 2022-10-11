<template>
  <main class="content">
    <form action="#" method="post">
      <div class="content__wrapper">
        <h1 class="title title--big">Конструктор пиццы</h1>

        <BuilderDoughSelector :doughId="recipe.doughId" @setDough="setDough" />

        <BuilderSizeSelector :sizeId="recipe.sizeId" @setSize="setSize" />

        <BuilderIngredientsSelector
          :recipe="recipe"
          @setSauce="setSauce"
          @AddItemCount="AddItemCount"
          @AddNewItem="AddNewItem"
          @DropItemCount="DropItemCount"
          @DropItem="DropItem"
        />

        <BuilderPizzaView
          :recipe="recipe"
          @onCook="onCook"
          @AddItemCount="AddItemCount"
          @AddNewItem="AddNewItem"
        />
      </div>
    </form>
  </main>
</template>
<script>
import misc from "@/static/misc.json";
import user from "@/static/user.json";
import BuilderDoughSelector from "@/builder/components/BuilderDoughSelector";
import BuilderSizeSelector from "@/builder/components/BuilderSizeSelector";
import BuilderIngredientsSelector from "@/builder/components/BuilderIngredientsSelector";
import BuilderPizzaView from "@/builder/components/BuilderPizzaView";
export default {
  name: "IndexHome",
  components: {
    BuilderDoughSelector,
    BuilderSizeSelector,
    BuilderIngredientsSelector,
    BuilderPizzaView,
  },
  data() {
    return {
      misc,
      user,
      recipe: {
        doughId: 1,
        sizeId: 1,
        sauceId: 1,
        ingredients: [],
      },
    };
  },
  methods: {
    onCook(pizzaOrder) {
      this.$emit("onCook", pizzaOrder);
    },
    setDough(doughId) {
      this.recipe.doughId = doughId;
    },
    setSize(sizeId) {
      this.recipe.sizeId = sizeId;
    },
    setIngredients(recipe) {
      this.recipe = recipe;
    },
    setSauce(sauceId) {
      this.recipe.sauceId = sauceId;
    },
    AddItemCount(i) {
      this.recipe.ingredients[i].itemCount += 1;
    },
    AddNewItem(ingredientId) {
      this.recipe.ingredients.push({
        ingredientId: ingredientId,
        itemCount: 1,
      });
    },
    DropItemCount(i) {
      this.recipe.ingredients[i].itemCount -= 1;
    },
    DropItem(i) {
      this.recipe.ingredients.splice(i, 1);
    },
  },
};
</script>
<style></style>
