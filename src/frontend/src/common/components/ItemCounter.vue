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
    return {};
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
      this.$emit("AddItem", this.ingredientId);
    },
    DropItem() {
      this.$emit("DropItem", this.ingredientId);
    },
  },
  computed: {
    itemCount: function () {
      var itemCount = 0;
      this.recipe.ingredients.forEach((element) => {
        if (element.ingredientId === this.ingredientId) {
          itemCount = element.itemCount;
        }
      });
      return itemCount;
    },
  },
};
</script>
