
<template>
<v-container>
    <v-row>
      <v-col md="12">
        <h1>Reporte de medicamento</h1>
      </v-col>
    </v-row>
    
    
    <v-row>
        <v-col md="8">

        </v-col>
       <v-col md="2">
         <v-dialog
      
      persistent
      max-width="700"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="green"
          dark
          v-bind="attrs"
          @click="exportPDF()"
        >
          Generar PDF
        </v-btn>
      </template>
      
    </v-dialog>
    
     
    
        </v-col>
       
       
       <v-col md="2">
    
      </v-col>
    </v-row>
    <table class="table table-bordered" id="content">
        <thead>
          <tr>
            <th class="text-left">Estado</th>
            <th class="text-left">Nombre</th>
            <th class="text-left">Tipo</th>
            <th class="text-left">Existencia</th>
            <th class="text-left">Descripcion</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item) in listadoMedicamentos" :key="item">
            <td>{{ item.idmedicamento }}</td>
            <td>{{ item.nombre }}</td>
            <td>{{ item.tipo }}</td>
            <td>{{ item.existencia }} Unidades</td>
            <td>{{ item.descripcion }}</td>
          </tr>
        </tbody>
    </table>
  
</v-container>
</template>
<script>
import axios from "axios";
import jspdf from "jspdf";
//import autoTable from 'jspdf-autotable'
import html2canvas from "html2canvas";
export default {
  data: () => ({
    search: "",
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        text: "Codigo",
        align: "start",
        sortable: false,
        value: "idmedicamento",
      },
      { text: "Nombre", value: "nombre" },
      { text: "Tipo", value: "tipo" },
      { text: "Existencia", value: "existencia" },
      { text: "Descripcion", value: "descripcion" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    listadoMedicamentos: [],
    editedIndex: -1,
    editedItem: {
      idmedicamento: 0,
      nombre: "",
      tipo: "",
      existencia: 0,
      descripcion: "",
    },
    defaultItem: {
      idmedicamento: 0,
      nombre: "",
      tipo: "",
      existencia: 0,
      descripcion: "",
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  created() {
    this.initialize();
  },

  methods: {
    exportPDF() {
      const doc = new jspdf("p", "pt", "a4");
      const html = document.getElementById("content");
      window.html2canvas = html2canvas;
      //console.log(doc.getFontSize());
      //console.log(html);
      //autoTable(doc,{html:'#myTable'})

      doc.setFont("Arimo");
      //doc.setFontType("normal");
      doc.setFontSize(-10);
      doc.html(html, {
        callback: function (d) {
          //d.autoPrint();
          d.save("table.pdf");
        },
        autoPaging: "slice",
        x: 0,
        y: 0,
        html2canvas: { scale: 0.6 },
      });
    },
    initialize() {
      //hacer la consulta a la api getmedicamentos
      //this.listadoMedicamentos = [   ]
      this.listarMedicamentos();
    },
    filterOnlyCapsText(value, search) {
      console.log(value);

      return (
        value != null &&
        search != null &&
        typeof value === "string" &&
        // eslint-disable-next-line prettier/prettier
          value.toString().toLocaleUpperCase().indexOf(search.toLocaleUpperCase()) !== -1
      );
    },
    async listarMedicamentos() {
      try {
        let response = await axios.get("api/medicamentos");

        this.listadoMedicamentos = response.data;
        console.log(response.data);
      } catch (error) {
        console.log(error);
        alert("fallo");
      }
    },

    editItem(item) {
      //llamar al ws de editar pasandole el id

      this.editedIndex = this.listadoMedicamentos.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.listadoMedicamentos.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      //this.listadoMedicamentos.splice(this.editedIndex, 1)
      //consultar la api de borrar
      this.eliminarMedicamento();

      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedIndex > -1) {
        //logica cuando se edita
        //Object.assign(this.listadoMedicamentos[this.editedIndex], this.editedItem)
        var id = this.editedItem;
        this.editedItem.existencia = parseInt(this.editedItem.existencia);
        this.editedItem.idmedicamento = parseInt(this.editedItem.idmedicamento);
        this.editarMedicamento(id);
      }
      //modificar el else tiene que guardar en la base de datos
      else {
        //guardar el nuevo medicamento en la api es post medicamento
        //this.listadoMedicamentos.push(this.editedItem)  //listar fuera de consulta
        this.editedItem.idmedicamento = parseInt(this.editedItem.idmedicamento);
        this.editedItem.existencia = parseInt(this.editedItem.existencia);
        this.guardarMedicamento(this.editedItem);
      }
      this.close();
    },
    async guardarMedicamento(item) {
      try {
        console.log(item);
        let response = await axios.post("api/medicamentos", item);

        console.log(response.data);
        alert("medicamento guardado");

        this.listarMedicamentos();
      } catch (error) {
        console.log(error);
        alert("fallo");
      }
    },
    async editarMedicamento(item) {
      try {
        var id = item.idmedicamento;
        var endpoint = "api/medicamentos/" + id;
        console.log(item);
        let response = await axios.put(endpoint, item);

        console.log(response.data);
        alert("Medicamento actualizado");

        this.listarMedicamentos();
      } catch (error) {
        console.log(error);
        alert("fallo");
      }
    },
    async eliminarMedicamento() {
      try {
        var obj = this.editedItem;
        var id = obj.idmedicamento;
        id = parseInt(id);

        var endpoint = "api/medicamentos/" + id;
        console.log(id);
        let response = await axios.delete(endpoint);

        console.log(response.data);
        alert("medicamento borrado");

        this.listarMedicamentos();
      } catch (error) {
        console.log(error);
        alert("fallo");
      }
    },
  },
};
</script>
