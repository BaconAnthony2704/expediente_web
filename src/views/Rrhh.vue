<template>
    <div>
        <v-row align="center"
                justify="space-around"><v-col></v-col></v-row>
        <v-row>
            <v-col sm="4">
                <v-card>
                    <v-img
                    src="../assets/empleado.png"
                    class="white--text align-end"
                    height="200px"
                    width="200px"
                    >
                    </v-img>

                    <v-card-actions>
                    <v-spacer></v-spacer>

                    <v-btn width="200px" :to="{ name: 'empleado' }">
                        EMPLEADO
                    </v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
            <v-col sm="4">
                <v-card>
                    <v-img
                    src="../assets/descuento.jpg"
                    class="white--text align-center"
                    height="200px"
                    width="200px"
                    >
                    </v-img>

                    <v-card-actions>
                    <v-spacer></v-spacer>

                    <v-btn width="200px" :to="{ name: 'descuento' }">
                        DESCUENTO
                    </v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
            <v-col sm="4">
                <v-card>
                    <v-img
                    src="../assets/anticipo.jpg"
                    class="white--text align-end"
                    height="200px"
                    width="200px"
                    >
                    </v-img>

                    <v-card-actions>
                    <v-spacer></v-spacer>

                    <v-btn width="200px" :to="{ name: 'anticipo' }">
                        ANTICIPO
                    </v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>


         <v-row>
            <v-col sm="4">
                <v-card>
                    <v-img
                    src="../assets/capacitacion.png"
                    class="white--text align-end"
                    height="200px"
                    width="200px"
                    >
                    </v-img>

                    <v-card-actions>
                    <v-spacer></v-spacer>

                    <v-btn width="200px" :to="{ name: 'capacitacion' }">
                        CAPACITACION
                    </v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
            <v-col sm="4">
                <v-card>
                    <v-img
                    src="../assets/permiso.png"
                    class="white--text align-center"
                    height="200px"
                    width="200px"
                    >
                    </v-img>

                    <v-card-actions>
                    <v-spacer></v-spacer>

                    <v-btn width="200px" :to="{ name: 'permisos' }">
                        PERMISOS
                    </v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
            <v-col sm="4">
                <v-card>
                    <v-img
                    src="../assets/sancion.png"
                    class="white--text align-end"
                    height="200px"
                    width="200px"
                    >
                    </v-img>

                    <v-card-actions>
                    <v-spacer></v-spacer>

                    <v-btn width="200px" :to="{ name: 'sancion' }">
                        SANCION
                    </v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
        
        
        
        <v-row>
            <v-col sm="4">
                <v-card>
                    <v-img
                    src="../assets/asistencia laboral.jpg"
                    class="white--text align-end"
                    height="200px"
                    width="200px"
                    >
                    </v-img>

                    <v-card-actions>
                    <v-spacer></v-spacer>

                    <v-btn width="200px" :to="{ name: 'asistencialaboral' }">
                        ASISTENCIA LABORAL
                    </v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </div>
</template>