import jsonPizza from "@/static/pizza.json";

export default {
  state: {
    builder: "BuilderTest",
  },
  getters: {
    getBuilder(state) {
      return state.builder;
    },
  },
  mutations: {
    /* ["SET_ENTITY"](state, { module, entity, value }) {
      module ? (state[module][entity] = value) : (state[entity] = value);
    }, */
    fetchPizza(state, pizza) {
      state.builder = pizza;
    },
  },
  actions: {
    /* fetchPizza({ commit }) {
      const pizza = jsonPizza;

      commit("SET_ENTITY", {
        module: null,
        entity: "pizza",
        value: pizza,
      });
    }, */
    fetchPizza(ctx) {
      const pizza = jsonPizza;
      ctx.commit("fetchPizza", pizza);
    },
  },
};
