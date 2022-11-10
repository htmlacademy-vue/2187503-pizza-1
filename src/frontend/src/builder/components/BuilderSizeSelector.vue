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
            :modelValue="sizeId"
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
import { mapState } from "vuex";
export default {
  name: "BuilderSizeSelector",
  props: {
    sizeId: {
      type: Number,
      required: true,
    },
  },
  components: {
    RadioButton,
  },
  data() {
    return {
      sizeStatuses,
    };
  },
  computed: mapState("Builder", ["pizza"]),
  methods: {
    setSize(sizeId) {
      this.$emit("setSize", sizeId);
    },
  },
};
</script>
