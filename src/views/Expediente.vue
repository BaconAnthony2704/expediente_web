  
<template>
  <v-stepper
    v-model="e6"
    vertical
  >
  <!--Informacion personal-->
    <v-stepper-step
      :complete="e6 > 1"
      step="1"
    >
      Informacion personal
      <small>Agregar la informacion del paciente</small>
    </v-stepper-step>

    <v-stepper-content step="1">
      <v-card
        color="grey lighten-1"
        class="mb-12"
        height="auto"
      >
        <template>
            <v-form v-model="valid">
                <v-container>
                    <v-row>
                        <v-col
                        cols="12"
                        md="6">
                        <v-label>Expediente No.</v-label>
                        </v-col>
                        <v-col
                        cols="12"
                        md="6">
                        <v-label>A progresar</v-label>
                        </v-col>
                    </v-row>
                <v-row>
                    <v-col
                    cols="12"
                    md="6"
                    >
                    <v-text-field
                        v-model="nombres"
                        :rules="nameRules"
                        :counter="10"
                        label="Nombre"
                        required
                        outlined
                    ></v-text-field>
                    </v-col>
                    <v-col
                    cols="12"
                    md="2">

                    </v-col>
                    <v-col
                    cols="12"
                    md="4">
                        <v-img
                            lazy-src="https://picsum.photos/id/11/10/6"
                            max-height="150"
                            max-width="250"
                            src="https://picsum.photos/id/11/500/300"
                        ></v-img>
                    </v-col>
                    
                </v-row>
                <v-row>
                     <v-col
                    cols="12"
                    md="6"
                    >
                    <v-text-field
                        v-model="apellidos"
                        :rules="nameRules"
                        :counter="10"
                        label="Apellidos"
                        required
                        outlined
                    ></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                     <v-col
                    cols="12"
                    md="12"
                    >
                     <v-textarea
                        outlined
                        name="input-7-4"
                        label="Domicilio"
                        
                        ></v-textarea>
                    </v-col>
                </v-row>
                <v-row>
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
                        <v-date-picker
                        v-model="date"
                        scrollable
                        >
                        <v-spacer></v-spacer>
                        <v-btn
                            text
                            color="primary"
                            @click="modal = false"
                        >
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
                <v-col cols="12" md="2"></v-col>
                <v-col
                    cols="12"
                    sm="6"
                    md="4"
                >
                    <v-select
                    :items="items"
                    label="Seleccione un genero"
                    outlined
                    
                    ></v-select>
                </v-col>
                </v-row>
                <v-row>
                    <v-col
                    cols="12"
                    md="4"
                    >
                    <v-text-field
                        v-model="isss"
                        :rules="emailRules"
                        label="No. ISSS"
                        required
                        outlined
                    ></v-text-field>
                    </v-col>
                </v-row>
                </v-container>
            </v-form>
        </template>

      </v-card>
      <v-btn
        color="primary"
        @click="e6 = 2"
      >
        Continuar
      </v-btn>
      <v-btn text>
        Cancelar
      </v-btn>
    </v-stepper-content>
    <!--Informacion adicional -->

    <v-stepper-step
      :complete="e6 > 2"
      step="2"
    >
      Informacion adicional
    </v-stepper-step>

    <v-stepper-content step="2">
      <v-card
        color="grey lighten-1"
        class="mb-12"
        height="auto"
      >
      <v-form
      v-model="valid"
      >
      <v-container>
          <v-row>
              <v-col
                    cols="12"
                    md="4"
                    >
                <v-text-field
                    v-model="nacimiento"
                    :rules="emailRules"
                    label="Lugar de nacimiento"
                    required
                    outlined
                ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
              <v-col
                    cols="12"
                    md="4"
                    >
                <v-text-field
                    v-model="telefonoDoc"
                    :rules="emailRules"
                    label="Telefono domicilio"
                    required
                    outlined
                ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
              <v-col
                    cols="12"
                    md="4"
                    >
                <v-text-field
                    v-model="telefonoOfi"
                    :rules="emailRules"
                    label="Telefono oficina"
                    required
                    outlined
                ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
              <v-col
                    cols="12"
                    md="4"
                    >
                <v-text-field
                    v-model="correo"
                    :rules="emailRules"
                    label="Correo"
                    required
                    outlined
                ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
              <v-col
                    cols="12"
                    md="8"
                    >
                <v-text-field
                    v-model="responsableA"
                    :rules="emailRules"
                    label="Responsable A"
                    required
                    outlined
                ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
              <v-col
                    cols="12"
                    sm="6"
                    md="4"
                >
                    <v-select
                    :items="itemscivil"
                    label="Estado civil"
                    outlined
                    
                    ></v-select>
                </v-col>
          </v-row>
          <v-row>
              <v-col
              cols="12"
              md="6">
                  <v-switch
                    v-model="switch1"
                    :label="`Nvo paciente: ${switch1.toString()}`"
                    ></v-switch>
              </v-col>
          </v-row>
      </v-container>

      </v-form>
      </v-card>
      <v-btn
        color="primary"
        @click="e6 = 3"
      >
        Continuar
      </v-btn>
      <v-btn text>
        Cancelar
      </v-btn>
    </v-stepper-content>

    <v-stepper-step
      :complete="e6 > 3"
      step="3"
    >
      Exploracion fisica
    </v-stepper-step>

    <v-stepper-content step="3">
      <v-card
        color="grey lighten-1"
        class="mb-12"
        height="auto"
      >
        <v-form
        v-model="valid"
        >
        <v-container>
            <v-row>
                <v-col
                        cols="12"
                        md="4"
                        >
                    <v-text-field
                        v-model="altura"
                        :rules="emailRules"
                        label="Altura"
                        required
                        outlined
                    ></v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col
                        cols="12"
                        md="4"
                        >
                    <v-text-field
                        v-model="peso"
                        :rules="emailRules"
                        label="Peso"
                        required
                        outlined
                    ></v-text-field>
                </v-col>
            </v-row>
             <v-row>
                <v-col
                        cols="12"
                        sm="6"
                        md="4"
                    >
                        <v-select
                        :items="itemspiel"
                        label="Tipo piel"
                        outlined
                        
                        ></v-select>
                    </v-col>
            </v-row>
            <v-row>
                <v-col
                        cols="12"
                        md="4"
                        >
                    <v-text-field
                        v-model="marcasnac"
                        :rules="emailRules"
                        label="Marcas de nacimiento"
                        required
                        outlined
                    ></v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col
                        cols="12"
                        sm="6"
                        md="4"
                    >
                        <v-select
                        :items="itemscabello"
                        label="Color de cabello"
                        outlined
                        
                        ></v-select>
                    </v-col>
            </v-row>
            <v-row>
                <v-col
                        cols="12"
                        md="4"
                        >
                    <v-text-field
                        v-model="correo"
                        :rules="emailRules"
                        label="Correo"
                        required
                        outlined
                    ></v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col
                        cols="12"
                        md="8"
                        >
                    <v-text-field
                        v-model="responsableA"
                        :rules="emailRules"
                        label="Responsable A"
                        required
                        outlined
                    ></v-text-field>
                </v-col>
            </v-row>
            
            <v-row>
                <v-col
                cols="12"
                md="6">
                    <v-switch
                        v-model="switch1"
                        :label="`Ocupa lentes: ${switch1.toString()}`"
                        ></v-switch>
                </v-col>
            </v-row>
            <v-row>
                <v-col
                cols="12"
                md="6">
                    <v-switch
                        v-model="switch1"
                        :label="`Presenta discapacidad: ${switch1.toString()}`"
                        ></v-switch>
                </v-col>
            </v-row>
            <v-row>
                <v-col
                cols="12"
                md="6">
                    <v-switch
                        v-model="switch1"
                        :label="`Problema auditivo: ${switch1.toString()}`"
                        ></v-switch>
                </v-col>
            </v-row>
        </v-container>

        </v-form>
      </v-card>
      <v-btn
        color="primary"
        @click="e6 = 4"
      >
        Continuar
      </v-btn>
      <v-btn text>
        Cancelar
      </v-btn>
    </v-stepper-content>

    <v-stepper-step step="4">
      Documentos
    </v-stepper-step>
    <v-stepper-content step="4">
      <v-card
        color="grey lighten-1"
        class="mb-12"
        height="auto"
      >
        <v-form
        v-model="valid"
        >
            <v-container>
                <v-row>
                    <v-col
                            cols="12"
                            md="8"
                            >
                        <v-text-field
                            v-model="nombremedico"
                            :rules="emailRules"
                            label="Medico general"
                            required
                            outlined
                        ></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col
                            cols="12"
                            md="4"
                            >
                        <v-text-field
                            v-model="telefonomedico"
                            :rules="emailRules"
                            label="Telefono Medico"
                            required
                            outlined
                        ></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col
                            cols="12"
                            md="4"
                            >
                        <v-text-field
                            v-model="nombredentista"
                            :rules="emailRules"
                            label="Nombre destinta"
                            required
                            outlined
                        ></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                     <v-col
                    cols="12"
                    md="12"
                    >
                     <v-textarea
                        outlined
                        name="input-7-4"
                        label="Domicilio del medico"
                        
                        ></v-textarea>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col
                            cols="12"
                            sm="6"
                            md="4"
                        >
                            <v-select
                            :items="itemshospital"
                            label="Hospital preferencia"
                            outlined
                            
                            ></v-select>
                        </v-col>
                </v-row>
                <v-row>
                    <v-col
                            cols="12"
                            sm="6"
                            md="4"
                        >
                            <v-select
                            :items="itemsseguro"
                            label="Compañia seguro"
                            outlined
                            
                            ></v-select>
                        </v-col>
                </v-row>
                <v-row>
                    <v-col
                            cols="12"
                            md="4"
                            >
                        <v-text-field
                            v-model="poliza"
                            :rules="emailRules"
                            label="Poliza"
                            required
                            outlined
                        ></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col
                            cols="12"
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
                                label="Ultima fecha de vacunacion"
                                prepend-icon="mdi-calendar"
                                readonly
                                v-bind="attrs"
                                v-on="on"
                            ></v-text-field>
                            </template>
                            <v-date-picker
                            v-model="date"
                            scrollable
                            >
                            <v-spacer></v-spacer>
                            <v-btn
                                text
                                color="primary"
                                @click="modal = false"
                            >
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
                </v-row>
                
            </v-container>

        </v-form>
      </v-card>
      <v-btn
        color="primary"
        @click="e6 = 5"
      >
        Continuar
      </v-btn>
      <v-btn text>
        Cancelar
      </v-btn>
    </v-stepper-content>

    <v-stepper-step step="5">
      Incapacidad
    </v-stepper-step>
    <v-stepper-content step="5">
      <v-card
        color="grey lighten-1"
        class="mb-12"
        height="200px"
      ></v-card>
      <v-btn
        color="primary"
        @click="e6 = 6"
      >
        Continuar
      </v-btn>
      <v-btn text>
        Cancelar
      </v-btn>
    </v-stepper-content>

    <v-stepper-step step="6">
      Alergias
    </v-stepper-step>
    <v-stepper-content step="6">
      <v-card
        color="grey lighten-1"
        class="mb-12"
        height="200px"
      ></v-card>
      <v-btn
        color="primary"
        @click="e6 = 1"
      >
        Continuar
      </v-btn>
      <v-btn text>
        Cancelar
      </v-btn>
    </v-stepper-content>
  </v-stepper>
</template>

<script>
  export default {
    data () {
      return {
        e6: 1,
        valid: false,
        firstname: '',
        lastname: '',
        nameRules: [
            v => !!v || 'Name is required',
            v => v.length <= 10 || 'Name must be less than 10 characters',
        ],
        email: '',
        emailRules: [
            v => !!v || 'E-mail is required',
            v => /.+@.+/.test(v) || 'E-mail must be valid',
        ],
        date: new Date().toISOString().substr(0, 10),
        menu: false,
        modal: false,
        menu2: false,
        items: ['Masculino', 'Fenenimo'],
        itemscivil: ['Soltero', 'Casado'],
        switch1:true,
        itemspiel: ['Trigueno', 'Moreno'],
        itemscabello:['Negro','Gris','Cafe'],

      }
    },
  }
</script>