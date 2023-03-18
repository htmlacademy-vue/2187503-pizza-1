import { createLocalVue, mount } from "@vue/test-utils";
import Vuex from "vuex";
import { generateMockStore } from "@/store/mocks";
import AppLayoutMain from "@/layouts/AppLayoutMain";
import AppNotifications from "@/common/components/AppNotifications.vue";

const propsData = {
  pizzaOrder: {},
  auth: true,
};

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.component("AppNotifications", AppNotifications);

describe("AppLayoutMain", () => {
  const mocks = {
    $route: {
      name: "test",
    },
  };

  const stubs = ["router-link"];

  let store;
  let wrapper;
  const createComponent = (options) => {
    wrapper = mount(AppLayoutMain, options);
  };

  beforeEach(() => {
    store = generateMockStore();
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("is rendered", () => {
    createComponent({ localVue, store, mocks, stubs, propsData });
    expect(wrapper.exists()).toBeTruthy();
  });
});
