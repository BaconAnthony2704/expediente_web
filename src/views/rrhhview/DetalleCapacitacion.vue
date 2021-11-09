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
        <v-toolbar-title>Detalle Capacitacion</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>

            <v-select v-model="seleccion1" :items="capacitaciones"></v-select>

            <v-btn
                color="primary"
                dark
                @click="ListarDetalleCapacitacion()"
              >
                Buscar Capacitacion
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
              Agruegar Empleado
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
                    <v-select v-model="seleccion1" :items="capacitaciones"></v-select>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-select v-model="seleccion" :items="empleados"></v-select>
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
                @click="CrearDetalleCapacitacion()"
              >
                Guardar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">Quieres Eliminar al Empleado de la Capacitacion: {{editedItem.nombreEmpleado}}</v-card-title>
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
      seleccion1:'',
      idDes:'',
      capacitaciones:[],
      headers: [
        {
          text: 'ID Capacitacion',
          align: 'start',
          sortable: false,
          value: 'idCapacitacion',
        },
        { text: 'id Detalle', value: 'idDetalleCapacitacion' },
        { text: 'Capacitacion', value: 'descripcion' },
        { text: 'Empleado', value: 'nombre' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      desserts: [],
      editedIndex: -1,
      editedItem:{
        idDetalleCapacitacion:'',
        idCapacitacion: '',
        idEmpleado:'',
      }
      ,
      defaultItem:{
        idDetalleCapacitacion:'',
        idCapacitacion: '',
        idEmpleado:'',
      },
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Agregar Empleado' : 'Editar Planilla'
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
        this.getEmpleados()
        this.getCapacitaciones()
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
        this.idDes=item.idDetalleCapacitacion;
      },

      async deleteItemConfirm () {
        this.desserts.splice(this.editedIndex, 1)
        await axios.post("api/Empleado/deleteDetalleCapacitacion",
          JSON.stringify({
            idDetalleCapacitacion: this.idDes,
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
      async CrearDetalleCapacitacion(){
        this.vdialog=true;
          
          var respuesta = await axios.post("api/Empleado/CrearDetalleCapacitacion",
          JSON.stringify({
            idDetalleCapacitacion:0,
            idCapacitacion:this.seleccion1,
            idEmpleado:this.seleccion,
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
          alert(this.message);
          location.reload();
        }else{
          this.message="Error vuelva a intentarlo mas tarde";
          this.vspinner=true;
        }
      },
      async ListarDetalleCapacitacion() {
        let me = this;
        var Array = [];
        this.desserts=[];
        
         axios.post("/api/Empleado/ListarDetalleCapacitacion",
          JSON.stringify({
            idDetalleCapacitacion:0,
            idCapacitacion:this.seleccion1,
            idEmpleado:0,
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
                idCapacitacion:x.idCapacitacion,
                idDetalleCapacitacion: x.idDetalleCapacitacion,
                descripcion:x.capacitacion.descripcion,
                nombre:x.empleado.nombreEmpleado,

              });
          });
        })
        .catch(function (err) {
          console.log(err);
        });
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
    getCapacitaciones() {
      let me = this;
      var DocArray = [];
      this.capacitaciones=[];
      this.seleccion1=[];
      axios
        .get("api/Empleado/ListarCapacitacion")
        .then(function (resp) {
          DocArray = resp.data;
          DocArray.map(function (x) {
            me.capacitaciones.push({ text: x.descripcion, value: x.idCapacitacion });
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