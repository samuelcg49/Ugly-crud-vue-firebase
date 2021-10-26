<template>
  <div id="dashboard">
    HOLA, soy el dashboard
    <button @click="getContactos">Ver contactos</button>
    <br />
    <div v-if="mensaje" class="mensaje">
      <h4>{{ mensaje }}</h4>
    </div>
    <br />
    <ul v-for="contacto in resultado" :key="contacto.id">
      <li><b>Nombre:</b> {{ contacto.nombre }}</li>
      <li><b>Apellidos:</b> {{ contacto.apellidos }}</li>
      <li><b>Teléfono:</b> {{ contacto.telefono }}</li>
      <img :src="contacto.foto" alt="" />
      <button @click="deleteContacto(contacto.id)">Borrar</button>
      <button @click="updateContacto(contacto.id)">Editar</button>
    </ul>
    <hr />
    <br />
    <form @submit.prevent="createContacto">
      <label for="name">Nombre</label>
      <input type="text" v-model="nombre" />
      <br />
      <label for="apellido">Apellidos</label>
      <input type="text" v-model="apellido" />
      <br />
      <label for="telefono">Telefono</label>
      <input type="number" v-model="telefono" />
      <br />
      <input type="submit" value="Agregar Contacto" />
    </form>
    <br />
    <input type="file" accept="image/*" @change="clickFoto($event)" />
    <br />
    <form>
      <label for="name">Nombre</label>
      <input type="text" v-model="nombre2" />
      <br />
      <label for="apellido">Apellidos</label>
      <input type="text" v-model="apellido2" />
      <br />
      <label for="telefono">Telefono</label>
      <input type="number" v-model="telefono2" />
      <br />
      <input type="submit" value="Editar Contacto" />
    </form>
  </div>
</template>

<script>
import { db, auth, storage } from "../utils/firebase";

export default {
  name: "dashboard",
  data() {
    return {
      user: auth.currentUser,
      resultado: [],
      nombre: "",
      apellido: "",
      telefono: "",
      nombre2: "",
      apellido2: "",
      telefono2: "",
      idUpdateContacto: "",
      fotoData: "",
      foto: "",
      mensaje: "",
    };
  },
  methods: {
    async getContactos() {
      await db
        .collection("contactos")
        .where("usuarioID", "==", this.user.uid)
        .get()
        .then((res) => {
          res.forEach((doc) => {
            const data = {
              nombre: doc.data().nombre,
              apellidos: doc.data().apellidos,
              telefono: doc.data().telefono,
              foto: doc.data().foto,
              id: doc.id,
            };
            this.resultado.push(data);
          });
        })
        .catch((err) => console.log(err.message));
    },
    async createContacto() {
      await this.subirFoto();
      await db
        .collection("contactos")
        .add({
          nombre: this.nombre,
          apellidos: this.apellido,
          telefono: this.telefono,
          usuarioID: this.user.uid,
          foto: this.foto,
        })
        .then(() => (this.mensaje = "Contacto agregado correctamente"))
        .catch((err) => console.log(err.message));
    },
    async deleteContacto(id) {
      await db
        .collection("contactos")
        .where("usuarioID", "==", this.user.uid)
        .get()
        .then((res) => {
          this.mensaje = "Contacto borrado correctamente";
          res.forEach((doc) => {
            if (doc.ref.id == id) {
              doc.ref.delete();
            }
            console.log(doc.ref.id);
          });
        })
        .catch((err) => console.log(err.message));
    },
    async updateContacto(id) {
      await this.subirFoto();
      await db
        .collection("contactos")
        .where("usuarioID", "==", this.user.uid)
        .get()
        .then((res) => {
          this.mensaje = "Contacto acualizado correctamente";
          res.forEach((doc) => {
            if (doc.ref.id == id) {
              doc.ref.update({
                nombre: this.nombre2,
                apellidos: this.apellido2,
                telefono: this.telefono2,
                foto: this.foto,
              });
            }
            console.log("Contacto actualizado correctamente");
          });
        })
        .catch((err) => console.log(err.message));
    },
    clickFoto(e) {
      this.fotoData = e.target.files[0];
      console.log(this.fotoData);
    },
    async subirFoto() {
      //busca el último . que es desde donde parte la extension, esto evita descargar fotos sin extensión por tener el nombre varios puntos
      if (!this.fotoData) {
        return (this.fotoData = ""); //Si la foto viene vacía lo retorna vacío y se sale de la función
      }
      const lastDot = this.fotoData.name.lastIndexOf(".");
      const ext = this.fotoData.name.substring(lastDot + 1);
      const fotoName = Math.random()
        .toString(36)
        .slice(2);

      await storage
        .ref()
        .child(this.user.uid + "/contactos/" + fotoName + "." + ext)
        .put(this.fotoData, { contentType: "img/jpeg" })
        .then(() => console.log("foto subida correctamente"));

      await storage
        .ref()
        .child(this.user.uid + "/contactos/" + fotoName + "." + ext)
        .getDownloadURL()
        .then((url) => (this.foto = url));
    },
  },
};
</script>

<style scoped>
* {
  list-style: none;
}
img {
  width: 150px;
}
.mensaje {
  color: green;
  background: rgb(125, 245, 125);
  padding: 10px;
  width: 50%;
  margin: 0px auto;
}
</style>
