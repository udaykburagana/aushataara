<template>
    <v-card
    class="mx-auto"
    max-width="1200"
    elevation="0"
  >
    <v-container fluid>
      <v-row dense>
        <v-col
          v-for="card in plans"
          :key="card.id"
          :cols="card.flex"
        >
          <v-card height="300" :color="card.color" 
          @click="onPlanSelect(card)">
              <v-card-title v-text="card.title"></v-card-title>
              <v-card-text>
                <ul v-for="point in card.points" :key="point">
                  <li>{{point}}</li>
                </ul>
                </v-card-text>
          </v-card>
        </v-col>
      </v-row>
        <p v-if="selectedPlan" id="selectedPlan"><strong> Selected : {{selectedPlan}} plan </strong></p>
    </v-container>
    </v-card>
</template>

<script>
import { mapMutations,mapState } from 'vuex'
  export default {
    data: () => ({
      selectedPlan: ''
    }),
    computed:{
      ...mapState(["plans"])
    },
    methods:{
      ...mapMutations(["setSelectedPan"]),
      onPlanSelect : function(card){
        this.selectedPlan = card.title
        this.setSelectedPan({
          id: card.id,
          title:card.title
        })

      },
    }
  }
</script>

<style scoped>
#selectedPlan{
  margin:auto;
  text-align: center;
  font-size: 2rem;
}
</style>