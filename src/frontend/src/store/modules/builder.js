import jsonPizza from "@/static/pizza.json";

const entity = "pizza";
const module = "Builder";
const namespace = { entity, module };

export default {
  namespaced: true,
  state: {
    pizza: "",
  },
  getters: {
    getPizza(state) {
      return state.pizza;
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
