<template>
  <div>
    
    <input type="file" accept=".xls,.xlsx" name="xlfile" id="xlf" v-on:change="fileToJson($event)" />
  </div>
</template>

<script>
import XLSX from 'xlsx';
//import { readExcel } from '../components/importarExcel'

    export default {
      
      data() {
        return {
          archivo: null,
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
    
    /* Update state */
    //this.data = data
    //const header = data.shift()
    
    
  }
  reader.readAsBinaryString(file)
}
    },
      }
    

</script>