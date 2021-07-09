<template>
    <div>
        <div class="container-fluid">
            <el-tabs v-model="editableTabsValue" type="card" :closable="false">
                <el-tab-pane
                    v-for="(item) in editableTabs"
                    :key="item.name"
                    :label="item.title"
                    :name="item.name"
                >
                <div class="container">
                    <div class="row" style="margin-bottom: 20px;">
                    <div class="col-sm">
                        <el-card shadow="always" style="height: 100%;">
                            <div class="row">
                                <div class="col-sm-4">
                                    <img src="https://cdn1.iconfinder.com/data/icons/business-finance-vol-3-39/512/sales_salesman_businessman_selling-256.png"
                            style="width: 90%; margin-top: 10px; height: auto;" class="img-fluid" alt="no image">
                                </div>
                                <div class="col-sm-8">
                                    <h5>Active Products</h5>
                                    <hr>
                                    <h5>50</h5>
                                </div>
                            </div>
                        </el-card>
                    </div>
                    <div class="col-sm">
                        <el-card shadow="always" style="height: 100%;">
                            <div class="row">
                                <div class="col-sm-4">
                                    <img src="https://cdn0.iconfinder.com/data/icons/seo-web-4-1/128/Vigor_Users-People-Friends-256.png"
                            style="width: 90%; margin-top: 10px; height: auto;" class="img-fluid" alt="no image">
                                </div>
                                <div class="col-sm-8">
                                    <h5>System Users</h5>
                                    <hr>
                                    <h5>2</h5>
                                </div>
                            </div>
                        </el-card>
                    </div>
                    <div class="col-sm">
                        <el-card shadow="always" style="height: 100%;">
                            <div class="row">
                                <div class="col-sm-4">
                                    <img src="https://cdn0.iconfinder.com/data/icons/scenarium-vol-11/128/040_startup_products_rocket_compare-256.png"
                            style="width: 90%; margin-top: 10px; height: auto;" class="img-fluid" alt="no image">
                                </div>
                                <div class="col-sm-8">
                                    <h5>Total Products</h5>
                                    <hr>
                                    <h5>1000</h5>
                                </div>
                            </div>
                        </el-card>
                    </div>
                    <div class="col-sm">
                        <el-card shadow="always" style="height: 100%;">
                            <div class="row">
                                <div class="col-sm-4">
                                    <img src="https://cdn4.iconfinder.com/data/icons/fintech-solutions-filled-outline/24/pending_time_clock_watch_timer-256.png"
                            style="width: 90%; margin-top: 10px; height: auto;" class="img-fluid" alt="no image">
                                </div>
                                <div class="col-sm-8">
                                    <h5>Pending Deliveries</h5>
                                    <hr>
                                    <h5>500</h5>
                                </div>
                            </div>
                        </el-card>
                    </div>
                </div>
                <el-card shadow="always" style="width: 100%; margin-bottom: 30px;">
                     <div id="chart-container"></div>
                </el-card>
                </div>
                </el-tab-pane>
              </el-tabs>
      </div>
  </div>
</template>

<script>
const dataSource = {
  chart: {
    caption: "Countries With Most Oil Reserves [2017-18]",
    subcaption: "In MMbbl = One Million barrels",
    xaxisname: "Country",
    yaxisname: "Reserves (MMbbl)",
    numbersuffix: "K",
    theme: "fusion"
  },
  data: [
    {
      label: "Venezuela",
      value: "290"
    },
    {
      label: "Saudi",
      value: "260"
    },
    {
      label: "Canada",
      value: "180"
    },
    {
      label: "Iran",
      value: "140"
    },
    {
      label: "Russia",
      value: "115"
    },
    {
      label: "UAE",
      value: "100"
    },
    {
      label: "US",
      value: "30"
    },
    {
      label: "China",
      value: "30"
    }
  ]
};

FusionCharts.ready(function() {
  var myChart = new FusionCharts({
    type: "column2d",
    renderAt: "chart-container",
    width:"100%", height:"200%",
    dataFormat: "json",
    dataSource
  }).render();
});
export default {
   components:{
       
   },
    data: () => ({
         editableTabsValue: '1',
        editableTabs: [{
          title: 'Dashboard',
          name: '1',
          content: ''
        }],
        tabIndex: 1,
        
    }),
    
    
}
</script>