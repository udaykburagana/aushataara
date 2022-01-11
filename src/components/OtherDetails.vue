<template>
                  <v-card class="mb-12" elevation="0" width="50%" style="margin:auto">
                     <!-- <v-toolbar dark color="primary">
                        <v-toolbar-title>Register</v-toolbar-title>
                     </v-toolbar> -->
                     <v-card-text>
                        <v-form ref="details">
                           <v-text-field
                              id="email"
                              prepend-icon="person"
                              name="Email"
                              label="Email"
                              :rules="[rules.required,rules.email]"
                              v-model = "email"
                              clearable
                           ></v-text-field>
                           <v-text-field
                              id="password"
                              prepend-icon="lock"
                              name="password"
                              label="Password"
                              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                              @click:append="showPassword = !showPassword"
                              :type="showPassword ? 'text' : 'password'"
                              :rules="[rules.required,rules.min]"
                              v-model="password"
                              clearable
                           ></v-text-field>
                           <v-text-field
                              id="confirmPassword"
                              prepend-icon="lock"
                              name="Confirm_password"
                              label="Confirm Password"
                              :append-icon="showConfirmPassword ? 'mdi-eye' : 'mdi-eye-off'"
                              @click:append="showConfirmPassword = !showConfirmPassword"
                              :type="showConfirmPassword ? 'text' : 'password'"
                              :rules="[rules.required,confirmPasswordRule]"
                              v-model="confirmPassword"
                              clearable
                           ></v-text-field>
                           <v-text-field
                              id="phnnum"
                              prepend-icon="phone"
                              name="Phone_Nummber"
                              label="Phone Number"
                              :rules="[rules.required,rules.phnNumber,rules.phnNumberlength]"
                              v-model="phoneNumber"
                              prefix="+91"
                              clearable
                           ></v-text-field>
                           <v-btn
                              color="primary"
                              @click="confirmDetails"
                           >
                              Confirm Details
                           </v-btn>
                        </v-form>
                     </v-card-text>
                  </v-card>
</template>

<script>
import {mapMutations} from 'vuex';
export default {
   name: 'OtherDetails',
   data: () => ({
     email:'',
     password:'',
     confirmPassword: '',
     phoneNumber : undefined,
     showPassword: false,
     showConfirmPassword:false,
      rules: {
          required: value => !!value || 'Required.',
          min: v => v.length >= 8 || 'Min 8 characters',
          email: value => {
            const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            return pattern.test(value) || 'Invalid e-mail.'
          },
          
          phnNumber: value =>{
             const pattern = /[0-9]{2}\d{8}/
             return pattern.test(value) || 'Invalid Phone Number'

          },
          phnNumberlength: v => v?.length == 10 || ' 10 characters required',
        },
    }),
    mounted(){
      console.log("Mounted");
    },
    computed:{
       confirmPasswordRule() { return ((this.confirmPassword == this.password) || 'Passwords must Match') },
    },
    methods:{
       ...mapMutations(["setOtherDetails"]),
      onRegisterClick : function(){
        console.log(`clicked`)
      },
      confirmDetails : function(){
         
         if(this.$refs.details.validate()) {
            if (confirm('Confirm Details?')) {
            
               let args={
                  email: this.email,
                  password: this.password,
                  phoneNumber: this.phoneNumber
               }
               this.setOtherDetails(args)
            } else {
            // Do nothing!
            }

         }else{
            alert("Please clear all errors")
         }
      }
    }
};
</script>