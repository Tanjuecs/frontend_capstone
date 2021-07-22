<template>
    <div>
       <navigation />
       <div class="wrapper">
           <slider style="margin-bottom: 20px;"/>
       </div>
       <div class="container">
           <center>
              
               
           </center>
           <uicontent style="margin-bottom: 20px;"/>
       </div>
       <sysfooter />
    </div>
</template>

<script>

import uicontent from "@/components/content/content"
import navigation from "@/components/nav";
import slider from "@/components/carousel/carousel"
import {scanSession} from "@/store/request-common";
import sysfooter from "@/components/footer"
export default {
    components: {
        navigation, slider, uicontent, sysfooter
    },
     data() {
       return{
            
       }
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