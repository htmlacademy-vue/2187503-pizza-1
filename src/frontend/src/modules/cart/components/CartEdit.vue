<template>
  <form method="post" class="layout-form" @submit.prevent="addOrder">
    <main class="content cart">
      <div class="container">
        <div class="cart__title">
          <h1 class="title title--big">Корзина</h1>
        </div>

        <div
          v-if="order.pizzas.length === 0"
          key="no-orders"
          class="sheet cart__empty"
        >
          <p>В корзине нет ни одного товара</p>
        </div>

        <ul v-else key="has-orders" class="cart-list sheet">
          <CartEditPizza
            v-for="(pizzaOrder, index) in order.pizzas"
            :key="index"
            :pizzaOrderInd="index"
            :pizzaOrder="pizzaOrder"
          />
        </ul>

        <div class="cart__additional">
          <ul class="additional-list">
            <CartEditMisc
              v-for="(miscItem, index) in order.misc"
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
        <b>Итого: {{ getOrderPrice }} ₽ {{ order }}</b>
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
import { priceCalc } from "@/common/mixins";
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
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
  mixins: [priceCalc],
  created() {
    this.$store.commit("Cart/addMiscToOrder");
  },
  methods: {
    ...mapMutations("Builder", ["clearPizzaData"]),
    ...mapActions("Orders", {
      orderPost: "post",
      //addressPut: "put",
      //addressDelete: "delete",
    }),
    async addOrder() {
      const order = {
        userId: "e69085d7-8ac6-4bcd-9e02-0ef244b7a806",
        phone: "+7 999-999-99-99",
        address: { street: "", building: "", flat: "", comment: "" },
        pizzas: [
          {
            name: "d",

            quantity: 1,
            doughId: 1,
            sizeId: 1,
            sauceId: 1,
            ingredients: [{ ingredientId: 4, quantity: 1 }],
          },
        ],
        misc: [
          { miscId: 1, quantity: 0 },
          { miscId: 2, quantity: 0 },
          { miscId: 3, quantity: 1 },
        ],
      };

      /*  const order = {
        userId: "e69085d7-8ac6-4bcd-9e02-0ef244b7a806",
        phone: "+7 999-999-99-99",
        address: {
          street: "Test",
          building: "Test",
          flat: "Test",
          comment: "Test",
        },
        pizzas: [
          {
            name: "d",
            quantity: 2,
            doughId: 1,
            sizeId: 1,
            price:400,
            sauceId: 1,
            ingredients: [
              {
                ingredientId: 4,
                quantity: 1,
              },
            ],
          },
        ],
        misc: [],
      }; */ /*
       {
          userId: "e69085d7-8ac6-4bcd-9e02-0ef244b7a806",
          phone: "+7 999-999-99-99",
          address: {
            street: "string",
            building: "string",
            flat: "string",
            comment: "string",
          },
          pizzas: [],
          misc: [],
        }; */
      await this.orderPost(order);
      //this.$router.push({ path: `/popup` });
    },
    wantMore() {
      this.clearPizzaData();
      this.$router.push("/");
    },
  },
  computed: {
    ...mapState(["Auth"]),
    ...mapState("Cart", ["order"]),
    ...mapState("Builder", ["userId"]),
    ...mapGetters("Builder", ["getPizzaPrice"]),
    ...mapGetters("Cart", ["getOrderPrice"]),
    user() {
      return this.Auth.user || {};
    },
  },
};
</script>
