export default {
  namespaced: true,
  state: {
    pizzaOrders: [],
  },
  mutations: {
    addPizzaOrder(state, pizzaOrder) {
      state.pizzaOrders.push(pizzaOrder);
    },
  },
  actions: {
    addPizzaOrder({ commit, rootState, rootGetters }, pizzaName) {
      const pizzaOrder = {
        pizzaName: pizzaName,
        price: rootGetters["Builder/getPrice"],
        doughId: rootState.Builder.doughId,
        sizeId: rootState.Builder.sizeId,
        sauceId: rootState.Builder.sauceId,
        ingredients: rootState.Builder.ingredients,
      };

      commit("addPizzaOrder", pizzaOrder);
    },
  },
};
