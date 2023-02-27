import Vue from "vue";
import Vuex from "vuex";
import modules from "@/store/modules";
import VuexPlugins from "@/plugins/vuexPlugins";
import {
  SET_ENTITY,
  ADD_ENTITY,
  UPDATE_ENTITY,
  DELETE_ENTITY,
} from "@/store/mutations-types";

Vue.use(Vuex);

const mutations = {
  [SET_ENTITY](state, { module, entity, value }) {
    module ? (state[module][entity] = value) : (state[entity] = value);
  },
  [ADD_ENTITY](state, { module, entity, value }) {
    if (module) {
      state[module][entity] = [...state[module][entity], value];
    } else {
      state[entity] = [...state[entity], value];
    }
  },
  [UPDATE_ENTITY](state, { module, entity, value }) {
    if (module) {
      const index = state[module][entity].findIndex(
        ({ id }) => id === value.id
      );
      if (~index) {
        state[module][entity].splice(index, 1, value);
      }
    } else {
      const index = state[entity].findIndex(({ id }) => id === value.id);
      if (~index) {
        state[entity].splice(index, 1, value);
      }
    }
  },
  [DELETE_ENTITY](state, { module, entity, id }) {
    if (module) {
      state[module][entity] = state[module][entity].filter(
        (e) => +e.id !== +id
      );
    } else {
      state[entity] = state[entity].filter((e) => +e.id !== +id);
    }
  },
};

const actions = {
  async init({ dispatch }) {
    dispatch("Builder/fetchPizza");
    dispatch("Builder/fetchSauceStatuses");
    dispatch("Cart/fetchMisc");
    dispatch("Profile/fetchAddresses");
  },
};

export default new Vuex.Store({
  actions,
  mutations,
  modules,
  plugins: [VuexPlugins],
});
