<template>
    <div>
        <v-stepper v-model="e1"> 
            <v-stepper-header>
                <v-stepper-step
                    :complete="e1 > 1"
                    step="1"
                >
                    Datos Personales
                </v-stepper-step>

                <v-divider></v-divider>

                <v-stepper-step
                    :complete="e1 > 2"
                    step="2"
                >
                    Signos Vitales
                </v-stepper-step>

                <v-divider></v-divider>

                <v-stepper-step 
                :complete="e1>3"
                step="3">
                    Consulta
                </v-stepper-step>

                <v-divider></v-divider>

                <v-stepper-step 
                :complete="e1>4"
                step="4">
                    Receta
                </v-stepper-step>

                <v-divider></v-divider>

                <v-stepper-step step="5">
                    Examenes Laboratorio
                </v-stepper-step>
            </v-stepper-header>

            <!--Informacion Personal -->
            <v-stepper-items>
                <v-stepper-content step="1">
                    <v-card
                    class="mb-12"
                    color="white lighten-1"
                    height="200px"
                    >
                        <div>
                            <v-container class="grey lighten-5">
                                <v-row no-gutters>
                                    <v-col sm="6">
                                        <div>
                                            <v-text-field
                                            v-model="exp.idExpediente "
                                            label="Ingrese ID Expediente"
                                            :rules="rules"
                                            >
                                            </v-text-field>
                                        </div>
                                        
                                    </v-col>
                                    <v-col sm="6">
                                        <div>
                                            <v-btn @click="getInformacionPersonal()">
                                                Buscar
                                            </v-btn>
                                        </div>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </div>
                        <div>
                            <v-data-table
                            :headers="header"
                            :items="consultas">
                            </v-data-table>
                        </div>
                    </v-card>

                    <v-btn
                    color="primary"
                    @click="e1 = 2"
                    >
                    Continue
                    </v-btn>
                </v-stepper-content>

                 <!--Signos Vitales -->
                <v-stepper-content step="2">
                    <v-card
                    class="mb-12"
                    color="white lighten-1"
                    height="375px"
                    >
                        
                        <div>
                            <h3 class="text-center">
                                Signos Vitales
                            </h3>
                        </div>
                        <br>
                        <v-row no-gutters>
                            <v-col sm="5">
                                <div>
                                    <v-text-field
                                        label="Ingrese ID Expediente"
                                        :rules="rules"
                                    >
                                    </v-text-field>
                                </div>
                                        
                            </v-col>
                            <v-col sm="2"></v-col>
                            <v-col sm="5">
                                <div>
                                    <v-text-field
                                        label="Talla"
                                        :rules="rules"
                                    >
                                    </v-text-field>
                                </div>
                            </v-col>
                        </v-row>
                        <v-row no-gutters>
                            <v-col sm="5">
                                <div>
                                    <v-text-field
                                        label="Peso"
                                        :rules="rules"
                                    >
                                    </v-text-field>
                                </div>
                                        
                            </v-col>
                            <v-col sm="2"></v-col>
                            <v-col sm="5">
                                <div>
                                    <v-text-field
                                        label="Temperatura"
                                        :rules="rules"
                                    >
                                    </v-text-field>
                                </div>
                            </v-col>
                        </v-row>
                        <v-row no-gutters>
                            <v-col sm="5">
                                <div>
                                    <v-text-field
                                        label="Frecuencia Cardiaca"
                                        :rules="rules"
                                    >
                                    </v-text-field>
                                </div>
                                        
                            </v-col>
                            <v-col sm="2"></v-col>
                            <v-col sm="5">
                                <div>
                                    <v-text-field
                                        label="Frecuencia Respiratoria"
                                        :rules="rules"
                                    >
                                    </v-text-field>
                                </div>
                            </v-col>
                        </v-row>
                        <br>
                        <v-row no-gutters>
                            <v-col sm="5">
                                    <v-select
                                        v-model="exp.idMedicoGrl"
                                        :items="doctores"
                                        label="Doctor Asignado"
                                        outlined
                                    ></v-select>                                       
                            </v-col>
                            <v-col sm="2"></v-col>
                            <v-col sm="5"></v-col>
                        </v-row>                        
                    </v-card>

                    <v-btn
                    color="primary"
                    @click="e1 = 3"
                    >
                    Continue
                    </v-btn>

                    <v-btn color="default" @click="e1=1">
                    Regresar
                    </v-btn>
                </v-stepper-content>

                <!--Consulta-->
                <v-stepper-content step="3">
                    <v-card
                    class="mb-12"
                    color="white lighten-1"
                    height="1200px"
                    >
                        <div>
                            <h3 class="text-center">
                                Consulta
                            </h3>
                        </div>
                        <br>
                        <div>
                            <v-row>
                                <v-col sm="2">
                                    <v-chip>Expediente</v-chip>
                                </v-col>
                                <v-col sm="2">
                                    <v-chip>Doctor</v-chip>
                                </v-col>
                                <v-col sm="2">
                                    <v-chip>Paciente</v-chip>
                                </v-col>
                                <v-col sm="2">
                                    <v-chip>Fecha</v-chip>
                                </v-col>
                                <v-col sm="4">
                                    <v-select
                                        v-model="exp.idTipoConsulta"
                                        :items="tipoConsulta"
                                        label="Tipo Consulta"
                                        outlined
                                    ></v-select> 
                                </v-col>
                            </v-row>                          
                        </div>
                        <br>
                        <div>
                            <v-row>
                                <v-col sm="6">
                                    <v-textarea
                                        outlined
                                        name="input-7-4"
                                        label="Consulta Por"
                                        value=""
                                    ></v-textarea>
                                </v-col>
                                <v-col sm="6">
                                    <v-textarea
                                        outlined
                                        name="input-7-4"
                                        label="Enfermedad Actual"
                                        value=""
                                    ></v-textarea>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col sm="6">
                                    <v-textarea
                                        outlined
                                        name="input-7-4"
                                        label="Antecedentes Personales"
                                        value=""
                                    ></v-textarea>
                                </v-col>
                                <v-col sm="6">
                                    <v-textarea
                                        outlined
                                        name="input-7-4"
                                        label="Antecedentes Familiares"
                                        value=""
                                    ></v-textarea>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col sm="6">
                                    <v-textarea
                                        outlined
                                        name="input-7-4"
                                        label="Examenes Clinicos"
                                        value=""
                                    ></v-textarea>
                                </v-col>
                                <v-col sm="6">
                                    <v-textarea
                                        outlined
                                        name="input-7-4"
                                        label="Exploracion Fisica"
                                        value=""
                                    ></v-textarea>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col sm="6">
                                    <v-textarea
                                        outlined
                                        name="input-7-4"
                                        label="Diagnositico Principal"
                                        value=""
                                    ></v-textarea>
                                </v-col>
                                <v-col sm="6">
                                    <v-textarea
                                        outlined
                                        name="input-7-4"
                                        label="Otro Diagnostico"
                                        value=""
                                    ></v-textarea>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col sm="6">
                                    <v-textarea
                                        outlined
                                        name="input-7-4"
                                        label="Tratamiento"
                                        value=""
                                    ></v-textarea>
                                </v-col>
                                <v-col sm="6">
                                    <v-textarea
                                        outlined
                                        name="input-7-4"
                                        label="Observaciones"
                                        value=""
                                    ></v-textarea>
                                </v-col>
                            </v-row>
                        </div>
                    </v-card>

                    <v-btn
                    color="primary"
                    @click="e1 = 4"
                    >
                    Continue
                    </v-btn>

                    <v-btn color="default" @click="e1=2">
                    Regresar
                    </v-btn>
                </v-stepper-content>

                <!--Receta-->
                <v-stepper-content step="4">
                    <v-card
                    class="mb-12"
                    color="white lighten-1"
                    height="350px"
                    >
                        <div>
                            <h3 class="text-center">
                                Receta
                            </h3>
                        </div>
                        <br>
                        <div>
                            <v-row>
                                <v-col sm="2">
                                    <v-chip>Expediente</v-chip>
                                </v-col>
                                <v-col sm="2">
                                    <v-chip>Doctor</v-chip>
                                </v-col>
                                <v-col sm="2">
                                    <v-chip>Paciente</v-chip>
                                </v-col>
                                <v-col sm="2">
                                    <v-chip>Fecha</v-chip>
                                </v-col>
                                <v-col sm="4">
                                    <v-select
                                        v-model="exp.idTipoConsulta"
                                        :items="tipoConsulta"
                                        label="Tipo Consulta"
                                        outlined
                                    ></v-select> 
                                </v-col>
                            </v-row>                          
                        </div>
                        <br>
                        <div>
                            <v-textarea
                                outlined
                                name="input-7-4"
                                label="Descripcion de la Receta"
                                value=""
                            ></v-textarea>
                        </div>
                    </v-card>

                    <v-btn
                    color="primary"
                    @click="e1 = 5"
                    >
                    Continue
                    </v-btn>

                    <v-btn 
                    color="default"
                    @click="e1=3">
                    Regresar
                    </v-btn>
                </v-stepper-content>

                <!--Examenes Clinicos-->
                <v-stepper-content step="5">
                    <v-card
                    class="mb-12"
                    color="white lighten-1"
                    height="350px"
                    >
                        <div>
                            <h3 class="text-center">
                                Examenes Clinicos
                            </h3>
                        </div>
                        <br>
                        <div>
                            <v-row>
                                <v-col sm="2">
                                    <v-chip>Expediente</v-chip>
                                </v-col>
                                <v-col sm="2">
                                    <v-chip>Doctor</v-chip>
                                </v-col>
                                <v-col sm="2">
                                    <v-chip>Paciente</v-chip>
                                </v-col>
                                <v-col sm="2">
                                    <v-chip>Fecha</v-chip>
                                </v-col>
                                <v-col sm="4">
                                    <v-select
                                        v-model="exp.idTipoConsulta"
                                        :items="tipoConsulta"
                                        label="Tipo Consulta"
                                        outlined
                                    ></v-select> 
                                </v-col>
                            </v-row>                          
                        </div>
                        <br>
                        <div>
                            <v-textarea
                                outlined
                                name="input-7-4"
                                label="Descripcion Examenes Clinicos"
                                value=""
                            ></v-textarea>
                        </div>
                    </v-card>

                    <v-btn
                    color="primary"
                    @click="e1 = 1"
                    >
                    Continue
                    </v-btn>

                    <v-btn 
                    color="default"
                    @click="e1=4">
                    Regresar
                    </v-btn>

                    <v-btn color="primary">
                    Guardar
                    </v-btn>
                </v-stepper-content>
            </v-stepper-items>
        </v-stepper>
    </div>
