<template>
  <div class="counter counter--orange ingredients__counter">
    <button
      type="button"
      class="counter__button counter__button--minus"
      @click="DropItem"
      :disabled="count == 0"
    >
      <span class="visually-hidden">Меньше</span>
    </button>
    <input type="text" name="counter" class="counter__input" :value="count" />
    <button
      type="button"
      class="counter__button counter__button--plus"
      @click="AddItem"
      :disabled="count == 3"
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
  },
  methods: {
    AddItem() {
      this.count += 1;
      this.$emit("setItemCount", this.ingredientId, this.count);
    },
    DropItem() {
      this.count -= 1;
      this.$emit("setItemCount", this.ingredientId, this.count);
    },
  },
};
</script>
