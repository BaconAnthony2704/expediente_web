
<template>
  <v-app id="app">
    <template v-if="!$route.path.includes('login')">
      <v-navigation-drawer v-model="drawer" app>
      <!--  -->
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6"> {{username}} </v-list-item-title>
          <v-list-item-subtitle> Nombre </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense nav>
        <v-list-item :to="{ name: 'dashboard' }">
          <v-list-item-action>
            <v-icon>mdi-view-dashboard</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title> Dashboard </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item :to="{ name: 'expediente' }">
          <v-list-item-action>
            <v-icon>mdi-file-document-multiple-outline</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title> Expediente </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item :to="{ name: 'ingresoegreso' }">
          <v-list-item-action>
            <v-icon>mdi-calculator</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title> Ingresos y egresos </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item :to="{ name: 'inventario' }">
          <v-list-item-action>
            <v-icon>mdi-package-variant</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title> Inventario </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item :to="{ name: 'rrhh' }">
          <v-list-item-action>
            <v-icon>mdi-account-supervisor-outline</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title> RRHH </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item :to="{ name: 'reporteria' }">
          <v-list-item-action>
            <v-icon>mdi-file-chart</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title> Reporteria </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item :to="{ name: 'historiaClinica' }">
          <v-list-item-action>
            <v-icon>mdi-file-chart</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title> Historia Clinica </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item :to="{ name: 'configuraciones' }">
          <v-list-item-action>
            <v-icon>mdi-tune-vertical</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title> Configuraciones </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item @click.prevent="salir">
          <v-list-item-action>
            <v-icon>mdi-logout</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title> Salir sesion </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Sistema de expediente clinico</v-toolbar-title>
    </v-app-bar>
    

      
    </template>
    <v-main>
         <keep-alive :include="['Login']">
            <router-view></router-view>
         </keep-alive>
      </v-main>
  </v-app>
</template>

<script>
import router from '../src/router/index'
export default {
   data: () => ({
      drawer: null,
      username:"",
     
   }),
   props: {
      source: String,
   },
   methods: {
      obtenerUsuario(){
         
         this.username="";
         this.username=localStorage.getItem('user');
      },
      salir(){
         alert("Saliendo de la sesion");
         localStorage.clear();
         router.push('/login');
         
      }
   },
   created() {
      this.obtenerUsuario();
   },
};
</script>

