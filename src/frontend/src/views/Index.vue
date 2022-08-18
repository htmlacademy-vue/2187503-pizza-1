<template>
  <main class="content">
    <form action="#" method="post">
      <div class="content__wrapper">
        <h1 class="title title--big">Конструктор пиццы</h1>

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
                  v-model="doughRadioButton"
                />

                <b>{{ dough.name }}</b>
                <span>{{ dough.description }}</span>
              </label>
            </div>
          </div>
        </div>

        <div class="content__diameter">
          <div class="sheet">
            <h2 class="title title--small sheet__title">Выберите размер</h2>

            <div class="sheet__content diameter">
              <label
                v-for="size in pizza.sizes"
                :key="size.id"
                class="diameter__input"
                :class="`diameter__input diameter__input--${
                  sizeStatuses[size.id]
                }`"
              >
                <RadioButton
                  name="diameter"
                  :value="sizeStatuses[size.id]"
                  v-model="diameterRadioButton"
                />

                <span>{{ size.name }}</span>
              </label>
            </div>
          </div>
        </div>

        <div class="content__ingredients">
          <div class="sheet">
            <h2 class="title title--small sheet__title">
              Выберите ингредиенты
            </h2>

            <div class="sheet__content ingredients">
              <div class="ingredients__sauce">
                <p>Основной соус:</p>

                <label
                  v-for="sauce in pizza.sauces"
                  :key="sauce.id"
                  class="radio ingredients__input"
                >
                  <RadioButton
                    name="sauce"
                    :value="sauceStatuses[sauce.id]"
                    v-model="sauceRadioButton"
                  />
                  <span>{{ sauce.name }}</span>
                </label>
              </div>

              <div class="ingredients__filling">
                <p>Начинка:</p>

                <ul class="ingredients__list">
                  <li
                    v-for="ingredient in pizza.ingredients"
                    :key="ingredient.id"
                    class="ingredients__item"
                  >
                    <span
                      class="filling"
                      :class="`filling--${ingredientStatuses[ingredient.id]}`"
                      >{{ ingredient.name }}</span
                    >

                    <div class="counter counter--orange ingredients__counter">
                      <button
                        type="button"
                        class="counter__button counter__button--minus"
                        disabled
                      >
                        <span class="visually-hidden">Меньше</span>
                      </button>
                      <input
                        type="text"
                        name="counter"
                        class="counter__input"
                        value="0"
                      />
                      <button
                        type="button"
                        class="counter__button counter__button--plus"
                      >
                        <span class="visually-hidden">Больше</span>
                      </button>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div class="content__pizza">
          <label class="input">
            <span class="visually-hidden">Название пиццы</span>
            <input
              type="text"
              name="pizza_name"
              placeholder="Введите название пиццы"
            />
          </label>

          <div class="content__constructor">
            <div class="pizza pizza--foundation--big-tomato">
              <div class="pizza__wrapper">
                <div class="pizza__filling pizza__filling--ananas"></div>
                <div class="pizza__filling pizza__filling--bacon"></div>
                <div class="pizza__filling pizza__filling--cheddar"></div>
              </div>
            </div>
          </div>

          <div class="content__result">
            <p>Итого: 0 ₽</p>
            <button type="button" class="button" disabled>Готовьте!</button>
          </div>
        </div>
      </div>
    </form>
  </main>
</template>
<script>
import misc from "@/static/misc.json";
import pizza from "@/static/pizza.json";
import user from "@/static/user.json";
import doughStatuses from "@/common/enums/doughStatuses";
import sizeStatuses from "@/common/enums/sizeStatuses";
import sauceStatuses from "@/common/enums/sauceStatuses";
import ingredientStatuses from "@/common/enums/ingredientStatuses";
import RadioButton from "@/common/components/RadioButton";
export default {
  name: "IndexHome",
  components: {
    RadioButton,
  },
  data() {
    return {
      misc,
      pizza,
      user,
      doughStatuses,
      sizeStatuses,
      sauceStatuses,
      ingredientStatuses,
      selectedDough: 1,
      doughRadioButton: "light",
      diameterRadioButton: "small",
      sauceRadioButton: "tomato",
    };
  },
};
</script>
<style></style>
