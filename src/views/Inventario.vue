<template>
    <div>
        <center>
            <H1>Elija una opcion: </H1>
        </center>
     
     <v-container>
         <v-row>
             <v-col md="4">
                    <v-card>
                    <v-img width="500" height="300" 
                    src="https://cdn-bkaia.nitrocdn.com/BFTxzGCeSiHeYakoWkKipwTAkydShuyH/assets/static/optimized/rev-bb9162a/wp-content/uploads/2018/08/inventario.jpg"></v-img>
                
                    <v-card-actions>
                        <v-btn href="#/gestion_medicamento" color="info" >Transacciones de medicamento</v-btn>
                    </v-card-actions>
                </v-card>
             </v-col>

         
         
             <v-col md="4">
                    <v-card>
                    <v-img width="500" height="300" src="https://ufop.br/sites/default/files/styles/topo_da_not_cia/public/banner-850x410px_0.jpg"></v-img>
                
                    <v-card-actions>
                        <v-btn href="#/mantenimiento_medicamento" color="info" >Mantenimiento de medicamento</v-btn>
                    </v-card-actions>
                </v-card>
             </v-col>
         </v-row>
     </v-container>   
    </div>
</template>