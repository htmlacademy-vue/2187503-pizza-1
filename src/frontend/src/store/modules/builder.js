import jsonPizza from "@/static/pizza.json";
import jsonSauceStatuses from "@/common/enums/sauceStatuses";

const module = "Builder";
const namespacePizza = { entity: "pizza", module };
const namespaceSauceStatuses = { entity: "sauceStatuses", module };

function getSizeCoeff(state) {
  var multiplier = 0;

  multiplier = state.pizza.sizes.find(
    (el) => el.id === state.sizeId
  ).multiplier;

  return multiplier;
}

function getDoughPrice(state) {
  var doughPrice = 0;
  doughPrice = state.pizza.dough.find((el) => el.id === state.doughId).price;
  return doughPrice;
}
function getSaucePrice(state) {
  var saucePrice = 0;
  saucePrice = state.pizza.sauces.find((el) => el.id === state.sauceId).price;
  return saucePrice;
}
function calculateItemTax(state, ingredientId) {
  var ingredientPrice = 0;
  ingredientPrice = state.pizza.ingredients.find(
    (el) => el.id === ingredientId
  ).price;
  return ingredientPrice;
}

export default {
  namespaced: true,
  state: {
    pizza: {},
    sauceStatuses: {},
    doughId: 1,
    sizeId: 1,
    sauceId: 1,
    ingredients: [],
    userId: null,
    pizzaName: "",
    pizzaOrderInd: null,
  },
  getters: {
    getIngredientsPrice(state) {
      var ingredientPrice = 0;
      for (var i = 0; i < state.ingredients.length; i = i + 1) {
        ingredientPrice =
          ingredientPrice +
          calculateItemTax(state, state.ingredients[i].ingredientId) *
            state.ingredients[i].itemCount;
      }
      return ingredientPrice;
    },
    getPizzaPrice(state, getters) {
      return (
        //мультипликатор размера х (стоимость теста + соус + ингредиенты).
        getSizeCoeff(state) *
        (getDoughPrice(state) +
          getSaucePrice(state) +
          getters.getIngredientsPrice)
      );
    },
    getSizeName: (state) => (sizeId) => {
      return state.pizza.sizes.find((size) => size.id === sizeId).name;
    },
    getSauceName: (state) => (sauceId) => {
      return state.pizza.sauces
        .find((sauce) => sauce.id === sauceId)
        .name.toLowerCase();
    },
    getIngredientsName: (state) => (ingredients) => {
      var ingredientsName = [];
      for (var i = 0; i < ingredients.length; i = i + 1) {
        ingredientsName.push(
          state.pizza.ingredients
            .find((ingredient) => ingredient.id === ingredients[i].ingredientId)
            .name.toLowerCase()
        );
      }

      return ingredientsName.join(", ");
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
    updateIngredients(state, ingredients) {
      state.ingredients = JSON.parse(JSON.stringify(ingredients));
    },
    updatePizzaName(state, pizzaName) {
      state.pizzaName = pizzaName;
    },
    updatePizzaOrder(state, pizzaOrderInd) {
      state.pizzaOrderInd = pizzaOrderInd;
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
    clearPizzaData(state) {
      state.sauceStatuses = {};
      state.doughId = 1;
      state.sizeId = 1;
      state.sauceId = 1;
      state.ingredients = [];
      state.pizzaName = "";
    },
  },
  actions: {
    fetchPizza({ commit }) {
      const pizza = jsonPizza;
      commit(
        "SET_ENTITY",
        {
          ...namespacePizza,
          value: pizza,
        },
        { root: true }
      );
    },
    fetchSauceStatuses({ commit }) {
      const sauceStatuses = jsonSauceStatuses;
      commit(
        "SET_ENTITY",
        {
          ...namespaceSauceStatuses,
          value: sauceStatuses,
        },
        { root: true }
      );
    },
  },
};
