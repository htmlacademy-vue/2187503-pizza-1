<template>
  <div class="content__result">
    <p>Итого: {{ getPizzaPrice }} ₽</p>
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
import { mapState, mapGetters, mapActions } from "vuex";
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
    };
  },
  methods: {
    ...mapActions("Cart", ["addPizzaOrder"]),
    onCook() {
      if (this.pizzaName == null) {
        alert("Название пиццы обязательно для заполнения");
      } else {
        this.addPizzaOrder(this.pizzaName);
      }
    },
  },
  computed: {
    ...mapState("Cart", ["pizzaOrders"]),
    ...mapState("Builder", [
      "pizza",
      "doughId",
      "sizeId",
      "sauceId",
      "ingredients",
    ]),
    ...mapGetters("Builder", ["getPizzaPrice", "getIngredientsPrice"]),
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
