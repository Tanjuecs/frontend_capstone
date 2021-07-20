<template>
  <div>
    <div class="mt-3">
      <h3>Product Activation</h3>
      <p>Here you can activate product so it may appear on your POS System</p>
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