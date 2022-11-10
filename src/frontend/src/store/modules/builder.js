import jsonPizza from "@/static/pizza.json";

const entity = "pizza";
const module = "Builder";
const namespace = { entity, module };

export default {
  namespaced: true,
  state: {
    pizza: {},
    doughId: 1,
    sizeId: 1,
    sauceId: 1,
    /* recipe: {
      sizeId: 1,
      sauceId: 1,
      ingredients: [],
    }, */
  },
  getters: {
    getPizza(state) {
      return state.pizza;
    },
  },
  mutations: {
    updateDoughId(state, doughId) {
      state.doughId = doughId;
    },
    updateSizeId(state, sizeId) {
      state.sizeId = sizeId;
    },
    updateSauceId(state, sauceId) {
      state.sauceId = sauceId;
    },
  },
  actions: {
    fetchPizza({ commit }) {
      const pizza = jsonPizza;
      commit(
        "SET_ENTITY",
        {
          ...namespace,
          value: pizza,
        },
        { root: true }
      );
    },
  },
};
