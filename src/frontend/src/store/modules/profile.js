const entity = "addresses";
const module = "Profile";
const namespace = { entity, module };

import {
  SET_ENTITY,
  ADD_ENTITY,
  UPDATE_ENTITY,
  DELETE_ENTITY,
} from "@/store/mutations-types";

export default {
  namespaced: true,
  state: {
    addresses: [],
  },
  actions: {
    async fetchAddresses({ commit }) {
      const addresses = await this.$api.addresses.query();
      commit(
        SET_ENTITY,
        {
          ...namespace,
          value: addresses,
        },
        { root: true }
      );
    },
    async post({ commit }, addresses) {
      const data = await this.$api.addresses.post(addresses);
      commit(
        ADD_ENTITY,
        {
          ...namespace,
          value: data,
        },
        { root: true }
      );
    },
    async put({ commit }, addresses) {
      await this.$api.addresses.put(addresses);
      commit(
        UPDATE_ENTITY,
        {
          ...namespace,
          value: addresses,
        },
        { root: true }
      );
    },

    async delete({ commit }, id) {
      await this.$api.addresses.delete(id);
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
