<template v-model="exp">
  <v-stepper v-model="e6" vertical>
    <v-row justify="space-around">
      <v-col cols="auto">
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
          <template v-slot:default="dialog">
            <v-card>
              <v-toolbar color="primary" dark>Paciente</v-toolbar>
              <v-card-text>
                <div class="text-h2 pa-12">{{ message }}</div>
              </v-card-text>
              <v-card-actions class="justify-end">
                <v-btn text @click="dialog.value = false">Cerrar</v-btn>
              </v-card-actions>
            </v-card>
          </template>
        </v-dialog>
      </v-col>
    </v-row>

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
    <!--Informacion personal-->
    <v-stepper-step :complete="e6 > 1" step="1">
      Informacion personal
      <small>Agregar la informacion del paciente</small>
    </v-stepper-step>

    <v-stepper-content step="1">
      <v-card color="grey lighten-1" class="mb-12" height="auto">
        <template>
          <v-form v-model="valid">
            <v-container>
              <v-row>
                <v-col cols="12" md="6">
                  <v-label>Expediente No.</v-label>
                </v-col>
                <v-col cols="12" md="6">
                  <v-label>A progresar</v-label>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="exp.nombrePaciente"
                    :rules="nameRules"
                    :counter="10"
                    label="Nombre"
                    required
                    outlined
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="2"> </v-col>
                <v-col cols="12" md="4">
                  <v-img
                    lazy-src="https://picsum.photos/id/11/10/6"
                    max-height="150"
                    max-width="250"
                    src="https://picsum.photos/id/11/500/300"
                  ></v-img>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="exp.apellidoPaciente"
                    :rules="nameRules"
                    :counter="10"
                    label="Apellidos"
                    required
                    outlined
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" md="12">
                  <v-textarea
                    outlined
                    name="input-7-4"
                    label="Domicilio"
                    v-model="exp.domicilioPaciente"
                  ></v-textarea>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="6" md="4">
                  <v-dialog
                    ref="dialog"
                    v-model="modal"
                    :return-value.sync="date"
                    persistent
                    width="290px"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="date"
                        label="Fecha de nacimiento"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker v-model="date" scrollable>
                      <v-spacer></v-spacer>
                      <v-btn text color="primary" @click="modal = false">
                        Cancelar
                      </v-btn>
                      <v-btn
                        text
                        color="primary"
                        @click="$refs.dialog.save(date)"
                      >
                        OK
                      </v-btn>
                    </v-date-picker>
                  </v-dialog>
                </v-col>
                <v-col cols="12" md="2"></v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-select
                    :items="generos"
                    v-model="exp.idGenero"
                    label="Seleccione un genero"
                    outlined
                  ></v-select>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" md="4">
                  <v-text-field
                    v-model="exp.NoISSS"
                    label="No. ISSS"
                    required
                    outlined
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </template>
      </v-card>
      <v-btn color="primary" @click="e6 = 2"> Continuar </v-btn>
      <v-btn text> Cancelar </v-btn>
    </v-stepper-content>
    <!--Informacion adicional -->

    <v-stepper-step :complete="e6 > 2" step="2">
      Informacion adicional
    </v-stepper-step>

    <v-stepper-content step="2">
      <v-card color="grey lighten-1" class="mb-12" height="auto">
        <v-form v-model="valid">
          <v-container>
            <v-row>
              <v-col cols="12" md="4">
                <v-text-field
                  v-model="exp.LugarNacimiento"
                  label="Lugar de nacimiento"
                  required
                  outlined
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="4">
                <v-text-field
                  v-model="exp.telefonoDomicilio"
                  label="Telefono domicilio"
                  required
                  outlined
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="4">
                <v-text-field
                  v-model="exp.telefonoOficina"
                  label="Telefono oficina"
                  required
                  outlined
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="4">
                <v-text-field
                  v-model="exp.correo"
                  label="Correo"
                  required
                  outlined
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="8">
                <v-text-field
                  v-model="exp.responsableA"
                  label="Responsable A"
                  required
                  outlined
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-select
                  :items="estadocivils"
                  v-model="exp.idEstadoCivil"
                  label="Estado civil"
                  outlined
                ></v-select>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="6">
                <v-switch
                  v-model="switch1"
                  :label="`Nvo paciente: ${switch1.toString()}`"
                ></v-switch>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-card>
      <v-btn color="primary" @click="e6 = 3"> Continuar </v-btn>
      <v-btn text> Cancelar </v-btn>
    </v-stepper-content>

    <v-stepper-step :complete="e6 > 3" step="3">
      Exploracion fisica
    </v-stepper-step>

    <v-stepper-content step="3">
      <v-card color="grey lighten-1" class="mb-12" height="auto">
        <v-form v-model="valid">
          <v-container>
            <v-row>
              <v-col cols="12" md="4">
                <v-text-field
                  v-model="exp.altura"
                  type="number"
                  label="Altura"
                  required
                  outlined
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="4">
                <v-text-field
                  v-model="exp.peso"
                  label="Peso"
                  required
                  outlined
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-select
                  :items="tipopiels"
                  v-model="exp.idTipoPiel"
                  label="Tipo piel"
                  outlined
                ></v-select>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="4">
                <v-text-field
                  v-model="exp.marcaNaci"
                  label="Marcas de nacimiento"
                  required
                  outlined
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-select
                  :items="colorcabellos"
                  v-model="exp.IdColorCabello"
                  label="Color de cabello"
                  outlined
                ></v-select>
              </v-col>
            </v-row>
            
            

            <v-row>
              <v-col cols="12" md="6">
                <v-switch
                  v-model="switchLente"
                  :label="`Ocupa lentes: ${switchLente.toString()}`"
                ></v-switch>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="6">
                <v-switch
                  v-model="switchDis"
                  :label="`Presenta discapacidad: ${switchDis.toString()}`"
                ></v-switch>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="6">
                <v-switch
                  v-model="switchAu"
                  :label="`Problema auditivo: ${switchAu.toString()}`"
                ></v-switch>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-card>
      <v-btn color="primary" @click="e6 = 4"> Continuar </v-btn>
      <v-btn text> Cancelar </v-btn>
    </v-stepper-content>

    <v-stepper-step step="4"> Documentos </v-stepper-step>
    <v-stepper-content step="4">
      <v-card color="grey lighten-1" class="mb-12" height="auto">
        <v-form v-model="valid">
          <v-container>
            <v-row>
              <v-col cols="12" md="8">
                <v-text-field
                  v-model="exp.medicoGrl"
                  label="Medico general"
                  required
                  outlined
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="4">
                <v-text-field
                  v-model="exp.telefonoMedico"
                  label="Telefono Medico"
                  required
                  outlined
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="4">
                <v-text-field
                  v-model="exp.dentistaFamilia"
                  label="Nombre destinta"
                  required
                  outlined
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="12">
                <v-textarea
                  outlined
                  name="input-7-4"
                  label="Domicilio del medico"
                  v-model="exp.direccionMedico"
                ></v-textarea>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-select
                  :items="hospitales"
                  v-model="exp.IdHospital"
                  label="Hospital preferencia"
                  outlined
                ></v-select>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-select
                  :items="seguros"
                  v-model="exp.IdSeguro"
                  label="Compañia seguro"
                  outlined
                ></v-select>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="4">
                <v-text-field
                  v-model="exp.poliza"
                  label="Poliza"
                  required
                  outlined
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="4">
                <v-dialog
                  ref="dialog"
                  v-model="modal"
                  :return-value.sync="date"
                  persistent
                  width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="date"
                      label="Ultima fecha de vacunacion"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="date" scrollable>
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="modal = false">
                      Cancelar
                    </v-btn>
                    <v-btn
                      text
                      color="primary"
                      @click="$refs.dialog.save(date)"
                    >
                      OK
                    </v-btn>
                  </v-date-picker>
                </v-dialog>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-card>
      <v-btn color="primary" @click="e6 = 5"> Continuar </v-btn>
      <v-btn text> Cancelar </v-btn>
    </v-stepper-content>

    <v-stepper-step step="5"> Incapacidad </v-stepper-step>
    <v-stepper-content step="5">
      <v-card color="grey lighten-1" class="mb-12" height="auto">
        <v-container>
          <v-row>
            <v-col
              cols="12"
              md="12"
              v-for="incapacidad in incapacidades"
              :key="incapacidad"
            >
              <v-checkbox
                v-model="incapacidadesSelect"
                :label="`${incapacidad.text}`"
                :value="incapacidad.value"
                @change="checkIncapacidad($event)"
              >
              </v-checkbox>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
      <v-btn color="primary" @click="e6 = 6"> Continuar </v-btn>
      <v-btn text> Cancelar </v-btn>
    </v-stepper-content>

    <v-stepper-step step="6"> Alergias </v-stepper-step>
    <v-stepper-content step="6">
      <v-card color="grey lighten-1" class="mb-12" height="auto">
        <v-container>
          <v-row>
            <v-col
              cols="12"
              md="12"
              v-for="(alergia, id) in alergias"
              :key="id"
            >
              <v-checkbox
                v-model="alergiasSelect"
                :label="`${alergia.text}`"
                :value="alergia.value"
                @change="checkAlergia($event)"
              >
              </v-checkbox>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
      <v-btn color="primary" @click="guardar()"> Continuar </v-btn>
      <v-btn text> Cancelar </v-btn>
    </v-stepper-content>
  </v-stepper>
