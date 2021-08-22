<template>
  <div>
    <div class="mt-3">
      <h1>Product Finalized</h1>
      <p style="font-size: 15px">Here you can view all products activated that will showed up on the POS.</p>
      <el-alert
          title="Product Activation"
          type="success" :closable="false">
      </el-alert>
    </div>
    <div id="testscroll">
      <prodactivator />
    </div>
  </div>
</template>

<script>
import prodactivator from
      "@/components/admin_dashboard/admin_dashboard_content/product_activator/product_activator_final"
export default {
  components:{
    prodactivator
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