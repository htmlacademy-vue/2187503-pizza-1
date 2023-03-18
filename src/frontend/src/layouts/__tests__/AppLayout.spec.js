import { shallowMount } from "@vue/test-utils";
import AppLayout from "@/layouts/AppLayout";
import AppNotifications from "@/common/components/AppNotifications";

const propsData = {
  pizzaOrder: {},
  auth: true,
};

const mocks = {
  $store: {
    state: {
      notifications: [],
    },
  },
  $route: {
    meta: {
      layout: "",
    },
  },
};
const stubs = {
  AppNotifications,
};

describe("AppLayout", () => {
  let wrapper;
  const createComponent = (options) => {
    wrapper = shallowMount(AppLayout, options);
  };

  it("is rendered", () => {
    createComponent({ stubs, mocks, propsData });
    expect(wrapper.exists()).toBeTruthy();
  });
});
