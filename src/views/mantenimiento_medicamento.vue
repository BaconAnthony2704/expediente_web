<template>
    <div>
        <center>
            <H1>Elija una opcion: </H1>
        </center>
     <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">{{title}}</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
    <v-dialog v-model="dialogActive" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">{{title}}</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="activeItemConfirm">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
     <v-container>
         <v-row>
             <v-col md="4">
                    <v-card>
                    
                    <v-card-actions>
                        <v-card>
                    
                    <v-dialog
                      v-model="dialog"
                      max-width="500px"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          color="primary"
                          dark
                          
                          v-bind="attrs"
                          v-on="on"
                        >
                          Nuevo Medicamento
                        </v-btn>
                      </template>
                          <v-card>
                            

                            <v-card-text>
                              <v-container>
                                <v-row>
                                    <v-col
                                      cols="12"
                                      sm="10"
                                      md="10"
                                    >
                                      <v-text-field
                                        v-model="editedItem.name"
                                        label="Nombre"
                                        type="text"
                                      ></v-text-field>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col
                                      cols="12"
                                      sm="6"
                                      md="6"
                                    >
                                      <v-text-field
                                        v-model="editedItem.username"
                                        label="Usuario"
                                        type="text"
                                      ></v-text-field>
                                    </v-col>
                                    <v-col
                                      cols="12"
                                      sm="6"
                                      md="6"
                                    >
                                      <v-text-field
                                        v-model="editedItem.password"
                                        label="Password"
                                        type="password"
                                      ></v-text-field>
                                    </v-col>
                                </v-row>
                                
                                  
                              
                              </v-container>
                            </v-card-text>

                            <v-card-actions>
                              <v-spacer></v-spacer>
                              <v-btn
                                color="blue darken-1"
                                text
                                @click="close"
                              >
                                Cancel
                              </v-btn>
                              <v-btn
                                color="blue darken-1"
                                text
                                @click="guardar()"
                              >
                                Save
                              </v-btn>
                            </v-card-actions>
                          </v-card>
                      </v-dialog>
                    </v-card>
                    </v-card-actions>
                </v-card>
             </v-col>

         
         <v-col md="4">
                    <v-card>
                    
                    <v-card-actions>
                        <v-btn href="#/exportar_usuario" color="info" >Exportar Medicamento</v-btn>
                    </v-card-actions>
                </v-card>
             </v-col>

         </v-row>
     </v-container> 
     <v-data-table
    :headers="headers"
    :items="listUsr"
    :items-per-page="5"
    class="elevation-1"
  > 
      <template v-slot:item.actions="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
      <template v-if="item.isactive==true">
          <v-icon
            small
            @click="deleteItem(item)"
          >
            mdi-delete
          </v-icon>
      </template>
      <template v-if="item.isactive==false">
          <v-icon
            small
            @click="activedItem(item)"
          >
            mdi-plus-circle
          </v-icon>
      </template>
    </template>
  </v-data-table>  
    </div>
</template>
<script>
import axios from 'axios'
import userModel from '../models/user'
  export default {
    
    data () {
      return {
        editedItem:{userModel},
        dialog: false,
        title:"",
        headers: [
          {
            text: 'idMedicamento',
            align: 'start',
            sortable: false,
            value: 'name',
          },
          { text: 'Nombre', value: 'username' },
          { text: 'Tipo', value: 'isactive' },
          { text: 'Descripcion', value: 'actions', sortable: false },
          { text: 'Existencia', value: 'actions', sortable: false },
          
        ],
        listUsr:[],
        editedIndex: -1,
        dialogDelete: false,
        dialogActive: false,
      }
    },
    
    created() {
      this.listarUsuarios();
    },
    methods: {
      async deleteItemConfirm () {
        this.listUsr.splice(this.editedIndex, 1)
        var resp=await axios.put("api/Login/Desactivar/"+this.editedItem.idUser);
        if(resp.status==200){
          console.log(resp.data);
        }else{
          console.log(resp.data);
        }
        this.closeDelete()
        location.reload();
      },
      async activeItemConfirm () {
        this.listUsr.splice(this.editedIndex, 1)
        var resp=await axios.put("api/Login/Activar/"+this.editedItem.idUser);
        if(resp.status==200){
          console.log(resp.data);
        }else{
          console.log(resp.data);
        }
        this.closeDelete()
        location.reload();
      },
      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },
      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },
      activedItem (item) {
        this.title="Esta seguro de activar a  este usuario?";
        this.editedIndex = this.listUsr.indexOf(item)
        console.log("USUARIO==============");
        console.log(item.idUser);
        this.editedItem = Object.assign({}, item)
        this.dialogActive = true
      },
      deleteItem (item) {
        this.title="Esta seguro de desactivar a este usuario?";
        this.editedIndex = this.listUsr.indexOf(item)
        console.log("USUARIO==============");
        console.log(item.idUser);
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },
      editItem (item) {
        this.editedIndex = this.listUsr.indexOf(item)
        this.editedItem = Object.assign({}, item)
        
        this.dialog = true
      },
      async listarUsuarios(){
        let me=this;
        var usrArray=[];
        var resp=await axios.get("api/Login/Listar")
        if(resp.status==200){
          usrArray=resp.data;
          usrArray.map(function(x){
            me.listUsr.push(x);
          });
          ///console.log(me.listUsr);
        }
        
      },
      async guardarUsuario(){
        let me=this;
        
        var resp=await axios.post("api/Login/Registrar",me.editedItem);
        if(resp.data==200){
          console.log(resp.data);
        }
      },
      async editarUsuario(){
        let me=this;
        
        var resp=await axios.put("api/Login/Editar/"+me.editedItem.idUser,me.editedItem);
        if(resp.data==200){
          console.log(resp.data);
        }
      },
      async guardar(){
        if(this.editedIndex>-1){
          //Aqui va el editar
          await this.editarUsuario();
          
        }else{
          await this.guardarUsuario();

        }
        this.close();
        location.reload();
      }
    },
  }
</script>