</template>



<script>
  import axios from 'axios';
  import ConsultaModel from '../models/consulta';

  export default 
  {
    data () 
    {
        return{
            e1:1,
            header:
            [
                {
                    text:'Numero de Expediente',
                    align: 'start',
                    sortable: false,
                    value: 'idExpediente',
                },
                {
                    text:'Nombre del Paciente',
                    align: 'start',
                    sortable: false,
                    value: 'nombre',
                },
                {
                    text:'Edad',
                    align: 'start',
                    sortable: false,
                    value: 'edad'
                },
                {
                    text:'Sexo',
                    align: 'start',
                    sortable: false,
                    value: 'sexo'
                },
                {
                    text:'Telefono',
                    align: 'start',
                    sortable: false,
                    value: 'telefono'
                },
                {
                    text:'Estado Civil',
                    align: 'start',
                    sortable: false,
                    value: 'estadoCivil'
                }
            ],
            consultas:[],
            exp:{ConsultaModel},
            doctores:[],
            tipoConsulta:[],


        };
    },
    methods:{
        getDoctores() {
            let me = this;
            var DocArray = [];
            axios
                .get("api/ComboBox/ListarMedico")
                .then(function (resp) {
                DocArray = resp.data;
                DocArray.map(function (x) {
                    me.doctores.push({ text: x.nombre, value: x.idMedicoGrl });
                });
                })
                .catch(function (err) {
                console.log(err);
                });
        },
        getTipoConsulta() {
            let me = this;
            var tipoArray = [];
            axios
                .get("api/TipoConsulta/Listar")
                .then(function (resp) {
                tipoArray = resp.data;
                tipoArray.map(function (x) {
                    me.tipoConsulta.push({ text: x.nombreTipoConsulta, value: x.idTipoConsulta });
                });
                })
                .catch(function (err) {
                console.log(err);
                });
        },
        getInformacionPersonal(){
            let me = this;
            var infoArray = [];
            if(me.consultas.length>0){
                me.consultas=infoArray;
            }
            axios
                .get("api/Consulta/"+me.exp.idExpediente)
                .then(function (resp) {
                infoArray = resp.data;
                infoArray.map(function (x) {
                     me.consultas.push({ 
                        idExpediente: x.idExpediente,
                        nombre: x.nombrePaciente,
                        edad: x.edad,
                        sexo: x.sexo,
                        telefono: x.telefono,
                        estadoCivil: x.estadoCivil  });
                });
                })
                .catch(function (err) {
                console.log(err);
                });
        },

    },
    created(){
        this.getDoctores(),
        this.getTipoConsulta()
    }

}
</script>