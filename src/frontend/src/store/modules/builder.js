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
    getSizeCoeff(state) {
      var multiplier = 0;

      multiplier = state.pizza.sizes.find(
        (el) => el.id === state.sizeId
      ).multiplier;

      return multiplier;
    },
    getDoughPrice(state) {
      var doughPrice = 0;
      doughPrice = state.pizza.dough.find(
        (el) => el.id === state.doughId
      ).price;
      return doughPrice;
    },
    getSaucePrice(state) {
      var saucePrice = 0;
      saucePrice = state.pizza.sauces.find(
        (el) => el.id === state.sauceId
      ).price;
      return saucePrice;
    },
    calculateItemTax: (state) => (ingredientId) => {
      var ingredientPrice = 0;
      ingredientPrice = state.pizza.ingredients.find(
        (el) => el.id === ingredientId
      ).price;
      return ingredientPrice;
    },
    getIngredientsPrice(state, getters) {
      var ingredientPrice = 0;
      for (var i = 0; i < state.ingredients.length; i = i + 1) {
        ingredientPrice =
          ingredientPrice +
          getters.calculateItemTax(state.ingredients[i].ingredientId) *
            state.ingredients[i].itemCount;
      }
      return ingredientPrice;
    },
    getPrice(state, getters) {
      return (
        //мультипликатор размера х (стоимость теста + соус + ингредиенты).
        getters.getSizeCoeff *
        (getters.getDoughPrice +
          getters.getSaucePrice +
          getters.getIngredientsPrice)
      );
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
