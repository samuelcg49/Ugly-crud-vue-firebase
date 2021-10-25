import Vue from 'vue';
import VueRouter from 'vue-router';
import login from './components/login'
import signup from './components/signup'
import HelloWorld from './components/HelloWorld'
import dashboard from './components/dashboard'
import { firebase } from './utils/firebase'

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
    let usuario = firebase.auth().currentUser;
    let autentificacion = to.matched.some(record => record.meta.autentificado)

    if (autentificacion && !usuario) {
        next("login")
    } else if (!autentificacion && usuario) {
        next("inicio")
    } else {
        next()
    }
})