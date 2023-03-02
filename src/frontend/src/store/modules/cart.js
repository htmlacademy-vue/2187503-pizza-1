const module = "Cart";
const namespaceMisc = { entity: "misc", module };
const namespaceOrder = { entity: "order", module };

import { SET_ENTITY, ADD_ENTITY } from "@/store/mutations-types";

export default {
  namespaced: true,

  state: {
    order: {
      userId: "e69085d7-8ac6-4bcd-9e02-0ef244b7a806",
      phone: "+7 999-999-99-99",
      address: {
        street: "",
        building: "",
        flat: "",
        comment: "",
      },
      pizzas: [],
      misc: [],
    },
    misc: [],
  },
  getters: {
    getPizzaOrderByIndex: (state) => (index) => {
      return state.order.pizzas[index];
    },
    getMiscById: (state) => (id) => {
      for (var i = 0; i < state.misc.length; i = i + 1) {
        if (id === state.misc[i].id) {
          return state.misc[i];
        }
      }
    },
    getOrderPrice(state, getters) {
      var miscPrice = 0;
      for (var i = 0; i < state.order.misc.length; i = i + 1) {
        miscPrice =
          miscPrice +
          getters.getMiscById(state.order.misc[i].miscId).price *
            state.order.misc[i].quantity;
      }

      var pizzaPrice = 0;
      for (var j = 0; j < state.order.pizzas.length; j = j + 1) {
        pizzaPrice =
          pizzaPrice +
          /* state.order.pizzas[j].price * */
          state.order.pizzas[j].quantity;
      }

      return miscPrice + pizzaPrice;
    },
    getPizzasPrice(state) {
      var price = 0;
      for (var i = 0; i < state.order.pizzas.length; i = i + 1) {
        price =
          price + state.order.pizzas[i].price * state.order.pizzas[i].quantity;
      }
      return price;
    },
  },
  mutations: {
    addPizzaToOrder(state, { pizzaOrder, pizzaOrderInd }) {
      if (pizzaOrderInd == null) {
        state.order.pizzas.push(JSON.parse(JSON.stringify(pizzaOrder)));
      } else {
        for (var i = 0; i < state.order.pizzas.length; i = i + 1) {
          if (pizzaOrderInd == i) {
            state.order.pizzas[i].name = pizzaOrder.name;
            state.order.pizzas[i].price = pizzaOrder.price;
            state.order.pizzas[i].doughId = pizzaOrder.doughId;
            state.order.pizzas[i].sizeId = pizzaOrder.sizeId;
            state.order.pizzas[i].sauceId = pizzaOrder.sauceId;
            state.order.pizzas[i].ingredients = pizzaOrder.ingredients;
          }
        }
      }
    },
    addPizzaOrderCount(state, pizzaOrderInd) {
      state.order.pizzas[pizzaOrderInd].quantity++;
    },
    recducePizzaOrderCount(state, pizzaOrderInd) {
      if (--state.order.pizzas[pizzaOrderInd].quantity === 0) {
        state.order.pizzas.splice(pizzaOrderInd, 1);
      }
    },
    addMiscInOrder(state, miscId) {
      state.order.misc.find((item) => item.miscId == miscId).quantity++;
    },
    reduceMiscInOrder(state, miscId) {
      --state.order.misc.find((item) => item.miscId == miscId).quantity;
    },
    addMiscToOrder(state) {
      if (state.order.misc.length === 0) {
        for (var i = 0; i < state.misc.length; i = i + 1) {
          const miscObj = {
            miscId: state.misc[i].id,
            quantity: 0,
          };
          state.order.misc.push(miscObj);
        }
      }
    },
    clearPizzaOrderData(state) {
      state.order.pizzas = [];
      state.order.misc = [];
    },
  },
  actions: {
    addPizzaToOrder(
      { commit, rootState, rootGetters },
      { pizzaName, pizzaOrderInd }
    ) {
      const pizzaOrder = {
        name: pizzaName,
        price: rootGetters["Builder/getPizzaPrice"],
        quantity: 1,
        doughId: rootState.Builder.doughId,
        sizeId: rootState.Builder.sizeId,
        sauceId: rootState.Builder.sauceId,
        ingredients: rootState.Builder.ingredients,
      };

      commit("addPizzaToOrder", { pizzaOrder, pizzaOrderInd });
    },
    async post({ commit }, order) {
      const data = await this.$api.order.post(order);
      commit(
        ADD_ENTITY,
        {
          ...namespaceOrder,
          value: data,
        },
        { root: true }
      );
    },
    async fetchMisc({ commit }) {
      const misc = await this.$api.misc.query();
      // получили справочник
      commit(
        SET_ENTITY,
        {
          ...namespaceMisc,
          value: misc,
        },
        { root: true }
      );
    },
  },
};
