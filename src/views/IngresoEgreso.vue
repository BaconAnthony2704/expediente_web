<template>
    <div>
    <h1>
    Bienvenidos al menu de ingreso y egreso seleccione una opcion.
    </h1> 
     
     <v-container>
         <v-row>
             
             <v-col md="4">
                <v-card>
                    <v-img src="https://image.freepik.com/vektoren-kostenlos/einkommenssteigerung-finanzstrategie-hohe-kapitalrendite-darstellung-des-haushaltssaldos-marktwachstum-und-einkommen-gewinn-des-geschaeftswachstums_229548-425.jpg"></v-img>
                
                    <v-card-actions>
                        <v-btn href="#/ingreso" color="info" >Registrar Ingreso</v-btn>
                    </v-card-actions>
                </v-card>
                
                
             </v-col>
             <v-col md="4">
                 <v-card>
                    <v-img src="https://image.freepik.com/vektoren-kostenlos/einkommenssteigerung-finanzstrategie-hohe-kapitalrendite-darstellung-des-haushaltssaldos-marktwachstum-und-einkommen-gewinn-des-geschaeftswachstums_229548-425.jpg"></v-img>
                
                    <v-card-actions >
                        <v-btn href="#/egreso" color="info" >Registrar egreso</v-btn>
                    </v-card-actions>
                </v-card>
             </v-col>
             <v-col md="4">
                <v-card>
                    <v-img src="https://image.freepik.com/vektoren-kostenlos/einkommenssteigerung-finanzstrategie-hohe-kapitalrendite-darstellung-des-haushaltssaldos-marktwachstum-und-einkommen-gewinn-des-geschaeftswachstums_229548-425.jpg"></v-img>
                
                    <v-card-actions>
                        <v-btn href="#/historialIngresoEgreso" color="info" >ver historial</v-btn>
                    </v-card-actions>
                </v-card>
                
             </v-col>
         </v-row>
     </v-container>
    <div >
        <center>
                <h1 >su saldo actual es ${{saldo+total_ingreso}}</h1>
        </center>
        
    </div>
     

    </div>
</template>

<script>
//import axios from "axios";
/*
export default {
  data() {
    return {
      saldo: 0,
     
    };
  },
  
  
  methods: {
    
    async total_saldo() {
       let me = this;
           
       await axios.get("api/SolicitudExamen/Crear")  //aqui debo poner el endpoint
      .then(function (resp) {
          this.saldo = resp.data;
          
        })
        .catch(function (err) {
          console.log(err);
        });
      
          
          
      
    },
    
    
  }, 
  created() {
      //necesito hacer las consultas a las bd y realizar la suma de ingresos y egresos
    this.total_saldo();
    
  }, 
}; 
*/
</script>