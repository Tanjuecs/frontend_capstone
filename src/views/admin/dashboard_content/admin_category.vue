<template>
    <div>
        <div class="mt-3">
            <h1>Product Category</h1>
        <p style="font-size: 15px">Here you can add your product category</p>
        <el-alert
            title="Product category management/ Category."
            type="success" :closable="false">
        </el-alert>
        </div>
        <div id="testscroll">
            <div style="margin-top: 30px;">
            <pcateg />
        </div>
        </div>
        
    </div>
</template>

<script>
import pcateg from "@/components/admin_dashboard/admin_dashboard_content/product_category/product_categ"
export default {
    components:{
        pcateg
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