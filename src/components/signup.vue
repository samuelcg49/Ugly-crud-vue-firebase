<template>
  <div id="signup">
    <br />
    <div>
      <h4>Al registrarse deberá revisar su email para verificar la cuenta</h4>
    </div>
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
        })
        .catch((error) => console.log(error));
    },
  },
};
</script>

<style scoped>
.mensaje {
  color: green;
  background: rgb(125, 245, 125);
  padding: 20px;
  width: 50%;
  margin: 0px auto;
}
</style>
