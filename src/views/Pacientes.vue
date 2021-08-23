<template>


      <v-row justify="center">
        <v-dialog v-model="spinner" persistent max-width="290">
          <v-dialog
          v-model="dialog"
          max-width="500px"
        >
        
        <!-- Aqui va la edicion del paciente -->
        <v-card>
            <v-card-title>
              <span class="text-h5">Editar paciente</span>
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
                      v-model="editedItem.nombrePaciente"
                      label="Nombres"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.apellidoPaciente"
                      label="Apellido"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="6"
                    sm="2"
                    md="2"
                  >
                    <v-text-field
                      v-model="editedItem.altura"
                      label="Altura"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="6"
                    sm="2"
                    md="2"
                  >
                    <v-text-field
                      v-model="editedItem.peso"
                      label="Peso"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="12"
                    md="12"
                  >
                    <v-textarea
                    outlined
                    name="input-7-4"
                    label="Domicilio"
                    v-model="editedItem.domicilioPaciente"
                    :rules="direccionRules"
                    :counter="255"
                  ></v-textarea>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="12"
                    md="12"
                  >
                    <v-textarea
                    outlined
                    name="input-7-4"
                    label="Lugar de naciemiento"
                    v-model="editedItem.lugarNacimiento"
                    :rules="direccionRules"
                    :counter="255"
                  ></v-textarea>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.noISSS"
                      label="Nro de ISSS"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="6"
                  >
                    <v-text-field
                      v-model="editedItem.medicoGrl"
                      label="Medico Grl"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="6"
                  >
                    <v-text-field
                      v-model="editedItem.poliza"
                      label="Poliza"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                  <v-dialog
                    ref="dialog"
                    v-model="modal"
                    :return-value.sync="date"
                    persistent
                    width="290px"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="editedItem.fechaNacimiento"
                        label="Fecha de nacimiento"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker v-model="editedItem.fechaNacimiento" scrollable>
                      <v-spacer></v-spacer>
                      <v-btn text color="primary" @click="modal = false">
                        Cancelar
                      </v-btn>
                      <v-btn
                        text
                        color="primary"
                        @click="$refs.dialog.save(editedItem.fechaNacimiento)"
                      >
                        OK
                      </v-btn>
                    </v-date-picker>
                  </v-dialog>
                </v-col>
                <v-col
                    cols="12"
                    sm="6"
                    md="6"
                  >
                    <v-text-field
                      v-model="editedItem.conyugue"
                      label="Conyugue"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="6"
                  >
                    <v-text-field
                      v-model="editedItem.correo"
                      label="Correo"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="6"
                  >
                    <v-select
                    :items="generos"
                    v-model="editedItem.idGenero"
                    label="Seleccione un genero"
                    item-value="value"
                    item-text="text"
                    outlined
                  ></v-select>
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
                Cancel
              </v-btn>
              <v-btn
                color="blue darken-1"
                text
                @click="update"
              >
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog
          transition="dialog-top-transition"
          max-width="600"
          v-model="vdialog"
        >
          <!-- <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="primary"
            v-bind="attrs"
            v-on="on"
          >From the top</v-btn>
        </template> -->
          <template>
            <v-card v-model="dialog">
              <v-toolbar color="primary" dark>Paciente</v-toolbar>
              <v-card-text>
                <div class="text-h2 pa-12">{{ message }}</div>
              </v-card-text>
              <v-card-actions class="justify-end">
                <v-btn text @click="cerrar()">Cerrar</v-btn>
              </v-card-actions>
            </v-card>
          </template>
        </v-dialog>
          <v-card>
            <center><v-card-title class="text-h5"> Espere por favor </v-card-title></center>
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
        <div>
          <v-data-table
    :headers="dessertHeaders"
    :items="expedidentes"
    :search="search"
    :single-expand="singleExpand"
    :expanded.sync="expanded"
    item-key="nombrePaciente"
    show-expand
    class="elevation-1"
  >
  
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
  
    <template v-slot:top>
      
      <v-toolbar flat>
        <v-toolbar-title>Expediente</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-toolbar>
    </template>
    
    <template v-slot:expanded-item="{ headers, item }">
      
      
      <td :colspan="headers.length">
        <!-- <li v-for="i in item.alergias" :key="i">
            {{i.nombre}}
        </li> -->
        <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-title>Informacion personal</v-list-item-title>
            <v-list-item-subtitle>
              <v-simple-table>
                <template>
                  <tr>
                    <td>Domicilio</td>
                    <td>{{ item.domicilioPaciente }}</td>
                  </tr>
                </template>
              </v-simple-table>
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-title>Informacion adicional</v-list-item-title>
            <v-list-item-subtitle>
              <v-simple-table>
                <template>
                  <tr>
                    <td>Lugar de nacimiento</td>
                    <td>{{ item.lugarNacimiento }}</td>
                  </tr>
                  <tr>
                    <td>Telefono domicilio</td>
                    <td>{{ item.telefonoDomicilio }}</td>
                  </tr>
                  <tr>
                    <td>Telefono oficina</td>
                    <td>{{ item.telefonoOficina }}</td>
                  </tr>
                </template>
              </v-simple-table>
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-title>Alergias</v-list-item-title>
            <v-list-item-subtitle>
              <v-simple-table>
                <template>
                  <tr v-for="i in item.alergias" :key="i">
                    {{
                      i.nombre
                    }}
                  </tr>
                </template>
              </v-simple-table>
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-title>Incapacidades</v-list-item-title>
            <v-list-item-subtitle>
              <v-simple-table>
                <template>
                  <tr v-for="i in item.incapacidades" :key="i">
                    {{
                      i.nombre
                    }}
                  </tr>
                </template>
              </v-simple-table>
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </td>
      
    </template>
    
  </v-data-table>
        </div>
      </v-row>
      
      
