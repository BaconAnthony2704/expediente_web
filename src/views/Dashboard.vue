<template>
  
  <v-item-grpup>
    <v-container>
      <MyCard />
      <br />
      <br />
      <v-row>
        <v-col>
          <MyCalendar />
        </v-col>
        <v-col>
          <MyWrapping />
        </v-col>
      </v-row>
    </v-container>
  </v-item-grpup>
</template>
<script>
import MyCard from "../components/MyCard.vue";
import MyCalendar from "../components/MyCalendar.vue";
import MyWrapping from "../components/MyWrapping.vue";
export default {
  data() {
    return {};
  },
  components: {
    MyCalendar,
    MyWrapping,
    MyCard,
  },
};
</script>
