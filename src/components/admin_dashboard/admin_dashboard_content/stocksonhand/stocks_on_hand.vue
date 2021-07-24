<template>
    <div>
      
        <div style="margin-top: 30px;" class="container">
            

            <div v-show="criticalquantityshow">
                 <el-alert
                    style="margin-top: 20px; margin-bottom: 30px;"
                                            title="Product on critical quantity"
                                            type="error"
                                            effect="dark"
                                            :closable="false"
                                            description="There is a product with 0 quantity. please check"
                                            show-icon>
                                        </el-alert>   
                                                   
            </div>
                                    <el-card shadow="always">
                                        <div class="row">
                                            <div class="col-md-5">
                                                <h3>Stocks</h3>
                                            </div>
                                            <div class="col-md-7">
                                                
                                            </div>
                                        </div>
                                         <high :options="chartOptions" :redraw="true" ref="changerdata" style="margin-top: 30px;"></high>   
                                    </el-card>
            <el-card style="margin-top: 30px; margin-bottom: 30px;" shadow="always"> 
                 <el-alert
                    style="margin-top: 20px; margin-bottom: 30px;"
                                            title="Adding new stocks"
                                            type="info"
                                            effect="dark"
                                            :closable="false"
                                            description="If you want to add new product stock you need to navigate on invetory and stocks page.."
                                            show-icon>
                                        </el-alert>   
                <h4>List of products</h4>
                         <div class="row">
                             <div class="col-md-4">
                                 <el-input
                                    style="margin-bottom: 5px; width: 100%;"
                                    placeholder="Search"
                                    v-model="searchable"
                                    clearable>
                                    </el-input>
                                    
                             </div>
                             <div class="col-md-4">
                                 <el-checkbox @change="onsortofexpired" v-model="sortofexpired">Expired products</el-checkbox>
                                 
                             </div>
                             <div class="col-md-4">
                                 <el-button @click="onredirecttoadding()" type="success" style="float: right; margin-bottom: 10px;"><i class="el-icon-circle-plus-outline"></i> Go to stocks and inventory</el-button>
                             </div>
                         </div>
                                              <el-table
                                    :key="0"
                                    v-loading="listLoading"
                                    :data="pagedTableData"
                                    border
                                    fit
                                    highlight-current-row
                                    style="width: 100%;"
                                    
                                    >
                                    <el-table-column label="Stock Number" prop="id" sortable="custom" align="center"  >
                                        <template slot-scope="{row}">
                                        <span>{{ row.stockNumber }}</span>
                                        </template>
                                    </el-table-column>
                                    
                                    <el-table-column label="Product Image" align="center">
                                        <template slot-scope="{row}">
                                        <img :src="row.productimgurl" style="width: 100%; height: auto;" class="img-fluid" alt="No image">
                                        <!-- <el-tag>{{ row.type | typeFilter }}</el-tag> -->
                                        </template>
                                    </el-table-column>

                                    <el-table-column label="Product Name" align="center">
                                        <template slot-scope="{row}">
                                        <span class="link-type" >{{ row.productname }}</span>
                                        <!-- <el-tag>{{ row.type | typeFilter }}</el-tag> -->
                                        </template>
                                    </el-table-column>

                                     <el-table-column label="Product Quantity" align="center">
                                        <template slot-scope="{row}" >
                                        <span class="link-type" >{{ row.productquantity }}</span>
                                        <!-- <el-tag>{{ row.type | typeFilter }}</el-tag> -->
                                        </template>
                                    </el-table-column>

                                    

                                    
                                    <el-table-column label="Quantity Status" class-name="status-col" align="center">
                                        <template slot-scope="{row}">
                                          <div v-if="row.productquantity <= 0 || row.productquantity <= 20">
                                              <el-tag type="danger" size="medium" effect="dark">Critical</el-tag>
                                          </div>
                                          <div v-else-if="row.productquantity <= 50 || row.productquantity <= 30">
                                              <el-tag type="warning" size="medium" effect="dark">Warning</el-tag>
                                          </div>
                                          <div v-else>
                                              <el-tag type="success" size="medium" effect="dark">Good</el-tag>
                                          </div>
                                        </template>
                                    </el-table-column>

                                   <div v-if="product_status_indicator == '1'">
                                        <el-table-column label="Product Status" class-name="status-col" >
                                        <template >
                                            <div v-if="product_status_indicator == '1'">
                                                <el-tag type="danger" size="medium" effect="dark">Expired</el-tag>
                                            </div>
                                            <div v-else>

                                            </div>
                                          
                                        </template>
                                    </el-table-column>
                                   </div>
                                   <div v-else>

                                   </div>
                                       
                                    

                                    <el-table-column label="More actions"  align="center">
                                        <template slot-scope="{row}">
                                             <div v-if="row.productquantity <= 0 || row.productquantity <= 20 || row.productquantity <= 50 || row.productquantity <= 30">
                                              
                                              
                                                <div class="row">
                                                    <div class="col-md-6">
                                                        <el-popover
                                                placement="left"
                                                width="400"
                                                trigger="click">
                                                <el-card shadow="hover">
                                                    <div v-show="picker">
                                                        <center>
                                                        <h4>Choose loadout</h4>
                                                         <el-select @change="pickloadout" style="width: 100%; margin-bottom: 10px;" v-model="stocksquantityupdaterTask.value" placeholder="Select quantity">
                                                            <el-option
                                                            v-for="item in options"
                                                            :key="item.value"
                                                            :label="item.label"
                                                            :value="item.value">
                                                            </el-option>
                                                        </el-select>
                                                    </center>
                                                    <el-button @click="onsaveselection(row.stockID)" type="primary" style="float: right; margin-bottom: 10px;">Save</el-button>
                                                    </div>
                                                    <div v-show="picker1">
                                                        <center>
                                                        <h4>Choose loadout</h4>
                                                         <el-input
                                                         style="width: 100%; margin-bottom: 10px;"
                                                        placeholder="Please input quantity"
                                                        v-model="stocksquantityupdaterTask.custominput"
                                                        clearable>
                                                        </el-input>
                                                    </center>
                                                    <div style="display: inline;">
                                                        <el-button @click="onsavecustom(row.stockID)" type="primary" style="float: right; margin-bottom: 10px;">Save</el-button>
                                                        <el-button type="warning" style="float: right; margin-bottom: 10px; margin-right: 10px;" @click="oncancel()">Cancel</el-button>
                                                    </div>
                                                    </div>
                                                </el-card>
                                                <el-button slot="reference" type="warning" size="medium" plain>Refill</el-button>
                                                
                                                </el-popover>
                                                    </div>
                                                    <div class="col-md-6">
                                                        <el-button @click="onremovestock(row.stockID)" type="danger" size="medium" plain>Remove</el-button>
                                                    </div>
                                                </div>
                                          </div>
                                          <div v-else-if="row.productquantity >= 50">
                                              <div class="row">
                                                  <div class="col-md-6">
                                                      <el-popover
                                                placement="left"
                                                width="400"
                                                trigger="click">
                                                <el-card shadow="hover">
                                                    <div v-show="picker">
                                                        <center>
                                                        <h4>Choose loadout</h4>
                                                         <el-select @change="pickloadout" style="width: 100%; margin-bottom: 10px;" v-model="stocksquantityupdaterTask.value" placeholder="Select quantity">
                                                            <el-option
                                                            v-for="item in options"
                                                            :key="item.value"
                                                            :label="item.label"
                                                            :value="item.value">
                                                            </el-option>
                                                        </el-select>
                                                    </center>
                                                    <el-button @click="onsaveselection(row.stockID)" type="primary" style="float: right; margin-bottom: 10px;">Save</el-button>
                                                    </div>
                                                    <div v-show="picker1">
                                                        <center>
                                                        <h4>Choose loadout</h4>
                                                         <el-input
                                                         style="width: 100%; margin-bottom: 10px;"
                                                        placeholder="Please input quantity"
                                                        v-model="stocksquantityupdaterTask.custominput"
                                                        clearable>
                                                        </el-input>
                                                    </center>
                                                    <div style="display: inline;">
                                                        <el-button @click="onsavecustom(row.stockID)" type="primary" style="float: right; margin-bottom: 10px;">Save</el-button>
                                                        <el-button type="warning" style="float: right; margin-bottom: 10px; margin-right: 10px;" @click="oncancel()">Cancel</el-button>
                                                    </div>
                                                    </div>
                                                </el-card>
                                                 <el-button slot="reference" type="success" size="small" plain>Add more</el-button>
                                                </el-popover>
                                                  </div>
                                                  <div class="col-md-6">
                                                       <el-button @click="onremovestock(row.stockID)" type="danger" size="small" plain>Remove</el-button>
                                                  </div>
                                              </div>
                                              
                                             
                                          </div>
                                        </template>
                                    </el-table-column>

                                    </el-table>
                                     <el-pagination layout="prev, pager, next" :page-size="pageSize" :total="this.productArray.length" @current-change="setPage">
                                    </el-pagination>
                                    <!-- el dialog if custom -->
                                        <el-dialog
                                            title="Custom input quantity"
                                            :visible.sync="dialogVisible"
                                            width="30%"
                                            >
                                            <span>This is a message</span>
                                            <span slot="footer" class="dialog-footer">
                                                <el-button @click="dialogVisible = false">Cancel</el-button>
                                                <el-button type="primary" @click="dialogVisible = false">Confirm</el-button>
                                            </span>
                                            </el-dialog>
                                    <!-- el dialog end if custom -->
                                    
            </el-card>
        </div>
    </div>
