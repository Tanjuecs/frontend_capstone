<template>
    <div>
        <div class="mt-3">
            <h3>System Reports</h3>
        <p>Here you can view all histories from reports module</p>
        <el-alert
            title="Reports / Histories."
            type="success" :closable="false">
        </el-alert>
        </div>
        <div id="testscroll">
            <history />
        </div>
    </div>
</template>

<script>
import history from "@/components/admin_dashboard/admin_dashboard_content/system_histories/histories"
export default {
    components: {
        history
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