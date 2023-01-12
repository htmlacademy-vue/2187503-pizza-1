<template>
  <form
    method="post"
    class="layout-form"
    @submit.prevent="$router.push({ path: `/popup` })"
  >
    <main class="content cart">
      <div class="container">
        <div class="cart__title">
          <h1 class="title title--big">Корзина</h1>
        </div>

        <div
          v-if="pizzaOrders.length === 0"
          key="no-orders"
          class="sheet cart__empty"
        >
          <p>В корзине нет ни одного товара</p>
        </div>

        <ul v-else key="has-orders" class="cart-list sheet">
          <CartEditPizza
            v-for="(pizzaOrder, index) in pizzaOrders"
            :key="index"
            :pizzaOrderInd="index"
            :pizzaOrder="pizzaOrder"
          />
        </ul>

        <div class="cart__additional">
          <ul class="additional-list">
            <CartEditMisc
              v-for="(miscItem, index) in miscOrders"
              :key="index"
              :miscInd="index"
              :miscItem="miscItem"
            />
          </ul>
        </div>

        <div class="cart__form">
          <div class="cart-form">
            <label class="cart-form__select">
              <span class="cart-form__label">Получение заказа:</span>

              <select name="test" class="select" v-model="howGetOrder">
                <option value="1">Заберу сам</option>
                <option value="2">Новый адрес</option>
                <option v-if="userId != null" value="3">Дом</option>
              </select>
            </label>

            <label class="input input--big-label">
              <span>Контактный телефон:</span>
              <input type="text" name="tel" placeholder="+7 999-999-99-99" />
            </label>

            <div v-if="howGetOrder != 1" class="cart-form__address">
              <span class="cart-form__label">Новый адрес:</span>

              <div class="cart-form__input">
                <label class="input">
                  <span>Улица*</span>
                  <input type="text" name="street" />
                </label>
              </div>

              <div class="cart-form__input cart-form__input--small">
                <label class="input">
                  <span>Дом*</span>
                  <input type="text" name="house" />
                </label>
              </div>

              <div class="cart-form__input cart-form__input--small">
                <label class="input">
                  <span>Квартира</span>
                  <input type="text" name="apartment" />
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
    <section class="footer">
      <div class="footer__more">
        <a class="button button--border button--arrow" @click="wantMore"
          >Хочу еще одну</a
        >
      </div>

      <p class="footer__text">
        Перейти к конструктору<br />чтоб собрать ещё одну пиццу
      </p>
      <div class="footer__price">
        <b>Итого: {{ getMiscPrice + getPizzaOrdersPrice }} ₽</b>
      </div>

      <div class="footer__submit">
        <button type="submit" class="button">Оформить заказ</button>
      </div>
    </section>
  </form>
</template>
<script>
import CartEditPizza from "@/cart/components/CartEditPizza";
import CartEditMisc from "@/cart/components/CartEditMisc";
import { mapState, mapGetters, mapMutations } from "vuex";
export default {
  name: "CartEdit",
  data() {
    return {
      howGetOrder: 1,
    };
  },
  components: {
    CartEditPizza,
    CartEditMisc,
  },
  created() {
    this.$store.commit("Cart/createMiscOrders");
  },
  methods: {
    ...mapMutations("Builder", ["clearPizzaData"]),
    wantMore() {
      this.clearPizzaData();
      this.$router.push("/");
    },
  },
  computed: {
    ...mapState("Cart", ["pizzaOrders", "miscOrders"]),
    ...mapState("Builder", ["userId"]),
    ...mapGetters("Builder", ["getPizzaPrice"]),
    ...mapGetters("Cart", ["getMiscPrice", "getPizzaOrdersPrice"]),
  },
};
</script>
