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
        <v-toolbar-title>ASISTENCIA LABORAL</v-toolbar-title>
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
              Nueva Asistencia Laboral
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
                    <v-checkbox
                      v-model="editedItem.sePresento"
                      label="sePresento"
                    ></v-checkbox>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-checkbox
                      v-model="editedItem.conPermiso"
                      label="conPermiso"
                    ></v-checkbox>
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
                    <v-select v-model="seleccion1" :items="permisos"></v-select>
                    <v-btn
                      color="primary"
                      v-if="editedItem.conPermiso"
                      @click="getPermisos()"
                    >
                      Buscar Permiso
                    </v-btn>
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
            <v-card-title class="text-h5">¿Deseas Eliminar la Asistencia Laboral?</v-card-title>
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
      checkbox1: true,
      checkbox2: true,
      dialog: false,
      modal: false,
      dialogDelete: false,
      empleados:[],
      permisos:[],
      seleccion:'',
      seleccion1:'',
      idDes:'',
      headers: [
        {
          text: 'ID Asistencia Laboral',
          align: 'start',
          sortable: false,
          value: 'idAsistenciaLaboral',
        },
        { text: 'sePresento', value: 'sePresento' },
        { text: 'conPermiso', value: 'conPermiso' },
        { text: 'Permiso', value: 'descripcion' },
        { text: 'Nombre', value: 'nombre' },
        { text: 'Fecha', value: 'fecha' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      desserts: [],
      editedIndex: -1,
      editedItem: {
        idAsistenciaLaboral: '',
        sePresento:'',
        conPermiso:'',
        fecha:'',
        idPermiso:0,
        idEmpleado:0,
      },
      defaultItem: {
        idAsistenciaLaboral: '',
        sePresento:'',
        conPermiso:'',
        fecha:'',
        idPermiso:0,
        idEmpleado:0,
      },
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Nueva Asistencia Laboral' : 'Editar Asistencia Laboral'
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
          .get("/api/Empleado/ListarAsistenciaLaboral")
          .then(function (resp) {
            Array = resp.data;
            Array.map(function (x) {
              me.desserts.push({
                idAsistenciaLaboral: x.idAsistenciaLaboral,
                sePresento: x.sePresento,
                conPermiso: x.conPermiso,
                descripcion: x.permiso.descripcion,
                nombre: x.empleado.nombreEmpleado,
                fecha: x.fecha.substring(0,10),
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
        this.permisos=[];

        var respuesta = await axios.post("api/Empleado/ListarAsistenciaLaboralDos",
            JSON.stringify({
              idAsistenciaLaboral: item.idAsistenciaLaboral,
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
        this.idDes=item.idAsistenciaLaboral
      },

      async deleteItemConfirm () {
        this.desserts.splice(this.editedIndex, 1)

      await axios.post("api/Empleado/deleteAsistenciaLaboral",
          JSON.stringify({
            idAsistenciaLaboral: this.idDes,
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

      async guardarAsistenciaLaboral(){
        this.vdialog=true;
        var sePresento=false;
        var conPermiso=false;
          if(this.editedItem.sePresento==true){
              sePresento=true;
              console.log("Se Presento: "+sePresento);
          }
          
          if(this.editedItem.conPermiso==true){
              conPermiso=true;
              console.log("Con Permiso: "+conPermiso);
          }
          
          
          var respuesta = await axios.post("api/Empleado/CrearAsistenciaLaboral",
          JSON.stringify({
            idAsistenciaLaboral: 0,
            sePresento: sePresento,
            conPermiso: conPermiso,
            fecha: this.editedItem.fecha,
            idPermiso:parseInt(this.seleccion1),
            idEmpleado: parseInt(this.seleccion),
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
          alert(this.message);
          location.reload();
          this.save();
        }else{
          this.message="Error vuelva a intentarlo mas tarde";
          this.vspinner=true;
        }      
      },
      async editarAsistenciaLaboral(){
        this.vdialog=true;
        var sePresento=false;
        var conPermiso=false;
          if(this.editedItem.sePresento==true){
              sePresento=true;
              console.log("Se Presento: "+sePresento);
          }
          
          if(this.editedItem.conPermiso==true){
              conPermiso=true;
              console.log("Con Permiso: "+conPermiso);
          }

          var respuesta = await axios.put("api/Empleado/editarAsistenciaLaboral",
          JSON.stringify({
            idAsistenciaLaboral: this.editedItem.idAsistenciaLaboral,
            sePresento: sePresento,
            conPermiso: conPermiso,
            fecha: this.editedItem.fecha,
            idPermiso: parseInt(this.seleccion1),
            idEmpleado: parseInt(this.seleccion),
            
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
    async getPermisos() {
      this.permisos=[];
      this.seleccion1='';
      var respuesta = await axios.post("api/Empleado/ListarAsistenciaLaboralUno",
        JSON.stringify({
          idEmpleado: this.seleccion,
          }),
          {
            headers: {
              // Overwrite Axios's automatically set Content-Type
                "Content-Type": "application/json",
            },
          }
        );

      this.permisos.push({ text: respuesta.data.descripcion, value: respuesta.data.idPermiso });
      this.seleccion1=respuesta.data.idPermiso;
    },
    decision(){
        if(this.formTitle=="Editar Asistencia Laboral"){
          this.editarAsistenciaLaboral();
        }else{
          this.guardarAsistenciaLaboral();
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