</template>


<script>
import axios from "axios";
import ExpedienteModel from "../models/expediente";
export default {
  data() {
    return {
      dialog: false,
      modal: false,
      dialogDelete: false,
      singleExpand: false,
      search: "",
      dessertHeaders: [
        { text: 'Actions', value: 'actions', sortable: false },
        {
          text: "Paciente",
          align: "start",
          sortable: false,
          value: "apellidoPaciente",
        },
        
        { text: "Nombre", value: "nombrePaciente" },
        { text: "ISSS", value: "noISSS" },
        { text: "Genero", value: "genero" },
        { text: "Hospital", value: "hospital" },
        { text: "Fecha vacuna", value: "ultimaVacuna" },
        { text: "Altura", value: "altura" },
        { text: "Peso", value: "peso" },
        { text: "Ver mas", value: "data-table-expand" },
      ],
      expedidentes: [],
      spinner:true,
      editedItem:{ExpedienteModel},
      stringUrl: "api/ComboBox/",
      generos: [],
      tipopiels: [],
      estadocivils: [],
      colorcabellos: [],
      hospitales: [],
      seguros: [],
      incapacidades: [],
      alergias: [],
      alergiasSelect: [],
      incapacidadesSelect: [],
      idSeguro: "",
      idTipoPiel: "",
      idHospital: "",
      idGenero: "",
      idEstadoCivilL: "",
      idColorCabello: "",
      vdialog: false,
      message: "Esperando resultado...",
    };
  },created() {
    this.listarExpediente();
    this.selectGenero();
    this.selectEstadoCivil();
    this.selectTipoPiel();
    this.selectColorCabello();
    this.selectHospital();
    this.selectSeguro();
    this.getAllIncapacidades();
    this.getAllAlergia();
  },
  
  methods: {
    editItem (item) {
        //this.editedIndex = this.desserts.indexOf(item)
        this.editedItem = Object.assign({}, item)
        console.log("***********************************Editar paciente");
        console.log(item);
        this.dialog = true
      },
      deleteItem (item) {
        this.editedIndex = this.desserts.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },
    async listarExpediente() {
      this.spinner=true;
      let me = this;
      var expeArray = [];
      var sol=await axios.get("api/Expediente/Listar");
      if(sol.status==200){
        expeArray=sol.data;
        expeArray.map(function (x) {
            me.expedidentes.push(x);
          });
          console.log(me.expedidentes);
      }
      this.spinner=false;
    },
    selectGenero() {
      let me = this;
      var generoArray = [];
      axios
        .get(this.stringUrl + "ListarGenero")
        .then(function (resp) {
          generoArray = resp.data;
          generoArray.map(function (x) {
            me.generos.push({ text: x.tipo, value: x.idGenero });
          });
        })
        .catch(function (error) {
          console.log(error);
        });
        console.log(me.generos);
    },
    selectEstadoCivil() {
      let me = this;
      var estadoCArray = [];

      axios
        .get(this.stringUrl + "ListarEstadoCivil")
        .then(function (resp) {
          estadoCArray = resp.data;
          estadoCArray.map(function (x) {
            me.estadocivils.push({ text: x.estado, value: x.idEstadoCivil });
          });
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    selectTipoPiel() {
      let me = this;
      var tipoPielArray = [];
      axios
        .get(this.stringUrl + "ListarTipoPiel")
        .then(function (resp) {
          tipoPielArray = resp.data;
          tipoPielArray.map(function (x) {
            me.tipopiels.push({ text: x.tipo, value: x.idTipoPiel });
          });
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    selectColorCabello() {
      let me = this;
      var colorCabelloArray = [];
      axios
        .get(this.stringUrl + "ListarColorCabello")
        .then(function (resp) {
          colorCabelloArray = resp.data;
          colorCabelloArray.map(function (x) {
            me.colorcabellos.push({
              text: x.colorCabello,
              value: x.idColorCabello,
            });
          });
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    selectHospital() {
      let me = this;
      var hospitalesArray = [];
      axios
        .get(this.stringUrl + "ListarHospitales")
        .then(function (resp) {
          hospitalesArray = resp.data;
          hospitalesArray.map(function (x) {
            me.hospitales.push({ text: x.nombre, value: x.idHospital });
          });
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    selectSeguro() {
      let me = this;
      var segurosArray = [];
      axios
        .get(this.stringUrl + "ListarSeguros")
        .then(function (resp) {
          segurosArray = resp.data;
          segurosArray.map(function (x) {
            me.seguros.push({ text: x.nombre, value: x.idSeguro });
          });
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    cerrar(){
      this.dialog = false;
      location.reload();
    },
    async update () {
        if (this.editedIndex > -1) {
          Object.assign(this.desserts[this.editedIndex], this.editedItem)
        } else {
          //this.desserts.push(this.editedItem)
          //Aqui se va actualizar el expediente
          console.log("****************************Objeto actualizado");
          console.log(this.editedItem);
          var sol = await axios.put(
          "api/Expediente/Actualizar",
          JSON.stringify(this.editedItem),
          {
            headers: {
              // Overwrite Axios's automatically set Content-Type
              "Content-Type": "application/json",
            },
          }
        );
        if(sol.status==200){
          console.log(sol.data.message);
          this.message = sol.data.message;
          this.dialog=false;
        }
        this.vdialog = true;
        
        }
        this.close()
      }
  },
  
  
};
</script>
