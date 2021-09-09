<template>
 
 <v-container>
         <v-row>
             
             <v-col md="10"> 
    <form @submit.prevent="submit">
        <v-select
          v-model="select"
          :items="items"
          
          label="Selecione el tipo de gasto"
          data-vv-name="select"
          
        ></v-select>
        <v-text-field
            type="number"
          v-model="monto"
          label="Monto:"
          
        ></v-text-field>
        <v-textarea
          
          label="Descripcion:"
          v-model="comentarios"
          style="filled"
          
        ></v-textarea>
      
        
        
      
      <v-btn
        class="mr-4"
        type="submit"
        
      >
        submit
      </v-btn>
      <v-btn href="#/contabilidad">
        Regresar
      </v-btn>
    </form>
             </v-col>
         </v-row>
 </v-container>
 
</template>
<script>
  
  export default {
    
    data: () => ({
      monto: '',
      comentarios: '',
      select: null,
      items: [
        'pago1',
        'pago 2',
        'pago 3',
        'otros',
      ],
    }),

    methods: {
      
      submit(){
          alert("ejecuto");
      },
    },
  }
</script>