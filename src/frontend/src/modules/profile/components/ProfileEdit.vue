<template>
  <main class="layout">
    <AppLayoutUserDataSidebar />
    <div class="layout__content">
      <div class="layout__title">
        <h1 class="title title--big">Мои данные</h1>
      </div>

      <div class="user">
        <div class="info__group">
          <picture>
            <img :src="user.avatar" :alt="user.name" width="72" height="72" />
          </picture>
          <div class="user__name">
            <span>{{ user.name }}</span>
          </div>
        </div>
        <p class="user__phone">
          Контактный телефон: <span>{{ user.phone }}</span>
        </p>
      </div>

      <ProfileAddressesSelector
        v-for="(address, addressNumber) in addresses"
        :key="address.id"
        :address="address"
        :address-number="addressNumber + 1"
        :isNew="false"
        @update="addressPut($event)"
        @delete="deleteAddress"
        data-test="ProfileAddressesSelector"
      />

      <div class="layout__button">
        <button
          type="button"
          @click="ShowNewAddressForm"
          class="button button--border"
          data-test="show-new-address-form"
        >
          Добавить новый адрес
        </button>
        <ProfileAddressesSelector
          v-if="showNew"
          :address="newAddress"
          :addressNumber="null"
          :isNew="true"
          @create="addNewAddress"
          @update="addressPut($event)"
          data-test="ProfileAddressesSelectorNew"
        />
      </div>
    </div>
  </main>
</template>
<script>
import { mapState } from "vuex";
import { mapActions } from "vuex";
import ProfileAddressesSelector from "@/modules/profile/components/ProfileAddressesSelector";
import AppLayoutUserDataSidebar from "@/layouts/AppLayoutUserDataSidebar";
export default {
  name: "ProfileEdit",
  data() {
    return {
      showNew: false,
    };
  },
  mounted() {
    this.fetchAddresses;
  },
  methods: {
    ...mapActions("Profile", {
      addressPost: "post",
      addressPut: "put",
      addressDelete: "delete",
      fetchAddresses: "fetchAddresses",
    }),
    async addNewAddress(address) {
      this.showNew = false;
      await this.addressPost(address);
    },
    async deleteAddress(id) {
      await this.addressDelete(id);
    },

    ShowNewAddressForm() {
      this.showNew = true;
    },
  },
  computed: {
    ...mapState(["Auth"]),
    ...mapState("Profile", ["addresses"]),
    isAuthenticated() {
      return this.Auth.isAuthenticated;
    },
    user() {
      return this.Auth.user || {};
    },
    newAddress() {
      return {
        street: null,
        building: null,
        name: null,
        flat: null,
        comment: null,
        userId: this.user.id,
      };
    },
  },
  components: {
    ProfileAddressesSelector,
    AppLayoutUserDataSidebar,
  },
};
</script>
