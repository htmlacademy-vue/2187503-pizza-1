import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import { generateMockStore } from "@/store/mocks";
import { SET_ENTITY } from "@/store/mutations-types";
import BuilderPriceCounter from "@/modules/builder/components/BuilderPriceCounter";
import RadioButton from "@/common/components/RadioButton";
import pizzaParam from "@/static/pizza";

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

const addPizzaOrderInd = (store) => {
  store.commit(SET_ENTITY, {
    module: "Builder",
    entity: "pizzaOrderInd",
    value: null,
  });
};

const pizzaData = {
  doughId: 1,
  sizeId: 1,
  sauceId: 1,
  ingredients: [{ ingredientId: 1, quantity: 1 }],
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

describe("BuilderPriceCounter", () => {
  const propsData = {
    pizzaName: "My favorite pizza",
  };

  let actions;

  const mocks = {
    $router: {
      push: jest.fn(),
    },
    $route: {
      params: { id: 1 },
    },
  };

  let store;
  let wrapper;
  const createComponent = (options) => {
    wrapper = mount(BuilderPriceCounter, options);
  };

  beforeEach(() => {
    actions = {
      Cart: {
        addPizzaToOrder: jest.fn(),
      },
    };
    store = generateMockStore(actions);
    mocks.$router.push = jest.fn();
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("is rendered", () => {
    createComponent({ localVue, store, propsData });
    expect(wrapper.exists()).toBeTruthy();
  });

  it("displays onCook button", () => {
    createComponent({ localVue, store, propsData });
    const button = wrapper.find('[data-test="on-cook"]');
    expect(button.exists()).toBeTruthy();
    expect(button.text()).toBe("Готовьте!");
  });

  it("onCook click", async () => {
    addPizzaOrderInd(store);
    addPizzaData(store);
    addPizzaParam(store);
    createComponent({ localVue, store, mocks, propsData });
    const button = wrapper.find('[data-test="on-cook"]');
    await button.trigger("click");
    expect(actions.Cart.addPizzaToOrder).toHaveBeenCalledWith(
      expect.any(Object), // The Vuex context
      {
        pizzaName: "My favorite pizza",
        pizzaOrderInd: null,
      }
    );
  });
});

// Список элементов для тестирования
/*
  + :disabled="buttonCookDisabled"
  + @click="onCook()"

  + ...mapGetters("Builder", ["getPizzaPrice", "getIngredientsPrice"]),
*/

// Данные из тест-хранилища
/*
  mapState("Builder", ["pizza", "pizzaOrderInd"]),
*/
