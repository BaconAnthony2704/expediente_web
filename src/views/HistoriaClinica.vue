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
                                        v-model="presionArterial"
                                        label="Ingrese Presion Arterial"
                                        type="number"
                                        outlined
                                    >
                                    </v-text-field>
                                </div>
                                        
                            </v-col>
                            <v-col sm="2"></v-col>
                            <v-col sm="5">
                                <div>
                                    <v-text-field
                                        v-model="talla"
                                        type="number"
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
                                        v-model="peso"
                                        type="number"
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
                                        v-model="temperatura"
                                        label="Temperatura"
                                        type="number"
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
                                        v-model="frecuenciaCardiaca"
                                        type="number"
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
                                        v-model="frecuenciaRespiratoria"
                                        type="number"
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
                    @click="e1 = 3, getDoctor()"
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
                                    <v-chip>Exp. Nº {{exp.idExpediente}} </v-chip>
                                </v-col>
                                <v-col sm="2">
                                    <v-chip>{{exp.doctor}} </v-chip>
                                </v-col>
                                <v-col sm="2">
                                    <v-chip>{{exp.nombrePaciente}} </v-chip>
                                </v-col>
                                <v-col sm="2">
                                    <v-chip>{{exp.fecha}} </v-chip>
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
                                        v-model="exp.consultaPor"
                                        outlined
                                        name="input-7-4"
                                        label="Consulta Por"
                                        value=""
                                    ></v-textarea>
                                </v-col>
                                <v-col sm="6">
                                    <v-textarea
                                        v-model="exp.enfermedadActual"
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
                                        v-model="exp.antecedentesPersonales"
                                        outlined
                                        name="input-7-4"
                                        label="Antecedentes Personales"
                                        value=""
                                    ></v-textarea>
                                </v-col>
                                <v-col sm="6">
                                    <v-textarea
                                        v-model="exp.antecedentesFamiliares"
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
                                        v-model="exp.examenesClinicos"
                                        outlined
                                        name="input-7-4"
                                        label="Examenes Clinicos"
                                        value=""
                                    ></v-textarea>
                                </v-col>
                                <v-col sm="6">
                                    <v-textarea
                                        v-model="exp.exploracionFisica"
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
                                        v-model="exp.diagnosticoPrincipal"
                                        outlined
                                        name="input-7-4"
                                        label="Diagnositico Principal"
                                        value=""
                                    ></v-textarea>
                                </v-col>
                                <v-col sm="6">
                                    <v-textarea
                                        v-model="exp.otroDiagnostico"
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
                                        v-model="exp.tratamiento"
                                        outlined
                                        name="input-7-4"
                                        label="Tratamiento"
                                        value=""
                                    ></v-textarea>
                                </v-col>
                                <v-col sm="6">
                                    <v-textarea
                                        v-model="exp.observaciones"
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
                                    <v-chip>Exp. Nº {{exp.idExpediente}}</v-chip>
                                </v-col>
                                <v-col sm="2">
                                    <v-chip>{{exp.doctor}}</v-chip>
                                </v-col>
                                <v-col sm="2">
                                    <v-chip>{{exp.nombrePaciente}}</v-chip>
                                </v-col>
                                <v-col sm="2">
                                    <v-chip>{{exp.fecha}}</v-chip>
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
                                v-model="exp.descripcionReceta"
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
                                    <v-chip>Exp. Nº {{exp.idExpediente}}</v-chip>
                                </v-col>
                                <v-col sm="2">
                                    <v-chip>{{exp.doctor}}</v-chip>
                                </v-col>
                                <v-col sm="2">
                                    <v-chip>{{exp.nombrePaciente}}</v-chip>
                                </v-col>
                                <v-col sm="2">
                                    <v-chip>{{exp.fecha}}</v-chip>
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
                                v-model="exp.descripcionExamenClinico"
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

                    <v-btn color="primary" @click="guardarConsulta()">
                    Guardar
                    </v-btn>
                </v-stepper-content>
            </v-stepper-items>
        </v-stepper>
        
        
        
        <v-dialog v-model="vdialog" persistent max-width="290">
          <v-card>
            <v-card-title class="text-h5"> Espere Guardando </v-card-title>
            <v-card-text>
              <center>
                <v-progress-circular
                  :size="50"
                  color="primary"
                  indeterminate
                ></v-progress-circular>
              </center>
            </v-card-text>
          </v-card>
      </v-dialog>
      <v-dialog v-model="vspinner" persistent max-width="400">
          <v-card>
            <v-card-title class="text-h5"> Guardado </v-card-title>
            <v-card-text>
              <div class="text-h4 pa-12">{{ message }}</div>
            </v-card-text>
            <v-card-action class="justify-end">
              <v-btn @click="vspinner=false, clearConsulta()">Cerrar</v-btn>
            </v-card-action>
          </v-card>
      </v-dialog>
      <v-dialog v-model="espinner" persistent max-width="400">
          <v-card>
            <v-card-title class="text-h5"> Error al Guardar</v-card-title>
            <v-card-text>
              <div class="text-h4 pa-12">{{ message }}</div>
            </v-card-text>
            <v-card-action class="justify-end">
              <v-btn @click="espinner=false">Cerrar</v-btn>
            </v-card-action>
          </v-card>
      </v-dialog>
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
            presionArterial:"",
            talla:"",
            peso:"",
            temperatura:"",
            frecuenciaCardiaca:"",
            frecuenciaRespiratoria:"",
            vdialog: false,
            vspinner: false,
            espinner: false,
            message:"",

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
                        estadoCivil: x.estadoCivil,
                        idPaciente: x.idPaciente});
                });
                })
                .catch(function (err) {
                console.log(err);
                });
                
        },
        async guardarConsulta(){
            this.vdialog = true;
            let me=this;
            me.consultas.forEach(element => {
                me.exp.idExpediente=element.idExpediente,
                me.exp.nombre=element.nombre,
                me.exp.edad=element.edad,
                me.exp.telefono=element.telefono,
                me.exp.estadoCivil=element.estadoCivil
            });
            
            console.log("No guarda nada");
            me.exp.presionArterial=this.presionArterial;
            me.exp.peso=parseInt(this.peso);
            me.exp.talla=this.talla;
            me.exp.temperatura=parseInt(this.temperatura);
            me.exp.frecuenciaCardiaca=parseInt(this.frecuenciaCardiaca);
            me.exp.frecuenciaRespiratoria=parseInt(this.frecuenciaRespiratoria);
            console.log(me.exp.presionArterial);

            var sol = await axios.post(
                "api/Consulta/Crear",
                JSON.stringify(this.exp),
                {
                    headers: { 
                    // Overwrite Axios's automatically set Content-Type
                    "Content-Type": "application/json",
                    },
                }
            );
            if (sol.status == 200) {
                this.vdialog = false;
                this.message = sol.data.message;
                this.vspinner = true;
                console.log(sol.data.message);
            } else {
                this.vdialog = false;
                this.message = sol.data.message;
                this.espinner = true;
                console.log(sol.data.message);
            }
        },
        getDoctor(){
            let me=this;
            me.exp.fecha=new Date().toISOString().substr(0, 10),
            me.doctores.forEach(element=>{
                if(me.exp.idMedicoGrl==element.value){
                    me.exp.doctor=element.text;                   
                }
            });
            me.consultas.forEach(element => {
                me.exp.idExpediente=element.idExpediente;
                me.exp.nombrePaciente=element.nombre;
                me.exp.sexo=element.sexo;
                me.exp.idPaciente=element.idPaciente;
            });

        },
        clearConsulta(){
            location.reload();
        },

    },
    created(){
        this.getDoctores(),
        this.getTipoConsulta()
    }

}
</script>