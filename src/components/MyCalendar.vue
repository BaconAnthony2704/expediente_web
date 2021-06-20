<template>
  <div>
    <v-sheet
      tile
      height="54"
      class="d-flex"
    >
      <v-btn
        icon
        class="ma-2"
        @click="$refs.calendar.prev()"
      >
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
      <v-btn
        icon
        class="ma-2"
        @click="$refs.calendar.next()"
      >
        <v-icon>mdi-chevron-right</v-icon>
      </v-btn>
    </v-sheet>
    <v-sheet height="600">
      <!-- Boton -->
<v-btn color="primary" dark class="mr-4" @click="dialog = true">Agendar cita</v-btn>

<!-- Modal -->
<v-dialog v-model="dialog" max-width="500">
  <v-card>
    <v-container>
      <v-form @submit.prevent="addEvent">
        <v-text-field v-model="name" type="text" label="Nombre del paciente"></v-text-field>
        <v-text-field v-model="start" type="date" label="fecha de la cita"></v-text-field>
        <v-text-field v-model="hora" type="time" label="hora de la cita"></v-text-field>
        
        <v-text-field v-model="color" type="color" label="color"></v-text-field>
        <v-btn type="submit" color="primay" class="mr-4" @click.stop="dialog = false">Create Event</v-btn>
      </v-form>
    </v-container>
  </v-card>
</v-dialog>
      <v-calendar
        ref="calendar"
        v-model="value"
        :weekdays="weekday"
        :type="type"
        :events="events"
        :event-overlap-mode="mode"
        :event-overlap-threshold="30"
        :event-color="getEventColor"
        @change="getEvents"
      ></v-calendar>
      
    </v-sheet>
  </div>
</template>

<script>
  import axios from 'axios'
  import Vue from 'vue'
//import DatetimePicker from 'vuetify-datetime-picker'
//Vue.use(DatetimePicker)

  export default {
    data: () => ({
      hora: "",
      type: 'month',
      types: ['month', 'week', 'day', '4day'],
      mode: 'stack',
      modes: ['stack', 'column'],
      weekday: [0, 1, 2, 3, 4, 5, 6],
      weekdays: [
        { text: 'Sun - Sat', value: [0, 1, 2, 3, 4, 5, 6] },
        { text: 'Mon - Sun', value: [1, 2, 3, 4, 5, 6, 0] },
        { text: 'Mon - Fri', value: [1, 2, 3, 4, 5] },
        { text: 'Mon, Wed, Fri', value: [1, 3, 5] },
      ],
      value: '',
      events: [],
      colors: ['blue', 'indigo', 'deep-purple', 'cyan', 'green', 'orange', 'grey darken-1'],
      names: ['Meeting', 'Holiday', 'PTO', 'Travel', 'Event', 'Birthday', 'Conference', 'Party'],
      dialog: false,
    }),
    methods: {
      /*
      getEvents ({ start, end }) {
        const events = []
        const min = new Date(`${start.date}T00:00:00`)
        const max = new Date(`${end.date}T23:59:59`)
        const days = (max.getTime() - min.getTime()) / 86400000
        const eventCount = this.rnd(days, days + 20)
        for (let i = 0; i < eventCount; i++) {
          const allDay = this.rnd(0, 3) === 0
          const firstTimestamp = this.rnd(min.getTime(), max.getTime())
          const first = new Date(firstTimestamp - (firstTimestamp % 900000))
          const secondTimestamp = this.rnd(2, allDay ? 288 : 8) * 900000
          const second = new Date(first.getTime() + secondTimestamp)
          events.push({
            name: this.names[this.rnd(0, this.names.length - 1)],
            start: first,
            end: second,
            color: this.colors[this.rnd(0, this.colors.length - 1)],
            timed: !allDay,
          })
        }
        this.events = events
      },*/
      async addEvent(){
        try {
          if(this.name && this.start){
            var respuesta=this.start.concat("T"+this.hora);
            console.log(respuesta);
            let post = {
            nombrePaciente: this.name,
            dateTime: respuesta
            
            };
          await axios.post("api/citas", post).then((result) => {
            console.log(result);
            
            });

            this.getEvents();

            this.name = null;
            this.details = null;
            this.start = null;
            this.end = null;
            this.color = '#1976D2';

          }else{
            console.log('Campos obligatorios');
          }
        } catch (error) {
          console.log(error);
        }
      },
      async getEvents(){
       try {
          let response = await axios.get("api/citas");
          var respuesta = [];
          const events = [];
          respuesta=response.data;
          console.log(response.data);

          
          respuesta.map(element => {
            
          events.push({
          name: element.nombrePaciente,
          start: element.dateTime,
          end: element.dateTime,
          color: this.colors[this.rnd(0, this.colors.length - 1)],
          //timed: !allDay,
          });  
          });

          this.events=events;
          
      } catch (error) {
          console.log(error);
          }
      },
      getEventColor (event) {
        return event.color
      },
      rnd (a, b) {
        return Math.floor((b - a + 1) * Math.random()) + a
      },
    },
  }
</script>