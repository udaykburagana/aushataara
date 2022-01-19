import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router'
import axios from 'axios'
import {url} from "../config"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    plans: [
      { id:1, title: 'Yearly',visits:25,points:["Full Body Checkup at the beginning, Monthly Checkups (like BP, Glucose, mostly for elderly)", "Appointment with Nutritionist/ Naturopathy/ Ayurvedic Doctor once every two weeks. Or 25 appointments in total.", "Medicines Discounts", "Doctor Appointments at reduced prices", "New Benefits will be added gradually"] ,flex: 4, color:"#FFD700",elevation:1 },
      { id:2, title: 'Halfyearly',visits:9,points:["Full Body Checkup at the beginning, Monthly Checkups (like BP, Glucose, mostly for elderly)", "Appointment with Nutritionist/ Naturopathy/ Ayurvedic Doctor once every three weeks or every month. Or 9 appointments in total.", "Medicines Discounts", "Doctor Appointments at reduced prices"], flex: 4, color:"#c0c0c0",elevation:1  },
      { id:3, title: 'Quaterly',visits:4,points:["Full Body Checkup at the beginning, Monthly Checkups (like BP, Glucose, mostly for elderly)", "Appointment with Nutritionist/ Naturopathy/ Ayurvedic Doctor once every three weeks or every month. Or 4 appointments in total.", "Medicines Discounts", "Doctor Appointments at reduced prices"], flex: 4, color:"#b08d57 ",elevation:1  },
    ],
    selectedPlanTitle: '',
    selectedPlanId: null,
    addedMembers:[],
    email : '',
    phoneNumber : undefined,
    password: '',
    amount: 0,
    allDetailsFilled : false,
    isLoggedIn: false,
    snackBar: false,
    errorMessage: ''
  },
  mutations: {
    setSelectedPan (state,args) {
      state.selectedPlanId = args.id,
      state.selectedPlanTitle = args.title
    },
    addMemberMutation (state,args){
      state.addedMembers.push(args)
    },
    deleteItemMutation(state,args){
      (state.addedMembers).splice((state.addedMembers).indexOf(args),1)
    },
    setOtherDetails(state,args){
      state.email = args.email
      state.phoneNumber = args.phoneNumber
      state.password = args.password
      state.allDetailsFilled = true
    },
    setAmount(state,args){
      state.amount = args
      state.password = ''
    },
    setSnackbar(state,args){
      state.snackBar = args
    },
    showMessage(state,args){
      state.errorMessage = args
      state.snackBar = true
      console.log(state)
    },
    toggleIsLoggedIn(state,args){
      state.isLoggedIn = args
    }
  },
  actions: {
    async GETDETAILS({ commit,state },args){
      await commit('setOtherDetails',args)
      const params = {
        email: state.email,
        password: state.password,
        phoneNumber: state.phoneNumber,
        addedMembers: state.addedMembers,
        selectedPlanId:state.selectedPlanId,
        selectedPlanTitle: state.selectedPlanTitle,
      }
      let res = await axios.post(url +"registerUser",params)
      if(res.data.success) {
        await commit('setAmount',res.data.amount)
        await commit('toggleIsLoggedIn',true)
        router.push("/getEstimate")
      }else{
        // await commit('setSnackbar',true)
        if(res.data.message) return await commit('showMessage',res.data.message)
        await commit('showMessage',"unable to resigster user, please try again after some time")
      }
    }
  },
  modules: {
  }
})
