<template>
  <div class="counter counter--orange ingredients__counter">
    <button
      type="button"
      class="counter__button counter__button--minus"
      @click="DropItem"
      :disabled="itemCount == 0"
    >
      <span class="visually-hidden">Меньше</span>
    </button>
    <input
      type="text"
      name="counter"
      class="counter__input"
      :value="itemCount"
    />
    <button
      type="button"
      class="counter__button counter__button--plus"
      @click="AddItem"
      :disabled="itemCount == 3"
    >
      <span class="visually-hidden">Больше</span>
    </button>
  </div>
</template>
<script>
export default {
  name: "ItemCounter",
  data() {
    return {
      count: 0,
    };
  },
  props: {
    ingredientId: {
      type: Number,
      required: true,
    },
    recipe: {
      type: Object,
      required: true,
    },
  },
  methods: {
    AddItem() {
      for (var i = 0; i < this.recipe.ingredients.length; i = i + 1) {
        if (this.recipe.ingredients[i].ingredientId === this.ingredientId) {
          this.recipe.ingredients[i].itemCount += 1;
        }
      }
      if (this.count === 0) {
        this.recipe.ingredients.push({
          ingredientId: this.ingredientId,
          itemCount: 1,
        });
      }
    },
    DropItem() {
      var cnt = 0;
      var findedInd = -1;
      for (var i = 0; i < this.recipe.ingredients.length; i = i + 1) {
        if (this.recipe.ingredients[i].ingredientId === this.ingredientId) {
          this.recipe.ingredients[i].itemCount -= 1;
          findedInd = i;
          cnt = this.recipe.ingredients[i].itemCount;
        }
      }
      if (findedInd > -1 && cnt === 0) {
        this.recipe.ingredients.splice(findedInd, 1);
      }
    },
  },
  computed: {
    itemCount: function () {
      for (var i = 0; i < this.recipe.ingredients.length; i = i + 1) {
        if (this.recipe.ingredients[i].ingredientId === this.ingredientId) {
          return this.recipe.ingredients[i].itemCount;
        }
      }
      return 0;
    },
  },
};
</script>
