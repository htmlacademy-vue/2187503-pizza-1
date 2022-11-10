import jsonPizza from "@/static/pizza.json";

const entity = "pizza";
const module = "Builder";
const namespace = { entity, module };

export default {
  namespaced: true,
  state: {
    pizza: {},
    doughId: 1,
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
    /* getRecipeDoughId: (state) => (id) =>
      state.recipe.find((task) => +task.id === +id), */
  },
  mutations: {
    updateDoughId(state, doughId) {
      state.doughId = doughId;
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
