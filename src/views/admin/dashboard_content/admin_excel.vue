<template>
    <div>
        <div class="mt-3">
            <div style="display: inline;">
                <img src="https://cdn3.iconfinder.com/data/icons/logos-brands-3/24/logo_brand_brands_logos_excel-256.png"
                                     alt="no image" style="width: 3%; height:auto;">&nbsp;
            <h1>Excel Templates | Upload Excel Template</h1>
            </div>
        <p style="font-size: 15px">Here you can upload system required excel template.</p>
        <el-alert
            title="You need to upload the exact excel template file to be able to generate report in your database."
            type="warning" :closable="false">
        </el-alert>
        </div>
        <div id="testscroll">
            <xlstemplate style="margin-top: 30px;"/>
        </div>
        
    </div>
</template>

<script>
import xlstemplate from "@/components/admin_dashboard/admin_dashboard_content/excel_template/excel_template_content";
export default {
    components: {
        xlstemplate
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