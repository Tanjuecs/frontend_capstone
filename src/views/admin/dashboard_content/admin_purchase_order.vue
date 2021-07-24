<template>
    <div>
        <div class="mt-3">
            <h1>Purchase Orders</h1>
        <p style="font-size: 15px">Here you can add your purchase orders</p>
        <el-alert
            title="Purchase Orders"
            type="success" :closable="false">
        </el-alert>
        </div>
        <div id="testscroll">
            <div style="margin-top: 30px;">
            <puchase />
        </div>
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

<style scoped>
#testscroll{
    height: 900px;
  overflow: scroll;
  overflow-x: hidden;
}
</style>