import { shallowMount } from "@vue/test-utils";
import RadioButton from "@/common/components/RadioButton";

describe("RadioButton", () => {
  const propsData = {
    name: "testName",
    modelValue: 1,
    value: 1,
    type: "radio",
  };

  let wrapper;
  const createComponent = (options) => {
    wrapper = shallowMount(RadioButton, options);
  };

  afterEach(() => {
    wrapper.destroy();
  });

  it("input name is prop Name", () => {
    createComponent({ propsData });
    let input = wrapper.find("input");
    expect(input.attributes("name")).toBe(propsData.name);
  });

  it("input type is prop type", () => {
    createComponent({ propsData });
    let input = wrapper.find("input");
    expect(input.attributes("type")).toBe(propsData.type);
  });

  it("It emits an change event when typing", () => {
    createComponent({ propsData });
    let input = wrapper.find("input");
    input.trigger("change");
    expect(wrapper.emitted().change).toBeTruthy();
  });

  it("emits the current input value when typing", () => {
    createComponent({ propsData });
    let input = wrapper.find("input");
    input.trigger("change");
    expect(wrapper.emitted().change[0][0]).toEqual(propsData.modelValue);
  });
});
