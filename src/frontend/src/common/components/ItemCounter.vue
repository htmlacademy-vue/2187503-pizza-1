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
import { mapState, mapMutations } from "vuex";
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
  },
  methods: {
    ...mapMutations("Builder", ["addItem", "dropItem"]),
    AddItem() {
      this.addItem(this.ingredientId);
    },
    DropItem() {
      this.dropItem(this.ingredientId);
    },
  },
  computed: {
    ...mapState("Builder", ["pizza"]),
    itemCount: function () {
      var quantity = 0;
      this.pizza.ingredients.forEach((element) => {
        if (element.ingredientId === this.ingredientId) {
          quantity = element.quantity;
        }
      });
      return quantity;
    },
  },
};
</script>
