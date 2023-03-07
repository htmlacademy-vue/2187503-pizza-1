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
              <select name="test" class="select" v-model="selectedAddress">
                <option :value="{ number: 1, address: null }">
                  Заберу сам
                </option>
                <option
                  :value="{
                    number: 2,
                    address: { strret: null, building: null, flat: null },
                  }"
                >
                  Новый адрес
                </option>
                <option
                  v-show="isAuthenticated"
                  v-for="(address, index) in addresses"
                  :value="{ number: index + 3, address: address }"
                  :key="index"
                >
                  {{ address.name }}
                </option>
              </select>
            </label>

            <label class="input input--big-label">
              <span>Контактный телефон:</span>
              <input
                type="text"
                name="tel"
                placeholder="+7 999-999-99-99"
                v-model="phone"
              />
            </label>

            <div v-if="selectedAddress.number != 1" class="cart-form__address">
              <span v-if="selectedAddress.number === 2" class="cart-form__label"
                >Новый адрес:</span
              >

              <div class="cart-form__input">
                <label class="input">
                  <span>Улица*</span>
                  <input
                    type="text"
                    name="street"
                    v-model="selectedAddress.address.street"
                    :readonly="selectedAddress.number > 2"
                  />
                </label>
              </div>

              <div class="cart-form__input cart-form__input--small">
                <label class="input">
                  <span>Дом*</span>
                  <input
                    type="text"
                    name="house"
                    v-model="selectedAddress.address.building"
                    :readonly="selectedAddress.number > 2"
                  />
                </label>
              </div>

              <div class="cart-form__input cart-form__input--small">
                <label class="input">
                  <span>Квартира</span>
                  <input
                    type="text"
                    name="apartment"
                    v-model="selectedAddress.address.flat"
                    :readonly="selectedAddress.number > 2"
                  />
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
        <b>Итого: {{ $calcPrice(order.pizzas, order.misc) }} ₽</b>
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

import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import orderPrice from "@/common/mixins/orderPrice";
export default {
  name: "CartEdit",
  mixins: [orderPrice],
  data() {
    return {
      selectedAddress: { number: 1, address: null },
      phone: null,
    };
  },
  components: {
    CartEditPizza,
    CartEditMisc,
  },
  created() {
    this.$store.commit("Cart/addMiscToOrder");
  },
  methods: {
    ...mapMutations("Builder", ["clearPizzaData"]),
    ...mapMutations("Cart", ["addAddressPhoneInOrder"]),
    ...mapActions("Orders", {
      orderPost: "post",
    }),
    async addOrder() {
      this.addAddressPhoneInOrder({
        address: this.selectedAddress.address,
        phone: this.phone,
      });
      await this.orderPost(this.order);
      this.$router.push({ path: `/popup` });
    },
    wantMore() {
      this.clearPizzaData();
      this.$router.push("/");
    },
  },
  computed: {
    ...mapState(["Auth"]),
    ...mapState("Profile", ["addresses"]),
    ...mapState("Cart", ["order"]),
    ...mapState("Builder", ["userId"]),
    ...mapGetters("Builder", ["getPizzaPrice"]),
    isAuthenticated() {
      return this.Auth.isAuthenticated;
    },
    user() {
      return this.Auth.user || {};
    },
  },
};
</script>
