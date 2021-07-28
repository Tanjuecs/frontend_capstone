<template>
    <div>
        <div style="margin-top: 50px;" class="container">
            <el-card shadow="always">
                <h3>Your Return Orders</h3>
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
                                    :header-cell-style="{ background: '#9C2B12', color: 'white' }"
                                    >
                                    <el-table-column label="Issue 1" prop="id" sortable="custom" align="center"  >
                                        <template style="background: red;" slot-scope="{row}">
                                        
                                        <div v-if="row.problem1 == 'undefined'">

                                        </div>
                                        <div v-else>
                                            <span>{{ row.problem1 }}</span>
                                        </div>
                                        </template>
                                    </el-table-column>
                                    
                                    

                                    <el-table-column label="Issue 2" >
                                        <template slot-scope="{row}">
                                        <div v-if="row.problem2 == 'undefined'">

                                        </div>
                                        <div v-else>
                                            <span class="link-type" >{{ row.problem2 }}</span>
                                        </div>
                                        <!-- <el-tag>{{ row.type | typeFilter }}</el-tag> -->
                                        </template>
                                    </el-table-column>

                                     <el-table-column label="Issue 3" >
                                        <template slot-scope="{row}">
                                        
                                         <div v-if="row.problem3 == 'undefined'">

                                        </div>
                                        <div v-else>
                                            <span class="link-type" >{{ row.problem3 }}</span>
                                        </div>
                                        <!-- <el-tag>{{ row.type | typeFilter }}</el-tag> -->
                                        </template>
                                    </el-table-column>

                                    
                                        <el-table-column label="Issue 4" >
                                        <template slot-scope="{row}">
                                        
                                        <div v-if="row.problem4 == 'undefined'">

                                        </div>
                                        <div v-else>
                                            <span class="link-type" >{{ row.problem4 }}</span>
                                        </div>
                                        <!-- <el-tag>{{ row.type | typeFilter }}</el-tag> -->
                                        </template>
                                    </el-table-column>

                                    <el-table-column label="Remarks" >
                                        <template slot-scope="{row}">
                                        
                                        <el-popover
                                            placement="left"
                                            width="400"
                                            trigger="click">
                                            <el-card shadow="always">
                                                <h3>Remarks</h3>
                                                <p>{{ row.remarks }}</p>
                                            </el-card>
                                            <el-button slot="reference">More Details</el-button>
                                            </el-popover>
                                        <!-- <el-tag>{{ row.type | typeFilter }}</el-tag> -->
                                        </template>
                                    </el-table-column>


                                    
                                    <el-table-column label="Created"  align="center">
                                        <template slot-scope="{row}">
                                        <span>{{ row.createdAt | moment("calendar") }}</span>
                                        </template>
                                    </el-table-column>

                                    <el-table-column label="More Actions" width="300"  align="center">
                                        <template slot-scope="{row}">
                                        <el-button type="danger" @click="onremovereturn(row.id)" size="small" rounded plain>Remove</el-button>&nbsp;
                                        <el-button type="info" @click="onmoredetails(row.ponumber)" size="small" rounded plain> More Details</el-button>
                                        </template>
                                    </el-table-column>
                                    </el-table>
                                    <!-- EL Dialog -->
                                            <el-dialog
                                        title="Returned Products"
                                        :visible.sync="dialogVisible"
                                        width="50%"
                                        :before-close="handleClose">
                                        <el-alert
                                        style="margin-top: 20px;"
                                            title="Product Return"
                                            type="error"
                                            description="Here you can view the product you return"
                                            :closable="false"
                                            show-icon>
                                        </el-alert>

                                        <div style="margin-top: 20px; margin-bottom: 20px;" class="container">
                                            <table class="table table-hover table-bordered">
                                                <thead>
                                                    <tr>
                                                    <th scope="col"># PO Number</th>
                                                    <th scope="col">Product Name</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr v-for="items in moredetailsArray" :key="items.poid">
                                                    <th scope="row">{{items.ponumber}}</th>
                                                    <td>{{items.pname}}</td>
                                                    </tr>
                                                </tbody>
                                                </table>
                                        </div>
                                        <span slot="footer" class="dialog-footer">
                                            <el-button @click="dialogVisible = false">Cancel</el-button>
                                        </span>
                                        </el-dialog>
                                    <!-- Closed EL Dialog -->
                                    <el-pagination layout="prev, pager, next" :page-size="pageSize" :total="this.returnOrdersArray.length" @current-change="setPage">
                                    </el-pagination>
            </el-card>
        </div>
    </div>
</template>


<script>
import {mapGetters} from 'vuex'
export default {
    data() {
        return {
            pageSize: 5,
              page: 1,
              listLoading: true,
              returnOrdersArray: [],
              searchable: '',
              moredetailsArray: [],
              dialogVisible: false,
        }
    },
    computed: {
         pagedTableData() {
       if(this.searchable){
      return this.returnOrdersArray.filter((item)=>{
        return this.searchable.toLowerCase().split(' ').every(v => item.problem1.toLowerCase().includes(v) ||
        item.problem2.toLowerCase().includes(v) ||
        item.problem3.toLowerCase().includes(v) ||
        item.problem4.toLowerCase().includes(v) || item.id.toString().toLowerCase().includes(v))
      })
      }else{
        return this.returnOrdersArray.slice(this.pageSize * this.page - this.pageSize, this.pageSize * this.page)
      }
       
     },
    ...mapGetters({
        get_returns_orders: 'get_returns_orders',
        get_returns_orders_remove: 'get_returns_orders_remove',
        get_returns_orders_more_details: 'get_returns_orders_more_details'
    })
    },
    created(){
        this.getallreturnsorder()
    },
    methods:{
        onmoredetails(ponumber){
           this.dialogVisible = true
             this.$store.dispatch(`ACTIONS_GET_RETURNS_ORDER_MORE_DETAILS`,
            {
                ponumber
            }).then(() => {
                this.moredetailsArray = this.get_returns_orders_more_details
            })
        },
        onremovereturn(id){
            this.$confirm('This will permanently delete the data. Continue?', 'Warning', {
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel',
            type: 'warning'
            }).then(() => {
                const loading = this.$loading({
                lock: true,
                text: 'Loading',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
                });
                setTimeout(() => {
                    this.$store.dispatch(`ACTIONS_REMOVE_RETURNS_ORDER`, {
                        id
                    }).then(() => {
                        if(this.get_returns_orders_remove === "success") {
                            this.$notify.success({
                            title: 'Remove Returns Order',
                            dangerouslyUseHTMLString: true,
                            message: `
                            <strong>Successfully Removed</strong>
                            `
                            });
                            loading.close()
                            this.getallreturnsorder()
                        }
                    })
                }, 2000)
            })
        },
        onviewarchive(){
            alert("test")
        },
        setPage(val){
            this.page = val
        },
        getallreturnsorder(){
            this.$store.dispatch(`ACTIONS_GET_RETURNS_ORDER`).then(() => {
                this.returnOrdersArray = this.get_returns_orders
                this.listLoading = false
            })
        }
    }
}
</script>