</template>

<script>
import axios from "axios";
import ExpedienteModel from "../models/expediente";
export default {
  data() {
    return {
      stringUrl: "api/ComboBox/",
      e6: 1,
      valid: false,
      firstname: "",
      lastname: "",
      exp: { ExpedienteModel },
      nameRules: [
        (v) => !!v || "Name is required",
        (v) => v.length <= 10 || "Name must be less than 10 characters",
      ],
      email: "",
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+/.test(v) || "E-mail must be valid",
      ],
      date: new Date().toISOString().substr(0, 10),
      menu: false,
      modal: false,
      menu2: false,
      items: ["Masculino", "Fenenimo"],
      itemscivil: ["Soltero", "Casado"],
      switch1: false,
      switchLente: false,
      switchDis: false,
      switchAu: false,
      itemspiel: ["Trigueno", "Moreno"],
      itemscabello: ["Negro", "Gris", "Cafe"],
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
      spinner: false,
    };
  },
  created() {
    this.selectGenero();
    this.selectEstadoCivil();
    this.selectTipoPiel();
    this.selectColorCabello();
    this.selectHospital();
    this.selectSeguro();
    this.getAllIncapacidades();
    this.getAllAlergia();
  },
  watch: {
    switch1(newValue) {
      this.obtenerSwNvoPaciente(newValue);
    },
    switchLente(valor) {
      this.obtenerSwLentes(valor);
    },
    switchDis(val) {
      this.obtenerSwDiscapacidad(val);
    },
    switchAu(v) {
      this.obtenerSwAuditivo(v);
    },
  },
  methods: {
    mostrarObj() {
      this.obtenerFecha(this.date);
      this.obtenerFechaVacunacion(this.date);
      console.log("Prueba " + JSON.stringify(this.exp));
    },
    obtenerFecha(date) {
      let fecha = this.exp.fechaNacimiento;
      if (fecha == null) {
        this.exp.fechaNacimiento = date;
      } else {
        this.exp.fechaNacimiento = "";
        this.exp.fechaNacimiento = date;
      }
    },
    obtenerFechaVacunacion(date) {
      let fechaVac = this.exp.ultimaVacuna;
      if (fechaVac == null) {
        this.exp.ultimaVacuna = date;
      } else {
        this.exp.ultimaVacuna = "";
        this.exp.ultimaVacuna = date;
      }
    },
    obtenerSwNvoPaciente(valor) {
      let sw = this.exp.nvoPaciente;
      if (sw == null) {
        this.exp.nvoPaciente = valor;
      } else {
        this.exp.nvoPaciente = null;
        this.exp.nvoPaciente = valor;
      }
    },
    obtenerSwDiscapacidad(valor) {
      let sw = this.exp.presentaDisc;
      if (sw == null) {
        this.exp.presentaDisc = valor;
      } else {
        this.exp.presentaDisc = null;
        this.exp.presentaDisc = valor;
      }
    },
    obtenerSwLentes(valor) {
      let sw = this.exp.ocupaLentes;
      if (sw == null) {
        this.exp.ocupaLentes = valor;
      } else {
        this.exp.ocupaLentes = null;
        this.exp.ocupaLentes = valor;
      }
    },
    obtenerSwAuditivo(valor) {
      let sw = this.exp.problemaAuditivo;
      if (sw == null) {
        this.exp.problemaAuditivo = valor;
      } else {
        this.exp.problemaAuditivo = null;
        this.exp.problemaAuditivo = valor;
      }
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
    getAllIncapacidades() {
      let me = this;
      var incaArray = [];
      axios
        .get("api/Incapacidad/Listar")
        .then(function (resp) {
          incaArray = resp.data;
          incaArray.map(function (x) {
            me.incapacidades.push({
              text: x.nombre,
              value: x.idTipoIncapacidad,
            });
          });
        })
        .catch(function (err) {
          console.log(err);
        });
    },
    getAllAlergia() {
      let me = this;
      var aleArray = [];
      axios
        .get("api/Alergia/Listar")
        .then(function (resp) {
          aleArray = resp.data;
          aleArray.map(function (x) {
            me.alergias.push({ text: x.nombre, value: x.idAlergia });
          });
        })
        .catch(function (err) {
          console.log(err);
        });
    },
    checkAlergia: function (e) {
      console.log(e);
      console.log(JSON.stringify(this.alergiasSelect));
    },
    checkIncapacidad: function (e) {
      console.log(e);
      console.log(JSON.stringify(this.incapacidadesSelect));
    },
    guardarExpediente() {
      //Setear incapacidad
      let incaObj = [];
      let aleObj = [];
      if (this.incapacidadesSelect.length > 0) {
        this.incapacidadesSelect.map(function (x) {
          incaObj.push({ idTipoIncapacidad: x });
        });
      }
      if (this.alergiasSelect.length > 0) {
        this.alergiasSelect.map(function (x) {
          aleObj.push({ idAlergia: x });
        });
      }
      this.obtenerFecha(this.date);
      this.obtenerFechaVacunacion(this.date);
      this.exp.alergias = aleObj;
      this.exp.incapacidades = incaObj;
      console.log("Prueba " + JSON.stringify(this.exp));
    },
    parsearNumeros() {
      this.exp.altura = parseFloat(this.exp.altura);
      this.exp.peso = parseFloat(this.exp.peso);
    },
    async guardar() {
      let me = this;
      this.parsearNumeros();
      this.guardarExpediente();
      me.spinner = true;
      var sol = await axios.post(
        "api/Expediente/Crear",
        JSON.stringify(this.exp),
        {
          headers: {
            // Overwrite Axios's automatically set Content-Type
            "Content-Type": "application/json",
          },
        }
      );
      me.spinner = false;
      if (sol.status == 200) {
        me.message = sol.data.message;
      } else {
        me.message = sol.data.message;
      }
      me.vdialog = true;
    },
  },
};
</script>
