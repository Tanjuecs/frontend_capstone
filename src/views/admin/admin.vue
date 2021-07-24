<template>
    <div>
        <navadmin />
        <sidenavadmin />
        <!-- el dialog for list expired prod -->
                                                    <el-dialog
                                title="Expired products notification"
                                :visible.sync="dialogVisible"
                                width="40%"
                                :before-close="handleClose">
                                <div style="margin-top: 20px;" class="container">
                                     <el-alert
                                        style="margin-top: 20px; margin-bottom: 30px;"
                                            title="Product expired"
                                            type="error"
                                            effect="dark"
                                            :closable="false"
                                            description="Please check in the list all of your products that expired."
                                            show-icon>
                                        </el-alert>
                                    <el-card shadow="always" style="margin-top: 20px;">
                                        <el-tabs type="card">
                                        <el-tab-pane label="Warning to expired">
                                            
                                        </el-tab-pane>
                                        <el-tab-pane label="Expired">
                                              <el-input
                                    style="margin-bottom: 5px; width: 30%;"
                                    placeholder="Search"
                                    v-model="searchable"
                                    clearable>
                                    </el-input>
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
                                        <span>{{ row.productCode }}</span>
                                        </template>
                                    </el-table-column>
                                    
                                    <el-table-column label="Product Image" >
                                        <template slot-scope="{row}">
                                        <img :src="row.productimgurl" style="width: 100%; height: auto;" class="img-fluid" alt="No image">
                                        <!-- <el-tag>{{ row.type | typeFilter }}</el-tag> -->
                                        </template>
                                    </el-table-column>

                                    <el-table-column label="Product Name" >
                                        <template slot-scope="{row}">
                                        <span class="link-type" >{{ row.productName }}</span>
                                        <!-- <el-tag>{{ row.type | typeFilter }}</el-tag> -->
                                        </template>
                                    </el-table-column>

                                     <el-table-column label="Product Quantity" >
                                        <template slot-scope="{row}">
                                        <span class="link-type" >{{ row.product_quantity }}</span>
                                        <!-- <el-tag>{{ row.type | typeFilter }}</el-tag> -->
                                        </template>
                                    </el-table-column>

                                    

                                    
                                    <el-table-column label="Status" class-name="status-col" >
                                        <template >
                                          <el-tag type="danger" effect="dark">
                                            Expired
                                        </el-tag>
                                        </template>
                                    </el-table-column>

                                    <!-- <el-table-column label="More actions"  align="center">
                                        <template slot-scope="{row}">
                                        
                                        </template>
                                    </el-table-column> -->

                                    </el-table>
                                     <el-pagination layout="prev, pager, next" :page-size="pageSize" :total="this.productArray.length" @current-change="setPage">
                                    </el-pagination>
                                        </el-tab-pane>
                                    </el-tabs>
                                    </el-card>
                                </div>
                                <span slot="footer" class="dialog-footer">
                                    <el-button @click="dialogVisible = false">Close</el-button>
                                </span>
                                </el-dialog>
                                <!-- end el dialog -->
                                <!-- el drawer view 0 quantity product -->
                                        <el-drawer
                                    title="I am the title"
                                    
                                    :visible.sync="quantityviewerdrawer"
                                    :with-header="false" :before-close="handleClose">
                                    <div class="container" style="padding: 25px; margin-top: 30px;">
                                        <el-card shadow="always">
                                            
                                            <div class="row">
                                                <div class="col-md-5">
                                                    <h3>Stock on hand alert</h3> 
                                                </div>
                                                <div class="col-md-7">
                                                    <el-link @click="oncheckstocks()" style="float: right; margin-bottom: 10px;" type="primary">Check stocks</el-link>
                                                </div>
                                            </div>
                                            <el-alert
                                        style="margin-top: 20px; margin-bottom: 30px;"
                                            title="Product on critical quantity"
                                            type="error"
                                            effect="dark"
                                            :closable="false"
                                            description="There is a product with 0 quantity. please check"
                                            show-icon>
                                        </el-alert>
                                        
                                            <el-timeline>
                                                <el-timeline-item v-for="item in zeroquantity" :key="item.stockID" :timestamp="item.createdAt | moment('calendar')" placement="top">
                                                <el-card shadow="hover">
                                                    <span style="margin-bottom: 10px;">Product Code : <el-tag type="primary" effect="dark" size="mini">{{item.stockNumber}}</el-tag></span>
                                                    <h4 style="margin-bottom: 10px;">Product Name : {{item.productname}}</h4>
                                                    <p style="margin-bottom: 10px;">Product Quantity : <el-tag type="danger" effect="dark" size="mini">Zero</el-tag></p>
                                                    <p style="margin-bottom: 10px;">Status : <el-tag type="danger" effect="dark" size="mini">Critical</el-tag></p>
                                                    
                                                </el-card>
                                                </el-timeline-item>
                                            </el-timeline>
                                        </el-card>
                                    </div>
                                    </el-drawer>
                                <!-- end el drawer view 0 quantity product -->
    </div>
