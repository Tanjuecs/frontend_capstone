<template>
    <div>
        <div class="mt-3">
            <h3>Product Inventory Activation</h3>
        <p>Here you can activate the status of the product and it can be added on product management</p>
        <el-alert
            title="Product management / Inventory."
            type="success" :closable="false">
        </el-alert>
        </div>
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