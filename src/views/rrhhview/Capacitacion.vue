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
        <v-toolbar-title>CAPACITACION</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-btn
              color="Error"
              dark
              class="mb-2"
              :to="{ name: 'detalleCapacitacion' }"
            >
              Agruegar Empleado
            </v-btn>
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
              Nueva Capacitacion
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
                    ></v-text-field>
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
            <v-card-title class="text-h5">¿Quieres Eliminar Capacitacion?</v-card-title>
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
      modal: false,
      dialogDelete: false,
      idDes:'',
      headers: [
        {
          text: 'ID Capacitacion',
          align: 'start',
          sortable: false,
          value: 'idCapacitacion',
        },
        { text: 'Descripcion', value: 'descripcion' },
        { text: 'Monto', value: 'monto' },
        { text: 'Fecha', value: 'fecha' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      desserts: [],
      editedIndex: -1,
      editedItem: {
        idCapacitacion: '',
        descripcion:'',
        monto:'',
        fecha:'',
      },
      defaultItem: {
        idCapacitacion: '',
        descripcion:'',
        monto:'',
        fecha:'',
      },
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Nueva Capacitacion' : 'Editar Capacitacion'
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
        let me = this;
        var Array = [];
        
        axios
          .get("/api/Empleado/ListarCapacitacion")
          .then(function (resp) {
            Array = resp.data;
            Array.map(function (x) {
              me.desserts.push({
                idCapacitacion: x.idCapacitacion,
                descripcion: x.descripcion,
                monto: x.monto,
                fecha: x.fecha.substring(0,10),
              });
          });
        })
        .catch(function (err) {
          console.log(err);
        });
        console.log(this.desserts)
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
        this.idDes=item.idCapacitacion;
      },

      async deleteItemConfirm () {
        this.desserts.splice(this.editedIndex, 1)

        await axios.post("api/Empleado/deleteCapacitacion",
          JSON.stringify({
            idCapacitacion: this.idDes,
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
      async guardarCapacitacion(){
        this.vdialog=true;
          
          var respuesta = await axios.post("api/Empleado/CrearCapacitacion",
          JSON.stringify({
            idCapacitacion: 0,
            descripcion: this.editedItem.descripcion,
            monto: parseFloat(this.editedItem.monto),
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
          alert(this.message);
          this.vspinner=true;
          console.log(respuesta.status);
          location.reload();
        }else{
          this.message="Error vuelva a intentarlo mas tarde";
          this.vspinner=true;
        }      
      },
      async editarCapacitacion(){
        this.vdialog=true;
          
          var respuesta = await axios.put("api/Empleado/editarCapacitacion",
          JSON.stringify({
            idCapacitacion: this.editedItem.idCapacitacion,
            descripcion: this.editedItem.descripcion,
            monto: parseFloat(this.editedItem.monto),
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
          location.reload();
          this.save();
        }else{
          this.message="Error vuelva a intentarlo mas tarde";
          this.vspinner=true;
        }      
      },
    decision(){
        if(this.formTitle=="Editar Capacitacion"){
          console.log("Casi papu");
          this.editarCapacitacion();
        }else{
          this.guardarCapacitacion();
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