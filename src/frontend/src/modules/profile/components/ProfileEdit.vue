<template>
  <main class="layout">
    <div class="layout__sidebar sidebar">
      <a href="index.html" class="logo layout__logo">
        <img
          src="img/logo.svg"
          alt="V!U!E! Pizza logo"
          width="90"
          height="40"
        />
      </a>

      <a class="layout__link" href="#">История заказов {{ Auth.addresses }}</a>
      <a class="layout__link layout__link--active" href="#">Мои данные</a>
    </div>

    <div class="layout__content">
      <div class="layout__title">
        <h1 class="title title--big">Мои данные</h1>
      </div>

      <div class="user">
        <picture>
          <img :src="user.avatar" :alt="user.name" width="72" height="72" />
        </picture>
        <div class="user__name">
          <span>{{ user.name }}</span>
        </div>
        <p class="user__phone">
          Контактный телефон: <span>{{ user.phone }}</span>
        </p>
      </div>

      <ProfileAddressesSelector
        v-for="(address, addressNumber) in addresses"
        :key="address.id"
        :address="address"
        :addressNumber="addressNumber + 1"
        :isNew="false"
        @update="addressPut($event)"
        @delete="deleteAddress"
      />

      <div class="layout__button">
        <button
          type="button"
          @click="ShowNewAddressForm"
          class="button button--border"
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
        />
      </div>
    </div>
  </main>
</template>
<script>
import { mapState } from "vuex";
import { mapActions } from "vuex";
import ProfileAddressesSelector from "@/modules/profile/components/ProfileAddressesSelector";
export default {
  name: "ProfileEdit",
  data() {
    return {
      showNew: false,
    };
  },

  methods: {
    ...mapActions("Profile", {
      addressPost: "post",
      addressPut: "put",
      addressDelete: "delete",
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
  },
};
</script>
