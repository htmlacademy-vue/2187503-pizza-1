import Vue from "vue";
import Vuex from "vuex";
import modules from "@/store/modules";

Vue.use(Vuex);

const state = () => ({
  notifications: [],
  users: [],
});

const mutations = {
  ["SET_ENTITY"](state, { module, entity, value }) {
    module ? (state[module][entity] = value) : (state[entity] = value);
  },
};

const actions = {
  async init({ dispatch }) {
    dispatch("Builder/fetchPizza");
  },
};

export default new Vuex.Store({
  state,
  actions,
  mutations,
  modules,
});
