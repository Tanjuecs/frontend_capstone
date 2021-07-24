<template>
    <div>
        <div class="mt-3">
            <h3>Return Orders</h3>
        <p>Here you can check your return orders</p>
        <el-alert
            title="Return Orders."
            type="success" :closable="false">
        </el-alert>
        </div>
        <div id="testscroll">
            <returnorders />
        </div>
    </div>
</template>

<script>
import returnorders from "@/components/admin_dashboard/admin_dashboard_content/return_orders_content/returnOrders"
export default {
    components: {
        returnorders
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