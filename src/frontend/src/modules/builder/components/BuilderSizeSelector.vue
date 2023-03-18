<template>
  <div class="content__diameter">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите размер</h2>

      <div class="sheet__content diameter">
        <label
          v-for="size in pizzaParam.sizes"
          :key="size.id"
          class="diameter__input"
          :class="`diameter__input diameter__input--${sizeStatuses[size.id]}`"
          data-test="sizeList"
        >
          <RadioButton
            name="diameter"
            :value="size.id"
            :modelValue="pizza.sizeId"
            @change="setSize"
            data-test="set-size"
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
import { mapState, mapMutations } from "vuex";
export default {
  name: "BuilderSizeSelector",
  components: {
    RadioButton,
  },
  data() {
    return {
      sizeStatuses,
    };
  },
  computed: mapState("Builder", ["pizzaParam", "pizza"]),
  methods: {
    ...mapMutations("Builder", ["updateSizeId"]),
    setSize(sizeId) {
      this.updateSizeId(sizeId);
    },
  },
};
</script>
