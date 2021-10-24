<template>
      <v-data-table
    :headers="headers"
    :items="desserts"
    sort-by="calories"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title>DESCUENTO</v-toolbar-title>
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
              Nuevo Descuento
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
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
                      v-model="editedItem.descripcion"
                      label="Descripcion"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.monto"
                      label="Monto"
                      type="number"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-select v-model="editedItem.idEmpleado" :items="empleados"></v-select>
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
                @click="guardarDescuento()"
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
import axios from "axios";

  export default {
    data: () => ({
      dialog: false,
      dialogDelete: false,
      idDes:'',
      headers: [
        {
          text: 'ID Descuento',
          align: 'start',
          sortable: false,
          value: 'idDescuento',
        },
        { text: 'Descripcion', value: 'descripcion' },
        { text: 'Monto', value: 'monto' },
        {text: 'Nombre Empleado', value:'nombre'},
        { text: 'Fecha', value: 'fecha' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      desserts: [],
      empleados: [],
      editedIndex: -1,
      editedItem: {
        idDescuento:'',
        descripcion:'',
        monto:'',
        nombre:'',
        fecha:'',
      },
      defaultItem: {
        idDescuento: '',
        descripcion:'',
        monto:'',
        nombre:'',
        fecha:'',
      },
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Nuevo Descuento' : 'Nuevo Descuento'
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
      this.initialize();
      this.getEmpleados();
    },

    methods: {
      initialize () {
        let me = this;
        var Array = [];
        
        axios
          .get("/api/Empleado/ListarDescuento")
          .then(function (resp) {
            Array = resp.data;
            Array.map(function (x) {
              me.desserts.push({
                idDescuento: x.idDescuento,
                descripcion: x.descripcion,
                monto: x.monto,
                nombre: x.empleado.nombreEmpleado,
                fecha: x.fecha,
              });
          });
        })
        .catch(function (err) {
          console.log(err);
        });
         
      },

      editItem (item) {
        this.editedIndex = this.desserts.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        this.editedIndex = this.desserts.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
        this.idDes=item.idDescuento;
      },

      async deleteItemConfirm () {
        this.desserts.splice(this.editedIndex, 1)
        console.log(this.idDes);

        await axios.delete("api/Empleado/"+this.idDes)
        .then(function () {})
        .catch(function (err) {
          console.log(err);
        });

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
      async guardarDescuento(){
        this.vdialog=true;
               
          var respuesta = await axios.post("api/Empleado/CrearDescuento",
          JSON.stringify({
            idDescuento: parseInt(this.editedItem.idDescuento),
            descripcion: this.editedItem.descripcion,
            monto: parseFloat(this.editedItem.monto),
            idEmpleado: parseInt(this.editedItem.idEmpleado),
            fecha: '2021-02-01 00:00:00',
          }),
          {
            headers: {
              // Overwrite Axios's automatically set Content-Type
              "Content-Type": "application/json",
            },
          }
        );

        console.log("Entrastes puto")
        this.vdialog = false;
        if(respuesta.status==200){
          this.message="Guardado Correctamente";
          this.vspinner=true;
          console.log(respuesta.status);
          this.save();
        }else{
          this.message="Error vuelva a intentarlo mas tarde";
          this.vspinner=true;
        }      


      },
      getEmpleados() {
      let me = this;
      var DocArray = [];
      axios
        .get("api/Empleado/Listar")
        .then(function (resp) {
          DocArray = resp.data;
          DocArray.map(function (x) {
            me.empleados.push({ text: x.nombreEmpleado, value: x.idEmpleado });
          });
        })
        .catch(function (err) {
          console.log(err);
        });
    },

      save () {
        if (this.editedIndex > -1) {
          Object.assign(this.desserts[this.editedIndex], this.editedItem)
        } else {
          this.desserts.push(this.editedItem)
        }
        this.close()
      },
    },
  }
</script>