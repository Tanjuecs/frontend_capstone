<template>
    <div>
        <div class="mt-3">
            <h1>Profile Management</h1>
        <p style="font-size: 15px">Here you can edit your profile.</p>
        <el-alert
            title="Profile Management"
            type="success" :closable="false">
        </el-alert>
        </div>
        <div id="testscroll">
        <myprofile />
    </div>
    </div>
</template>

<script>
import myprofile from "@/components/admin_dashboard/admin_dashboard_content/profilemanagement/profilecontent"
import {mapGetters} from "vuex"
export default {
    components: {
        myprofile
    },
    computed: {
        ...mapGetters({
            getpassparams: 'getpassparams',
            get_full_details: 'get_full_details'
        })
    },
   
    
}
</script>

<style scoped>
#testscroll{
    height: 900px;
  overflow: scroll;
  overflow-x: hidden;
}
</style>