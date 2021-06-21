<template>
    <div>
        <navadmin />
        <sidenavadmin />
    </div>
</template>

<script>
//import side nav, nav, footer of dashboard
import navadmin from "@/components/admin_dashboard/admin_nav"
import sidenavadmin from "@/components/admin_dashboard/admin_side"
import {scanSession} from "@/store/request-common";
export default {
    components: {
        navadmin, sidenavadmin
    },
    created(){
        this.checker()
    },
    methods: {
        checker(){
      scanSession().then((response) => {
       if(response.data === "homepage"){
            this.$router.push({name: 'Index'}).catch(() => {})
        }
      })
        }
    }
}
</script>