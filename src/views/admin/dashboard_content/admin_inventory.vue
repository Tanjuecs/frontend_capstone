<template>
    <div>
        <div class="mt-3">
            <h1>Product Inventory Activation</h1>
        <p style="font-size: 15px">Here you can activate the status of the product and it can be added on product management</p>
        <el-alert
            title="Product Management / Inventory"
            type="success" :closable="false">
        </el-alert>
        </div>
        <div id="testscroll">
             <div style="margin-top: 30px;">
           <inventory 
            :pagedTableData="pagedTableData"
            :productArray="productArray"
            :pageSize="pageSize"
            :page="page"
            :listLoading="listLoading"
            :searchable="searchable"
           />
        </div>
        </div>
       

    </div>
</template>

<script>
import inventory from "@/components/admin_dashboard/admin_dashboard_content/product_inventory/inventoryui"
// import {fetchAllProductInventory} from "@/store/request-common"
export default {
    components: {
        inventory
    },
}
</script>

<style scoped>
#testscroll{
    height: 900px;
  overflow: scroll;
  overflow-x: hidden;
}
</style>