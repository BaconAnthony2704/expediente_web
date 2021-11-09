<template>
<v-container>
    <v-row>
      <v-col md="12">
        <h1>Consolidado de transaciones de medicamentos</h1>
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
    <template>
  <v-card>
    <v-card-title>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="listadoMedicamentos"
      :search="search"
    ></v-data-table>
  </v-card>
</template>
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
            text: 'TipoTransaccion',
            align: 'start',
            
             value: 'tipo_transaccion',
            
          },
          { text: 'codigo', value: 'medicamento.idmedicamento' },
          {
            text: 'nombre',
            value: 'medicamento.nombre',
            
          },
          
          { text: 'Cantidad', value: 'cantidad' },
          { text: 'fecha', value: 'receta.fecha' },
          
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
          let response = await axios.get("api/salidadExistencias");
          
          this.listadoMedicamentos=response.data;
          console.log(response.data);

          
          
      } catch (error) {
          console.log(error);
          }
      },

      

    },
  }
</script>