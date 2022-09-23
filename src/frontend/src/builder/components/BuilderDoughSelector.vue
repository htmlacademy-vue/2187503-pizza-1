<template>
  <div class="content__dough">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите тесто</h2>
      <div class="sheet__content dough">
        <label
          v-for="dough in pizza.dough"
          :key="dough.id"
          class="dough__input"
          :class="`dough__input--${doughStatuses[dough.id]}`"
        >
          <RadioButton
            name="dought"
            :value="doughStatuses[dough.id]"
            :modelValue="value"
            @change="setDoughCurrent"
          />

          <b>{{ dough.name }}</b>
          <span>{{ dough.description }}</span>
        </label>
      </div>
    </div>
  </div>
</template>

<script>
import RadioButton from "@/common/components/RadioButton";
import doughStatuses from "@/common/enums/doughStatuses";
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
      doughStatuses,
    };
  },

  methods: {
    setDoughCurrent(doughCurrent) {
      this.$emit("input", doughCurrent);
    },
  },
};
</script>
