<template>
    <div>
         <div class="mt-3">
            <h1>Received Orders</h1>
        <p style="font-size: 15px">Here you can update your purchase orders to received orders.</p>
        <el-alert
            title="Orders / Received Orders."
            type="success" :closable="false">
        </el-alert>
        </div>
        <div id="testscroll">
             <div style="margin-top: 30px;">
            <receiveorder />
        </div>
        </div>
       
    </div>
</template>

<script>
import receiveorder from "@/components/admin_dashboard/admin_dashboard_content/purchase_received/received_order"
export default {
    components: {
        receiveorder
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