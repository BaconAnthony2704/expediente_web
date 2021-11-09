<template>
<v-container>
    <v-row>
      <v-col md="12">
        <h1>Exitencia de medicamentos</h1>
      </v-col>
    </v-row>
    
    
    <v-row>
        <v-col md="8">

        </v-col>
       <v-col md="2">
         <v-dialog
      v-model="dialogoIngresar"
      persistent
      max-width="700"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="green"
          dark
          v-bind="attrs"
          @click="exportPDF()"
        >
          Generar PDF
        </v-btn>
      </template>
      
    </v-dialog>
    
     
    
        </v-col>
       
       
       <v-col md="2">
    
      </v-col>
    </v-row>
    <table class="table table-bordered" id="content">
        <thead>
          <tr>
            <th class="text-left">Estado</th>
            <th class="text-left">nombre</th>
            <th class="text-left">presentacion</th>
            <th class="text-left">existencia</th>
            <th class="text-left">descripcion</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item) in listadoMedicamentos" :key="item">
            <td>{{ item.estado }}</td>
            <td>{{ item.nombre }}</td>
            <td>{{ item.tipo }}</td>
            <td>{{ item.existencia }}</td>
            <td>{{ item.descripcion }}</td>
          </tr>
        </tbody>
    </table>
  
</v-container>
  

</template>
<script>
import axios from 'axios';

import jspdf from "jspdf";
//import autoTable from 'jspdf-autotable'
import html2canvas from "html2canvas";
//import ingresoMedicamento from './ingresoMedicamento.vue'

  export default {
  components: { /*ingresoMedicamento,*/   },
    data () {
      return {
        search: '',
        calories: '',
        listadoMedicamentos: [ ],
        dialogoIngresar:false,
        dialogoSalir:false,
      }
    },
    computed: {
      headers () {
        return [
          {
            text: 'Estado',
            align: 'start',
            sortable: false,
            value: 'estado',
          },
          {
            text: 'nombre',
            value: 'nombre',
            
          },
          { text: 'Presentacion', value: 'tipo' },
          { text: 'Existencia', value: 'existencia' },
          { text: 'descripcion', value: 'descripcion' },
          
        ]
      },
    },
    created () {
      this.listarMedicamentos()
       },
    methods: {
        exportPDF() {
      const doc = new jspdf("p", "pt", "a4");
      const html = document.getElementById("content");
      window.html2canvas = html2canvas;
      //console.log(doc.getFontSize());
      //console.log(html);
      //autoTable(doc,{html:'#myTable'})

      doc.setFont("Arimo");
      //doc.setFontType("normal");
      doc.setFontSize(-10);
      doc.html(html, {
        callback: function (d) {
          //d.autoPrint();
          d.save("table.pdf");
        },
        autoPaging: "slice",
        x: 0,
        y: 0,
        html2canvas: { scale: 0.6 },
      });
    },
      filterOnlyCapsText (value, search) {
        
        return value != null &&
          search != null &&
          typeof value === 'string' &&
          value.toString().toLocaleUpperCase().indexOf(search.toLocaleUpperCase()) !== -1

      },
      
      async listarMedicamentos(){
        try {
          let response = await axios.get("api/medicamentos");
          
          this.listadoMedicamentos=response.data;
          console.log(response.data);

          
          
      } catch (error) {
          console.log(error);
          }
      },

      

    },
  }
</script>