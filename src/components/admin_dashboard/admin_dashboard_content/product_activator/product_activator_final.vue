<template>
<div>
  <div style="margin-top: 30px; margin-bottom: 30px;" class="container">
    <el-card shadow="always" style="margin-bottom: 20px;">
      <div class="row">
        <div class="col-md-5">
          <h3>Product Activation Graph</h3>
        </div>
        <div class="col-md-7">
          <el-switch
              @change="onswitchgraphview"
              style="display: block"
              v-model="filtergraph"
              active-color="#13ce66"
              inactive-color="#ff4949"
              active-text="Active"
              inactive-text="Inactive">
          </el-switch>
        </div>
      </div>
      <high :options="chartOptions" :redraw="true" style="margin-top: 30px;"></high>
    </el-card>
    <el-card shadow="always">
      <h3>Product Activation</h3>
      <el-input
          style="margin-bottom: 5px; width: 30%; margin-right: 10px;"
          placeholder="Search"
          v-model="searchable"
          clearable>
      </el-input>
      
      <el-popover
        placement="right"
        width="400"
        trigger="click">
        <div class="container">
          <h3>More Actions <i class="el-icon-setting"></i></h3>
          <el-card shadow="always" style="margin-top: 20px; margin-bottom: 20px;">
            <center>
              <h5>Activated List</h5>
              <p>Show all activated products</p>
              <el-button @click="onchoosegetactivated()" type="primary">Choose</el-button>
            </center>
          </el-card>
          <el-card shadow="always" style="margin-top: 20px; margin-bottom: 20px;">
            <center>
              <h5>Deactivated List</h5>
              <p>Show all Deactivated products</p>
              <el-button @click="onchoosegetdeactivated()" type="primary">Choose</el-button>
            </center>
          </el-card>
          <el-card shadow="always" style="margin-top: 20px; margin-bottom: 20px;">
            <center>
              <h5>Get All List</h5>
              <p>Show all products</p>
              <el-button @click="onchoosegetall()" type="primary">Choose</el-button>
            </center>
          </el-card>
        </div>
        <el-button slot="reference" type="danger"><i class="el-icon-setting"></i> Actions</el-button>
      </el-popover>
      <el-table
          v-loading="listLoading"
          ref="filterTable"
          :data="pagedTableData"
          style="width: 100%">
        <el-table-column  label="Product ID" prop="id" sortable="custom" align="center"  >
          <template slot-scope="{row}">
            <span>{{ row.id }}</span>
          </template>
        </el-table-column>
        <el-table-column width="120" label="Product Code" prop="id" sortable="custom" align="center"  >
          <template slot-scope="{row}">
            <span>{{ row.productCode }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Product Image" prop="id" sortable="custom" align="center"  >
          <template slot-scope="{row}">
            <img :src="row.prodimg" alt="No image"
            style="width: 50%; height: auto;" class="img-fluid"/>
          </template>
        </el-table-column>
        <el-table-column label="Product Name" sortable="custom" align="center"  >
          <template slot-scope="{row}">
            <span>{{ row.prodname }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Product Quantity" sortable="custom" align="center"  >
          <template slot-scope="{row}">
            <span>{{ row.prodquantity }}</span>
          </template>
        </el-table-column>
        <el-table-column width="350" fixed="right" label="Operations" sortable="custom" align="center"  >
          <template slot-scope="{row}">
            <div v-if="row.prodstatus == 1">
              <el-button size="small" type="danger" @click="ondeactivate(row.id)">Deactivate</el-button>&nbsp;
              <el-button size="small" type="danger" @click="onremove(row.id, row.productCode, row.prodquantity)">Remove</el-button>&nbsp;
              <el-popover
                  placement="left"
                  width="550"
                  trigger="click">
                  <div class="container">
                    <el-card shadow="always">
                      <h3>Ingredients List</h3>
                      <table class="table table-hover table-bordered">
                            <thead>
                              <tr>
                                <th scope="col">#</th>
                                <th scope="col">Product Name</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr v-for="item in listofingredients" :key="item.productCode">
                                <th scope="row">{{item.productCode}}</th>
                                <td>{{item.productName}}</td>
                              </tr>
                            </tbody>
                          </table>
                    </el-card>
                  </div>
                  <el-button @click="ongetrawmats(row.productCode)" slot="reference" size="small" type="info">View ingredients</el-button>
                </el-popover>
            </div>
            <div v-else>
              <el-button size="small" @click="onactivate(row.id)" type="success">Activate</el-button>&nbsp;
              <el-button size="small" @click="onremove(row.id, row.productCode, row.prodquantity)" type="danger">Remove</el-button>&nbsp;
              
              <el-popover
                  placement="left"
                  width="550"
                  trigger="click">
                  <div class="container">
                    <el-card shadow="always">
                      <h3>Ingredients List</h3>
                         <table class="table table-hover table-bordered">
                            <thead>
                              <tr>
                                <th scope="col">#</th>
                                <th scope="col">Product Name</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr v-for="item in listofingredients" :key="item.productCode">
                                <th scope="row">{{item.productCode}}</th>
                                <td>{{item.productName}}</td>
                              </tr>
                            </tbody>
                          </table>
                                    <!-- <el-pagination layout="prev, pager, next" :page-size="pageSizeRaw" :total="this.listofingredients.length" @current-change="setPageraw">
                                    </el-pagination> -->
                    </el-card>
                  </div>
                  <el-button @click="ongetrawmats(row.productCode)" slot="reference" size="small" type="info">View ingredients</el-button>
                </el-popover>
            </div>
          </template>
        </el-table-column>
        <el-table-column
prop="prodstatus"
            label="Status"
            width="100"
            :filters="[{text: 'Active', value: '1'},{text: 'Inactive', value: '0'}]"
            :filter-method="filterTag"
            filter-placement="bottom-end">
          <template slot-scope="scope">
            <el-tag
                :type="scope.row.prodstatus === 1 ? 'primary' : 'danger'"
                disable-transitions>
              <div v-if="scope.row.prodstatus == 1">
                Active
              </div>
              <div v-else>
                Inactive
              </div>
            </el-tag>
          </template>
        </el-table-column>
      </el-table>
     
      <el-pagination layout="prev, pager, next" :page-size="pageSize" :total="this.tableData.length" @current-change="setPage">
      </el-pagination>
    </el-card>
  </div>
</div>
</template>

<script>
import {getallfinalize, graphcheck, activate_product_finalization,
 deactivate_product_finalization, getactivatedproducts,
getdeactivatedproducts, removeproductfinalization,
getrawpercreatedproducts, getallproductfinalize, ascendquantity} from "@/store/request-common"
import {Chart} from 'highcharts-vue'
import Highcharts from "highcharts";
import exportingInit from "highcharts/modules/exporting";
import offlineExporting from "highcharts/modules/offline-exporting";
exportingInit(Highcharts)
offlineExporting(Highcharts)
export default {
  name: "product_activator_final",
  components:{
    high: Chart
  },
  data(){
    return{
       listofingredients: [],
       searchablerawmats: '',
       listLoadingraw: false,
      prodbulkaction_activation: false,
      tableData: [],
      filtergraph: true,
      searchable: '',
      pageSize: 5,
      page: 1,
      pageSizeRaw: 5,
      pageraw: 1,
      listLoading: true,
      chartOptions: {
        chart: {
          type: 'bar'
        },
        tooltip: {
          valueSuffix: ' count',
          crosshairs: true,
          shared: true
        },
        credits: {
          enabled: false
        },
        plotOptions: {
          series: {
            dataLabels: {
              enabled: true
            }
          }
        },
        series: [],
        subtitle: {
          text: 'Bar Graph'
        },
        title: {
          text: 'Activated and Deactivated Products graph'
        }
      },
    }
  },
  computed: {
    pagedTableData() {
      if(this.searchable){
        return this.tableData.filter((item)=>{
          return this.searchable.toLowerCase().split(' ').every(v => item.prodname.toLowerCase().includes(v) || item.id.toString().toLowerCase().includes(v))
        })
      }else{
        return this.tableData.slice(this.pageSize * this.page - this.pageSize, this.pageSize * this.page)
      }

    },
    // pagedtabledataforraw(){
    //   if(this.searchablerawmats){
    //     return this.listofingredients.filter((item) => {
    //       return this.searchablerawmats.toLowerCase().split(' ').every(v => item.productName.toLowerCase().includes(v))
    //     })
    //   }else{
    //     return this.listofingredients.slice(this.pageSizeRaw * this.pageraw - this.pageSizeRaw, this.pageSizeRaw * this.pageraw)
    //   }
    // }
  },
  created() {
    this.getallproductfromfinalize()
    this.trialanderrorgraph()
  },
  methods: {
    ongetrawmats(pcode){
        getrawpercreatedproducts(pcode).then(res => {
          getallproductfinalize(pcode).then(respo => {
            console.log(respo.data)
            this.listofingredients = respo.data
          })
        })
    },
    onremove(id, pcode, pquantity){
      
      this.$confirm('Are you sure you want to remove this product?', 'Warning', {
                cancelButtonText: 'No',
                confirmButtonText: 'Yes',
                type: 'warning'
                }).then(() => {
                  const loading = this.$loading({
                    lock: true,
                    text: 'please wait...',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                    });
                  setTimeout(() => {
                    removeproductfinalization(id, pcode).then(response => {
                      if(response.data.msg === "success remove"){
                        loading.close()
                        this.$notify.success({
                                title: 'Nicely done!',
                                message: 'Successfully remove.',
                                offset: 100
                                }); 
                            this.getallproductfromfinalize()
                            this.trialanderrorgraph()
                            ascendquantity(pquantity, response.data.getobj).then(res => {
                              console.log(res.data)
                            })
                      }
                    })
                  }, 2000)
                })
    },
    onchoosegetall(){
      const loading = this.$loading({
                    lock: true,
                    text: 'please wait...',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                    });
      setTimeout(()=> {
        this.getallproductfromfinalize()
    this.trialanderrorgraph()
    loading.close()
      }, 1000)
    },
    onchoosegetdeactivated(){
      const loading = this.$loading({
                    lock: true,
                    text: 'please wait...',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                    });
      setTimeout(() => {
        getdeactivatedproducts().then(resp => {
          this.tableData = resp.data
          loading.close()
          console.log(resp.data)
          this.getallproductfromfinalize()
                            this.trialanderrorgraph()
        })
      }, 1000)
      
    },
    onchoosegetactivated(){
      const loading = this.$loading({
                    lock: true,
                    text: 'please wait...',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                    });
      setTimeout(() => {
        getactivatedproducts().then(resp => {
          this.tableData = resp.data
          loading.close()
          console.log(resp.data)
          this.getallproductfromfinalize()
                            this.trialanderrorgraph()
        })
      }, 1000)
    },
    ondeactivate(id){
      this.$confirm('Are you sure you want to deactivate this product?', 'Warning', {
                cancelButtonText: 'No',
                confirmButtonText: 'Yes',
                type: 'warning'
                }).then(() => {
                  const loading = this.$loading({
                    lock: true,
                    text: 'please wait...',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                    });
                  setTimeout(() => {
                    deactivate_product_finalization(id)
                    .then(res => {
                      if(res.data === "success deactivate"){
                        loading.close()
                        this.$notify.success({
                                title: 'Nicely done!',
                                message: 'Successfully deactivated.',
                                offset: 100
                                }); 
                            this.getallproductfromfinalize()
                            this.trialanderrorgraph()     
                      }
                    })
                  }, 3000)
                })
    },
     toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
    handleSelectionChange1(val) {
        this.multipleSelection = val;
      },
    onactivate(id){
      this.$confirm('Are you sure you want to activate this product?', 'Warning', {
                cancelButtonText: 'No',
                confirmButtonText: 'Yes',
                type: 'warning'
                }).then(() => {
                  const loading = this.$loading({
                    lock: true,
                    text: 'please wait...',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                    });
                  setTimeout(() => {
                    activate_product_finalization(id)
                    .then(res => {
                      if(res.data === "success activate"){
                        loading.close()
                        this.$notify.success({
                                title: 'Nicely done!',
                                message: 'Successfully activated.',
                                offset: 100
                                }); 
                            this.getallproductfromfinalize()
                            this.trialanderrorgraph()     
                      }
                    })
                  }, 3000)
                })
    },
    onswitchgraphview(){
      this.trialanderrorgraph()
    },
    trialanderrorgraph(){
      graphcheck(this.filtergraph).then(res => {
        var vm = this;

        for(var x = 0; x < res.data.bulk.length; x++){
          var ifExist = 0;
          if(vm.chartOptions.series.length > 0)
          {
            for(var check = 0;check <= vm.chartOptions.series.length; check++) {
              if(res.data.bulk[x].prodname == vm.chartOptions.series[check].name){
                ifExist = 1;
                check = vm.chartOptions.series.length;
                vm.chartOptions.series = []
                var data1 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                for(var dataCount1 = 0; dataCount1 < res.data.bulk.length; dataCount1++){
                  if(res.data.bulk[dataCount1].prodname == res.data[x].prodname){
                    data1[res.data.bulk[dataCount1].id] = res.data.counter
                  }
                }
                vm.chartOptions.series.push({
                  name: res.data.bulk[x].prodname,
                  data: data1
                })
              }
            }
          }
          if(ifExist == 0){
            var data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            for(var dataCount = 0; dataCount < res.data.bulk.length; dataCount++){
              if(res.data.bulk[dataCount].prodname == res.data.bulk[x].prodname){
                data[dataCount] = res.data.counter
              }
            }
            console.log(data)
            vm.chartOptions.series.push({
              name: res.data.bulk[x].prodname,
              data: data
            })
          }
        }
      })
    },

    formatter(row, column) {
      return row.address;
    },
    filterTag(value, row) {
      return row.prodstatus === value;
    },
    getallproductfromfinalize(){
      getallfinalize().then(res => {
        this.tableData = res.data
        this.listLoading = false;
      })
    },
    setPage (val) {
      this.page = val
    },
    setPageraw(val){
      this.pageraw = val
    }
  }
}
</script>

<style scoped>

</style>