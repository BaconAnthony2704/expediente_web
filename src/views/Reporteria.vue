
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
                        <th class="text-left">
                            nombre
                        </th>
                        <th class="text-left">
                            apellido
                        </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        <td>{{ paciente.nombrePaciente }}</td>
                        <td>{{ paciente.apellidoPaciente }}</td>
                        </tr>
                        
                    </tbody>
            <thead>
                <th>
                            <td colspan="2">Alergias</td><tr>

                </tr>
                    
                        </th>
                        
            </thead>
            <tbody>
                <tr v-for="alergia in paciente.alergias" :key="alergia.idAlergia">
                            <td>
                                {{alergia.nombre}}
                            </td>
                        </tr>
            </tbody>
          </table>
      </v-col>
      <v-col class="col-md-12">
          <v-btn @click="exportPDF()">
              PDF
          </v-btn>
      </v-col>
  </v-row>
</template>

<script>
import jspdf from 'jspdf'
//import autoTable from 'jspdf-autotable'
import html2canvas from 'html2canvas'
import axios from 'axios'
  export default {
      created() {
          this.getPacientes();
      },
    data () {
      return {
        pacientes:[],
        paciente:[],
        selectPaciente:'',
        
      }
    },
    methods: {
        exportPDF() {
        const doc = new jspdf('p', 'pt', 'a4')
        const html=document.getElementById("content");
        window.html2canvas = html2canvas
       //console.log(doc.getFontSize());
        //console.log(html);
            //autoTable(doc,{html:'#myTable'})
           
            doc.setFont("Arimo");
            //doc.setFontType("normal");
            doc.setFontSize(-10);
            doc.html(html,{
                callback:function(d){
                    //d.autoPrint();
                    d.save('table.pdf');
                },
                autoPaging:"slice",
                x: 0, 
                y: 0,
                html2canvas: { scale: 0.6 },
                
            })
           
        },
        async getPacientes(){
        let me = this;
        var expeArray = [];
        var sol=await axios.get("api/Expediente/Listar");
        if(sol.status==200){
            expeArray=sol.data;
            expeArray.map(function (x) {
                me.pacientes.push({
                    text:x.apellidoPaciente+", "+x.nombrePaciente,
                    value:x.idExpediente
                });
            });
           //console.log(me.pacientes);
        }
      },
      async obtenerPaciente(){
          let me = this;
          //console.log(me.selectPaciente);
        var expeArray = [];
        var sol=await axios.get("api/Expediente/Obtener/"+me.selectPaciente.value);
        if(sol.status==200){
            expeArray=sol.data;
            me.paciente=expeArray
          //  console.log(me.paciente);
        }
      }

    },
  }
</script>