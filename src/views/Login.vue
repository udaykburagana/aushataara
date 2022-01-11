<template>
   <v-app id="inspire">
      <v-main>
         <v-container fluid fill-height>
            <v-layout align-center justify-center>
               <v-flex xs12 sm8 md4>
                  <v-card class="elevation-12">
                     <v-toolbar dark color="primary">
                        <v-toolbar-title>LOGIN</v-toolbar-title>
                     </v-toolbar>
                     <v-card-text>
                        <v-form ref="login">
                           <v-text-field
                              prepend-icon="person"
                              name="email"
                              label="Email"
                              type="text"
                              :rules="[rules.required,rules.email]"
                              v-model="email"
                           ></v-text-field>
                           <v-text-field
                              id="password"
                              prepend-icon="lock"
                              name="password"
                              label="Password"
                              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                              @click:append="showPassword = !showPassword"
                              :type="showPassword ? 'text' : 'password'"
                              :rules="[rules.required]"
                              v-model="password"
                           ></v-text-field>
                        </v-form>
                     </v-card-text>
                     <v-card-actions>
                        <router-link to="/register">not a subscriber?</router-link>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" @click="onLoginClick">Login</v-btn>
                     </v-card-actions>
                  </v-card>
               </v-flex>
            </v-layout>
         </v-container>
      </v-main>
   </v-app>
</template>

<script>
import {mapMutations} from "vuex"
export default {
   name: 'Login',
   data: () => ({
     email:'',
     password:'',
     showPassword: false,
      rules: {
          required: value => !!value || 'Required.',
          min: v => v.length >= 8 || 'Min 8 characters',
          email: value => {
            const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            return pattern.test(value) || 'Invalid e-mail.'
          },
        },
    }),
    mounted(){
      console.log("Mounted");
    },
    methods:{
       ...mapMutations(["toggleIsLoggedIn"]),
      onLoginClick : function(){
        console.log(`clicked-${this.email},${this.password}`)
        if(this.$refs.login.validate()){
           this.toggleIsLoggedIn(true)
           this.$router.push('home') 
        }

      }
    }
};
</script>

<style></style>
