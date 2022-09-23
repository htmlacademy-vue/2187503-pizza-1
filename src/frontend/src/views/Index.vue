<template>
  <main class="content">
    <form action="#" method="post">
      <div class="content__wrapper">
        <h1 class="title title--big">Конструктор пиццы</h1>

        <BuilderDoughSelector v-model="doughCurrent" />

        <BuilderSizeSelector v-model="diameterRadioButton" />

        <BuilderIngredientsSelector v-model="sauceCurrent" />

        <div>
          <BuilderPizzaView
            :doughCurrent="doughCurrent"
            :sauceCurrent="sauceCurrent"
          />

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
      pizza,
      user,
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
