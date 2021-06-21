<template>
    <div>
        <div class="mt-3">
            <h3>Product Suppliers</h3>
        <p>Here you can add your product suppliers</p>
        <el-alert
            title="Product Management / Suppliers."
            type="success" :closable="false">
        </el-alert>
        </div>
        <div style="margin-top: 30px;">
            <psupplier />
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