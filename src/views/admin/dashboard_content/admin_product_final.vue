<template>
    <div>
        <div class="mt-3">
            <h1>Product Finalization</h1>
        <p style="font-size: 15px">Here you finalize your product and it will show up on POS system.</p>
        <el-alert
            title="Product finalization"
            type="success" :closable="false">
        </el-alert>
        </div>
    <div id="testscroll">
        <pfinal />
    </div>
    </div>
</template>

<script>
import pfinal from "@/components/admin_dashboard/admin_dashboard_content/product_final/product_final_content"
export default {
    components: {
        pfinal
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