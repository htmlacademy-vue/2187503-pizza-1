import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import { generateMockStore } from "@/store/mocks";
import { SET_ENTITY } from "@/store/mutations-types";
import BuilderIngredientsSelector from "@/modules/builder/components/BuilderIngredientsSelector";
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

describe("BuilderIngredientsSelector", () => {
  const propsData = {};

  const mocks = {
    $router: {
      push: jest.fn(),
    },
  };

  let store;
  let wrapper;
  const createComponent = (options) => {
    wrapper = mount(BuilderIngredientsSelector, options);
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

  it("renders pizzaParam.sauces", () => {
    addPizzaParam(store);
    createComponent({ localVue, store, propsData });
    const sauceList = wrapper.findAll('[data-test="sauceList"]');
    expect(Array.from(sauceList).length).toEqual(pizzaParam.sauces.length);
  });

  it("renders pizzaParam.sauces", () => {
    addPizzaParam(store);
    createComponent({ localVue, store, propsData });
    const ingredientList = wrapper.findAll('[data-test="ingredientList"]');
    expect(Array.from(ingredientList).length).toEqual(
      pizzaParam.ingredients.length
    );
  });
});

// Список элементов для тестирования
/*
  + v-for="sauce in pizzaParam.sauces"
  + @change="setSauce"
  + v-for="ingredient in pizzaParam.ingredients"
  + ...mapMutations("Builder", ["updateSauceId"]),
*/

// Данные из тест-хранилища
/*
  mapState("Builder", ["pizzaParam", "pizza", "sauceStatuses"]),
*/
