<template>
   <v-app id="inspire">
      <v-content>
         <v-container fluid fill-height>
            <v-layout align-center justify-center>
               <v-flex xs12 sm8 md4>
                  <v-card class="elevation-12">
                     <v-toolbar dark color="primary">
                        <v-toolbar-title>Login Expediente clinico</v-toolbar-title>
                     </v-toolbar>
                     <v-card-text>
                        <v-form>
                           <v-text-field
                              prepend-icon="mdi-email"
                              name="login"
                              label="Username"
                              v-model="username"
                              type="text"
                           ></v-text-field>
                           <v-text-field
                              id="password"
                              prepend-icon="mdi-lock"
                              name="password"
                              label="Password"
                              type="password"
                              v-model="pwd"
                           ></v-text-field>
                        </v-form>
                     </v-card-text>
                     <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="primary"  @click.prevent="encender">Login</v-btn>
                     </v-card-actions>
                  </v-card>
               </v-flex>
            </v-layout>
         </v-container>
      </v-content>
   </v-app>
</template>

<script>
import axios from "axios";
import router from '../router/index'
import md5 from "js-md5"


export default {
   name: 'Login',
   props: {
      source: String,
   },
   data() {
      return {
         username:"",
         pwd:""
      }
   },
   methods: {
      limpiar(){
         this.username="";
         this.pwd="";
      },
      encender(){
         let me=this;
         axios.post("api/Login/Obtener",{
            'username':me.username,
            'password':me.pwd
         }).then(function(resp){
            if(resp.status==200 && resp.data.ok==true){
               alert(resp.data.msg);
               var userInfo={
                  loginType:'asp.net',
                  user:{
                     idUser:resp.data.obj.idUser,
                     name:resp.data.obj.name,
                     username:resp.data.obj.username
                  }
               };
               console.log(resp.data);
               localStorage.setItem('setLoginUser',JSON.stringify(userInfo));
               localStorage.setItem('user',userInfo.user.username)
               localStorage.setItem('idtoken',md5(userInfo.user.username))
               router.push({name:'dashboard',params:{userId:userInfo.user.username} })
               //location.reload();
            }
            
            
         }).catch(error=>{
            console.log('error',error);
            this.limpiar();
            alert("El usuario o contraseña no existe");
         })
        // alert("iniciar sesion: "+this.username+" "+this.pwd );
      }
   },
};
</script>

<style></style>