</template>

<script>
import {STOCK_EMPTY_NOTIF, getallstocks, pushrefillbyviaselect, pushrefillbyviacustom, removezerostock, sorting_expired_product_stocks} from "@/store/request-common"
import {Chart} from 'highcharts-vue'
import Highcharts from "highcharts";
import exportingInit from "highcharts/modules/exporting";
import offlineExporting from "highcharts/modules/offline-exporting";
exportingInit(Highcharts)
offlineExporting(Highcharts)
export default {
   components: {
    high: Chart ,
  },
    data(){
        return{
            sortofexpired: false,
            loading: true,
         chartOptions: {
             chart: {
                    type: 'spline'
                },
                tooltip: {
                    valueSuffix: ' quantities',
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
                    text: 'Line Graph'
                },
                title: {
                    text: 'Stocks Overall Quantities'
                }
            },
            criticalquantityshow: false,
            dialogVisible: false,
             pageSize: 5,
              page: 1,
              listLoading: true,
               searchable: '',
                productArray: [],
                 options: [{
          value: '100',
          label: '100'
        }, {
          value: '200',
          label: '200'
        }, {
          value: '300',
          label: '300'
        }, {
          value: '400',
          label: '400'
        },{
          value: '500',
          label: '500'
        }, {
          value: 'Custom',
          label: 'Custom'
        }],
        stocksquantityupdaterTask: {
            value: '',
            custominput: ''
        },
        picker: true,
        picker1: false,
        product_status_indicator: ""
        }
    },
    created(){
        this.getnotifforcritical()
         this.allstocks()
      
    },
    computed: {
          pagedTableData() {
       if(this.searchable){
      return this.productArray.filter((item)=>{
        return this.searchable.toLowerCase().split(' ').every(v => item.productname.toLowerCase().includes(v) || item.stockNumber.toString().toLowerCase().includes(v))
      })
      }else{
        return this.productArray.slice(this.pageSize * this.page - this.pageSize, this.pageSize * this.page)
      }
       
     }
    },
    methods: {
        onsortofexpired(){
            const loading = this.$loading({
                    lock: true,
                    text: 'please wait..',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                    });
                    setTimeout(() => {
                        sorting_expired_product_stocks(this.sortofexpired)
                            .then(res => {
                                if(res.data === "not exist expiry"){
                                    this.productArray=[]
                                    this.listLoading = false
                                loading.close()
                                }else{
                                    console.log(res.data)
                                this.product_status_indicator = res.data.msg
                                console.log("test" + this.product_status_indicator)
                                this.productArray = res.data.bulk
                                this.listLoading = false
                                loading.close()
                                }
                                
                            })
                    }, 1000)
            
        },
        onredirecttoadding(){
             const loading = this.$loading({
                    lock: true,
                    text: 'Redirecting to stocks and inventory, please wait..',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                    });
       setTimeout(() => {
           loading.close()
            this.$router.push({name: 'Product Inventory Add'}).catch(() => {})
       }, 2000)
        },
          onremovestock(id){
              this.$confirm('Are you sure you want to remove this product?', 'Warning', {
                cancelButtonText: 'No',
                confirmButtonText: 'Yes',
                type: 'warning'
                })
                .then(() => {
                    const loading = this.$loading({
                    lock: true,
                    text: 'please wait...',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                    });
                    setTimeout(() => {
                        removezerostock(id).then(resp => {
                            if(resp.data === "success remove"){
                                this.stocksquantityupdaterTask.value = "";
                            this.stocksquantityupdaterTask.custominput = "";
                            loading.close()
                            this.$notify.success({
                                title: 'Nicely done!',
                                message: 'Successfully remove.',
                                offset: 100
                                });   
                                this.allstocks()
                            }
                        })
                    }, 1000)
                })
          },
        onsavecustom(id){
             if(!this.stocksquantityupdaterTask.custominput){
                 this.$notify.error({
                                title: 'Oops',
                                message: 'Empty, please input quantity.',
                                offset: 100
                                });   
                                return false;
            }else{
                this.$confirm('Are you sure you want to refill this product?', 'Warning', {
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
                    pushrefillbyviacustom(this.stocksquantityupdaterTask, id)
                    .then((resolve) => {
                        if(resolve.data === "success refill"){
                            this.stocksquantityupdaterTask.value = "";
                            this.stocksquantityupdaterTask.custominput = "";
                            loading.close()
                            this.$notify.success({
                                title: 'Nicely done!',
                                message: 'Successfully refill quantity.',
                                offset: 100
                                });   
                                this.allstocks()
                        }
                    })
                    }, 1000)
                    
                })
            }
        },
        onsaveselection(id){
            if(!this.stocksquantityupdaterTask.value){
                 this.$notify.error({
                                title: 'Oops',
                                message: 'Empty, please choose quantity loadout.',
                                offset: 100
                                });   
                                return false;
            }else{
                this.$confirm('Are you sure you want to refill this product?', 'Warning', {
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
                    pushrefillbyviaselect(this.stocksquantityupdaterTask, id)
                    .then((resolve) => {
                        if(resolve.data === "success refill"){
                            this.stocksquantityupdaterTask.value = "";
                            this.stocksquantityupdaterTask.custominput = "";
                            loading.close()
                            this.$notify.success({
                                title: 'Nicely done!',
                                message: 'Successfully refill quantity.',
                                offset: 100
                                });   
                                this.allstocks()
                        }
                    })
                    }, 1000)
                    
                })
            }
        },
        oncancel(){
            this.picker = true;
            this.picker1 = false;
            this.stocksquantityupdaterTask.value = "";
        },
        pickloadout(){
            if(this.stocksquantityupdaterTask.value === "Custom"){
               this.picker = false
               this.picker1 = true
            }
        },
        getnotifforcritical(){
            STOCK_EMPTY_NOTIF().then((res) => {
                if(res.data === "empty quantity"){
                    this.criticalquantityshow = true
                }else{
                    this.criticalquantityshow = false
                }
            })
        },
        allstocks(){
            getallstocks().then(res => {
                
                var vm = this;
                
                for(var x = 0; x < res.data.length; x++){
                    var ifExist = 0;
                    if(vm.chartOptions.series.length > 0)
                    {
                        for(var check = 0;check < vm.chartOptions.series.length; check++) {
                            if(res.data[x].productname == vm.chartOptions.series[check].name){
                                ifExist = 1;
                                check = vm.chartOptions.series.length;
                                vm.chartOptions.series = []
                                 var data1 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                                    for(var dataCount1 = 0; dataCount1 < res.data.length; dataCount1++){
                                        if(res.data[dataCount1].productname == res.data[x].productname){
                                            data1[res.data[dataCount1].stockID] = res.data[dataCount1].productquantity
                                        }
                                    }
                                vm.chartOptions.series.push({
                                    name: res.data[x].productname,
                                    data: data1
                                })
                            }
                        }
                    }
                    if(ifExist == 0){
                        var data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                        for(var dataCount = 0; dataCount < res.data.length; dataCount++){
                            if(res.data[dataCount].productname == res.data[x].productname){
                                data[dataCount] = res.data[dataCount].productquantity
                            }
                        }
                        console.log(data)
                        vm.chartOptions.series.push({
                            name: res.data[x].productname,
                            data: data
                        })
                    }
                }
                this.productArray = res.data
                this.listLoading = false;
                this.getnotifforcritical()
            })
        },
        setPage(val){
            this.page = val
        }
    }
}
</script>