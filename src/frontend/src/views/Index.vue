<template>
  <main class="content">
    <router-view />
    <form action="#" method="post">
      <div class="content__wrapper">
        <h1 class="title title--big">Конструктор пиццы</h1>

        <BuilderDoughSelector />

        <BuilderSizeSelector />

        <BuilderIngredientsSelector />

        <BuilderPizzaView @onCook="onCook" />
      </div>
    </form>
  </main>
</template>
<script>
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
  methods: {
    onCook(pizzaOrder) {
      this.$emit("onCook", pizzaOrder);
    },
  },
};
</script>
<style></style>
