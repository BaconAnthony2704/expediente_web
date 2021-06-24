<template>
  <v-container>
    <v-row justify="space-around">
      <v-card width="400">
        <v-img
          height="200px"
          src="https://res.cloudinary.com/dunsiuhtb/image/upload/b_rgb:272424,o_21/v1624334343/caqgaitbaxbaa4rvgtse.jpg"
        >
          <v-app-bar
            flat
            color="rgba(0, 0, 0, 0)"
          >
            <v-app-bar-nav-icon color="white"></v-app-bar-nav-icon>

            <v-toolbar-title class="text-h6 white--text pl-0">
              Citas Proximas.
            </v-toolbar-title>

            <v-spacer></v-spacer>

            <v-btn
              color="white"
              icon
            >
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </v-app-bar>

          <v-card-title class="white--text mt-8">
            <v-avatar size="56">
              <img
                alt="user"
                src="https://res.cloudinary.com/dunsiuhtb/image/upload/v1624334090/ehkmgb7jgrscrfmgz0wp.png"
              >
            </v-avatar>
            <p class="ml-3">
              Clinica Medica
            </p>
          </v-card-title>
        </v-img>

        <v-card-text>
          <div class="font-weight-bold ml-8 mb-2">
            Ahora
          </div>

          <v-timeline
            align-top
            dense
          >
            <v-timeline-item
              v-for="message in messages"
              :key="message.time"
              :color="message.color"
              small
            >
              <div>
                <div class="font-weight-normal">
                  <strong>{{ message.nombrePaciente }}</strong> 
                </div>
                <div>{{ message.fechaIngreso }}</div>
              </div>
            </v-timeline-item>
          </v-timeline>
        </v-card-text>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios';
  export default {
    data: () => ({
      messages: [ ],
    }),methods:{
      async getcitas(){
       try {
          let response = await axios.get("api/citasProximas");
          
          this.messages=response.data;
          console.log(response.data);
          
          
      } catch (error) {
          console.log(error);
         
          }
      },
  },
  created() {
    
    this.getcitas();
    this.actualizar();
    },
    async actualizar(){
      await setInterval(console.log("me ejecuto"), 3000);

    }, 
    
  }
</script>