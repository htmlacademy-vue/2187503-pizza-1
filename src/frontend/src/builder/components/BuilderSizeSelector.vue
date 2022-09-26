<template>
  <div class="content__diameter">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите размер</h2>

      <div class="sheet__content diameter">
        <label
          v-for="size in pizza.sizes"
          :key="size.id"
          class="diameter__input"
          :class="`diameter__input diameter__input--${sizeStatuses[size.id]}`"
        >
          <RadioButton
            name="diameter"
            :value="size.id"
            :modelValue="value"
            @change="setSize"
          />

          <span>{{ size.name }}</span>
        </label>
      </div>
    </div>
  </div>
</template>

<script>
import RadioButton from "@/common/components/RadioButton";
import sizeStatuses from "@/common/enums/sizeStatuses";
import pizza from "@/static/pizza.json";
export default {
  name: "BuilderSizeSelector",
  props: {
    value: {
      type: Number,
      required: true,
    },
  },
  components: {
    RadioButton,
  },
  data() {
    return {
      pizza,
      sizeStatuses,
    };
  },

  methods: {
    setSize(sizeId) {
      this.$emit("input", sizeId);
    },
  },
};
</script>
