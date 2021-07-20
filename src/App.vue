<template>
  <div id="app">
   <router-view/>
    
  </div>
</template>

<script>
import {scanSession} from "@/store/request-common";
export default {
  created() 
  {
    this.checker();
  },
  methods: {
    checker(){
      scanSession().then((response) => {
        if(response.data === "scan admin"){
          this.historyloginmanagement()
          this.$router.push({name: 'admindashboard'}).catch(() => {})
        }
        else if(response.data === "homepage"){
            // this.$router.push({name: 'Index'}).catch(() => {})
        }
      })
    },
    historyloginmanagement(){
      loginhistory(localStorage.getItem("oauth2_ss::_ss_")).then(response => {
        if(response.data.message === "success"){
          console.log(response.data.message)
        }
      })
    },
  }
}
</script>