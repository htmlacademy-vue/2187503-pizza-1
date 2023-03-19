import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import { generateMockStore } from "@/store/mocks";
import { SET_ENTITY } from "@/store/mutations-types";
import OrdersEdit from "@/modules/orders/components/OrdersEdit";
import pizzaParam from "@/static/pizza";
import misc from "@/static/misc";
import flushPromises from "flush-promises";
import AppLayoutUserDataSidebar from "@/layouts/AppLayoutUserDataSidebar";
import { RouterLinkStub } from "@vue/test-utils";

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.component(AppLayoutUserDataSidebar);

const orders = [
  {
    id: 1,
    phone: null,
    userId: "uuid",
    addressId: null,
    orderPizzas: [
      {
        id: 1,
        name: "Карбонара",
        quantity: 4,
        sauceId: 1,
        doughId: 1,
        sizeId: 1,
        orderId: 1,
        ingredients: [
          {
            id: 1,
            quantity: 1,
            pizzaId: 1,
            ingredientId: 4,
          },
        ],
      },
    ],
    orderMisc: [
      {
        id: 1,
        quantity: 0,
        orderId: 1,
        miscId: 1,
      },
      {
        id: 2,
        quantity: 0,
        orderId: 1,
        miscId: 2,
      },
      {
        id: 3,
        quantity: 0,
        orderId: 1,
        miscId: 3,
      },
    ],
  },
];

const addOrder = (store) => {
  store.commit(SET_ENTITY, {
    module: "Orders",
    entity: "orders",
    value: orders,
  });
};

const addPizzaParam = (store) => {
  store.commit(SET_ENTITY, {
    module: "Builder",
    entity: "pizzaParam",
    value: pizzaParam,
  });
};

const addMisc = (store) => {
  store.commit(SET_ENTITY, {
    module: "Cart",
    entity: "misc",
    value: misc,
  });
};

describe("OrdersEdit", () => {
  let routerPush;
  let dispatch;
  let store;
  let push;
  let wrapper;
  const propsData = {};

  const mocks = {
    $router: {
      push: routerPush,
    },
    $store: {},
  };

  const stubs = { RouterLink: RouterLinkStub };

  const createComponent = (options) => {
    wrapper = mount(OrdersEdit, options);
  };

  beforeEach(() => {
    store = generateMockStore();

    dispatch = jest.fn();
    push = jest.fn();
    store.dispatch = dispatch;
    mocks.$store = store;
    mocks.$router.push = push;
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("is rendered", () => {
    createComponent({ localVue, stubs, store, propsData });
    expect(wrapper.exists()).toBeTruthy();
  });

  it("renders orders", () => {
    addOrder(store);
    addPizzaParam(store);
    addMisc(store);
    createComponent({ localVue, stubs, mocks, store, propsData });
    const orders = wrapper.findAll('[data-test="orders"]');
    expect(Array.from(orders).length).toEqual(orders.length);
    const ordersPizzas = wrapper.findAll('[data-test="orders-pizzas"]');
    expect(Array.from(ordersPizzas).length).toEqual(1);
    const ordersMisc = wrapper.findAll('[data-test="orders-misc"]');
    expect(Array.from(ordersMisc).length).toEqual(3);
  });

  it("deleter order", async () => {
    addOrder(store);
    addPizzaParam(store);
    addMisc(store);
    createComponent({ localVue, stubs, mocks, store, propsData });
    const spyOnAction = jest.spyOn(wrapper.vm, "orderDelete");
    await flushPromises();
    await wrapper.find('[data-test="delete-order"]').trigger("click");
    expect(spyOnAction).toHaveBeenCalled();
  });

  it("repeat order", async () => {
    addOrder(store);
    addPizzaParam(store);
    addMisc(store);
    createComponent({ localVue, store, stubs, mocks });
    const spyOnMutation = jest.spyOn(wrapper.vm, "repeatOrder");

    const repeatOrder = wrapper.find('[data-test="repeat-order"]');
    await repeatOrder.trigger("click");
    expect(spyOnMutation).toHaveBeenCalled();
  });
});

// Список элементов для тестирования
/*
  + v-for="order in orders"
  + @click="deleteOrder(order.id)"
  + v-for="pizza in order.orderPizzas"
  + v-for="misc in order.orderMisc" :key="'C' + misc.id">
  + ...mapActions("Orders", {
      orderDelete: "delete",
    }),
  +  ...mapMutations("Cart", ["repeatOrder"]),
  +  @click="repeatOrder(order)"
*/

// Данные из тест-хранилища
/*
    ...mapState("Orders", ["orders"]),
    ...mapGetters("Builder", [
      "getSizeName",
      "getSauceName",
      "getIngredientsName",
      "getPizzaPrice",
    ]),
    ...mapGetters("Cart", ["getMiscById"]),
*/
