<template>
    <div>
        <div class="mt-3">
            <h1>Stocks on Hand</h1>
        <p style="font-size: 15px">Here you can do more actions with your product stocks</p>
        <el-alert
            title="Stocks on Hand."
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