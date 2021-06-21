<template>
    <div>
        <div class="mt-3">
            <h3>Product Category</h3>
        <p>Here you can add your product category</p>
        <el-alert
            title="Product category management/ Category."
            type="success" :closable="false">
        </el-alert>
        </div>
        <div style="margin-top: 30px;">
            <pcateg />
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