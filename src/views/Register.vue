<template>
<v-app>
  <v-stepper v-model="e1">
    <v-stepper-header >
      <v-stepper-step
        :complete="e1 > 1"
        step="1"
      >
        Select a Plan
      </v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step
        :complete="e1 > 2"
        step="2"
      >
       Add Plan Members
      </v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step step="3">
        Other Details
      </v-stepper-step>
    </v-stepper-header>

    <v-stepper-items>
      <v-stepper-content step="1">
        <SelectPlan />

        <v-btn
          color="primary"
          @click="e1 = 2"
          :disabled="selectedPlanId === null"
        >
          Continue
        </v-btn>
      </v-stepper-content>

      <v-stepper-content step="2">
        <AddMembers/>

        <v-btn
          color="primary"
          @click="e1 = 3"
          :disabled="addedMembers.length == 0"
        >
          Continue
        </v-btn>

        <v-btn 
          @click="e1 = 1"
          text>
          Back
        </v-btn>
      </v-stepper-content>

      <v-stepper-content step="3">
        <OtherDetails />

        <!-- <v-btn
          color="primary"
          @click="NextStep"
          :disabled="!allDetailsFilled"
        >
          Get Estimate
        </v-btn> -->

        <v-btn 
          @click="e1 = 2"
          text>
          Back
        </v-btn>
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</v-app>
</template>

<script>
import {mapState} from 'vuex';
import OtherDetails from '../components/OtherDetails.vue'
import SelectPlan from '../components/SelectPlan.vue'
import AddMembers from '../components/AddMembers.vue'
export default {
   name: 'Register',
   data: () => ({
     e1: 1,
    }),
    components:{
      OtherDetails,
      SelectPlan,
      AddMembers
    },
    methods:{
    },
    computed:{
       ...mapState(["selectedPlanId","addedMembers","email","phoneNumber","password","allDetailsFilled"])
    },
};
</script>