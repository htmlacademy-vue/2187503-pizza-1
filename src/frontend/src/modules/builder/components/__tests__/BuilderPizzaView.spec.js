import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import { generateMockStore } from "@/store/mocks";
import { SET_ENTITY } from "@/store/mutations-types";
import BuilderPizzaView from "@/modules/builder/components/BuilderPizzaView";
import RadioButton from "@/common/components/RadioButton";
import pizzaParam from "@/static/pizza";
//import BuilderPriceCounter from "@/modules/builder/components/BuilderPriceCounter";
//import AppDrop from "@/common/components/AppDrop";

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.component("RadioButton", RadioButton);

const addPizzaParam = (store) => {
  store.commit(SET_ENTITY, {
    module: "Builder",
    entity: "pizzaParam",
    value: pizzaParam,
  });
};

const pizzaData = {
  doughId: 1,
  sizeId: 1,
  sauceId: 1,
  ingredients: [
    { ingredientId: 1, quantity: 1 },
    { ingredientId: 2, quantity: 2 },
    { ingredientId: 3, quantity: 2 },
    { ingredientId: 4, quantity: 3 },
    { ingredientId: 5, quantity: 3 },
    { ingredientId: 6, quantity: 3 },
  ],
  userId: null,
  name: "MyPizza",
};

const addPizzaData = (store) => {
  store.commit(SET_ENTITY, {
    module: "Builder",
    entity: "pizza",
    value: pizzaData,
  });
};

describe("BuilderPizzaView", () => {
  const propsData = {};

  const mocks = {
    $router: {
      push: jest.fn(),
    },
  };

  let store;
  let wrapper;
  const createComponent = (options) => {
    wrapper = mount(BuilderPizzaView, options);
  };

  beforeEach(() => {
    store = generateMockStore();
    mocks.$router.push = jest.fn();
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("is rendered", () => {
    createComponent({ localVue, store, propsData });
    expect(wrapper.exists()).toBeTruthy();
  });

  it("renders pizza.ingredients one", () => {
    addPizzaParam(store);
    addPizzaData(store);
    createComponent({ localVue, store, propsData });
    const oneList = wrapper.find('[data-test="pizza-filling-1"]');
    expect(oneList.exists()).toBeTruthy();
    const oneAllList = wrapper.findAll('[data-test="pizza-filling-1"]');
    expect(Array.from(oneAllList).length).toEqual(6);
  });

  it("renders pizza.ingredients two", () => {
    addPizzaParam(store);
    addPizzaData(store);
    createComponent({ localVue, store, propsData });
    const oneList = wrapper.find('[data-test="pizza-filling-2"]');
    expect(oneList.exists()).toBeTruthy();
    const oneAllList = wrapper.findAll('[data-test="pizza-filling-2"]');
    expect(Array.from(oneAllList).length).toEqual(5);
  });
  it("renders pizza.ingredients tree", () => {
    addPizzaParam(store);
    addPizzaData(store);
    createComponent({ localVue, store, propsData });
    const oneList = wrapper.find('[data-test="pizza-filling-3"]');
    expect(oneList.exists()).toBeTruthy();
    const oneAllList = wrapper.findAll('[data-test="pizza-filling-3"]');
    expect(Array.from(oneAllList).length).toEqual(3);
  });
});

// Список элементов для тестирования
/*
  + v-for="item in pizza.ingredients.filter(
                  (item) => item.quantity >= 1
                )"
  + v-for="item in pizza.ingredients.filter(
                  (item) => item.quantity >= 2
                )"
  + v-for="item in pizza.ingredients.filter(
                  (item) => item.quantity === 3
                )"

  + ...mapMutations("Builder", ["addItem", "updatePizzaName"]),
*/

// Данные из тест-хранилища
/*
  ...mapState("Builder", ["pizza", "pizzaParam"]),
*/
