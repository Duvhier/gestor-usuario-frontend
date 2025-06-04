import { createRouter, createWebHistory } from 'vue-router';
import AgregarRol from '../views/AgregarRol.vue';
import AgregarUsuario from '../views/AgregarUsuario.vue';
import VistaGeneral from '../views/VistaGeneral.vue';

const routes = [
  { path: '/', redirect: '/roles' },
  { path: '/roles', component: AgregarRol },
  { path: '/usuarios', component: AgregarUsuario },
  { path: '/vista', component: VistaGeneral }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;