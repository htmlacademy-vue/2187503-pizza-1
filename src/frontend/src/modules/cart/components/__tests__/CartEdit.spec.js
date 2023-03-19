import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import { generateMockStore } from "@/store/mocks";
import { SET_ENTITY } from "@/store/mutations-types";
import CartEdit from "@/modules/cart/components/CartEdit";
import RadioButton from "@/common/components/RadioButton";
import { authenticateUser } from "@/common/helpers";

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.component("RadioButton", RadioButton);

const order = {
  userId: "e69085d7-8ac6-4bcd-9e02-0ef244b7a806",
  phone: "+7 999-999-99-99",
  pizzas: [],
  misc: [],
  address: {
    street: "1",
    building: "1",
    flat: "1",
    comment: "1",
  },
};

const addOrder = (store) => {
  store.commit(SET_ENTITY, {
    module: "Cart",
    entity: "order",
    value: order,
  });
};

const addresses = [
  {
    id: 1,
    name: "Bleecker_Street",
    street: "Bleecker Street",
    building: "177",
    flat: "1",
    comment: "stringComment",
    userId: "uuid",
  },
];

const addAddress = (store) => {
  store.commit(SET_ENTITY, {
    module: "Profile",
    entity: "addresses",
    value: addresses,
  });
};

describe("CartEdit", () => {
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

  const createComponent = (options) => {
    wrapper = mount(CartEdit, options);
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
    createComponent({ localVue, store, propsData });
    expect(wrapper.exists()).toBeTruthy();
  });

  it("renders cartEditPizza", () => {
    addOrder(store);
    createComponent({ localVue, store, propsData });
    const cartEditPizza = wrapper.findAll('[data-test="cart-edit-pizza"]');
    expect(Array.from(cartEditPizza).length).toEqual(order.pizzas.length);
  });

  it("renders cartEditMisc", () => {
    addOrder(store);
    createComponent({ localVue, store, propsData });
    const cartEditMisc = wrapper.findAll('[data-test="cart-edit-misc"]');
    expect(Array.from(cartEditMisc).length).toEqual(order.misc.length);
  });

  it("renders cartEditMisc no options", () => {
    createComponent({ localVue, store, propsData });
    const selectAddress = wrapper.find('[data-test="select-address"]');
    const options = selectAddress.findAll("option");
    expect(Array.from(options).length).toEqual(2);
  });

  it("renders cartEditMisc user address option", () => {
    addAddress(store);
    authenticateUser(store);
    createComponent({ localVue, store, propsData });
    const selectAddress = wrapper.find('[data-test="select-address"]');
    const options = selectAddress.findAll("option");
    expect(Array.from(options).length).toEqual(3);
  });

  it("has been called on form submit", async () => {
    createComponent({ localVue, mocks, propsData });
    await wrapper.find("form").trigger("submit");
    expect(dispatch).toHaveBeenCalled();
    expect(push).toHaveBeenCalledWith({ path: "/popup" });
  });
});

// Список элементов для тестирования
/*
  + v-for="(pizzaOrder, index) in order.pizzas"
  + v-for="(miscItem, index) in order.misc"
  + v-show="isAuthenticated"
  + v-for="(address, index) in addresses"
  +  ...mapMutations("Builder", ["clearPizzaData"]),
  +  ...mapMutations("Cart", ["addAddressPhoneInOrder"]),
  +  ...mapActions("Orders", {orderPost: "post",}),
  + this.$router.push({ path: `/popup` });
*/

// Данные из тест-хранилища
/*
    ...mapState(["Auth"]),
    ...mapState("Profile", ["addresses"]),
    ...mapState("Cart", ["order"]),
    ...mapState("Builder", ["userId"]),
    ...mapGetters("Builder", ["getPizzaPrice"]),
*/
