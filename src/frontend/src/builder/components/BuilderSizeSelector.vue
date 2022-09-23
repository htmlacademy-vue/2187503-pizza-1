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
            :value="sizeStatuses[size.id]"
            :modelValue="value"
            @change="setDiameter"
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
  name: "IndexHome",
  props: {
    value: {
      type: String,
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
    setDiameter(diameter) {
      this.$emit("input", diameter);
    },
  },
};
</script>
