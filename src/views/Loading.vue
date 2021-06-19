<template>
  <v-row justify="center">
    <v-dialog v-model="spinner" persistent max-width="290">
      <v-card>
        <v-card-title class="text-h5"> Espere por favor </v-card-title>
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
  </v-row>
</template>

<script>
export default {
  name: "Loading",
  data() {
    return {
      spinner: true,
    };
  },
  methods: {
    cambiar() {
      this.$emit("getValues", {
        spinner: false,
      });
    },
  },
  computed() {},
  mounted() {},
};
</script>
