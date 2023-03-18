import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import { generateMockStore } from "@/store/mocks";
import ProfileAddressesSelector from "@/modules/profile/components/ProfileAddressesSelector";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("ProfileAddressesSelector", () => {
  const propsData = { address: {}, addressNumber: 1, isNew: true };

  const mocks = {
    $router: {
      push: jest.fn(),
    },
  };

  let store;
  let wrapper;
  const createComponent = (options) => {
    wrapper = mount(ProfileAddressesSelector, options);
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

  /* it("calls the vuex mutation on setSauce filter click", async () => {
    addPizzaParam(store);
    createComponent({ localVue, store, propsData });

    const radioButton = wrapper.find('[data-test="set-sauce"]');
    const spyOnMutation = jest.spyOn(wrapper.vm, "updateSauceId");
    await radioButton.trigger("change");
    expect(spyOnMutation).toHaveBeenCalledWith(pizzaParam.sauces[0].id);
  }); */
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
