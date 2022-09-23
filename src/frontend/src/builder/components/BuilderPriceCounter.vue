<template>
  <div class="content__result">
    <p>Итого: {{ price }} ₽</p>
    <button type="button" class="button" disabled>Готовьте!</button>
  </div>
</template>

<script>
export default {
  name: "BuilderPriceCounter",
  props: {
    recipe: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {};
  },
  computed: {
    price: function () {
      return 1;
       //мультипликатор размера х (стоимость теста + соус + ингредиенты).
    },
  },
};
</script>
