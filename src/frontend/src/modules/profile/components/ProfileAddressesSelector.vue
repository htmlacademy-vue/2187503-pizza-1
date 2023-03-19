<template>
  <div v-if="addressReadOnly" key="addressIsReadOnly" class="layout__address">
    <div class="sheet address-form">
      <div class="address-form__header">
        <b>Адрес {{ addressNumber }}. {{ address.name }}</b>
        <div class="address-form__edit">
          <button type="button" class="icon" @click="changeAddress">
            <span class="visually-hidden">Изменить адрес</span>
          </button>
        </div>
      </div>
      <p>
        {{ address.street }}, д. {{ address.building }}, кв. {{ address.flat }}
      </p>
      <small>{{ address.comment }}</small>
    </div>
  </div>

  <div v-else key="addressIsEdited" class="layout__address">
    <form
      @submit.prevent="updateAddress"
      class="address-form address-form--opened sheet"
    >
      <div class="address-form__header">
        <b>Адрес {{ addressNumber }}</b>
      </div>

      <div class="address-form__wrapper">
        <div class="address-form__input">
          <label class="input">
            <span>Название адреса*</span>
            <input
              type="text"
              name="addr-name"
              placeholder="Введите название адреса"
              v-model="changedName"
              required
            />
          </label>
        </div>
        <div class="address-form__input address-form__input--size--normal">
          <label class="input">
            <span>Улица*</span>
            <input
              type="text"
              name="addr-street"
              placeholder="Введите название улицы"
              v-model="changedStreet"
              required
            />
          </label>
        </div>
        <div class="address-form__input address-form__input--size--small">
          <label class="input">
            <span>Дом*</span>
            <input
              type="text"
              name="addr-house"
              placeholder="Введите номер дома"
              v-model="changedBuilding"
              required
            />
          </label>
        </div>
        <div class="address-form__input address-form__input--size--small">
          <label class="input">
            <span>Квартира</span>
            <input
              type="text"
              name="addr-apartment"
              v-model="changedFlat"
              placeholder="Введите № квартиры"
            />
          </label>
        </div>
        <div class="address-form__input">
          <label class="input">
            <span>Комментарий</span>
            <input
              type="text"
              name="addr-comment"
              v-model="changedComment"
              placeholder="Введите комментарий"
            />
          </label>
        </div>
      </div>

      <div class="address-form__buttons">
        <button
          v-if="!isNew"
          type="button"
          class="button button--transparent"
          @click="$emit('delete', address.id)"
        >
          Удалить
        </button>
        <button type="submit" class="button">Сохранить</button>
      </div>
    </form>
  </div>
</template>
<script>
export default {
  name: "ProfileAddressesSelector",
  props: {
    address: {
      type: Object,
      required: true,
    },

    addressNumber: {
      type: Number,
      required: false,
    },

    isNew: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      addressIsReadOnly: true,
      changedStreet: null,
      changedBuilding: null,
      changedName: null,
      changedFlat: null,
      changedComment: null,
    };
  },
  created() {
    if (this.isNew) {
      this.changeAddress;
    }
  },
  methods: {
    updateAddress() {
      this.addressIsReadOnly = true;
      if (
        this.address.street === this.changedStreer &&
        this.address.building === this.changedBuilding &&
        this.address.name === this.changedName &&
        this.address.flat === this.changedFlat &&
        this.address.building === this.changedBuilding &&
        this.address.comment === this.changedComment
      ) {
        return;
      }
      this.address.street = this.changedStreet;
      this.address.building = this.changedBuilding;
      this.address.name = this.changedName;
      this.address.flat = this.changedFlat;
      this.address.comment = this.changedComment;
      if (this.isNew) {
        this.$emit("create", this.address);
      } else {
        this.$emit("update", this.address);
      }
    },
    changeAddress() {
      this.addressIsReadOnly = false;
      this.changedStreet = this.address.street;
      this.changedBuilding = this.address.building;
      this.changedName = this.address.name;
      this.changedFlat = this.address.flat;
      this.changedComment = this.address.comment;
    },
  },
  computed: {
    addressReadOnly() {
      if (this.isNew) {
        return false;
      } else if (!this.addressIsReadOnly) {
        return false;
      } else {
        return true;
      }
    },
  },
};
</script>
