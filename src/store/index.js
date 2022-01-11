import Vue from 'vue'
import Vuex from 'vuex'

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
    allDetailsFilled : false,
    isLoggedIn: false
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
    toggleIsLoggedIn(state,args){
      state.isLoggedIn = args
    }
  },
  actions: {
  },
  modules: {
  }
})
