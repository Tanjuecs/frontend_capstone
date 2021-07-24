<template>
    <div>
        <div class="mt-3">
            <h1>Product Suppliers</h1>
        <p style="font-size: 15px">Here you can add your product suppliers.</p>
        <el-alert
            title="Product Management / Suppliers."
            type="success" :closable="false">
        </el-alert>
        </div>
        <div id="testscroll">
            <div style="margin-top: 30px;">
            <psupplier />
        </div>
        </div>
        
    </div>
</template>

<script>
import psupplier from "@/components/admin_dashboard/admin_dashboard_content/product_supplier/supplier"
export default {
    components: {
        psupplier
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