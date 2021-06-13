<template>
  <v-flex>
    <v-layout wrap>
      <v-flex md4 v-for="tarjeta in tarjetas" :key="tarjeta">
        <v-card
            class="mx-auto"
            max-width="244"
          >
            <v-img
              v-bind:src=" tarjeta.urlimagen "
              height="200px"
            ></v-img>

            <v-list-item :to="{ name: tarjeta.ruta }">
            <v-list-item-action>
              <v-icon>{{tarjeta.icono}}</v-icon>
            </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>
                 {{tarjeta.nombre}}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>

          </v-card>

      </v-flex>
    </v-layout>
  </v-flex>
</template>

<script>
import axios from 'axios'
  export default {
    data() {
      return {
        show:false,
        tarjetas:[]
      }
    },
    methods: {
      obtenerTarjetas(){
         axios.get("/api/Tarjeta/Listar").then(res=>{
           this.tarjetas=res.data;
         });
      }
    },
    created() {
      this.obtenerTarjetas()
    },
  }
</script>