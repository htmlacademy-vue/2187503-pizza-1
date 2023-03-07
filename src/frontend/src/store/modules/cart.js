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
        street: "1",
        building: "1",
        flat: "1",
        comment: "1",
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
            state.order.pizzas[i].doughId = pizzaOrder.doughId;
            state.order.pizzas[i].sizeId = pizzaOrder.sizeId;
            state.order.pizzas[i].sauceId = pizzaOrder.sauceId;
            state.order.pizzas[i].ingredients = pizzaOrder.ingredients;
          }
        }
      }
    },
    repeatOrder(state, order) {
      order.orderPizzas.forEach((el) => {
        let pizza = {
          name: el.name,
          doughId: el.doughId,
          sizeId: el.sizeId,
          sauceId: el.sauceId,
          ingredients: el.ingredients,
          quantity: el.quantity,
        };
        state.order.pizzas.push(JSON.parse(JSON.stringify(pizza)));
      });
      order.orderMisc.forEach((el) => {
        /* let misc = {
          miscId: el.miscId,
          quantity: el.quantity,
        };
        state.order.misc.push(JSON.parse(JSON.stringify(misc))); */
        state.order.misc.find((item) => item.miscId == el.miscId).quantity =
          el.quantity;
      });
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
    addAddressPhoneInOrder(state, { address, phone }) {
      if (address != null) {
        state.order.address.street = address.street;
        state.order.address.building = address.building;
        state.order.address.flat = address.flat;
        state.order.address.comment = address.comment;
        state.order.address.id = address.id;
      } else {
        state.order.address = null;
      }
      state.order.phone = phone;
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
    addPizzaToOrder({ commit, rootState }, { pizzaName, pizzaOrderInd }) {
      const pizzaOrder = {
        name: pizzaName,
        quantity: 1,
        doughId: rootState.Builder.pizza.doughId,
        sizeId: rootState.Builder.pizza.sizeId,
        sauceId: rootState.Builder.pizza.sauceId,
        ingredients: rootState.Builder.pizza.ingredients,
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
