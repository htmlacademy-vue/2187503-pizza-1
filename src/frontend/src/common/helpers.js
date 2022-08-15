import doughStatuses from "@/common/enums/doughStatuses";
// получение
export const getDoughStatus = (pizza) => {
  return {
    ...pizza,
    doughStatus: pizza.Id ? doughStatuses[pizza.statusId] : "",
  };
};
