import Vue from "vue";
import VueRouter from "vue-router";
import Dashboard from "../views/Dashboard.vue"
import Expediente from "../views/Expediente.vue"
import IngresoEgreso from "../views/IngresoEgreso.vue"
import Inventario from "../views/Inventario.vue"
import Configuraciones from "../views/Configuraciones.vue"
import Rrhh from "../views/Rrhh.vue"
import Reporteria from "../views/Reporteria.vue"
import Logout from "../views/Logout.vue"
import Pacientes from "../views/Pacientes.vue"
import Citas from "../views/Citas.vue"
import Examenes from "../views/Examenes.vue"
import HistoriaClinica from "../views/HistoriaClinica.vue"
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Dashboard,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path:"/expediente",
    name:"expediente",
    component:Expediente
  },
  {
    path:"/contabilidad",
    name:"ingresoegreso",
    component:IngresoEgreso
  },
  {
    path:"/inventario",
    name:"inventario",
    component:Inventario
  },
  {
    path:"/rrhh",
    name:"rrhh",
    component:Rrhh
  },
  {
    path:"/reporteria",
    name:"reporteria",
    component:Reporteria
  },
  {
    path:"/configuraciones",
    name:"configuraciones",
    component:Configuraciones
  },
  {
    path:"/logout",
    name:"logout",
    component:Logout
  },
  {
    path:"/citas",
    name:"citas",
    component:Citas
  },
  {
    path:"/examenes",
    name:"examenes",
    component:Examenes
  },
  {
    path:"/pacientes",
    name:"pacientes",
    component:Pacientes
  },
  {
    path:"/historiaClinica",
    name:"historiaClinica",
    component:HistoriaClinica
  },
  
];

const router = new VueRouter({
  routes,
});

export default router;
