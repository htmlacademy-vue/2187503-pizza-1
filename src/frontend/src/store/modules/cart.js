export default {
  namespaced: true,
  state: {
    pizzaOrders: [],
  },
  getters: {
    getPizzaOrderByIndex: (state) => (index) => {
      return state.pizzaOrders[index];
    },
  },
  mutations: {
    addPizzaOrder(state, pizzaOrder) {
      state.pizzaOrders.push(JSON.parse(JSON.stringify(pizzaOrder)));
    },
    addPizzaOrderCount(state, pizzaOrderInd) {
      state.pizzaOrders[pizzaOrderInd].count++;
    },
    recducePizzaOrderCount(state, pizzaOrderInd) {
      if (--state.pizzaOrders[pizzaOrderInd].count === 0) {
        state.pizzaOrders.splice(pizzaOrderInd, 1);
      }
    },
  },
  actions: {
    addPizzaOrder({ commit, rootState, rootGetters }, pizzaName) {
      const pizzaOrder = {
        pizzaName: pizzaName,
        price: rootGetters["Builder/getPrice"],
        count: 1,
        doughId: rootState.Builder.doughId,
        sizeId: rootState.Builder.sizeId,
        sauceId: rootState.Builder.sauceId,
        ingredients: rootState.Builder.ingredients,
      };

      commit("addPizzaOrder", pizzaOrder);
    },
  },
};
