const calcSizeCoeff = (toColumnId, tasks) => {
  return tasks.filter((task) => task.columnId === toColumnId);
};

export default {
  methods: {
    $calcPizzaPrice(id) {
      calcSizeCoeff(id);
      //return this.$store.getters["Builder/getSizeMultiplier"](id);
    },
  },
};
