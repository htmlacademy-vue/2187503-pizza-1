import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import { generateMockStore } from "@/store/mocks";
import { SET_ENTITY } from "@/store/mutations-types";
import BuilderSizeSelector from "@/modules/builder/components/BuilderSizeSelector";
import RadioButton from "@/common/components/RadioButton";
import pizzaParam from "@/static/pizza";
import sizeStatuses from "@/common/enums/sizeStatuses";

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

describe("BuilderSizeSelector", () => {
  const propsData = {};

  const mocks = {
    $router: {
      push: jest.fn(),
    },
  };

  let store;
  let wrapper;
  const createComponent = (options) => {
    wrapper = mount(BuilderSizeSelector, options);
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

  it("renders pizzaParam.size", () => {
    addPizzaParam(store);
    createComponent({ localVue, store, propsData });
    const sizeList = wrapper.findAll('[data-test="size-list"]');
    expect(Array.from(sizeList).length).toEqual(pizzaParam.sizes.length);
  });

  it("renders sizeStauses", () => {
    addPizzaParam(store);
    createComponent({ localVue, store, propsData });
    const filter = wrapper.find('[data-test="size-list"]');
    expect(filter.attributes("class")).toContain(
      `diameter__input diameter__input--${sizeStatuses[pizzaParam.sizes[0].id]}`
    );
  });

  it("calls the vuex mutation on setsize filter click", async () => {
    addPizzaParam(store);
    createComponent({ localVue, store, propsData });

    const radioButton = wrapper.find('[data-test="set-size"]');
    const spyOnMutation = jest.spyOn(wrapper.vm, "updateSizeId");
    await radioButton.trigger("change");
    expect(spyOnMutation).toHaveBeenCalledWith(pizzaParam.sizes[0].id);
  });
});

// Список элементов для тестирования
/*
  + v-for="size in pizzaParam.sizes"
  + :class="`diameter__input diameter__input--${sizeStatuses[size.id]}`"
  + @change="setSize"

  + ...mapMutations("Builder", ["updateSizeId"]),
*/

// Данные из тест-хранилища
/*
  mapState("Builder", ["pizzaParam", "pizza"]),
*/
