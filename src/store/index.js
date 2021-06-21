import Vue from 'vue'
import Vuex from 'vuex'
import httpauth from "./0AuthRequest"
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    Userinfo: [
      {firstname: ''},{lastname: ''}, {uid: 0}, {istype: ''}, {email: ''}
    ],
    productInventoryResponse : {
      response: []
    }
  },
  getters: {
    getFullname: (state) => {
      return state.Userinfo;
    }
  },
  mutations: {
    MUTATE_LIST_PRODUCTINVENTORY(state) {
      return httpauth.get("/api/product-inventory/fetchinginventory").then((response) => {
        state.productInventoryResponse.response = response.data
      })
    }
  },
  actions: {
  },
  modules: {
  }
})
