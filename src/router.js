import Vue from 'vue';
import VueRouter from 'vue-router';
import login from './components/login'
import signup from './components/signup'
import HelloWorld from './components/HelloWorld'
import dashboard from './components/dashboard'
import { auth } from './utils/firebase'

Vue.use(VueRouter);

export const router = new VueRouter({
    base: '/',
    mode: 'history',
    routes: [
        { path: "*", redirect: "/login" },
        { path: '/inicio', name: "inicio", component: HelloWorld, meta: { autentificado: true } },
        { path: '/login', name: "login", component: login },
        { path: '/signup', name: 'signup', component: signup },
        { path: '/dashboard', name: 'dashboard', component: dashboard, meta: { autentificado: true } }
    ]
});

router.beforeEach((to, from, next) => {

    if (auth.currentUser) { //Si hay un usuario logueado, guardamos el valor de su verificacion: "true" ó "false"
        var usuarioV = auth.currentUser.emailVerified;
    }
    let autentificacion = to.matched.some(record => record.meta.autentificado)
    //si el valor es false denegará el acceso y redigirá a login
    if (autentificacion && !usuarioV) {
        next("login")
    } else if (!autentificacion && usuarioV) {
        next("inicio")
    } else {
        next()
    }
})