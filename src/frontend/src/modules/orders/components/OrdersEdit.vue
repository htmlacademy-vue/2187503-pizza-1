<template>
  <main class="layout" style="display: flex">
    <AppLayoutUserDataSidebar />

    <div class="layout__content" style="flex-grow: 2">
      <div class="layout__title">
        <h1 class="title title--big">История заказов</h1>
      </div>

      <section
        v-for="order in orders"
        :key="'A' + order.id"
        class="sheet order"
      >
        <div class="order__wrapper">
          <div class="order__number">
            <b>Заказ #{{ order.id }}</b>
          </div>

          <div class="order__sum">
            <span
              >Сумма заказа:
              {{ $calcPrice(order.orderPizzas, order.orderMisc) }}</span
            >
          </div>

          <div class="order__button">
            <button
              type="button"
              class="button button--border"
              @click="deleteOrder(order.id)"
            >
              Удалить
            </button>
          </div>
          <div class="order__button">
            <button type="button" class="button" @click="repeatOrder(order)">
              Повторить
            </button>
          </div>
        </div>

        <ul
          v-for="pizza in order.orderPizzas"
          :key="'B' + pizza.id"
          class="order__list"
        >
          <li class="order__item">
            <div class="product">
              <img
                src="../../../img/product.svg"
                class="product__img"
                width="56"
                height="56"
                :alt="pizza.name"
              />
              <div class="product__text">
                <h2>{{ pizza.name }}</h2>
                <ul>
                  <li>
                    {{ getSizeName(pizza.sizeId) }},
                    {{ getDoughInfo(pizza.doughId) }}
                  </li>
                  <li>Соус: {{ getSauceName(pizza.sauceId) }}</li>
                  <li>
                    Начинка: {{ getIngredientsName(pizza.ingredients) }}
                    чиз
                  </li>
                </ul>
              </div>
            </div>

            <p class="order__price">
              {{ getPizzaPrice(pizza) * pizza.quantity }} ₽
            </p>
          </li>
        </ul>

        <ul
          v-for="misc in order.orderMisc"
          :key="'C' + misc.id"
          class="order__additional"
        >
          <li>
            <img
              :src="getMiscById(misc.miscId).image"
              width="20"
              height="30"
              :alt="getMiscById(misc.miscId).name"
            />
            <p>
              <span>{{ getMiscById(misc.miscId).name }}</span>
              <b>{{ misc.quantity * getMiscById(misc.miscId).price }} ₽</b>
            </p>
          </li>
        </ul>

        <p class="order__address">
          Адрес доставки: {{ order.orderAddress?.name }} Телефон:
          {{ order.phone }}
        </p>
      </section>
    </div>
  </main>
</template>
<script>
import { mapState, mapActions, mapGetters, mapMutations } from "vuex";
import AppLayoutUserDataSidebar from "@/layouts/AppLayoutUserDataSidebar";
import orderPrice from "@/common/mixins/orderPrice";

export default {
  name: "OrdersEdit",
  components: {
    AppLayoutUserDataSidebar,
  },
  mounted() {
    console.log(11111);
    this.$store.dispatch("Orders/fetchOrders");
    //   axios
    //   .get('http://10.27.1.9:5000/reg?login=!&password=!')
  },
  mixins: [orderPrice],
  methods: {
    ...mapActions("Orders", {
      orderDelete: "delete",
    }),
    ...mapActions("Cart", ["addPizzaToOrder"]),
    ...mapMutations("Cart", ["repeatOrder"]),
    async deleteOrder(id) {
      await this.orderDelete(id);
    },
    getDoughInfo(doughId) {
      if (doughId === 1) {
        return "на тонком тесте";
      } else if (doughId === 2) {
        return "на толстом тесте";
      }
    },
  },
  computed: {
    ...mapState("Orders", ["orders"]),
    ...mapGetters("Builder", [
      "getSizeName",
      "getSauceName",
      "getIngredientsName",
      "getPizzaPrice",
    ]),
    ...mapGetters("Cart", ["getMiscById"]),
  },
};
</script>