</template>

<script>
//import side nav, nav, footer of dashboard
import navadmin from "@/components/admin_dashboard/admin_nav"
import sidenavadmin from "@/components/admin_dashboard/admin_side"
import {scanSession, productexpiredafter10days, productexpired, STOCK_EMPTY_NOTIF, getzero} from "@/store/request-common";
export default {
    components: {
        navadmin, sidenavadmin
    },
    data(){
        return {
            quantityviewerdrawer: false,
            dialogVisible: false,
              pageSize: 5,
              page: 1,
              listLoading: true,
               searchable: '',
                productArray: [],
                zeroquantity: []
        }
    },
     computed: {
          pagedTableData() {
       if(this.searchable){
      return this.productArray.filter((item)=>{
        return this.searchable.toLowerCase().split(' ').every(v => item.productName.toLowerCase().includes(v) || item.productID.toString().toLowerCase().includes(v))
      })
      }else{
        return this.productArray.slice(this.pageSize * this.page - this.pageSize, this.pageSize * this.page)
      }
       
     }
    },
    created(){
        this.checker()
        this.getafter10daysexpiration();
        this.exactdateexpired();
        setTimeout(() => {
            this.getafter10daysexpiration();
            this.exactdateexpired();
            this.checkquantity()
        }, 10000)
        this.checkquantity()
    },
    methods: {
        oncheckstocks(){
            const loading = this.$loading({
                    lock: true,
                    text: 'please wait..',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                    });
                    setTimeout(() => {
                        loading.close()
                        this.$router.push({name: 'Stocks on hand'}).catch(() => {})
                         
                    }, 2000)
        },
        takeallzeroquantity(){
            getzero().then(res => {
                this.zeroquantity = res.data
            })
        },
        handleClose(done) {
        this.$confirm('Are you sure you want to close this?')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
       checkquantity(){
           STOCK_EMPTY_NOTIF().then((resolve) => {
               if(resolve.data === "empty quantity"){
                    this.$confirm('There is an empty product on your stock would you like to check ?', 'Empty Product Quantity', {
                    cancelButtonText: 'No',
                    confirmButtonText: 'Yes',
                    type: 'error'
                    })
                    .then(() => {
                        this.quantityviewerdrawer =true;
                        this.takeallzeroquantity()
                    })
               }
           })
       },
         setPage (val) {
        this.page = val
      },
        checker(){
      scanSession().then((response) => {
       if(response.data === "homepage"){
            this.$router.push({name: 'Index'}).catch(() => {})
        }
      })
        },
        exactdateexpired(){
            productexpired().then(response => {
                console.log(response.data)
                if(response.data == "not exist expiry"){
                     this.dialogVisible = false;
                     this.listLoading = false;
                     this.productArray = response.data
                }
                else if(response.data[0] == null || response.data[0] == ''){
                    this.dialogVisible = false;
                    this.listLoading = false;
                    this.productArray = response.data
                }else{
                    this.dialogVisible = true;
                    this.listLoading = false;
                    this.productArray = response.data
                }
            })
        },
        getafter10daysexpiration(){
            productexpiredafter10days().then(response => {
                
                // if(response.data.respObj == null || response.data == null || response.data.respObj == ''){
                //     this.dialogVisible = false;
                //     console.log(this.after10days)
                //     console.log(response.data);
                // }else{  
                //     this.dialogVisible = true;
                //     this.after10days = response.data.respObj;
                // console.log(this.after10days)
                // console.log(response.data);
                // }
            })
        },
    }
}
</script>