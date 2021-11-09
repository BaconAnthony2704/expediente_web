<template>
<v-container>
    <v-row>
      <v-col md="12">
        <h1>Ingreso-Egreso</h1>
      </v-col>
    </v-row>
    
    
    <v-row>
        <v-col md="8">

        </v-col>
       <v-col md="2">
         <v-dialog
      
      persistent
      max-width="700"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="green"
          dark
          v-bind="attrs"
          @click="exportPDF()"
        >
          Generar PDF
        </v-btn>
      </template>
      
    </v-dialog>
    
     
    
        </v-col>
       
       
       <v-col md="2">
    
      </v-col>
    </v-row>
    <table class="table table-bordered" id="content">
        <thead>
          <tr>
            <th class="text-left">Estado</th>
            <th class="text-left">descripcion concepto</th>
            <th class="text-left">documento</th>
            <th class="text-left">monto</th>
            <th class="text-left">codigo</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item) in listaDetalleMov" :key="item">
            <td>{{ item.tipoNombre }}</td>
            <td>{{ item.descripcionConcepto }}</td>
            <td>{{ item.documento }}</td>
            <td>${{ item.monto }}</td>
            <td>{{ item.codigo }}</td>
          </tr>
        </tbody>
    </table>
  
</v-container>
</template>

<script>
import axios from "axios";
import DetalleMovimientoModel from  "../../models/detallemovimiento";
import jspdf from "jspdf";
//import autoTable from 'jspdf-autotable'
import html2canvas from "html2canvas";
  export default {
    data: () => ({
      dialog: false,
      dialogDelete: false,
      editedItem:{DetalleMovimientoModel},
      listaDetalleMov:[],
      pacientes:[],
      idPaciente:"",
      mto:"",
      idTipo:"",
      modal: false,
      date: new Date().toISOString().substr(0, 10),
      tipos:[
        {
          text:"Ingreso",
          value:"I"
        },
        {
          text:"Egreso",
          value:"E"
        },
      ],
      headers: [
        {
          text: 'Paciente',
          align: 'start',
          sortable: false,
          value: 'paciente',
        },
        { text: 'fecha de Ingreso', value: 'fechaIngreso' },
        { text: 'Tipo', value: 'tipoNombre' },
        { text: 'Concepto', value: 'descripcionConcepto' },
        { text: 'Monto', value: 'monto' },
        { text: 'Descripcion', value: 'descripcion' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      desserts: [],
      desp:"",
      listConcept:[],
      tipoC:"",
      editedIndex: -1,
      flagPaciente:0,
      
      defaultItem: {
        name: '',
        calories: 0,
        fat: 0,
        carbs: 0,
        protein: 0,
        
      },
    }),
    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Generar PDF' : 'Editar'
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
    async created (){
     
      await this.listarDetallesMovimiento();
      this.getPacientes();
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
      async guardarDetalleMovimiento(){
        let me=this;
        console.log("==========IDPACIENTE")
        console.log(me.idPaciente);
        if(me.idPaciente===""){
          me.idPaciente=-1;
        }
        
        
        var resp=await axios.post("api/DetalleMovimiento/Crear",{
          idPaciente:this.editedItem.idPaciente,
          idConcepto:this.editedItem.idConcepto,
          montoIngreso:parseFloat( this.editedItem.monto),
          fecha:me.date,
          documento:this.editedItem.descripcion
        });
        if(resp.status==200){
          console.log(resp.data);
        }else{
          console.log(resp.data);
        }
        this.limpiar();
      },
      obtenerFecha(date) {
      let fecha = this.detalleMov.fechaIngreso;
      if (fecha == null) {
        this.detalleMov.fechaIngreso = date;
      } else {
        this.detalleMov.fechaIngreso = "";
        this.detalleMov.fechaIngreso = date;
      }
    },
      changeConcepto(a){
        this.tipoC=a;
        this.flagPaciente=1;
        if(this.tipoC==="E"){
          this.flagPaciente=0;
        }
        this.listarConcepto(this.tipoC);
      },
      async listarDetallesMovimiento(){
        let me=this;
        var dMovArray=[];
        var resp=await axios.get("api/DetalleMovimiento/Listar/");
        if(resp.status==200){
          dMovArray=resp.data;
          dMovArray.map(function(x){
            me.listaDetalleMov.push(x);
          });
          console.log("Prueba");
          console.log(me.listaDetalleMov);
        }else{
          console.log("Error");
        }
      },
      async listarConcepto(tipo){
        let me=this;
        var conceptoArray=[];
        me.listConcept=[];
        var resp=await axios.get("api/Concepto/ListarCatalogo/"+tipo);
        if(resp.status==200){
          conceptoArray=resp.data;
          conceptoArray.map(function(x){
            me.listConcept.push({
              text:x.descripcion,
              value:x.idConcepto
            });
          });
          console.log("Prueba");
          console.log(me.listConcept);
        }else{
          console.log("Error");
        }
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
      
      editItem (item) {
        this.editedIndex = this.desserts.indexOf(item)
        this.editedItem = Object.assign({}, item)
        
        this.dialog = true
      },
      deleteItem (item) {
        this.editedIndex = this.desserts.indexOf(item)
        console.log("DETALLE==============");
        console.log(item.idDetalleMovimiento);
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },
      limpiar(){
        this.editedItem.idPaciente=-1;
        this.editedItem.monto=0;
        this.editedItem.descripcion="";
        this.editedItem.idConcepto=-1;
        
      },
      async deleteItemConfirm () {
        this.desserts.splice(this.editedIndex, 1)
        var resp=await axios.put("api/DetalleMovimiento/Eliminar/"+this.editedItem.idDetalleMovimiento);
        if(resp.status==200){
          console.log(resp.data);
        }else{
          console.log(resp.data);
        }
        this.closeDelete()
        location.reload();
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
      async guardarDetalle () {
        if (this.editedIndex > -1) {
          Object.assign(this.desserts[this.editedIndex], this.editedItem)
        } else {
          
          await this.guardarDetalleMovimiento();
          location.reload();
        }
        this.close()
      },
    },
  }
</script>
