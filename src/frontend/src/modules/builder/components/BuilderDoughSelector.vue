<template>
  <div class="content__dough">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите тесто</h2>
      <div class="sheet__content dough">
        <label
          v-for="dough in pizzaParam.dough"
          :key="dough.id"
          class="dough__input"
          :class="`dough__input--${doughStatuses[dough.id]}`"
          data-test="dough-list"
        >
          <RadioButton
            name="dought"
            :value="dough.id"
            :model-value="pizza.doughId"
            data-test="set-dough"
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
import { mapState, mapMutations } from "vuex";
export default {
  name: "BuilderDoughSelector",
  components: {
    RadioButton,
  },
  computed: mapState("Builder", ["pizzaParam", "pizza"]),
  data() {
    return {
      doughStatuses,
    };
  },

  methods: {
    ...mapMutations("Builder", ["updateDoughId"]),
    setDough(doughId) {
      this.updateDoughId(doughId);
    },
  },
};
</script>
