<template>
<v-dialog v-model="show" max-width="800">

<v-card>
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
                    
                      v-model="editedItem.id"
                      label="id "
                    ></v-text-field>
                  </v-col>

                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-btn dark color="prymary" @click="alert('ejecutando')">
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
                @click="alert('hola')"
              >
                Cancelar
              </v-btn>
              <v-btn
                color="blue darken-1"
                text
                @click.native="save"
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
  <v-cart-actions>
    <v-btn color="primary" flat @click.stop="show=false">Close</v-btn>
  </v-cart-actions>
</v-card>

</v-dialog>
  
</template>
<script>
  export default {
    data: () => ({
      idmedicamento:"",
    }),
    methods:{
        mostrarTexto(){
            alert(this.idmedicamento);
        }
    },
  }
</script>
<script>
  export default {
     props: ['visible'],
    data: () => ({
      dialog: false,
      dialogDelete: false,
      headers: [
        {
          text: 'id',
          align: 'start',
          sortable: false,
          value: 'id',
        },
        { text: 'nombre', value: 'nombre' },
        { text: 'Cantidad', value: 'cantidad' },
        { text: 'existencia', value: 'existencia' },
        
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      listadoMedicamentos: [
        {
            id: 'Frozen Yogurt',
            nombre: 159,
            cantidad: 6.0,
            existencia: 24,
          },
      ],
      editedIndex: -1,
      editedItem: {
        nombre: '',
        id: '',
        existencia: 0,
        cantidad: 0,
        
      },
      defaultItem: {
        nombre: '',
        id: '',
        existencia: 0,
        cantidad: 0,
      },
    }),

    computed: {
      
      show: {
      get () {
        return this.visible
      },
      set (values) {
        if (!values) {
          this.$emit('close')
        }
      },

      showdialog(evento){
        alert("ejecutando");
        this.dialog=evento;
      },
          
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
        alert("ejecutandose");
        console.log(this);
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
          Object.assign(this.listadoMedicamentos[this.editedIndex], this.editedItem)
        } else {
          this.listadoMedicamentos.push(this.editedItem)
        }
        this.close()
      },
    },
  }
  }
</script>