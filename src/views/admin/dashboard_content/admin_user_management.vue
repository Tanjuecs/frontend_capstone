<template>
    <div>
        <div class="mt-3">
            <h3>User Management</h3>
        <p>You have full control of all the users</p>
        <el-alert
            title="Viewing user management."
            type="success" :closable="false">
        </el-alert>
        </div>
        <dashusermanagement style="margin-top: 40px;"/>
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