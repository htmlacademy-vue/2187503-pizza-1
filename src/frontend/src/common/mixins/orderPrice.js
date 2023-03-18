export default {
  methods: {
    $calcPrice(pizzas, misc) {
      var miscPrice = 0;
      if (Array.isArray(misc)) {
        for (var i = 0; i < misc.length; i = i + 1) {
          miscPrice =
            miscPrice +
            this.$store.getters["Cart/getMiscById"](misc[i].miscId).price *
              misc[i].quantity;
        }
      }
      let pizzaPrice = 0;
      if (Array.isArray(pizzas)) {
        for (var j = 0; j < pizzas.length; j = j + 1) {
          pizzaPrice =
            pizzaPrice +
            this.$store.getters["Builder/getPizzaPrice"](pizzas[j]) *
              pizzas[j].quantity;
        }
      }
      return pizzaPrice + miscPrice;
    },
  },
};
