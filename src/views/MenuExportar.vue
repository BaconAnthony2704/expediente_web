<template>
  <div>
    
    <input type="file" accept=".xls,.xlsx" name="xlfile" id="xlf" v-on:change="fileToJson($event)" />
    <br>
    <h1>Vista previa</h1>
    <v-data-table
    :headers="headers"
    :items="dataJson"
    :items-per-page="5"
    class="elevation-1"
  ></v-data-table>
  <v-btn @click="guardarData">
    Guardar
  </v-btn>
  </div>
  
</template>

<script>
import XLSX from 'xlsx';
//import Home from './Home.vue';
//import { readExcel } from '../components/importarExcel'
import axios from 'axios'
    export default {
  //components: { Home },
      
      data() {
        return {
          archivo: null,
          dataJson: [],
          headers: [
          
          { text: 'Codigo', value: 'Codigo' },
          { text: 'Descripcion', value: 'Descripcion' },
          { text: 'Nivel', value: 'Nivel' },
          { text: 'Tipo', value: 'Tipo' },
          { text: 'Relacion', value: 'Relacion' },
        ],
        }
      },
      methods:{
          
         
      fileToJson (e) {
  const file = e.target.files[0]
  /* Boilerplate to set up FileReader */
  const reader = new FileReader()
  reader.onload = (e) => {
    /* Parse data */
    const bstr = e.target.result
    const wb = XLSX.read(bstr, { type: 'binary' })
    /* Get first worksheet */
    const wsname = wb.SheetNames[0]
    const ws = wb.Sheets[wsname]
    /* Convert array of arrays */
    const data = XLSX.utils.sheet_to_json(ws)
    console.log(data)
    this.llenarTabla(data)
    /* Update state */
    //this.data = data
    //const header = data.shift()
    
    
  }
  reader.readAsBinaryString(file)
},
llenarTabla(d){
    this.dataJson=d
},
async guardarData(){
  var resp=await axios.post("api/Concepto/CrearToJson",this.dataJson);
  if(resp.status==200){
    console.log(resp.data);
  }
}
    },
      }
    

</script>