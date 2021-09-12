import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue"
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
import Login from "../components/Login.vue"
import MenuUsuarios from "../views/MenuUsuarios.vue"
import MenuExportar from "../views/MenuExportar.vue"
import md5 from "js-md5"

Vue.use(VueRouter);
const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/mantenimiento_usuarios",
    name: "menuUsuarios",
    component: MenuUsuarios,
  },
  {
    path: "/exportar_cuentas",
    name: "menuExportar",
    component: MenuExportar,
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
  {
    path:"/home",
    name: "Home",
    component:Home
  },
  {
    path:"/dashboard",
    name:"dashboard",
    component:Dashboard
  },
  
];

const router = new VueRouter({
  routes,
});
router.beforeEach((to, from, next) => {
  // redirigir a la página de inicio de sesión si no ha iniciado sesión y está intentando acceder a una página restringida
  const publicPages = ['/login']
  const authRequired = !publicPages.includes(to.path)
  const loggedIn = localStorage.getItem('user')
  const logSession=localStorage.getItem('idtoken')
  if (authRequired && !loggedIn  && !logSession) {
    return next('/login')
  }
  else if(authRequired && md5(loggedIn)!=logSession){
    return next('/login')
  }
  next()
})
export default router;
