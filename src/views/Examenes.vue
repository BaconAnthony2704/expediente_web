<template>
  <v-card class="mx-auto" max-width="auto" tile>
    <div class="text-center" >
      <v-dialog width="700" >
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="red lighten-2" dark v-bind="attrs" v-on="on">
            Ingresar Examen
          </v-btn>
        </template>

        <template v-slot:default="dialog">
        <v-card>
          <v-card-title class="text-h5 grey lighten-2">
            Ingresar examen del nuevo paciente
          </v-card-title>
          <v-simple-table>
            <thead></thead>
            <tbody>
              <tr>
                <td>Doctor</td>
                <td>
                  <v-select v-model="idMedicoGrl" :items="doctores"> </v-select>
                </td>
              </tr>
              <tr>
                <td>Paciente</td>
                <td>
                  <v-select v-model="idPaciente" :items="pacientes"> </v-select>
                </td>
              </tr>
            </tbody>
          </v-simple-table>
          <v-container>
            <v-row>
              <v-col sm="5">Hematologia e Inmunohematologia <br><br>
                <v-checkbox
                  v-for="exa in examenes1" :key="exa"
                  v-model="examenesSelect"
                  :label="`${exa.text}`"
                  :value="exa.value"
                  @change="checkIncapacidad($event)"
                  class="mt-n2 mx-auto"
                >
                </v-checkbox>
              </v-col>
              <v-col sm="2"></v-col>
              <v-col sm="5">Anemias<br><br>
                <v-checkbox
                  v-for="exa in examenes2" :key="exa"
                  v-model="examenesSelect"
                  :label="`${exa.text}`"
                  :value="exa.value"
                  @change="checkIncapacidad($event)"
                  class="mt-n2 mx-auto"
                >
                </v-checkbox>
              </v-col>
            </v-row>
            <v-divider></v-divider>
            <v-divider></v-divider>
            <v-divider></v-divider>
            <v-divider></v-divider>
            <v-divider></v-divider>
            <v-divider></v-divider><br>
            <v-row>
              <v-col sm="5">Coagulacion<br><br>
                <v-checkbox
                  v-for="exa in examenes3" :key="exa"
                  v-model="examenesSelect"
                  :label="`${exa.text}`"
                  :value="exa.value"
                  @change="checkIncapacidad($event)"
                  class="mt-n2 mx-auto"
                >
                </v-checkbox>
              </v-col>
              <v-col sm="2"></v-col>
              <v-col sm="5">Fibrinolisis e Hipercoagulacion<br><br>
                <v-checkbox
                  v-for="exa in examenes4" :key="exa"
                  v-model="examenesSelect"
                  :label="`${exa.text}`"
                  :value="exa.value"
                  @change="checkIncapacidad($event)"
                  class="mt-n2 mx-auto"
                >
                </v-checkbox>
              </v-col>
            </v-row>
          </v-container>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="guardarSolicitud(),dialog.value=false">
              Guardar
            </v-btn>
          </v-card-actions>
        </v-card>
        </template>
      </v-dialog>


      <v-dialog width="400">
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="blue lighten-2" class="ma-6" dark v-bind="attrs" v-on="on">
            Agregar Nuevo Tipo Examen
          </v-btn>
        </template>

        <template v-slot:default="dialog">
        <v-card>
          <v-card-title class="text-h5 grey lighten-2">
            Ingresar Nuevo Tipo Examen
          </v-card-title>
          <v-container>
            <v-text-field
              v-model="nombreExamen"
              label="Nombre del Examen"
              :rules="rules"
            >
            </v-text-field>
            <v-text-field
              v-model="tipoExamen"
              label="Tipo de Examen"
              :rules="rules"
            >
            </v-text-field>
          </v-container>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="guardarExamen(),dialog.value=false">
              Guardar
            </v-btn>
          </v-card-actions>
        </v-card>
        </template>
      </v-dialog>


      <v-dialog width="700">
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="red lighten-2" class="ma-3" dark v-bind="attrs" v-on="on" @click="getExamenes()">
            Eliminar Tipo Examen
          </v-btn>
        </template>

        <template v-slot:default="dialog">
        <v-card>
          <v-card-title class="text-h5 grey lighten-2">
            Eliminar Nuevo Tipo Examen
          </v-card-title>
          <v-container>
 
        <v-data-table
          :headers="header"
          :items="desserts"
          sort-by="calories"
          class="elevation-1"
        >
      <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title>Tipos de Examenes</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">Eliminar Tipo Examen: {{examDelete}} </v-card-title>
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
        <template v-slot:[`item.actions`]="{ item }">
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
    </v-data-table>

          </v-container>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="dialog.value=false">
              Cerrar
            </v-btn>
          </v-card-actions>
        </v-card>
        </template>
      </v-dialog>
    </div>

    <!--
      aqui comensamos a mostrar el mensaje
    -->
    <v-dialog v-model="vdialog" persistent max-width="290">
          <v-card>
            <v-card-title class="text-h5"> Espere Guardando </v-card-title>
            <v-card-text>
              <center>
                <v-progress-circular
                  :size="50"
                  color="primary"
                  indeterminate
                ></v-progress-circular>
              </center>
            </v-card-text>
          </v-card>
      </v-dialog>
      <v-dialog v-model="vspinner" persistent max-width="400">
          <v-card>
            <v-card-title class="text-h5"> Guardado </v-card-title>
            <v-card-text>
              <div class="text-h4 pa-12">{{ message }}</div>
            </v-card-text>
            <v-card-action class="justify-end">
              <v-btn @click="vspinner=false,getSolicitudExamenes()">Cerrar</v-btn>
            </v-card-action>
          </v-card>
      </v-dialog>
    <!--
      Hasta aqui mostramos el mensaje
    -->

    <template>
      <v-row justify="center">
        <v-dialog v-model="spinner" persistent max-width="290">
          <v-card>
            <v-card-title class="text-h5"> Espere por favor </v-card-title>
            <v-card-text>
              <center>
                <v-progress-circular
                  :size="50"
                  color="primary"
                  indeterminate
                ></v-progress-circular>
              </center>
            </v-card-text>
          </v-card>
        </v-dialog>
      </v-row>
    </template>
    <v-list-item two-line v-for="examen in listExamens" :key="examen">
      <v-list-item-content>
        <v-list-item-title>{{ examen.paciente }}</v-list-item-title>
        <v-list-item-subtitle>
          <v-simple-table>
            <template v-slot:default>
              <thead></thead>

              <tbody>
                <tr>
                  <td>Fecha Ingreso</td>
                  <td>{{ examen.fechaIngreso }}</td>
                </tr>
                <tr>
                  <td>Medico</td>
                  <td>{{ examen.medico }}</td>
                </tr>
                <tr
                  v-for="solicitud in examen.detalleSolicitudExamenes"
                  :key="solicitud"
                >
                  <td>Nombre del examen</td>
                  <td>{{ solicitud.examen }}</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-list-item-subtitle>
        <div
          id="divider"
          style="background-color: #441468; height: 5px; width: 100%"
        ></div>
      </v-list-item-content>
    </v-list-item>
  </v-card>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      header: [
        {
          text: 'ID Examen',
          align: 'start',
          sortable: false,
          value: 'idExamen',
        },
        { text: 'Nombre', value: 'nombre' },
        { text: 'Tipo Examen', value: 'tipoExamen' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      listExamens: [],
      search: "",
      dialog: false,
      pacientes: [],
      doctores: [],
      idMedicoGrl: "",
      idPaciente: "",
      nombreExamen:"",
      tipoExamen:"",
      desserts: [],
      examenes1: [],
      examenes2: [],
      examenes3: [],
      examenes4: [],
      examenes5: [],
      examenesSelect: [],
      spinner: false,
      vspinner: false,
      vdialog: false,
      message: "",
      dialogDelete: false,
      examDelete:"",
      idExamen:0,
    };
  },
  components: {
   
  },
  mounted() {
    this.$emit("cambiarEstado");
  },
  methods: {
    async guardarSolicitud() {
      let listEx = [];
      this.vdialog = true;
      console.log(this.idMedicoGrl);
      console.log(this.idPaciente);
      console.log(JSON.stringify(this.examenesSelect));
      let me = this;
      
      if (this.examenesSelect.length > 0) {
        console.log("Puto te gusta la paloma")
        me.examenesSelect.map(function (x) {
          listEx.push({ idExamen: x });
        });
      }
      
      var respuesta= await axios.post("api/SolicitudExamen/Crear",
          JSON.stringify({idPaciente: me.idPaciente,
          idMedicoGrl: me.idMedicoGrl,
          solicitudExamenes: listEx,}),
          {
          headers: {
            // Overwrite Axios's automatically set Content-Type
            "Content-Type": "application/json",
          },
        });
      this.vdialog = false;
      if(respuesta.status==200){
        this.message="Guardado Correctamente";
        this.vspinner=true;
        me.idPaciente=null;
        me.idMedicoGrl=null;
        me.examenesSelect=null;
      }else{
        this.message="Error vuelva a intentarlo mas tarde";
        this.vspinner=true;
      }
    },
    async getSolicitudExamenes() {
      let me = this;
      var examenesArray = [];
      this.examenesSelect= [],
      this.spinner=true;
      var sol=await axios.get('api/SolicitudExamen');
      //console.log(sol.data)
      this.listExamens=[];
      examenesArray=sol.data;
      examenesArray.map(function (x) {
            me.listExamens.push(x);
            console.log(me.listExamens);
          });
      this.spinner=false;
    },
    getPacientes() {
      let me = this;
      var PaciArray = [];
      axios
        .get("api/ComboBox/ListarPaciente")
        .then(function (resp) {
          PaciArray = resp.data;
          PaciArray.map(function (x) {
            me.pacientes.push({ text: x.nombre, value: x.idPaciente });
          });
        })
        .catch(function (err) {
          console.log(err);
        });
    },
    getDoctores() {
      let me = this;
      var DocArray = [];
      axios
        .get("api/ComboBox/ListarMedico")
        .then(function (resp) {
          DocArray = resp.data;
          DocArray.map(function (x) {
            me.doctores.push({ text: x.nombre, value: x.idMedicoGrl });
          });
        })
        .catch(function (err) {
          console.log(err);
        });
    },
    getExamenes() {
      let me = this;
      var ExaArray = [];
      
      if(me.desserts.length>0){
        me.desserts=[];
      }
            
      axios
        .get("api/Examen")
        .then(function (resp) {
          ExaArray = resp.data;
          ExaArray.map(function (x) {
            if(x.tipoExamen=='Hematologia e Inmunohematologia'){
                me.examenes1.push({ text: x.nombre, value: x.idExamen});
            }
            if(x.tipoExamen=='Anemias'){
                me.examenes2.push({ text: x.nombre, value: x.idExamen});
            }
            if(x.tipoExamen == 'Coagulacion'){
                me.examenes3.push({text: x.nombre, value: x.idExamen});
            }
            if(x.tipoExamen == 'Fibrinolisis e Hipercoagulacion'){
                me.examenes4.push({text: x.nombre, value: x.idExamen});
            }
            if(x.tipoExamen == 'Bioquimica'){
                me.examenes5.push({text: x.nombre, value: x.idExamen});
            }
            
            me.desserts.push({nombre: x.nombre, idExamen: x.idExamen, tipoExamen: x.tipoExamen});

          });
        })
        .catch(function (err) {
          console.log(err);
        });
    },
    async guardarExamen(){
      let me = this;
      this.vdialog=true;
      var respuesta= await axios.post("api/SolicitudExamen/CrearExamen",
          JSON.stringify({
            idExamen: me.idExamen,
            nombre: me.nombreExamen,
            tipoExamen: this.tipoExamen}),
          {
          headers: {
            // Overwrite Axios's automatically set Content-Type
            "Content-Type": "application/json",
          },
        });

        this.vdialog = false;
        if(respuesta.status==200){
          this.message="Guardado Correctamente";
          this.vspinner=true;
          me.nombreExamen=null;
          me.tipoExamen=null;
        }else{
          this.message="Error vuelva a intentarlo mas tarde";
          this.vspinner=true;
        }
    },
    deleteItem (item) {
        this.editedIndex = this.desserts.indexOf(item);
        this.editedItem = Object.assign({}, item);
        this.dialogDelete = true;
        this.examDelete = item.nombre;
        this.idExamen = item.idExamen;
      },
    closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },
    async deleteItemConfirm () {
        this.desserts.splice(this.editedIndex, 1);
        console.log(this.idExamen);
        
        await axios.delete("api/Examen/"+this.idExamen)
        .then(function () {})
        .catch(function (err) {
          console.log(err);
        });

        this.closeDelete();
      },

  },
  created() {
    this.getSolicitudExamenes();
    this.getPacientes();
    this.getDoctores();
    this.getExamenes();
  },
};
</script>
