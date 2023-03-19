<template>
  <div class="content__result">
    <p>Итого: {{ getPizzaPrice(pizza) }} ₽</p>
    <button
      type="button"
      class="button"
      :disabled="buttonCookDisabled"
      @click="onCook()"
      data-test="on-cook"
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
      test: 3,
    };
  },

  methods: {
    ...mapActions("Cart", ["addPizzaToOrder"]),
    onCook() {
      if (this.pizzaName == null) {
        alert("Название пиццы обязательно для заполнения");
      } else {
        this.addPizzaToOrder({
          pizzaName: this.pizzaName,
          pizzaOrderInd: this.pizzaOrderInd,
        });
      }
    },
  },
  computed: {
    ...mapState("Builder", ["pizza", "pizzaOrderInd"]),
    ...mapGetters("Builder", ["getPizzaPrice", "getIngredientsPrice"]),
    buttonCookDisabled: function () {
      return (
        this.getIngredientsPrice(this.pizza) === 0 ||
        this.pizzaName === null ||
        this.pizzaName === ""
      );
    },
  },
};
</script>
