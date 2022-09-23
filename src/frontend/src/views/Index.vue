<template>
  <main class="content">
    <form action="#" method="post">
      <div class="content__wrapper">
        <h1 class="title title--big">Конструктор пиццы</h1>

        <BuilderDoughSelector v-model="recipe.dough" />

        <BuilderSizeSelector v-model="recipe.diameter" />

        <BuilderIngredientsSelector v-model="recipe" />

        <BuilderPizzaView :recipe="recipe" />
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
        dough: "light",
        diameter: "small",
        sauce: "tomato",
        ingredients: [],
      },
    };
  },
};
</script>
<style></style>
