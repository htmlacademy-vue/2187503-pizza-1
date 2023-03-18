import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import { generateMockStore } from "@/store/mocks";
import { SET_ENTITY } from "@/store/mutations-types";
import ProfileEdit from "@/modules/profile/components/ProfileEdit";
import ProfileAddressesSelector from "@/modules/profile/components/ProfileAddressesSelector";
import AppLayoutUserDataSidebar from "@/layouts/AppLayoutUserDataSidebar";
import flushPromises from "flush-promises";

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.component("ProfileAddressesSelector", ProfileAddressesSelector);
localVue.component("AppLayoutUserDataSidebar", AppLayoutUserDataSidebar);

const addresses = [
  {
    id: 1,
    name: "Bleecker_Street",
    street: "Bleecker Street",
    building: "177",
    flat: "1",
    comment: "string",
    userId: "1",
  },
];

const addAddress = (store) => {
  store.commit(SET_ENTITY, {
    module: "Profile",
    entity: "addresses",
    value: addresses,
  });
};

describe("ProfileEdit", () => {
  const propsData = {};
  const stubs = ["router-link", "router-view"];
  let actions;
  let store;
  let wrapper;
  let dispatch;
  const mocks = {
    $router: {
      push: jest.fn(),
    },
    $route: {
      params: { id: 1 },
    },
    $store: {
      dispatch,
    },
  };
  const createComponent = (options) => {
    wrapper = mount(ProfileEdit, options);
  };

  beforeEach(() => {
    actions = {
      Profile: {
        put: jest.fn(),
        delete: jest.fn(),
        post: jest.fn(),
      },
    };
    dispatch = jest.fn();
    store = generateMockStore(actions);
    mocks.$router.push = jest.fn();
    mocks.$store.dispatch = dispatch;
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("is rendered", () => {
    createComponent({ localVue, store, mocks, stubs, propsData });
    expect(wrapper.exists()).toBeTruthy();
  });

  it("renders ProfileAddressesSelector", () => {
    addAddress(store);
    createComponent({ localVue, store, mocks, stubs, propsData });
    const profileAddressesSelector = wrapper.findAll(
      '[data-test="ProfileAddressesSelector"]'
    );
    expect(Array.from(profileAddressesSelector).length).toEqual(
      addresses.length
    );
  });

  it("updates ProfileAddressesSelector", async () => {
    addAddress(store);
    createComponent({ localVue, store, mocks, stubs, mocks });
    await flushPromises();
    const profileAddressesSelector = wrapper.find(
      '[data-test="ProfileAddressesSelector"]'
    );
    profileAddressesSelector.vm.$emit("update");
    expect(actions.Profile.put).toHaveBeenCalled();
  });

  it("delete ProfileAddressesSelector", async () => {
    addAddress(store);
    createComponent({ localVue, store, mocks, stubs, mocks });
    await flushPromises();
    const profileAddressesSelector = wrapper.find(
      '[data-test="ProfileAddressesSelector"]'
    );
    profileAddressesSelector.vm.$emit("delete");
    expect(actions.Profile.delete).toHaveBeenCalled();
  });

  it("click ShowNewAddressForm button", async () => {
    createComponent({ localVue, store, mocks, stubs, mocks });
    const showNewAddressForm = wrapper.find('[data-test="ShowNewAddressForm"]');
    await showNewAddressForm.trigger("click");

    const profileAddressesSelectorNew = wrapper.find(
      '[data-test="ProfileAddressesSelectorNew"]'
    );
    expect(profileAddressesSelectorNew.exists()).toBeTruthy();
    profileAddressesSelectorNew.vm.$emit("create");
    expect(actions.Profile.post).toHaveBeenCalled();
  });
});

// Список элементов для тестирования
/*
  + v-for="(address, addressNumber) in addresses"
  + @update="addressPut($event)"
  + @delete="deleteAddress"
  + @click="ShowNewAddressForm"
  + @create="addNewAddress"

*/

// Данные из тест-хранилища
/*
    ...mapState(["Auth"]),
    ...mapState("Profile", ["addresses"]),
*/
