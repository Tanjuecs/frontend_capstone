<template>
    <div>
        <div class="mt-3">
            <h1>System Settings</h1>
        <p style="font-size: 15px">Here you can modify some settings of the system.</p>
        <el-alert
            title="System Settings"
            type="success" :closable="false">
        </el-alert>
        </div>
        <div id="testscroll">
             <div style="margin-top: 30px;">
            <moresettings />
        </div>
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

<style scoped>
#testscroll{
    height: 900px;
  overflow: scroll;
  overflow-x: hidden;
}
</style>