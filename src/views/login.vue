<script>
import navigation from "@/components/nav";
import {scanSession} from "@/store/request-common";
import Login from "@/components/login_content"
export default {
    components:{
        navigation, Login
    },
     created(){
        this.checker()
    },
    methods: {
        checker(){
      scanSession().then((response) => {
        if(response.data === "scan admin"){
          this.$router.push({name: 'admindashboard'})
        }
      })
    }
    }
}
</script>

<template>
    <div>
        <navigation />
        <Login />
    </div>
</template>