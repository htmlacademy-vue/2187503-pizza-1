<template>
  <div class="sign-form">
    <router-link class="close close--white" to="/" data-test="button-close"
      ><span class="visually-hidden">Закрыть форму авторизации</span>
    </router-link>
    <div class="sign-form__title">
      <h1 class="title title--small">Авторизуйтесь на сайте</h1>
    </div>
    <form @submit.prevent="login">
      <div class="sign-form__input">
        <label class="input">
          <span>E-mail</span>
          <AppInput
            ref="email"
            v-model="email"
            type="email"
            name="email"
            class="input"
            placeholder="E-mail"
            :error-text="validations.email.error"
            data-test="email-component"
          />
        </label>
      </div>

      <div class="sign-form__input">
        <label class="input">
          <span>Пароль</span>
          <AppInput
            v-model="password"
            type="password"
            name="password"
            class="input"
            placeholder="Пароль"
            :error-text="validations.password.error"
            data-test="password-component"
          />
        </label>
      </div>
      <button type="submit" class="button">Авторизоваться</button>
    </form>
  </div>
</template>
<script>
// Используем миксин валидатор для валидации полей формы
import validator from "@/common/mixins/validator";
import AppInput from "@/common/components/AppInput";
export default {
  name: "LoginEdit",
  components: {
    AppInput,
  },
  mixins: [validator],
  data: () => ({
    email: "",
    password: "",
    // и добавляем объект validations. Поля cо списком правил валидации
    // и параметром error для присвоения текста ошибки в миксине.
    validations: {
      email: {
        error: "",
        rules: ["required", "email"],
      },
      password: {
        error: "",
        rules: ["required"],
      },
    },
  }),
  // При изменении любого из полей очищаем ошибки валидации
  watch: {
    email() {
      this.$clearValidationErrors();
    },
    password() {
      this.$clearValidationErrors();
    },
  },
  // при входе на страницу ставим фокус на email-инпуте
  mounted() {
    this.$refs.email.$refs.input.focus();
  },
  methods: {
    async login() {
      // Если есть невалидное поле - не отправлять запрос на сервер.
      // Также в миксине мы присваиваем текст ошибки
      if (
        !this.$validateFields(
          { email: this.email, password: this.password },
          this.validations
        )
      ) {
        return;
      }
      // Если поля валидны - отправляем запрос на сервер.
      await this.$store.dispatch("Auth/login", {
        email: this.email,
        password: this.password,
      });
      // После успешной авторизации отправляем пользователя на главную страницу.
      await this.$router.push("/");
    },
  },
};
</script>
