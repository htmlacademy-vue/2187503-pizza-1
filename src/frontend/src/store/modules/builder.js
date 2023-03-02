import jsonSauceStatuses from "@/common/enums/sauceStatuses";

const module = "Builder";
const namespacePizza = { entity: "pizzaParam", module };
const namespaceSauceStatuses = { entity: "sauceStatuses", module };

function getSizeCoeff(state, id) {
  var multiplier = 0;

  if (Array.isArray(state.pizzaParam.sizes)) {
    multiplier = state.pizzaParam.sizes.find((el) => el.id == id).multiplier;
  }

  return multiplier;
}

function getDoughPrice(state, id) {
  var doughPrice = 0;
  if (Array.isArray(state.pizzaParam.dough)) {
    doughPrice = state.pizzaParam.dough.find((el) => el.id === id).price;
  }
  return doughPrice;
}
function getSaucePrice(state, id) {
  var saucePrice = 0;
  if (Array.isArray(state.pizzaParam.sauces)) {
    saucePrice = state.pizzaParam.sauces.find((el) => el.id === id).price;
  }
  return saucePrice;
}
function calculateItemTax(state, id) {
  var ingredientPrice = 0;
  ingredientPrice = state.pizzaParam.ingredients.find(
    (el) => el.id === id
  ).price;
  return ingredientPrice;
}

export default {
  namespaced: true,
  state: {
    pizzaParam: {},
    sauceStatuses: {},
    pizza: {
      doughId: 1,
      sizeId: 1,
      sauceId: 1,
      ingredients: [],
      userId: null,
      name: "",
    },
    pizzaOrderInd: null,
  },
  getters: {
    getIngredientsPrice: (state) => (ingredients) => {
      var ingredientPrice = 0;
      for (var i = 0; i < ingredients.length; i = i + 1) {
        ingredientPrice =
          ingredientPrice +
          calculateItemTax(state, ingredients[i].ingredientId) *
            ingredients[i].quantity;
      }
      return ingredientPrice;
    },

    getPizzaPrice: (state, getters) => (pizza) => {
      return (
        //мультипликатор размера х (стоимость теста + соус + ингредиенты).

        getSizeCoeff(state, pizza.sizeId) *
        (getDoughPrice(state, pizza.doughId) +
          getSaucePrice(state, pizza.sauceId) +
          getters.getIngredientsPrice(state, pizza.ingredients))
      );
    },

    getSizeName: (state) => (sizeId) => {
      return state.pizzaParam.sizes.find((size) => size.id === sizeId).name;
    },
    getSauceName: (state) => (sauceId) => {
      return state.pizzaParam.sauces
        .find((sauce) => sauce.id === sauceId)
        .name.toLowerCase();
    },
    getSizeMultiplier: (state) => (sizeId) => {
      return state.pizzaParam.sizes?.find((size) => size.id === sizeId)
        .multiplier;
    },
    getIngredientsName: (state) => (ingredients) => {
      var ingredientsName = [];
      for (var i = 0; i < ingredients.length; i = i + 1) {
        ingredientsName.push(
          state.pizzaParam.ingredients
            .find((ingredient) => ingredient.id === ingredients[i].ingredientId)
            .name.toLowerCase()
        );
      }

      return ingredientsName.join(", ");
    },
  },
  mutations: {
    updateDoughId(state, doughId) {
      state.pizza.doughId = doughId;
    },
    updateSizeId(state, sizeId) {
      state.pizza.sizeId = sizeId;
    },
    updateSauceId(state, sauceId) {
      state.pizza.sauceId = sauceId;
    },
    updateIngredients(state, ingredients) {
      state.pizza.ingredients = JSON.parse(JSON.stringify(ingredients));
    },
    updatePizzaName(state, pizzaName) {
      state.pizza.name = pizzaName;
    },
    updatePizzaOrder(state, pizzaOrderInd) {
      state.pizzaOrderInd = pizzaOrderInd;
    },
    addItem(state, ingredientId) {
      var cnt = 0;
      for (var i = 0; i < state.pizza.ingredients.length; i = i + 1) {
        if (state.pizza.ingredients[i].ingredientId === ingredientId) {
          cnt = state.pizza.ingredients[i].quantity;
          if (state.pizza.ingredients[i].quantity < 3) {
            state.pizza.ingredients[i].quantity += 1;
          }
        }
      }
      if (cnt === 0) {
        state.pizza.ingredients.push({
          ingredientId: ingredientId,
          quantity: 1,
        });
      }
    },
    dropItem(state, ingredientId) {
      var cnt = 0;
      var findedInd = -1;
      for (var i = 0; i < state.pizza.ingredients.length; i = i + 1) {
        if (state.pizza.ingredients[i].ingredientId === ingredientId) {
          state.pizza.ingredients[i].quantity -= 1;

          findedInd = i;
          cnt = state.pizza.ingredients[i].quantity;
        }
      }
      if (findedInd > -1 && cnt === 0) {
        state.pizza.ingredients.splice(findedInd, 1);
      }
    },
    clearPizzaData(state) {
      state.sauceStatuses = {};
      state.pizza.doughId = 1;
      state.pizza.sizeId = 1;
      state.pizza.sauceId = 1;
      state.pizza.ingredients = [];
      state.pizza.name = "";
    },
  },
  actions: {
    async fetchPizza({ commit }) {
      const pizzaParam = { dough: [], sizes: [], sauces: [], ingredients: [] };
      pizzaParam.dough = await this.$api.dough.query();
      pizzaParam.sizes = await this.$api.sizes.query();
      pizzaParam.sauces = await this.$api.sauces.query();
      pizzaParam.ingredients = await this.$api.ingredients.query();

      commit(
        "SET_ENTITY",
        {
          ...namespacePizza,
          value: pizzaParam,
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
