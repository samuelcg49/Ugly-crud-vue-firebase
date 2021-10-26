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
    <br /><br /><br />
    <input type="email" v-model="correo" />
    <a @click="resetPassword"> Olvidé mi contraseña</a>
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
      correo: "",
    };
  },
  methods: {
    async login() {
      await auth
        .signInWithEmailAndPassword(this.email, this.password)
        .then(() => {
          if (!auth.currentUser.emailVerified) {
            auth.signOut();
            console.log("Por favor revisa tu correo electrónico");
          } else {
            this.$router.replace("inicio");
          }
        })
        .catch((error) => console.log(error));
    },
    resetPassword() {
      auth
        .sendPasswordResetEmail(this.correo)
        .then(() => {
          console.log("Se ha enviado un correo para resetar la contraseña");
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style scoped>
a {
  cursor: pointer;
  color: blue;
}
</style>
