
<template>
  <v-data-table
    :headers="headers"
    :items="listaDetalleMov"
    sort-by="calories"
    class="elevation-1"
  >
  
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title>Existencia de medicamento</v-toolbar-title>
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
              entrada
            </v-btn>
            <v-btn
              color="primary"
              light
              class="mb-2"
              v-bind="attrs"
              v-on="on"
            >
              salida
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
                    sm="3"
                    md="3"
                    v-if="flagPaciente"
                  >
                    Paciente
                  </v-col>
                  <v-col
                    cols="12"
                    sm="12"
                    md="12"
                    v-if="flagPaciente"
                  >
                    <v-select v-model="editedItem.idPaciente" :items="pacientes"> </v-select>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-select v-model="tipoC" :items="tipos" @change="changeConcepto"> </v-select>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.monto"
                      label="Monto"
                      type="number"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
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
                  
                  <v-col
                    cols="12"
                    sm="12"
                    md="12"
                  >
                    <v-select v-model="editedItem.idConcepto" :items="listConcept"> </v-select>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="12"
                    md="12"
                  >
                    <v-textarea
                  outlined
                  name="input-7-4"
                  label="Descripcion"
                  v-model="editedItem.descripcion"
                 
                  :counter="255"
                ></v-textarea>
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
                @click="guardarDetalle()"
              >
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">Esta seguro de eliminar este detalle?</v-card-title>
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
    <template >
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
import DetalleMovimientoModel from  "../models/detallemovimiento";
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
          text: 'IdMedicamento',
          align: 'start',
          sortable: false,
          value: 'paciente',
        },
        { text: 'Nombre', value: 'fechaIngreso' },
        { text: 'Tipo', value: 'tipoNombre' },
        { text: 'Existencia', value: 'descripcionConcepto' },
        { text: 'Descripcion', value: 'descripcion' },
        
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
        return this.editedIndex === -1 ? 'Nuevo' : 'Editar'
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
