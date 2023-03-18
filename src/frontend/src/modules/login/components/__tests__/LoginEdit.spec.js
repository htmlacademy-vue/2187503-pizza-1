import { mount, createLocalVue } from "@vue/test-utils";
import $validator from "@/common/mixins/validator";
import LoginEdit from "@/modules/login/components/LoginEdit";
import AppInput from "@/common/components/AppInput";

const localVue = createLocalVue();
localVue.component("AppInput", AppInput);

describe("LoginEdit", () => {
  let routerPush;
  let dispatch;
  let login;

  const methods = {
    login,
  };

  const mocks = {
    $router: {
      push: routerPush,
    },
    $store: {
      dispatch,
    },
    $validator,
  };

  const stubs = ["router-link"];

  let wrapper;
  const createComponent = (options) => {
    wrapper = mount(LoginEdit, options);
  };

  beforeEach(() => {
    routerPush = jest.fn();
    dispatch = jest.fn();
    login = jest.fn();
    methods.login = login;
    mocks.$router.push = routerPush;
    mocks.$store.dispatch = dispatch;
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("has been called close", async () => {
    createComponent({ localVue, mocks, stubs });
    const passInput = wrapper.find('[data-test="button-close"]');
    expect(passInput.html()).toContain('to="/"');
  });

  it("validation mixin has been called on form submit", async () => {
    createComponent({ localVue, mocks, stubs });
    const spyValidateFields = jest.spyOn(wrapper.vm, "$validateFields");
    await wrapper.find("form").trigger("submit");
    expect(spyValidateFields).toHaveBeenCalled();
    expect(dispatch).not.toHaveBeenCalled();
  });

  it("calls login and redirects to index if credentials are valid", async () => {
    createComponent({ localVue, mocks, stubs });
    const emailInput = wrapper
      .find('[data-test="email-component"]')
      .find("input");
    const passInput = wrapper
      .find('[data-test="password-component"]')
      .find("input");

    emailInput.element.value = "test@gmail.com";
    await emailInput.trigger("input");
    passInput.element.value = "123456";
    await passInput.trigger("input");

    await wrapper.find("form").trigger("submit");
    expect(dispatch).toHaveBeenCalled();
    expect(routerPush).toHaveBeenCalledWith("/");
  });
});
