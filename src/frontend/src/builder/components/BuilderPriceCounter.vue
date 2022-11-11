<template>
  <div class="content__result">
    <p>Итого: {{ price }} ₽</p>
    <button
      type="button"
      class="button"
      :disabled="buttonCookDisabled"
      @click="onCook()"
    >
      Готовьте!
    </button>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import doughStatuses from "@/common/enums/doughStatuses";
export default {
  name: "BuilderPriceCounter",
  props: {
    pizzaName: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      doughStatuses,
      pizzaOrder: { name: null, recipe: null, price: 0 },
    };
  },
  methods: {
    onCook() {
      if (this.pizzaName == null) {
        alert("Название пиццы обязательно для заполнения");
      } else {
        this.pizzaOrder.name = this.pizzaName;
        this.pizzaOrder.recipe = this.recipe;
        this.pizzaOrder.price = this.price;
        this.$emit("onCook", this.pizzaOrder);
      }
    },
  },
  computed: {
    ...mapState("Builder", [
      "pizza",
      "doughId",
      "sizeId",
      "sauceId",
      "ingredients",
    ]),
    ...mapGetters("Builder", ["getPrice", "getIngredientsPrice"]),
    price: function () {
      return this.getPrice;
    },
    buttonCookDisabled: function () {
      return (
        this.getIngredientsPrice === 0 ||
        this.pizzaName === null ||
        this.pizzaName === ""
      );
    },
  },
};
</script>
