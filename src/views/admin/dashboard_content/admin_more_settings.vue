<template>
    <div>
        <div class="mt-3">
            <h3>System Settings</h3>
        <p>Here you can modify some settings of the system</p>
        <el-alert
            title="System Settings"
            type="success" :closable="false">
        </el-alert>
        </div>
        <div style="margin-top: 30px;">
            <moresettings />
        </div>
    </div>
</template>

<script>
import moresettings from "@/components/admin_dashboard/admin_dashboard_content/moresettings/moresystemsettings"
export default {
    components: {
        moresettings
    }
}
</script>