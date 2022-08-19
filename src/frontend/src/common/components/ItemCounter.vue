<template>
  <div class="counter counter--orange ingredients__counter">
    <button
      type="button"
      class="counter__button counter__button--minus"
      @click="count -= 1"
      :disabled="count == 0"
    >
      <span class="visually-hidden">Меньше</span>
    </button>
    <input type="text" name="counter" class="counter__input" :value="count" />
    <button
      type="button"
      class="counter__button counter__button--plus"
      @click="count += 1"
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
  methods: {
    AddItem() {
      this.count += 1;
    },
  },
};
</script>
