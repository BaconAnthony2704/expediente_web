<template>
  <v-card class="mx-auto" max-width="auto" tile>
    <div class="text-center">
      <v-dialog v-model="dialog" width="500">
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="red lighten-2" dark v-bind="attrs" v-on="on">
            Ingresar examen
          </v-btn>
        </template>

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
              <v-col cols="12" md="12" v-for="exa in examenes" :key="exa">
                <v-checkbox
                  v-model="examenesSelect"
                  :label="`${exa.text}`"
                  :value="exa.value"
                  @change="checkIncapacidad($event)"
                >
                </v-checkbox>
              </v-col>
            </v-row>
          </v-container>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="guardarSolicitud()">
              Guardar
            </v-btn>
          </v-card-actions>
        </v-card>
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
      listExamens: [],
      search: "",
      dialog: false,
      pacientes: [],
      doctores: [],
      idMedicoGrl: "",
      idPaciente: "",
      examenes: [],
      examenesSelect: [],
      spinner: false,
      vspinner: false,
      vdialog: false,
      message: "",
    };
  },
  components: {
   
  },
  mounted() {
    this.$emit("cambiarEstado");
  },
  methods: {
    async guardarSolicitud() {
      this.dialog = false;
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
      axios
        .get("api/Examen")
        .then(function (resp) {
          ExaArray = resp.data;
          ExaArray.map(function (x) {
            me.examenes.push({ text: x.nombre, value: x.idExamen });
          });
        })
        .catch(function (err) {
          console.log(err);
        });
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
