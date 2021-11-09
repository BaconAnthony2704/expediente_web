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
        <v-toolbar-title>SANCION</v-toolbar-title>
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
              @click="getEmpleados()"
            >
              Nueva Sancion
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
                    <v-select v-model="seleccion" :items="empleados"></v-select>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-dialog
                    ref="dialog"
                    v-model="modal"
                    :return-value.sync="editedItem.fecha"
                    persistent
                    width="290px"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="editedItem.fecha"
                        label="Picker in dialog"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="editedItem.fecha"
                      type="date"
                      scrollable
                    >
                      <v-spacer></v-spacer>
                      <v-btn
                        text
                        color="primary"
                        @click="modal = false"
                      >
                        Cancel
                      </v-btn>
                      <v-btn
                        text
                        color="primary"
                        @click="$refs.dialog.save(editedItem.fecha)"
                      >
                        OK
                      </v-btn>
                    </v-date-picker>
                  </v-dialog>
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
                @click="decision()"
              >
                Guardar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">¿Desea Eliminar Sancion?</v-card-title>
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
      empleados:[],
      seleccion:'',
      idDes:'',
      headers: [
        {
          text: 'ID Sancion',
          align: 'start',
          sortable: false,
          value: 'idSancion',
        },
        { text: 'Descripcion', value: 'descripcion' },
        { text: 'Nombre', value: 'nombre' },
        { text: 'Fecha', value: 'fecha' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      desserts: [],
      editedIndex: -1,
      editedItem: {
        idSancion: '',
        descripcion:'',
        nombre:'',
        fecha:'',
      },
      defaultItem: {
        idSancion: '',
        descripcion:'',
        nombre:'',
        fecha:'',
      },
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Nueva Sancion' : 'Editar Sancion'
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
      this.getEmpleados()
    },

    methods: {
      initialize () {
       let me = this;
        var Array = [];
        
        axios
          .get("/api/Empleado/ListarSancion")
          .then(function (resp) {
            Array = resp.data;
            Array.map(function (x) {
              me.desserts.push({
                idSancion: x.idSancion,
                descripcion: x.descripcion,
                nombre: x.empleado.nombreEmpleado,
                fecha: x.fecha,
              });
          });
        })
        .catch(function (err) {
          console.log(err);
        });
      },

      async editItem (item) {
        this.editedIndex = this.desserts.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.empleados=[];

        var respuesta = await axios.post("api/Empleado/ListarSancionUno",
            JSON.stringify({
              idSancion: item.idSancion,
            }),
            {
              headers: {
                // Overwrite Axios's automatically set Content-Type
                "Content-Type": "application/json",
              },
            }
          );

        this.empleados.push({ text: respuesta.data.nombreEmpleado, value: respuesta.data.idEmpleado });
        this.seleccion=respuesta.data.idEmpleado;

        this.dialog = true
      },

      deleteItem (item) {
        this.editedIndex = this.desserts.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
        this.idDes=item.idSancion;
      },

      async deleteItemConfirm () {
        this.desserts.splice(this.editedIndex, 1)

        await axios.post("api/Empleado/deleteSancion",
          JSON.stringify({
            idSancion: this.idDes,
          }),
          {
            headers: {
              // Overwrite Axios's automatically set Content-Type
              "Content-Type": "application/json",
            },
          }
        );

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
      async guardarSancion(){
        this.vdialog=true;
          
          var respuesta = await axios.post("api/Empleado/CrearSancion",
          JSON.stringify({
            idSancion: 0,
            descripcion: this.editedItem.descripcion,
            idEmpleado: parseInt(this.seleccion),
            fecha: this.editedItem.fecha,
          }),
          {
            headers: {
              // Overwrite Axios's automatically set Content-Type
              "Content-Type": "application/json",
            },
          }
        );

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
      async editarSancion(){
        this.vdialog=true;
          
          var respuesta = await axios.put("api/Empleado/editarSancion",
          JSON.stringify({
            idSancion: this.editedItem.idSancion,
            descripcion: this.editedItem.descripcion,
            idEmpleado: parseInt(this.seleccion),
            fecha: this.editedItem.fecha,
          }),
          {
            headers: {
              // Overwrite Axios's automatically set Content-Type
              "Content-Type": "application/json",
            },
          }
        );

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
      this.empleados=[];
      this.seleccion='';
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
    decision(){
        if(this.formTitle=="Editar Sancion"){
          console.log("Casi papu");
          this.editarSancion();
        }else{
          this.guardarSancion();
        }
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