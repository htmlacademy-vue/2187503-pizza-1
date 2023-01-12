import jsonMisc from "@/static/misc.json";

const module = "Cart";
const namespaceMisc = { entity: "misc", module };

export default {
  namespaced: true,
  state: {
    misc: [],
    pizzaOrders: [],
    miscOrders: [],
  },
  getters: {
    getPizzaOrderByIndex: (state) => (index) => {
      return state.pizzaOrders[index];
    },
    getMiscPrice(state) {
      var miscPrice = 0;
      for (var i = 0; i < state.miscOrders.length; i = i + 1) {
        miscPrice =
          miscPrice + state.miscOrders[i].price * state.miscOrders[i].count;
      }
      return miscPrice;
    },
    getPizzaOrdersPrice(state) {
      var pizzaOrdersPrice = 0;
      for (var i = 0; i < state.pizzaOrders.length; i = i + 1) {
        pizzaOrdersPrice =
          pizzaOrdersPrice +
          state.pizzaOrders[i].price * state.pizzaOrders[i].count;
      }
      return pizzaOrdersPrice;
    },
  },
  mutations: {
    addPizzaOrder(state, { pizzaOrder, pizzaOrderInd }) {
      if (pizzaOrderInd == null) {
        state.pizzaOrders.push(JSON.parse(JSON.stringify(pizzaOrder)));
      } else {
        for (var i = 0; i < state.pizzaOrders.length; i = i + 1) {
          if (pizzaOrderInd == i) {
            state.pizzaOrders[i].pizzaName = pizzaOrder.pizzaName;
            state.pizzaOrders[i].price = pizzaOrder.price;
            state.pizzaOrders[i].doughId = pizzaOrder.doughId;
            state.pizzaOrders[i].sizeId = pizzaOrder.sizeId;
            state.pizzaOrders[i].sauceId = pizzaOrder.sauceId;
            state.pizzaOrders[i].ingredients = pizzaOrder.ingredients;
          }
        }
      }
    },
    addPizzaOrderCount(state, pizzaOrderInd) {
      state.pizzaOrders[pizzaOrderInd].count++;
    },
    recducePizzaOrderCount(state, pizzaOrderInd) {
      if (--state.pizzaOrders[pizzaOrderInd].count === 0) {
        state.pizzaOrders.splice(pizzaOrderInd, 1);
      }
    },
    addMiscInOrder(state, miscId) {
      state.miscOrders.find((item) => item.id == miscId).count++;
    },
    reduceMiscInOrder(state, miscId) {
      --state.miscOrders.find((item) => item.id == miscId).count;
    },
    createMiscOrders(state) {
      if (state.miscOrders.length === 0) {
        for (var i = 0; i < state.misc.length; i = i + 1) {
          const miscObj = {
            id: state.misc[i].id,
            name: state.misc[i].name,
            price: state.misc[i].price,
            count: 0,
          };
          state.miscOrders.push(miscObj);
        }
      }
    },
    clearPizzaOrderData(state) {
      state.pizzaOrders = [];
      state.miscOrders = [];
    },
  },
  actions: {
    addPizzaOrder(
      { commit, rootState, rootGetters },
      { pizzaName, pizzaOrderInd }
    ) {
      const pizzaOrder = {
        pizzaName: pizzaName,
        price: rootGetters["Builder/getPizzaPrice"],
        count: 1,
        doughId: rootState.Builder.doughId,
        sizeId: rootState.Builder.sizeId,
        sauceId: rootState.Builder.sauceId,
        ingredients: rootState.Builder.ingredients,
      };

      commit("addPizzaOrder", { pizzaOrder, pizzaOrderInd });
    },
    fetchMisc({ commit }) {
      const misc = jsonMisc;
      // получили справочник
      commit(
        "SET_ENTITY",
        {
          ...namespaceMisc,
          value: misc,
        },
        { root: true }
      );
    },
  },
};
