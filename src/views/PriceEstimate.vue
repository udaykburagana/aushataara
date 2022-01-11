<template>
<v-app>
  <v-card
    class="mx-auto"
    max-width="344"
    outlined
    style="margin:auto"
  >
    <v-list-item three-line>
      <v-list-item-content>
        <div class="text-overline mb-4">
          Estimated Amount
        </div>
        <v-list-item-title class="text-h5 mb-1" style="font-size:1.5rem">
          {{estimatedPrice}}
        </v-list-item-title>
        <v-list-item-subtitle>you have selected {{selectedPlanTitle}} plan</v-list-item-subtitle>
      </v-list-item-content>

      <v-list-item-avatar
        tile
        size="80"
        color="grey"
      ></v-list-item-avatar>
    </v-list-item>

    <v-card-actions>
      <v-btn
        color="primary"
        rounded
      >
        Procced to Pay
      </v-btn>
    </v-card-actions>
  </v-card>
</v-app>
</template>

<script>
import {mapState} from "vuex"
export default {
    data: () => ({
        costChart: [{
            id:1,
            name: 'infant',
            lower : 0,
            upper : 1,
            cost: 100
        },{
            id:2,
            name: 'toddler',
            lower : 1,
            upper : 3,
            cost : 500
        },{
            id:3,
            name: 'child',
            lower : 3,
            upper : 12,
            cost: 2000,
        },{
            id:4,
            name: 'teen',
            lower : 13,
            upper : 18,
            cost: 3000,
        },{
            id:1,
            name: 'Adult',
            lower : 19,
            upper : 60,
            cost: 5000,
        }]
    }),
    mounted(){
        if(!this.allDetailsFilled) this.$router.push("/")
    },
    computed:{
        ...mapState(["plans","addedMembers","selectedPlanId","selectedPlanTitle","allDetailsFilled"]),
        estimatedPrice(){
            let totalPrice = 0;
            this.addedMembers.map(obj =>{
                let ageType = this.costChart.find(each => ((each.lower <= Number(obj.age)) && (Number(obj.age) <= each.upper)))
                totalPrice +=  Number(ageType.cost)
            })
            let planCost = this.plans.find(obj => obj.id == this.selectedPlanId)
            let cost = Number(planCost.visits) * 500
            totalPrice += Number(cost)
            return totalPrice
        }
    }
}
</script>