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
    ingredients: [],
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
    addItem(state, ingredientId) {
      var cnt = 0;
      for (var i = 0; i < state.ingredients.length; i = i + 1) {
        if (state.ingredients[i].ingredientId === ingredientId) {
          cnt = state.ingredients[i].itemCount;
          if (state.ingredients[i].itemCount < 3) {
            state.ingredients[i].itemCount += 1;
          }
        }
      }
      if (cnt === 0) {
        state.ingredients.push({
          ingredientId: ingredientId,
          itemCount: 1,
        });
      }
    },
    dropItem(state, ingredientId) {
      var cnt = 0;
      var findedInd = -1;
      for (var i = 0; i < state.ingredients.length; i = i + 1) {
        if (state.ingredients[i].ingredientId === ingredientId) {
          state.ingredients[i].itemCount -= 1;

          findedInd = i;
          cnt = state.ingredients[i].itemCount;
        }
      }
      if (findedInd > -1 && cnt === 0) {
        state.ingredients.splice(findedInd, 1);
      }
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
