<template>
<v-container>
<v-row >    
  <v-col md="12">
  <v-data-table
    :headers="headers"
    :items="listadoMedicamentos"
    sort-by="calories"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title>Ingreso de Existencia</v-toolbar-title>
        
        
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-dialog
          v-model="dialog"
          max-width="500px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="primary"
              dark
              class="mb-2"
              v-bind="attrs"
              v-on="on"
            >
              Ingresar
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">Datos del medicamento</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col
                    cols="12"
                    sm="6"
                    md="5"
                  >
                    <v-text-field
                    
                      v-model="editedItem.idMedicamento"
                      label="id "
                    ></v-text-field>
                  </v-col>

                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-btn dark color="prymary"
                    @click="buscarMedicamento">
                        Buscar
                    </v-btn>
                    
                  </v-col>
                </v-row>
                <v-row>

                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                    
                      v-model="editedItem.nombre"
                      label="nombre "
                    ></v-text-field>
                  </v-col>

                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                    
                      v-model="editedItem.existencia"
                      label="existencia "
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                        type="number"
                      v-model="editedItem.cantidad"
                      label="cantidad"
                    ></v-text-field>
                  </v-col>
                  
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue darken-1"
                text
                @click="close"
              >
                Cancelar
              </v-btn>
              <v-btn
                color="blue darken-1"
                text
                @click="save"
              >
                Guardar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">Cancelar</v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        small
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn
        color="primary"
        @click="initialize"
      >
        Reset
      </v-btn>
    </template>
    
  </v-data-table>
  </v-col>
  </v-row>
  <v-row >
    <v-col cols="12">
      <v-btn 
    @click="prueba"
    color="blue">
      guardar
    </v-btn>
    </v-col>
    
  </v-row>
</v-container>
</template>
<script>
import axios from 'axios';
//import { json } from 'express';
  export default {
    data: () => ({
      dialog: false,
      dialogDelete: false,
      headers: [
        {
          text: 'id',
          align: 'start',
          sortable: false,
          value: 'idMedicamento',
        },
        { text: 'nombre', value: 'nombre' },
        { text: 'Cantidad', value: 'cantidad' },
        { text: 'existencia', value: 'existencia' },
        
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      listadoMedicamentos: [],
      editedIndex: -1,
      editedItem: {
        nombre: '',
        idMedicamento: 0,
        existencia: 0,
        cantidad: 0
        
      },
      defaultItem: {
        nombre: '',
        idMedicamento: 0,
        existencia: 0,
        cantidad: 0
      },
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      },
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
    },

    created () {
      this.initialize()
    },

    methods: {
      async prueba(){
         //agregando nuevo
          //consultar la api 
          /* 
          pasos: 
          1- crear el objeto recetaMedicamento (la receta lleva el id del paciente)
          2-obtener ese id para relacionar las demas cosas
          3-crear el objeto transaccion medicamento(cada item de medicamento es un objeto con el id de 
          medicamento y el idde la receta) 
          */
        //var idpaciente=this.editItem.id;
        //var enviarlista=this.listadoMedicamentos;
        
        //mandar la lista a la api

        
        
       try {
         //console.log(item);
          //var lista=JSON.stringify(this.listadoMedicamentos);
        /*  this.listadoMedicamentos=[]
          this.listadoMedicamentos.push({
            
          "idMedicamento":4,
          "nombre":"samayoa",
          "existencia":10,
    
           "cantidad":125

          })
          */
          
          let response = await axios.post("api/EntradaExistencias",this.listadoMedicamentos);
//          this.listadoMedicamentos.forEach(element => {
  //          console.log(element);
    //      });
          
          console.log(response.data);
          this.listadoMedicamentos=[ ]
          this.initialize(); 
        
         
        alert("exito");
        console.log(this.listadoMedicamentos[1]);
          
      } catch (error) {
          console.log(error);
          alert("fallo");
          }
      },
      async buscarMedicamento(){
         
       try {


          var id=this.editedItem.idMedicamento;
          console.log(id);
          var endpoint="api/medicamentos/"+id
          
          let response = await axios.get(endpoint);

          
          console.log(response.data.nombre);
          this.editedItem.nombre=response.data.nombre;
          this.editedItem.existencia=response.data.existencia;
          if(response.data.nombre==null){
            alert("no encontrado");
          }
          
        
         
          
      } catch (error) {
          console.log(error);
          alert("fallo");
          }
      },
      initialize () {
        //consultar api de listado de medicamentos
        this.listadoMedicamentos = [  ]
      },

      editItem (item) {
        this.editedIndex = this.listadoMedicamentos.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        
        this.editedIndex = this.listadoMedicamentos.indexOf(item)
        this.editedItem = Object.assign({}, item)
        
        this.dialogDelete = true
      },

      deleteItemConfirm () {
        this.listadoMedicamentos.splice(this.editedIndex, 1)
        this.closeDelete()
      },

      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      save () {
        if (this.editedIndex > -1) {
          //editando los items
        // this.editedItem.existencia= parseInt(this.editedItem.existencia);
          this.editedItem.cantidad= parseInt(this.editedItem.cantidad);
         
          this.editedItem.idMedicamento=parseInt(this.editedItem.idMedicamento);
         this.editedItem.existencia=parseInt(this.editedItem.existencia);
          Object.assign(this.listadoMedicamentos[this.editedIndex], this.editedItem)
           
         
        } else {
         this.editedItem.existencia=parseInt(this.editedItem.existencia);
          this.editedItem.cantidad=parseInt(this.editedItem.cantidad);
          this.editedItem.idMedicamento=parseInt(this.editedItem.idMedicamento);
          this.listadoMedicamentos.push(this.editedItem)
        }
        this.close()
      },
    },
  }
</script>