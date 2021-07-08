<template>
    <div>
        <div class="mt-3">
            <h3>Stocks on hand</h3>
        <p>Here you can do more actions with your product stocks</p>
        <el-alert
            title="Stocks on hand."
            type="success" :closable="false">
        </el-alert>
        </div>
        <div id="testscroll">

        <stocks />
        </div>
    </div>
</template>

<script>
import stocks from  "@/components/admin_dashboard/admin_dashboard_content/stocksonhand/stocks_on_hand"
export default {
    components: {
        stocks
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