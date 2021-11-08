<template>
  <v-data-table
    :headers="headers"
    :items="listadoMedicamentos"
    sort-by="calories"
    class="elevation-1"
    :search="search"
    :custom-filter="filterOnlyCapsText"
  >
    <template v-slot:top>
      
      <v-toolbar
        flat
      >
        <v-toolbar-title>Medicamentos Registrados</v-toolbar-title>
        <v-text-field
          v-model="search"
          label="Buscar Medicamento"
          class="mx-4"
        ></v-text-field>
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
              Agregar
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">Datos del nuevo medicamento</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                    type="number"
                      v-model="editedItem.idmedicamento"
                      label="codigo"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.nombre"
                      label="nombre"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.tipo"
                      label="presentacion"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      type="number"
                      v-model="editedItem.existencia"
                      label="Existencia"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.descripcion"
                      label="Descripcion"
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
              <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
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
</template>
<script>
import axios from 'axios';
  export default {
    data: () => ({
      search: '',
      dialog: false,
      dialogDelete: false,
      headers: [
        {
          text: 'Codigo',
          align: 'start',
          sortable: false,
          value: 'idmedicamento',
        },
        { text: 'Nombre', value: 'nombre' },
        { text: 'Tipo', value: 'tipo' },
        { text: 'Existencia', value: 'existencia' },
        { text: 'Descripcion', value: 'descripcion' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      listadoMedicamentos: [],
      editedIndex: -1,
      editedItem: {
        idmedicamento: 0,
        nombre: '',
        tipo: '',
        existencia: 0,
        descripcion: '',
      },
      defaultItem: {
        idmedicamento: 0,
        nombre: '',
        tipo: '',
        existencia: 0,
        descripcion: '',
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
      initialize () {
        //hacer la consulta a la api getmedicamentos
        //this.listadoMedicamentos = [   ]
        this.listarMedicamentos();
      },
      filterOnlyCapsText (value, search) {
        console.log(value)

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
          alert("fallo");
          }
      },

      editItem (item) {
        //llamar al ws de editar pasandole el id
        
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
        //this.listadoMedicamentos.splice(this.editedIndex, 1)
        //consultar la api de borrar
        this.eliminarMedicamento();

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
          //logica cuando se edita
          //Object.assign(this.listadoMedicamentos[this.editedIndex], this.editedItem)
          var id=this.editedItem;
           this.editedItem.existencia=parseInt(this.editedItem.existencia);
           this.editedItem.idmedicamento=parseInt(this.editedItem.idmedicamento);
          this.editarMedicamento(id);
        } 
        //modificar el else tiene que guardar en la base de datos
        else {
          //guardar el nuevo medicamento en la api es post medicamento
          //this.listadoMedicamentos.push(this.editedItem)  //listar fuera de consulta
          this.editedItem.idmedicamento=parseInt(this.editedItem.idmedicamento);
          this.editedItem.existencia=parseInt(this.editedItem.existencia);
          this.guardarMedicamento(this.editedItem);
          
        }
        this.close()
      },
      async guardarMedicamento(item){
       try {
         console.log(item);
          let response = await axios.post("api/medicamentos",item);
          
          
          console.log(response.data);
          alert("medicamento guardado");

         this.listarMedicamentos();
       
          
      } catch (error) {
          console.log(error);
          alert("fallo");
          }
      },
      async editarMedicamento(item){
       try {
         var id=item.idmedicamento;
         var endpoint="api/medicamentos/"+id;
         console.log(item);
          let response = await axios.put(endpoint,item);
          
          
          console.log(response.data);
          alert("Medicamento actualizado");

         this.listarMedicamentos();
       
          
      } catch (error) {
          console.log(error);
          alert("fallo");
          }
      },
      async eliminarMedicamento(){
       try {
         var obj=this.editedItem;
         var id=obj.idmedicamento;
         id=parseInt(id);
         
         var endpoint="api/medicamentos/"+id;
         console.log(id);
          let response = await axios.delete(endpoint);
          
          
          console.log(response.data);
          alert("medicamento borrado");

         this.listarMedicamentos();
       
          
      } catch (error) {
          console.log(error);
          alert("fallo");
          }
      },
    },
  }
</script>