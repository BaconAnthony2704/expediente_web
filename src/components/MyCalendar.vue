<template>
  <div>
    <v-sheet tile height="54" class="d-flex">
      <v-btn icon class="ma-2" @click="$refs.calendar.prev()">
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
      <v-select
        v-model="type"
        :items="types"
        dense
        outlined
        hide-details
        class="ma-2"
        label="type"
      ></v-select>
      <v-select
        v-model="mode"
        :items="modes"
        dense
        outlined
        hide-details
        label="event-overlap-mode"
        class="ma-2"
      ></v-select>
      <v-select
        v-model="weekday"
        :items="weekdays"
        dense
        outlined
        hide-details
        label="weekdays"
        class="ma-2"
      ></v-select>
      <v-spacer></v-spacer>
      <v-btn icon class="ma-2" @click="$refs.calendar.next()">
        <v-icon>mdi-chevron-right</v-icon>
      </v-btn>
    </v-sheet>
    <v-sheet height="600">
      <!-- Boton -->
      <v-btn color="primary" dark class="mr-4" @click="dialog = true"
        >Agendar cita</v-btn
      >

      <!-- Modal -->
      <v-dialog v-model="dialog" max-width="500">
        <v-card>
          <v-container>
            <v-form @submit.prevent="addEvent">
              <v-select v-model="idPaciente" :items="pacientes" no-data-text="elija" > </v-select>
              <v-text-field
                v-model="start"
                type="date"
                label="fecha de la cita"
              ></v-text-field>
              <v-text-field
                v-model="hora"
                type="time"
                label="hora de la cita"
              ></v-text-field>

              
              <v-btn
                type="submit"
                color="primay"
                class="mr-4"
                @click.stop="dialog = false"
                >Create Event</v-btn
              >
            </v-form>
          </v-container>
        </v-card>
      </v-dialog>
      <!--   esto agregue   !-->
      <v-menu
          v-model="selectedOpen"
          :close-on-content-click="false"
          :activator="selectedElement"
          offset-x
        >
          <v-card
            color="grey lighten-4"
            min-width="350px"
            flat
          >
            <v-toolbar
              :color="selectedEvent.color"
              dark
            >
              <v-btn icon @click="deleteEvent(selectedEvent)">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
              <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
              
              <v-spacer></v-spacer>
            </v-toolbar>


            <v-card-text>
             
              <v-form v-if="currentlyEditing !== selectedEvent.id">
                {{selectedEvent.name}} - {{selectedEvent.start}}
              </v-form>

              <v-form v-else>
                <v-select v-model="idPaciente" :items="pacientes" no-data-text="elija" > </v-select>
                
                <v-text-field
                v-model="start"
                type="date"
                label="fecha de la cita"
              ></v-text-field>
              <v-text-field
                v-model="hora"
                type="time"
                label="hora de la cita"
              ></v-text-field>


              </v-form>

            </v-card-text>

            
            <v-card-actions>
              <v-btn
                v-if="currentlyEditing !== selectedEvent.id"
                text
                color="secondary"
                @click="selectedOpen = false"
              >
                Cancel
              </v-btn>
              <v-btn
                v-else
                text
                color="secondary"
                @click="currentlyEditing = null"
              >
                Cancel
              </v-btn>
              <v-btn
                v-if="currentlyEditing !== selectedEvent.id"
                text
                color="secondary"
                @click="editEvent(selectedEvent.id)"
              >
                Editar
              </v-btn>

              <v-btn 
              text 
              v-else @click.prevent="updateEvent(selectedEvent)">
              Save
              </v-btn>
              

            </v-card-actions>
          </v-card>
        </v-menu>

        <!-- hasta aqui es el menu de cada item!-->
      <v-calendar
        ref="calendar"
        v-model="value"
        :weekdays="[1, 2, 3, 4, 5, 6, 0]"
        locale="es"
        :short-weekdays="false"
        :type="type"
        :events="events"
        :event-overlap-mode="mode"
        :event-overlap-threshold="30"
        :event-color="getEventColor"
        @change="getEvents"
        @click:event="showEvent"
         @click:more="viewDay"
          @click:date="viewDay"
      ></v-calendar>
    </v-sheet>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data(){
    return {
       pacientes: [],
    idPaciente: "",
    hora: "",
    type: "month",
    types: ["month", "week", "day", "4day"],
    mode: "stack",
    modes: ["stack", "column"],
    weekday: [0, 1, 2, 3, 4, 5, 6],
    weekdays: [
      { text: "Sun - Sat", value: [0, 1, 2, 3, 4, 5, 6] },
      { text: "Mon - Sun", value: [1, 2, 3, 4, 5, 6, 0] },
      { text: "Mon - Fri", value: [1, 2, 3, 4, 5] },
      { text: "Mon, Wed, Fri", value: [1, 3, 5] },
    ],
    value: "",
    events: [],
    //agregue esto
      selectedEvent: {},
      selectedElement: null,
      selectedOpen: false,
      details: null,
      currentlyEditing: null,
    colors: [
      "blue",
      "indigo",
      "deep-purple",
      "cyan",
      "green",
      "orange",
      "grey darken-1",
    ],
    names: [
      "Meeting",
      "Holiday",
      "PTO",
      "Travel",
      "Event",
      "Birthday",
      "Conference",
      "Party",
    ],
    dialog: false
    }
  },
  created() {
    this.listarPaciente();
  },
  methods: {
    async addEvent() {
      try {
        if (this.idPaciente && this.start) {
          var respuesta = this.start.concat("T" + this.hora);
          console.log(respuesta);
          let post = {
            idPaciente: this.idPaciente,
            fechaIngreso: respuesta,
            //nombrePaciente: this.idPaciente,
            //dateTime: respuesta,
          };
          await axios.post("api/Cita/Crear", post).then((result) => {
           // await axios.post("https://localhost:44370/api/citas", post).then((result) => {
            console.log(result);
            
          });
          
          this.getEvents();
          //adderrores
          this.idPaciente= null;
          this.name = null;
          this.details = null;
          this.start = null;
          this.hora = null;
          this.end = null;
          this.color = "#1976D2";
        } else {
          //adderrores.
          alert("Datos incompletos");
          //
          console.log("Campos obligatorios");
          
        }
      } catch (error) {
        console.log(error);
        //adderrores
        if(error.response){
          alert("verifique la fecha no puede agendar una cita con fecha anterior a la del dia de ahora" );
        }
         this.idPaciente= null;
          this.name = null;
          this.details = null;
          this.start = null;
          this.hora = null;
          this.end = null;
          this.color = "#1976D2";
          //hasta aqui
      }
    },
    async updateEvent(ev) {
      try {
        if (this.idPaciente && this.start) {
          var respuesta = this.start.concat("T" + this.hora);
          console.log(respuesta);
          let post = {
            id: ev.id,
            idPaciente: this.idPaciente,
            fechaIngreso: respuesta,
            //nombrePaciente: this.idPaciente,
            //dateTime: respuesta,
          };
          await axios.put("api/Citas", post).then((result) => {
           // await axios.post("https://localhost:44370/api/citas", post).then((result) => {
            console.log(result);
            
          });
          
          this.getEvents();
          //adderrores
          this.idPaciente= null;
          this.name = null;
          this.details = null;
          this.start = null;
          this.hora = null;
          this.end = null;
          this.color = "#1976D2";
        } else {
          //adderrores.
          alert("Datos incompletos");
          //
          console.log("Campos obligatorios");
          
        }
      } catch (error) {
        console.log(error);
        //adderrores
        if(error.response){
          alert("verifique la fecha no puede agendar una cita con fecha anterior a la del dia de ahora" );
        }
         this.idPaciente= null;
          this.name = null;
          this.details = null;
          this.start = null;
          this.hora = null;
          this.end = null;
          this.color = "#1976D2";
          //hasta aqui
      }
    },
    async getEvents() {
      try {
        let response = await axios.get("api/Cita/Listar");
        var respuesta = [];
        const events = [];
        respuesta = response.data;
        //console.log(response.data);

        respuesta.map((element) => {
          events.push({
            //agregue esta parte del id para poder borrarlo
            id: element.idCita,
            name: element.nombrePaciente,
            start: element.fechaIngreso,
            end: element.fechaIngreso,
            color: this.colors[this.rnd(0, this.colors.length - 1)],
            //timed: !allDay,
          });
        });

        this.events = events;
        console.log("Prueba")
        console.log(events);
      } catch (error) {
        console.log(error);
      }
    },
    //agregar esto
      editEvent(id){
        this.currentlyEditing = id
      },
      async deleteEvent(ev){
        try {
          console.log("api/Cita/"+ev.id);
          await axios.delete("api/Cita/"+ev.id).then((result) => {
            console.log(result);
            
            }); 
          this.selectedOpen = false;
          this.getEvents();
          
        } catch (error) {
          console.log(error);
        }
      },
      showEvent ({ nativeEvent, event }) {
        const open = () => {
          this.selectedEvent = event
          this.selectedElement = nativeEvent.target
          requestAnimationFrame(() => requestAnimationFrame(() => this.selectedOpen = true))
        }

        if (this.selectedOpen) {
          this.selectedOpen = false
          requestAnimationFrame(() => requestAnimationFrame(() => open()))
        } else {
          open()
        }

        nativeEvent.stopPropagation()
      },
      viewDay ({ date }) {
        this.focus = date
        this.type = 'day'
      },
      //hasta aqui
    getEventColor(event) {
      return event.color;
    },
    rnd(a, b) {
      return Math.floor((b - a + 1) * Math.random()) + a;
    },
    listarPaciente() {
      let me = this;
      var PaciArray = [];
      axios
        .get("api/ComboBox/ListarPaciente")
        .then(function (resp) {
          PaciArray = resp.data;
          PaciArray.map(function (x) {
            me.pacientes.push({ text: x.nombre, value: x.idPaciente });
            console.log(me.pacientes);
          });

        })
        .catch(function (err) {
          console.log(err);
        });
    },
  },





}
</script>
