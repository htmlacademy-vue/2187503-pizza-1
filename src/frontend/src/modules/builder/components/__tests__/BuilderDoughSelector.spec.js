import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import { generateMockStore } from "@/store/mocks";
import { SET_ENTITY } from "@/store/mutations-types";
import BuilderDoughSelector from "@/modules/builder/components/BuilderDoughSelector";
import RadioButton from "@/common/components/RadioButton";
import pizzaParam from "@/static/pizza";
import doughStatuses from "@/common/enums/doughStatuses";

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

describe("BuilderDoughSelector", () => {
  const propsData = {};

  const mocks = {
    $router: {
      push: jest.fn(),
    },
  };

  let store;
  let wrapper;
  const createComponent = (options) => {
    wrapper = mount(BuilderDoughSelector, options);
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

  it("renders pizzaParam.dough", () => {
    addPizzaParam(store);
    createComponent({ localVue, store, propsData });
    const doughList = wrapper.findAll('[data-test="doughList"]');
    expect(Array.from(doughList).length).toEqual(pizzaParam.dough.length);
  });

  it("renders doughStauses", () => {
    addPizzaParam(store);
    createComponent({ localVue, store, propsData });
    const filter = wrapper.find('[data-test="doughList"]');
    expect(filter.attributes("class")).toContain(
      `dough__input--${doughStatuses[pizzaParam.dough[0].id]}`
    );
  });

  it("calls the vuex mutation on setDough filter click", async () => {
    addPizzaParam(store);
    createComponent({ localVue, store, propsData });

    const radioButton = wrapper.find('[data-test="set-dough"]');
    const spyOnMutation = jest.spyOn(wrapper.vm, "updateDoughId");
    await radioButton.trigger("change");
    expect(spyOnMutation).toHaveBeenCalledWith(pizzaParam.dough[0].id);
  });
});

// Список элементов для тестирования
/*
  + v-for="dough in pizzaParam.dough"
  + :class="`dough__input--${doughStatuses[dough.id]}`"
  + @change="setDough"

  + ...mapMutations("Builder", ["updateDoughId"]),
*/

// Данные из тест-хранилища
/*
  mapState("Builder", ["pizzaParam", "pizza"]),
*/
