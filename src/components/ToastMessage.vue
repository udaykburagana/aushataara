<template>
    <v-snackbar
      v-model="snackbarToggle"
      :timeout="timeout"
    >
      {{ errorMessage }}

      <template v-slot:action="{ attrs }">
        <v-btn
          color="blue"
          text
          v-bind="attrs"
          @click="snackbarToggle = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
</template>

<script>
import {mapMutations, mapState} from "vuex";
  export default {
    data: () => ({
      timeout: 2000,
    }),
    mounted(){
    },
    methods:{  
        ...mapMutations(["setSnackbar"]),
    },
    computed:{
        ...mapState(["errorMessage","snackBar"]),
        snackbarToggle: {
            get () {
                return this.snackBar
            },
            set (value) {
                this.setSnackbar(value)
            }
        }
    }
  }
</script>