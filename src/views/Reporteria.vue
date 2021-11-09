<template>
    <div>
        <v-row align="center"
                justify="space-around"><v-col></v-col></v-row>
        <v-row>
           
            <v-col sm="4">
                <v-card>
                    <v-img
                    src="../assets/r2.jpg"
                    class="white--text align-end"
                    height="200px"
                    width="200px"
                    >
                    </v-img>

                    <v-card-actions>
                    <v-spacer></v-spacer>

                    <v-btn width="200px" :to="{ name: 'medicamentoreport' }">
                        Medicamento
                    </v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>


         <v-row>
            <v-col sm="4">
                <v-card>
                    <v-img
                    src="../assets/r1.png"
                    class="white--text align-end"
                    height="200px"
                    width="200px"
                    >
                    </v-img>

                    <v-card-actions>
                    <v-spacer></v-spacer>

                    <v-btn width="200px" :to="{ name: 'capacitacion' }">
                        Planilla
                    </v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
            <v-col sm="4">
                <v-card>
                    <v-img
                    src="../assets/r3.jpg"
                    class="white--text align-center"
                    height="200px"
                    width="200px"
                    >
                    </v-img>

                    <v-card-actions>
                    <v-spacer></v-spacer>

                    <v-btn width="200px" :to="{ name: 'existenciareport' }">
                        Inventario
                    </v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
            <v-col sm="4">
                <v-card>
                    <v-img
                    src="../assets/r4.jpg"
                    class="white--text align-end"
                    height="200px"
                    width="200px"
                    >
                    </v-img>

                    <v-card-actions>
                    <v-spacer></v-spacer>

                    <v-btn width="200px" :to="{ name: 'ingresoegresoreport' }">
                        Ingreso/Egreso
                    </v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
        
        
        
        <v-row>
            <v-col sm="4">
                <v-card>
                    <v-img
                    src="../assets/r6.jpg"
                    class="white--text align-end"
                    height="200px"
                    width="200px"
                    >
                    </v-img>

                    <v-card-actions>
                    <v-spacer></v-spacer>

                    <v-btn width="200px" :to="{ name: 'empleadoreport' }">
                        Empleado
                    </v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </div>
</template>