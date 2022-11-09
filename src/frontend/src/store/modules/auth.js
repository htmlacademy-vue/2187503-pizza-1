import users from '@/static/user.json';

export default {
  namespaced: true, // у модуля будет свой префикс
  state: {
    user: users[0]
  }
};