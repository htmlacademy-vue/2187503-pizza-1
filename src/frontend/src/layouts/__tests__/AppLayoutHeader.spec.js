import { createLocalVue, mount } from "@vue/test-utils";
import Vuex from "vuex";
import { generateMockStore } from "@/store/mocks";
import AppLayoutHeader from "@/layouts/AppLayoutHeader";
import { authenticateUser } from "@/common/helpers";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("AppLayoutHeader", () => {
  const directives = {
    clickOutside: jest.fn(),
  };

  const mocks = {
    $router: {
      push: jest.fn(),
    },
    $notifier: {
      success: jest.fn(),
    },
  };

  const propsData = {
    auth: true,
  };

  const stubs = ["router-link"];

  let actions;
  let store;
  let wrapper;
  const createComponent = (options) => {
    wrapper = mount(AppLayoutHeader, options);
  };

  beforeEach(() => {
    actions = {
      Auth: {
        logout: jest.fn(),
      },
    };
    directives.clickOutside = jest.fn();
    mocks.$notifier.success = jest.fn();
    mocks.$router.push = jest.fn();
    store = generateMockStore(actions);
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("is rendered", () => {
    createComponent({ localVue, store, mocks, stubs, propsData });
    expect(wrapper.exists()).toBeTruthy();
  });

  it("renders header exists button Enter", () => {
    createComponent({ localVue, store, mocks, stubs, propsData });
    const headerUserMenu = wrapper.find('[data-test="header-user"]');
    expect(headerUserMenu.exists()).toBeTruthy();
    expect(headerUserMenu.find("span").text()).toBe("Войти");
  });

  it("renders header not exists button Enter", () => {
    authenticateUser(store);
    createComponent({ localVue, store, mocks, stubs, propsData });
    const headerUserMenu = wrapper.find('[data-test="header-user"]');
    expect(headerUserMenu.exists()).toBeFalsy();
  });

  it("render header__login", async () => {
    authenticateUser(store);
    createComponent({ localVue, store, mocks, stubs, propsData });
    const headerLogin = wrapper.find('[data-test="header__login"]');
    expect(headerLogin.html()).toContain('to="/profile"');
  });

  it("renders header exists button Logout", () => {
    createComponent({ localVue, store, mocks, stubs, propsData });
    const headerLogout = wrapper.find('[data-test="header__logout"]');
    expect(headerLogout.exists()).toBeFalsy();
  });

  it("renders header exists button Logout", () => {
    authenticateUser(store);
    createComponent({ localVue, store, mocks, stubs, propsData });
    const headerLogout = wrapper.find('[data-test="header__logout"]');
    expect(headerLogout.exists()).toBeTruthy();
    expect(headerLogout.find("span").text()).toBe("Выйти");
  });

  it("call button Logout", async () => {
    authenticateUser(store);
    createComponent({ localVue, store, mocks, stubs, propsData });
    const headerLogout = wrapper.find('[data-test="header__logout"]');
    await headerLogout.trigger("click");
    expect(actions.Auth.logout).toHaveBeenCalled();
    expect(mocks.$notifier.success).toHaveBeenCalled();
    expect(mocks.$router.push).toHaveBeenCalledWith("/login");
  });
});

// Протестировать
/*
  + v-if="!isAuthenticated" key="is-not-auth"
  + <router-link v-else key="is-auth" to="/profile"
  + v-if="isAuthenticated" class="header__logout"
  + @click="$logout"
 */

// Заменить тест данными
/*
    ...mapState(["Auth"]),
    ...mapState("Cart", ["order"]),
 */
