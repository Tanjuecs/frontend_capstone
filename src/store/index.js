
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
    },
    archives_users_uri: {
      responseDataAPI: []
    },
    archive_recovery_Object: {
      recoveryResponse: ''
    },
    archive_logs_Object:{
      archivelogsResponse: ''
    },
    user_login_history_Object: {
      responseData: ''
    },
    product_activation_history_Object: {
      responseData: '',
      responseArray: []
    },
    return_Orders_Object: {
      responseArray: [],
      responseData: '',
      responseMoreDetailsArray: []
    },
    category_modify_Object: {
      responseData: '',
      responseAddingLoop :'',
      categoryListArray: [],
      categoryFilterStocks: []
    },
    products_raw_Object: {
      responseData: ''
    },
    emailObject: {
      client_email: localStorage.getItem("oauth2_ss::_ss_"),
      passParams: '',
      get_full_client_details: []
    }
  },
  getters: {
    getFullname: (state) => {
      return state.Userinfo;
    },
    get_all_users_in_archive: (state) => {
      return state.archives_users_uri.responseDataAPI
    },
    get_response_from_remove_user_login_history: (state) => {
      return state.user_login_history_Object.responseData
    },
    get_response_product_history_activation: (state) => {
      return state.product_activation_history_Object.responseData
    },
    get_array_response_product_history_activation: (state) => {
      return state.product_activation_history_Object.responseArray
    },
    get_returns_orders: (state) => {
      return state.return_Orders_Object.responseArray
    },
    get_returns_orders_remove: (state) => {
      return state.return_Orders_Object.responseData
    },
    get_returns_orders_more_details : (state) => {
      return state.return_Orders_Object.responseMoreDetailsArray
    },
    get_response_category_modify: (state) => {
      return state.category_modify_Object.responseData
    },
    get_response_category_adding_loop: (state) => {
      return state.category_modify_Object.responseAddingLoop
    },
    get_category_list_mapper: (state) => {
      return state.category_modify_Object.categoryListArray
    },
    get_stocks_by_category: (state) => {
      return state.category_modify_Object.categoryFilterStocks
    },
    get_response_product_finalization_raw: (state) => {
      return state.products_raw_Object.responseData
    },
    getemail:(state) => {
      return state.emailObject.client_email
    },
    getpassparams:(state) => {
      return state.emailObject.passParams
    },
    get_full_details:(state) => {
      return state.emailObject.get_full_client_details
    }
  },
  mutations: {
    mutate_get_full_client_details: (state, data) => {
      state.emailObject.get_full_client_details = data
    },
    mutate_product_finalization_raw: (state, data) => {
      state.products_raw_Object.responseData = data
    },
    mutate_get_all_category: (state, data) => {
      state.category_modify_Object.categoryListArray = data
    },
    MUTATE_LIST_PRODUCTINVENTORY(state) {
      return httpauth.get("/api/product-inventory/fetchinginventory").then((response) => {
        state.productInventoryResponse.response = response.data
      })
    },
    MUTATE_GET_ARCHIVES_USERS(state, data){
      state.archives_users_uri.responseDataAPI = data
    },
    MUTATE_RECOVERY_USERS: (state, data) => {
      state.archive_recovery_Object.recoveryResponse = data
    },
    MUTATE_USER_LOGS: (state, data) => {
      state.archive_logs_Object.archivelogsResponse = data
    },
    MUTATE_REMOVE_LOGIN_HISTORY: (state, data) => {
      state.user_login_history_Object.responseData = data
    },
    MUTATE_ADD_PRODUCT_HISTORY_ACTIVATION: (state, data) => {
      state.product_activation_history_Object.responseData = data
    },
    MUTATE_LIST_PRODUCT_ACTIVATE_LOGS: (state, data) => {
      state.product_activation_history_Object.responseArray = data
    },
    MUTATE_GET_RETURNS_ORDER: (state, data) => {
      state.return_Orders_Object.responseArray = data
    },
    MUTATE_REMOVE_RETURNS_ORDER: (state, data) => {
      state.return_Orders_Object.responseData = data
    },
    MUTATE_GET_RETURNS_ORDER_MORE_DETAILS: (state, data) => {
      state.return_Orders_Object.responseMoreDetailsArray = data
    },
    MUTATE_EDIT_CATEGORY: (state, data) => {
      state.category_modify_Object.responseData = data
    },
    MUTATE_CATEGORY_ADD: (state, data) => {
      state.category_modify_Object.responseAddingLoop = data
    },
    mutation_filter_by_category_stocks: (state, data) => {
      state.category_modify_Object.categoryFilterStocks = data
    }
  },
  actions: {
    actions_fetch_full_client_details({commit}, {email}){
      try {
        return new Promise((resolve, reject) => {
          httpauth.get(`/api/get-details-profile/profile-catcher?email=${email}`)
          .then(response => {
            resolve(response)
          })
        })
      } catch (error) {
        alert(error)
      }
    },
    actions_product_remove_raw({commit}, {pcode}){
      try {
        const promise = new Promise((resolve, reject) => {
          httpauth.delete(`/api/product-finalization/remove-product-raw-by-pcode?pcode=${pcode}`)
          .then(res => {
            resolve(commit(`mutate_product_finalization_raw`, res.data))
          }, error => {
            reject(error)
          })
        })
        return promise
      } catch (error) {
        alert(error)
      }
    },
    actions_final_categories(){
      try {
        const promise = new Promise((resolve, reject) => {
          httpauth.get(`/api/product-finalization/get-all-category-prodfinal`)
          .then(res => {
            resolve(res)
          }, error => {
            reject(error)
          })
        })
        return promise
      } catch (error) {
        alert(error)
      }
    },
    actions_filter_category_stocks({commit}, {val}){
      return new Promise((resolve, reject) => {
        httpauth.get(`/api/filter-stocks/Filter-By-category-for-stocks?categoryname=${val}`)
        .then(res => {
          resolve(commit(`mutation_filter_by_category_stocks`, res.data))
        })
      })
    },
    actions_get_all_categories_for_stocks({commit}){
      return new Promise((resolve, reject) => {
        httpauth.get(`/api/product-category-management/get-list-category`)
        .then(response => {
          resolve(commit(`mutate_get_all_category`, response.data))
        }, error=> {
          reject(error)
        })
      })
    },
    ACTIONS_CATEGORY_LOOP_ADD({commit}, {Arrayable}){
      try {
        return new Promise((resolve, reject) => {
          for(var x = 0; x < Arrayable.length; x++){
            var result = httpauth.post(`/api/product-category-management/add-category?categoryname=${Arrayable[x].categoryname}`)
          }
          result.then(response => {
            resolve(commit(`MUTATE_CATEGORY_ADD`, response.data))
          }, error => {
            reject(error)
          })
        })
      } catch (error) {
        alert("error in adding loop" + error)
      }
    },
    ACTIONS_CATEGORY_LOOP_ADD_FINAL({commit}, {Arrayable}){
      try {
        return new Promise((resolve, reject) => {
          for(var x = 0; x < Arrayable.length; x++){
            var result = httpauth.post(`/api/product-category-management/add-category-final?categoryname=${Arrayable[x].categoryname}`)
          }
          result.then(response => {
            resolve(response)
          }, error => {
            reject(error)
          })
        })
      } catch (error) {
        alert("error in adding loop" + error)
      }
    },
     ACTIONS_EDIT_CATEGORY({commit}, {object}){
      try {
        var data = new FormData()
        data.append("categ", object.categoryname)
        return new Promise((resolve, reject) => {
          httpauth.put(`/api/product-category-management/update-category-name?id=${object.id}`, data)
          .then(response => {
            resolve(commit(`MUTATE_EDIT_CATEGORY`, response.data))
          }, error => {
            reject(error)
          })
        })
      } catch (error) {
        alert("error in updating category" + error)
      }
    },
    ACTIONS_EDIT_CATEGORY_FINAL({commit}, {object}){
      try {
        var data = new FormData()
        data.append("categ", object.categoryname)
        return new Promise((resolve, reject) => {
          httpauth.put(`/api/product-category-management/update-category-name-final?id=${object.id}`, data)
          .then(response => {
            resolve(commit(`MUTATE_EDIT_CATEGORY`, response.data))
          }, error => {
            reject(error)
          })
        })
      } catch (error) {
        alert("error in updating category" + error)
      }
    },
     ACTIONS_GET_RETURNS_ORDER_MORE_DETAILS({commit}, {ponumber}){ 
      try {
        const promise = new Promise((resolve, reject) => {
          httpauth.get(`/api/report-problem/get-product-by-ponumber?ponumber=${ponumber}`)
          .then(res => {
            resolve(commit(`MUTATE_GET_RETURNS_ORDER_MORE_DETAILS`, res.data))
          }, error => {
            reject(error)
          })
        })
        return promise
      } catch (error) {
        alert("error in fetching returns order more details" + error)
      }
    },
    async ACTIONS_REMOVE_RETURNS_ORDER({commit}, {id}){
      try {
        const promise = new Promise((resolve, reject) => {
          httpauth.post(`/api/report-problem/remove-returns-order?id=${id}`).then(response => {
            resolve(commit(`MUTATE_REMOVE_RETURNS_ORDER`, response.data))
          }, error => {
            reject(error)
          })
        })
        return await promise
      } catch (error) {
        alert("error in removing order" + error)
      }
    },
    ACTIONS_GET_RETURNS_ORDER({commit}){
      try {
        const promise = new Promise((resolve, reject) => {
          httpauth.get(`/api/report-problem/get-all-returns-order`)
          .then(resp => {
            resolve(commit(`MUTATE_GET_RETURNS_ORDER`, resp.data))
          }, error => {
            reject(error)
          })
        })
        return promise
      } catch (error) {
        alert("error in fetching return orders" + error)
      }
    },
    ACTIONS_REMOVE_PROD_ACTIVATION_LOGS({commit},{id}){
      try {
        return new Promise((resolve, reject) => {
          httpauth.post(`/api/activity-log-management/remove-product-activation-logs?id=${id}`)
          .then(resp => {
            resolve(commit("MUTATE_ADD_PRODUCT_HISTORY_ACTIVATION", resp.data))
          }, error => {
            reject(error)
          })
        })
      } catch (error) {
        alert("error in removing data in product activation logs" + error)
      }
    },
    ACTIONS_GET_LIST_PROD_ACTIVATION_LOGS(){
      try {
        return new Promise((resolve, reject) => {
          httpauth.get(`/api/activity-log-management/get-all-product-activation-logs`).then(response => {
            resolve(response)
          }).catch((e) => {
            reject(e)
          })
        })
      } catch (error) {
        alert("error in fetching list of product activation logs" + error)
      }
    },
    ACTIONS_PRODUCT_HISTORY_ACTIVATION({commit}, {self, code}){
      try {
        var data = new FormData()
        data.append("message", "The Administrator activate a product")
        data.append("status", "Product Inventory Activation")
        data.append("code", code)
        httpauth.post(`/api/activity-log-management/add-activity-log-activation-products`, data)
        .then(response => {
          commit('MUTATE_ADD_PRODUCT_HISTORY_ACTIVATION', response.data)
          self.activity_log_product_activation_response()
        })
      } catch (error) {
        alert("error in adding product history activation" + error)
      }
    },
    ACTIONS_REMOVE_LOGIN_HISTORY({commit}, {self, id, loading}){
      httpauth.post(`/api/login-history-management/remove-list-history-login?id=${id}`)
      .then(response => {
        commit('MUTATE_REMOVE_LOGIN_HISTORY', response.data)
        self.removehistory_response(loading)
      }).catch((e) => {
        alert("error in removing login history" + e)
      })
    },
    MUTATE_GET_ARCHIVES_USERS({commit}, {self}){
        httpauth.get(`/api/archive-users-management/get-all-archives-users`).then(response => {
        commit("MUTATE_GET_ARCHIVES_USERS", response.data)
        self.getlistofusersdata()
       }).catch((error) => {
         console.log(error)
       })
    },
    ACTIONS_RECOVERY_USERS({commit}, {self, id, cliendid, loading}){
      httpauth.post(`/api/archive-users-management/recover-archive-users?id=${id}&clientid=${cliendid}`).then(resp => {
        commit(`MUTATE_RECOVERY_USERS`, resp.data)
        self.onrecoveruser_response(loading)
      }).catch((e) => {
        alert("error in updating recovery" + e)
      })
    },
    ACTIONS_LOGS_USERS({commit}, {self, id, payload}){
      httpauth.post(`/api/activity-log-management/remove-activity-log-user-management?id=${id}`)
      .then(response => {
        commit("MUTATE_USER_LOGS", response.data)
        self.removelogs_response(payload)
      }).catch((e) => {
        alert("error in removing logs" + e)
      })
    }
  },
  modules: {
  }
})
