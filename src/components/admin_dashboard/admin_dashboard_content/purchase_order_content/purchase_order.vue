<template>
    <div>
        <div class="container-fluid">
            
            <el-card shadow="always" style="margin-bottom: 30px;">
                <div class="row">
                    <div class="col-md-5">
                        <h5>Your purchase order</h5>
                    </div>
                    <div class="col-md-7">
                        <el-button style="float: right; margin-bottom: 30px;" type="success" @click="onaddnewpuchase()">Add new purchase order</el-button>
                    </div>
                </div>
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
                                    <el-table-column label="Product Code" prop="id" sortable="custom" align="center"  >
                                        <template slot-scope="{row}">
                                        <span>{{ row.productCode }}</span>
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

                                    <el-table-column label="Product Price" >
                                        <template slot-scope="{row}">
                                        <span class="link-type" >&#8369;{{ row.product_price }}</span>
                                        <!-- <el-tag>{{ row.type | typeFilter }}</el-tag> -->
                                        </template>
                                    </el-table-column>

                                     <el-table-column label="Product Total" >
                                        <template slot-scope="{row}">
                                            
                                        <span class="link-type" >&#8369;{{ row.product_price * row.product_quantity }}</span>
                                        <!-- <el-tag>{{ row.type | typeFilter }}</el-tag> -->
                                        </template>
                                    </el-table-column>

                                    
                                    <el-table-column label="Status" class-name="status-col" >
                                        <template slot-scope="{row}">
                                        <div v-if="row.product_status == 1">
                                            <el-tag type="success">
                                            Active
                                        </el-tag>
                                        </div>
                                        <div v-else>
                                                <el-tag type="warning">
                                            Inactive
                                        </el-tag>
                                        </div>
                                        </template>
                                    </el-table-column>

                                    
                                    <el-table-column label="Created"  align="center">
                                        <template slot-scope="{row}">
                                        <span>{{ row.createdAt | moment("calendar") }}</span>
                                        </template>
                                    </el-table-column>

                                    <el-table-column label="More actions"  align="center">
                                        <template slot-scope="{row}">
                                        <div v-if="row.product_status == 1">
                                            <el-button type="danger" style="width: 100%;">Deactivate</el-button>
                                        </div>
                                        <div v-else>
                                            <el-button type="success" style="width: 100%;" @click="onactivate(row.productID)">Activate</el-button>
                                        </div>
                                        </template>
                                    </el-table-column>

                                    </el-table>
                                    <el-pagination layout="prev, pager, next" :page-size="pageSize" :total="this.tableData.length" @current-change="setPage">
                                    </el-pagination>
                            <el-dialog
                            title="Add purchase order"
                            :visible.sync="dialogVisible"
                            width="70%"
                            :before-close="handleClose">
                            <div class="row">
                                <div class="col-sm">
                                    <el-alert
                                        title="Here you can add your purchase order"
                                        type="success" :closable="false">
                                    </el-alert>
                                </div>
                                <div class="col-sm">

                                </div>
                                <div class="container" style="padding: 25px;">
                                    <el-card style="margin-top: 20px;">
                                        <h4>Create your purchase order</h4>
                                        <div class="row" style="margin-top: 20px;">
                                            <div class="col-sm">
                                                <label>Enter product name</label>
                                                <el-input
                                                placeholder="Please input product name"
                                                v-model="input"
                                                clearable>
                                                </el-input> 
                                            </div>
                                            <div class="col-sm">
                                                <label>Enter product quantity</label>
                                                <el-input
                                                placeholder="Please input product name"
                                                v-model="input"
                                                clearable>
                                                </el-input> 
                                            </div>
                                        </div>
                                    </el-card>
                                </div>
                            </div>

                            <span slot="footer" class="dialog-footer">
                                <el-button @click="dialogVisible = false">Cancel</el-button>
                                <el-button type="primary" @click="dialogVisible = false">Confirm</el-button>
                            </span>
                            </el-dialog>
            </el-card>
        </div>
    </div>
</template>

<script>
import {purchasesorder, listofpurchase} from "@/store/request-common"
  export default {
    data() {
      return {
        tableData: [],
        dialogVisible:false,
              searchable: '',
              pageSize: 5,
              page: 1,
              listLoading: true,
        purchaseTask: {
            ponumber: '',
            productname: '',
            productQuantity: '',
            productprice: '',
            productsupplier: ''
        },
        options: [{
          value: 'Option1',
          label: 'Option1'
        }, {
          value: 'Option2',
          label: 'Option2'
        }, {
          value: 'Option3',
          label: 'Option3'
        }, {
          value: 'Option4',
          label: 'Option4'
        }, {
          value: 'Option5',
          label: 'Option5'
        }],
      }
    },
    computed: {
          pagedTableData() {
       if(this.searchable){
      return this.tableData.filter((item)=>{
        return this.searchable.toLowerCase().split(' ').every(v => item.productName.toLowerCase().includes(v) || item.productID.toString().toLowerCase().includes(v))
      })
      }else{
        return this.tableData.slice(this.pageSize * this.page - this.pageSize, this.pageSize * this.page)
      }
       
     }
    },
    created(){
        this.getalllist()
    },  
    methods: {
        getalllist(){
            listofpurchase().then(response => {
                this.tableData = response.data;
                this.listLoading = false
            })
        },
        setPage(val){
            this.page = val
        },
        onaddnewpuchase(){
            this.dialogVisible = true
        },
        makeid(length) {
            var result           = [];
            var characters       = '0123456789';
            var charactersLength = characters.length;
            for ( var i = 0; i < length; i++ ) {
                result.push(characters.charAt(Math.floor(Math.random() *
            charactersLength)));
            }
            return this.purchaseTask.ponumber = result.join('');
            }
    }
  }
</script>