<template>
    <div id="app">
  <v-app id="inspire">
    <v-data-table
      :headers="headers"
      :items="listaPacientes"
      
      class="elevation-1"
    ></v-data-table>
  </v-app>
</div>
</template>

<script>

import axios from 'axios';
export default {
  
  data(){
      return{
          headers: [
          {
            text: 'Nombre del Paciente',
            align: 'start',
            sortable: false,
            value: 'nombrePaciente',
          },
          { text: 'fecha de la cita', value: 'fechaIngreso' },
          
        ],
          listaPacientes: [],
      };
  }, methods:{
      async getcitas(){
       try {
          let response = await axios.get("api/cita/Listar");
          
          this.listaPacientes=response.data;
          console.log(response.data);

          
          
      } catch (error) {
          console.log(error);
          }
      },
  },
  created() {
    this.getcitas();
    
    },
}    
    
</script>

