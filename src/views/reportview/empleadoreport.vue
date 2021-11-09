<template>
  <v-row>
    <v-col class="col-md-12">
      <v-combobox
        v-model="selectPaciente"
        :items="pacientes"
        label="Pacientes"
        outlined
        dense
        v-on:change="obtenerPaciente()"
      ></v-combobox>
      <table id="content" class="table table-bordered">
        <thead>
          <tr>
            <th class="text-left">nombre</th>
            <th class="text-left">apellido</th>
            <th class="text-left">altura</th>
            <th class="text-left">peso</th>
            <th class="text-left">genero</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{{ paciente.nombrePaciente }}</td>
            <td>{{ paciente.apellidoPaciente }}</td>
            <td>{{ paciente.altura }}</td>
            <td>{{ paciente.peso }}</td>
            <td>{{ paciente.genero }}</td>
          </tr>

          <tr>
            <td colspan="4">
              <strong> Lugar de nacimiento</strong>
            </td>
            <td rowspan="5">
              <img
                v-bind:src="paciente.urlImagen"
                alt=""
                srcset=""
                width="243"
                height="207"
              />
            </td>
          </tr>
          <tr>
            <td colspan="4">{{ paciente.lugarNacimiento }}</td>
          </tr>

          <tr>
            <td colspan="4">
              <strong>Direccion</strong>
            </td>
          </tr>
          <tr>
            <td colspan="4">{{ paciente.domicilioPaciente }}</td>
          </tr>

          <tr>
            <td colspan="4" class="text-left">
              <center><strong>Alergias</strong></center>
            </td>
          </tr>
          <tr v-for="alergia in paciente.alergias" :key="alergia.idAlergia">
            <td>
              {{ alergia.nombre }}
            </td>
          </tr>
          <tr>
            <td><strong>Medico general</strong></td>
            <td><strong>No. ISSS</strong></td>
            <td><strong>Ocupa lentes</strong></td>
            <td><strong> Problema auditivo</strong></td>
            <td><strong>Presenta discapacidad</strong></td>
          </tr>
          <tr>
            <td>{{ paciente.medicoGrl }}</td>
            <td>{{ paciente.noISSS }}</td>
            <td v-if="paciente.ocupaLentes">Si</td>
            <td v-else>No</td>
            <td v-if="paciente.problemaAuditivo">Si</td>
            <td v-else>No</td>
            <td v-if="paciente.presentaDisc">Si</td>
            <td v-else>No</td>
          </tr>
        </tbody>
      </table>
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
    </v-col>
    <v-col class="col-md-12">
      <v-btn @click="exportPDF()"> PDF </v-btn>
    </v-col>
  </v-row>
</template>

<script>
import jspdf from "jspdf";
//import autoTable from 'jspdf-autotable'
import html2canvas from "html2canvas";
import axios from "axios";
export default {
  created() {
    this.getPacientes();
  },
  data() {
    return {
      pacientes: [],
      paciente: [],
      selectPaciente: "",
      spinner: false,
    };
  },
  methods: {
    exportPDF() {
      const doc = new jspdf("p", "pt", "a4");
      const html = document.getElementById("content");
      window.html2canvas = html2canvas;
      //console.log(doc.getFontSize());
      //console.log(html);
      //autoTable(doc,{html:'#myTable'})

      doc.setFont("Arimo");
      //doc.setFontType("normal");
      doc.setFontSize(-10);
      doc.html(html, {
        callback: function (d) {
          //d.autoPrint();
          d.save("table.pdf");
        },
        autoPaging: "slice",
        x: 0,
        y: 0,
        html2canvas: { scale: 0.6 },
      });
    },
    async getPacientes() {
      let me = this;
      var expeArray = [];
      me.spinner = true;
      var sol = await axios.get("api/Expediente/Listar");
      if (sol.status == 200) {
        expeArray = sol.data;
        expeArray.map(function (x) {
          me.pacientes.push({
            text: x.apellidoPaciente + ", " + x.nombrePaciente,
            value: x.idExpediente,
          });
        });
        //console.log(me.pacientes);
        me.spinner = false;
      }
    },
    async obtenerPaciente() {
      let me = this;
      //console.log(me.selectPaciente);
      var expeArray = [];
      var sol = await axios.get(
        "api/Expediente/Obtener/" + me.selectPaciente.value
      );
      if (sol.status == 200) {
        expeArray = sol.data;
        me.paciente = expeArray;
        console.log(me.paciente);
      }
    },
  },
};
</script>
