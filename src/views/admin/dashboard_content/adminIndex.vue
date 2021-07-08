<template>
    <div>
       <div class="mt-3">
            <h3>Dashboard</h3>
        <p>Welcome to admin Dashboard</p>
        <el-alert
            title="This is your dashboard, Here you can check all the system activity and reports."
            type="success" :closable="false">
        </el-alert>
       </div>
       <div id="testscroll">
           <dashcontent style="margin-top: 40px;"/>
       </div>
    
    </div>
</template>

<script>
import dashcontent from "@/components/admin_dashboard/admin_dashboard_content/dashboard_content"
export default {
    components: {
        dashcontent
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