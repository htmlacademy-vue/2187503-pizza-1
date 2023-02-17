import resources from "@/common/enums/resources";
import {
  AuthApiService,
  //CrudApiService,
  ReadOnlyApiService,
} from "@/services/api.service";
/*import doughStatuses from "@/common/enums/doughStatuses";
// получение
 export const getDoughStatus = (pizza) => {
  return {
    ...pizza,
    doughStatus: pizza.Id ? doughStatuses[pizza.statusId] : "",
  };
}; */
export const setAuth = (store) => {
  store.$api.auth.setAuthHeader();
  store.dispatch("Auth/getMe");
};
export const createResources = (notifier) => {
  return {
    [resources.USERS]: new ReadOnlyApiService(resources.USERS, notifier),
    [resources.AUTH]: new AuthApiService(notifier),
    [resources.DOUGH]: new ReadOnlyApiService(resources.DOUGH, notifier),
    [resources.SIZES]: new ReadOnlyApiService(resources.SIZES, notifier),
    [resources.SAUCES]: new ReadOnlyApiService(resources.SAUCES, notifier),
    [resources.INGREDIENTS]: new ReadOnlyApiService(
      resources.INGREDIENTS,
      notifier
    ),
    [resources.MISC]: new ReadOnlyApiService(resources.MISC, notifier),
    //[resources.PIZZAORDER]: new CrudApiService(resources.PIZZAORDER, notifier),
  };
};
