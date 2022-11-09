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
            :value="dough.id"
            :modelValue="doughId"
            @change="setDough"
          />

          <b>{{ dough.name }} </b>
          <span>{{ dough.description }}</span>
        </label>
      </div>
    </div>
  </div>
</template>

<script>
import RadioButton from "@/common/components/RadioButton";
import doughStatuses from "@/common/enums/doughStatuses";
import { mapGetters } from "vuex";
export default {
  name: "BuilderDoughSelector",
  props: {
    doughId: {
      type: Number,
      required: true,
    },
  },
  components: {
    RadioButton,
  },
  computed: mapGetters("Builder", { pizza: "getPizza" }),
  data() {
    return {
      doughStatuses,
    };
  },

  methods: {
    setDough(doughCurrent) {
      this.$emit("setDough", doughCurrent);
    },
  },
};
</script>
