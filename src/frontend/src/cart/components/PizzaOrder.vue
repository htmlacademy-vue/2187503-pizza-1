<template>
  <li class="cart-list__item">
    <div class="product cart-list__product">
      <img
        src="img/product.svg"
        class="product__img"
        width="56"
        height="56"
        alt="Любимая пицца"
      />
      <div class="product__text">
        <h2>{{ pizzaOrder.pizzaName }}</h2>
        <ul>
          <li>
            {{ getSizeName(pizzaOrder.sizeId) }},
            {{ getDoughInfo(pizzaOrder.doughId) }}
          </li>
          <li>Соус: {{ getSauceName(pizzaOrder.sauceId) }}</li>
          <li>
            Начинка: грибы, лук, ветчина, пармезан, ананас, бекон, блю чиз
          </li>
        </ul>
      </div>
    </div>

    <div class="counter cart-list__counter">
      <button type="button" class="counter__button counter__button--minus">
        <span class="visually-hidden">Меньше</span>
      </button>
      <input type="text" name="counter" class="counter__input" value="2" />
      <button
        type="button"
        class="counter__button counter__button--plus counter__button--orange"
      >
        <span class="visually-hidden">Больше</span>
      </button>
    </div>

    <div class="cart-list__price">
      <b>782 ₽</b>
    </div>

    <div class="cart-list__button">
      <button type="button" class="cart-list__edit">Изменить</button>
    </div>
  </li>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "PizzaOrder",
  props: {
    pizzaOrder: {},
  },
  computed: {
    ...mapGetters("Builder", ["getSizeName", "getSauceName"]),
  },
  methods: {
    getDoughInfo(doughId) {
      if (doughId === 1) {
        return "на тонком тесте";
      } else if (doughId === 2) {
        return "на толстом тесте";
      }
    },
  },
};
</script>
