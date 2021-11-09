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
        <v-toolbar-title>EMPLEADO</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
            <v-dialog
                    ref="dialog"
                    v-model="modal"
                    :return-value.sync="fecha"
                    persistent
                    width="290px"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="fecha"
                        label="Fecha Inicio"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="fecha"
                      type="date"
                      multiple
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
                        @click="$refs.dialog.save(fecha)"
                      >
                        OK
                      </v-btn>
                    </v-date-picker>
                  </v-dialog>

            <v-btn
                color="primary"
                dark
                @click="listarPlanilla()"
              >
                Buscar Planilla
              </v-btn>
        <v-spacer></v-spacer>
        <v-btn
              color="error"
              dark
              class="mb-2"
              @click="cerrarPlanilla()"
            >
              Cerrar Planilla
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
              Nueva Planilla
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
                      v-model="descripcion"
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
                @click="CrearPlanilla()"
              >
                Guardar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">Quieres Eliminar al Empleado: {{editedItem.nombreEmpleado}}</v-card-title>
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
  import EmpleadoModel from '../../models/empleado';

  export default {
    data: () => ({
      dialog: false,
      dialogDelete: false,
      fecha:'',
      fechaInicio:'',
      fechaFinal:'',
      descripcion:'',
      headers: [
        {
          text: 'ID Empleado',
          align: 'start',
          sortable: false,
          value: 'idEmpleado',
        },
        { text: 'Nombre', value: 'nombreEmpleado' },
        { text: 'Cargo', value: 'cargo' },
        { text: 'Sueldo', value: 'sueldo' },
        { text: 'Anticipo', value: 'montoAnticipo' },
        { text: 'Descuento', value: 'montoDescuento' },
        { text: 'ISSS', value: 'isss' },
        { text: 'AFP', value: 'afp' },
        { text: 'Total Descuentos', value: 'totalDescuento' },
        { text: 'Total a Pagar', value: 'totalPagar' },
      ],
      desserts: [],
      editedIndex: -1,
      editedItem:{EmpleadoModel}
      ,
      defaultItem:{EmpleadoModel},
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Nueva Planilla' : 'Editar Planilla'
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
    },

    methods: {
      
      editItem (item) {
        this.editedIndex = this.desserts.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        this.editedIndex = this.desserts.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },

      deleteItemConfirm () {
        this.desserts.splice(this.editedIndex, 1)
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
      async CrearPlanilla(){
        let me = this;
        var Array = [];
        this.desserts=[];
        
         axios.post("/api/Empleado/CrearPlanilla",
          JSON.stringify({
            fechaInicio:this.fecha[1],
            fechaFinal:this.fecha[2],
            descripcion:this.descripcion,
          }),
          {
            headers: {
              // Overwrite Axios's automatically set Content-Type
              "Content-Type": "application/json",
            },
          }
        ).then(function (resp) {
            Array = resp.data;
            Array.map(function (x) {
              me.desserts.push({
                idEmpleado: x.idEmpleado,
                nombreEmpleado: x.nombreEmpleado,
                cargo: x.cargo,
                sueldo: x.sueldo,
                montoAnticipo:x.montoAnticipo,
                montoDescuento:x.montoDescuento,
                isss:x.isss,
                afp:x.afp,
                totalDescuento:x.totalDescuento,
                totalPagar:x.totalPagar,
              });
          });
        })
        .catch(function (err) {
          console.log(err);
        });
        this.close()
      },
      async listarPlanilla() {
        let me = this;
        var Array = [];
        this.desserts=[];
        
         axios.post("/api/Empleado/ListarPlanilla",
          JSON.stringify({
            fechaInicio:this.fecha[1],
            fechaFinal:this.fecha[2],
          }),
          {
            headers: {
              // Overwrite Axios's automatically set Content-Type
              "Content-Type": "application/json",
            },
          }
        ).then(function (resp) {
            Array = resp.data;
            Array.map(function (x) {
              me.desserts.push({
                idEmpleado: x.idEmpleado,
                nombreEmpleado: x.nombreEmpleado,
                cargo: x.cargo,
                sueldo: x.sueldo,
                montoAnticipo:x.montoAnticipo,
                montoDescuento:x.montoDescuento,
                isss:x.isss,
                afp:x.afp,
                totalDescuento:x.totalDescuento,
                totalPagar:x.totalPagar,
              });
          });
        })
        .catch(function (err) {
          console.log(err);
        });
      },
      async cerrarPlanilla() {

        await axios.put("api/Empleado/cerrarPlanilla",
            JSON.stringify({
              fechaInicio:this.fecha[1],
              fechaFinal:this.fecha[2],
            }),
            {
              headers: {
                // Overwrite Axios's automatically set Content-Type
                "Content-Type": "application/json",
              },
            }
          );

        alert("Planilla Cerrada Correctamente");

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