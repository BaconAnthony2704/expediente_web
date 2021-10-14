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
    <div>
      <v-btn
      color="primary"
      @click="dialogoIngresar=true"
      text="ingresar"
      >ingresar
      </v-btn>      
      <ingresoMedicamento :visible="dialogoIngresar" @close="dialogoIngresar=false" />
    </div>
    
    
        
    
        </v-col>
       
       
       <v-col md="2">
    <v-dialog
      v-model="dialogoSalir"
      persistent
      max-width="700"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="red"
          dark
          v-bind="attrs"
          v-on="on"
        >
          Salidad
        </v-btn>
      </template>
      <v-card>
        <salidad-medicamentos></salidad-medicamentos>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green darken-1"
            text
            @click="dialogoSalir = false"
          >
            Disagree
          </v-btn>
          <v-btn
            color="green darken-1"
            text
            @click="dialogoSalir = false"
          >
            Agree
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
      </v-col>
    </v-row>
    <v-data-table
      :headers="headers"
      :items="listadoMedicamentos"
      item-key="name"
      class="elevation-1"
      :search="search"
      :custom-filter="filterOnlyCapsText"
    >
      <template v-slot:top>
        <v-text-field
          v-model="search"
          label="buscar"
          class="mx-4"
        ></v-text-field>
      </template>
      <template v-slot:body.append>
        <tr>
          <td></td>
          <td>
            <v-text-field
              v-model="nombre"
              
              label="Less than"
            ></v-text-field>
          </td>
          <td colspan="4"></td>
        </tr>
      </template>
    </v-data-table>
  
</v-container>
  

</template>
<script>
import ingresoMedicamento from './ingresoMedicamento.vue'
import SalidadMedicamentos from './salidadMedicamentos.vue'
  export default {
  components: { ingresoMedicamento, SalidadMedicamentos },
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
            text: 'IdMedicamento',
            align: 'start',
            sortable: false,
            value: 'idmedicamento',
          },
          {
            text: 'nombre',
            value: 'nombre',
            filter: value => {
              if (!this.nombre) return true

              return value < parseInt(this.nombre)
            },
          },
          { text: 'Presentacion', value: 'presentacion' },
          { text: 'Existencia', value: 'existencia' },
          { text: 'descripcion', value: 'protein' },
          
        ]
      },
    },
    methods: {
      filterOnlyCapsText (value, search) {
        return value != null &&
          search != null &&
          typeof value === 'string' &&
          value.toString().toLocaleUpperCase().indexOf(search.toLocaleUpperCase()) !== -1
      },
    },
  }
</script>