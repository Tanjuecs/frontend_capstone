<template>
    <div>
        <div class="mt-3">
            <h3>Purchase Orders</h3>
        <p>Here you can add your purchase orders</p>
        <el-alert
            title="Purchase Orders"
            type="success" :closable="false">
        </el-alert>
        </div>
        <div style="margin-top: 30px;">
            <puchase />
        </div>
    </div>
</template>

<script>
import puchase from "@/components/admin_dashboard/admin_dashboard_content/purchase_order_content/purchase_order"
export default {
    components: {
        puchase
    }
}
</script>