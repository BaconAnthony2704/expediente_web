<template>
      <v-row justify="center">
        <v-dialog v-model="spinner" persistent max-width="290">
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
export default {
  data() {
    return {
      singleExpand: false,
      search: "",
      dessertHeaders: [
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
      spinner:true
    };
  },
  methods: {
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
  },
  created() {
    this.listarExpediente();
  },
};
</script>
