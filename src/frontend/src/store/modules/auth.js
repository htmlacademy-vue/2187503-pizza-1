import jsonUsers from '@/static/user.json';

const entity = "users";
const module = "Auth";
const namespace = { entity, module };

export default {
  namespaced: true, // у модуля будет свой префикс
  state: {
    users: []
  },
  actions: {
    fetchUsers({ commit }) {
      const users = jsonUsers;
      commit(
        "SET_ENTITY",
        {
          ...namespace,
          value: users,
        },
        { root: true }
      );
    },
  },
};