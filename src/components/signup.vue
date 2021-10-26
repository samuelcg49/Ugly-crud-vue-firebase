<template>
  <div id="signup">
    <br />
    <form @submit.prevent="signUp">
      <label for="email">Correo electrónico</label>
      <input type="email" v-model="email" />
      <br />
      <label for="password">Contraseña</label>
      <input type="password" v-model="password" />
      <br />
      <input type="submit" value="Registrarse" />
    </form>
    <br />
  </div>
</template>

<script>
import { auth } from "../utils/firebase";

export default {
  name: "signup",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    async signUp() {
      await auth
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(() => {
          auth.currentUser.sendEmailVerification();
          this.email = "";
          this.password = "";
          console.log("Email de verificación enviado");
        })
        .catch((error) => console.log(error));
    },
  },
};
</script>

<style scoped></style>
