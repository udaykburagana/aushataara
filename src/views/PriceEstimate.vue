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
          {{amount}}
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
        @click="displayRazorPay"
      >
        Procced to Pay
      </v-btn>
    </v-card-actions>
  </v-card>
</v-app>
</template>

<script>
import {mapState} from "vuex"
import axios from 'axios'
import {url} from "../config"

export default {
    data: () => ({
    }),
    mounted(){
        if(!this.allDetailsFilled) this.$router.push("/")
    },
    computed:{
        ...mapState(["amount","selectedPlanTitle","allDetailsFilled","email","phoneNumber"])
    },
    methods:{
      loadScript: function(src){
        return new Promise((resolve)=>{
          const script = document.createElement('script');
          script.src = src
          script.onload = ()=>{
            resolve(true)
          }
          script.onerror = ()=>{
            resolve(false)
          }
          
          document.body.appendChild(script)
        })
      },
      displayRazorPay: async function(){
        const res = await this.loadScript("https://checkout.razorpay.com/v1/checkout.js")
        if(!res){
          alert("Razorpay SDK failed")
          return 
        }
        let data = await axios.post(url+'createOrder',{
          email: this.email
        })
        console.log(data)
        let options = {
          "key": "rzp_test_OQJazuONsMDLkT",
          "amount": (data.data.amount).toString(),
          "currency":data.data.currency,
          "name": "Aushataara",
          "description": `Aushataara ${this.selectedPlanTitle} plan payment`,
          "image": "https://example.com/your_logo",
          "order_id": data.data.id, //This is a sample Order ID. Pass the `id` obtained in the previous step
          "handler": function (response){
              // alert(response.razorpay_payment_id);
              // alert(response.razorpay_order_id);
              // alert(response.razorpay_signature)
              console.log(response)
          },
          "prefill": {
              "email": this.email,
              "contact": this.phoneNumber
          },
          "notes": {
              "email": this.email,
              "date":new Date(),
              "plan": this.selectedPlanTitle
          },
          "theme": {
              "color": "#3399cc"
          }
      };
      const paymentObject = new window.Razorpay(options)
      paymentObject.open()
      }
    }
}
</script>