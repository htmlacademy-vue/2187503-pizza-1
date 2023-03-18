<template>
  <input
    type="radio"
    :name="name"
    :checked="isChecked"
    class="visually-hidden"
    @change="$emit('change', value)"
  />
</template>

<script>
export default {
  name: "RadioButton",
  model: {
    prop: "modelValue",
    event: "change",
  },
  props: {
    name: {
      type: String,
      required: true,
    },
    modelValue: {
      type: Number,
      required: true,
    },
    value: {
      type: Number,
      required: true,
    },
  },
  computed: {
    isChecked() {
      return this.value == this.modelValue;
    },
  },
};
</script>
