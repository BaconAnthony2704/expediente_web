<template>
  <v-app id="app">
    


    
    <v-main>
      <!--  -->
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
   data: () => ({
      drawer: null,
   }),
   props: {
      source: String,
   },
};
</script>
