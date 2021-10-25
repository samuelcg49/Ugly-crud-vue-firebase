<template>
  <div id="login">
    <br />
    <form @submit.prevent="login">
      <label for="email">Correo electrónico</label>
      <input type="email" v-model="email" />
      <br />
      <label for="password">Contraseña</label>
      <input type="password" v-model="password" />
      <br />
      <input type="submit" value="Iniciar Sesión" />
    </form>
    <br />
  </div>
</template>

<script>
import { auth } from "../utils/firebase";

export default {
  name: "login",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    async login() {
      await auth
        .signInWithEmailAndPassword(this.email, this.password)
        .then(() => {
          this.$router.replace("inicio");
        })
        .catch((error) => console.log(error));
    },
  },
};
</script>

<style scoped></style>
