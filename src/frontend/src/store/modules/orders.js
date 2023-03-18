const entity = "orders";
const module = "Orders";
const namespace = { entity, module };

import { SET_ENTITY, ADD_ENTITY, DELETE_ENTITY } from "@/store/mutations-types";

export default {
  namespaced: true,
  state: {
    orders: [],
  },
  actions: {
    async fetchOrders({ commit }) {
      const orders = await this.$api.orders.query();
      commit(
        SET_ENTITY,
        {
          ...namespace,
          value: orders,
        },
        { root: true }
      );
    },
    async post({ commit }, order) {
      const data = await this.$api.orders.post(order);
      commit(
        ADD_ENTITY,
        {
          ...namespace,
          value: data,
        },
        { root: true }
      );
    },
    async delete({ commit }, id) {
      await this.$api.orders.delete(id);
      commit(
        DELETE_ENTITY,
        {
          ...namespace,
          id,
        },
        { root: true }
      );
    },
  },
};
