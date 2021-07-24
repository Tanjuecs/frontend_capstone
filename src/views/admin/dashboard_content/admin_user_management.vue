<template>
    <div>
        <div class="mt-3">
            <h1>User Management</h1>
        <p style="font-size: 15px">Manage system user access and information.</p>
        <el-alert
            title="Viewing user management."
            type="success" :closable="false">
        </el-alert>
        </div>
        <div id="testscroll">
            <dashusermanagement style="margin-top: 40px;"/>
        </div>
        
    </div>  
</template>

<script>
import dashusermanagement from "@/components/admin_dashboard/admin_dashboard_content/dashboard_user_management"
export default {
    components: {
        dashusermanagement
    }
}
</script>

<style scoped>
#testscroll{
    height: 900px;
  overflow: scroll;
  overflow-x: hidden;
}
</style>