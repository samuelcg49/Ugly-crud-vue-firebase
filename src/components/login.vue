<template>
  <div id="login">
    <br />
    <div v-if="mensaje" class="mensaje">
      <h4>{{ mensaje }}</h4>
    </div>
    <div v-else>
      <h4>
        Por favor, antes de iniciar sesión asegurese que su cuenta ha sido
        verificada
      </h4>
    </div>
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
      mensaje: "",
    };
  },
  methods: {
    async login() {
      await auth
        .signInWithEmailAndPassword(this.email, this.password)
        .then(() => {
          if (!auth.currentUser.emailVerified) {
            auth.signOut();
          } else {
            this.$router.replace("inicio");
          }
        })
        .catch((error) => (this.mensaje = error.message));
    },
    resetPassword() {
      auth
        .sendPasswordResetEmail(this.correo)
        .then(() => {
          this.mensaje = "Se ha enviado un correo para resetar la contraseña";
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
.mensaje {
  color: black;
  background: rgb(245, 243, 125);
  padding: 20px;
  width: 50%;
  margin: 0px auto;
}
</style>
