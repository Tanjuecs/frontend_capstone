<template>
    <div>
        <div class="container">
            <el-card shadow="always" style="margin-top: 30px;">
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
                                    <el-table-column label="PO Number" prop="id" sortable="custom" align="center"  >
                                        <template slot-scope="{row}">
                                        <span>{{ row.ponumber }}</span>
                                        </template>
                                    </el-table-column>
                                    
                                    <el-table-column label="Product Name" >
                                        <template slot-scope="{row}">
                                        <span class="link-type" >{{ row.pname }}</span>
                                        <!-- <el-tag>{{ row.type | typeFilter }}</el-tag> -->
                                        </template>
                                    </el-table-column>

                                     <el-table-column label="Product Quantity" >
                                        <template slot-scope="{row}">
                                        <span class="link-type" >{{ row.pquantity }}</span>
                                        <!-- <el-tag>{{ row.type | typeFilter }}</el-tag> -->
                                        </template>
                                    </el-table-column>

                                    <el-table-column label="Product Price" >
                                        <template slot-scope="{row}">
                                        <span class="link-type" >&#8369;{{ row.pprice }}</span>
                                        <!-- <el-tag>{{ row.type | typeFilter }}</el-tag> -->
                                        </template>
                                    </el-table-column>

                                     <el-table-column label="Product Total" >
                                        <template slot-scope="{row}">
                                            
                                        <span class="link-type" >&#8369;{{ row.pprice * row.pquantity }}</span>
                                        <!-- <el-tag>{{ row.type | typeFilter }}</el-tag> -->
                                        </template>
                                    </el-table-column>

                                    <el-table-column label="Created"  align="center">
                                        <template slot-scope="{row}">
                                        <span>{{ row.createdAt | moment("calendar") }}</span>
                                        </template>
                                    </el-table-column>

                                    <el-table-column label="More actions"  align="center">
                                        <template slot-scope="{row}">
                                        <el-button style="margin-bottom: 5px; width: 100%;" type="success" plain @click="onreceive(
                                            row.ponumber, row.pname, row.pquantity, row.pprice, row.psupplier, row.poid
                                        )">
                                            Received Order
                                        </el-button>
                                        <el-button @click="onreturnorder(row.psupplier, row.poid, row.pname, row.ponumber)" style="width: 100%; margin-left: -5px;" type="danger" plain>
                                            Return Order
                                        </el-button>
                                       
                                        <el-button type="danger"  style="margin-top: 5px; width: 100%; margin-left: -5px;" @click="onremove(row.ponumber)">Remove</el-button>
                                 
                                        
                                        </template>
                                    </el-table-column>

                                    </el-table>
                                    <el-pagination layout="prev, pager, next" :page-size="pageSize" :total="this.productArray.length" @current-change="setPage">
                                    </el-pagination>


                            <!-- el drawer for return orders -->
                            <el-drawer
                                title="I am the title"
                                :visible.sync="returndrawer"
                                :with-header="false">
                                <div style="margin-top: 40px; padding: 25px;" class="container">
                                    <h2>System Product Return Survey</h2>
                                     <el-alert
                                        style="margin-top: 20px; margin-bottom: 30px;"
                                            title="Product Return"
                                            type="warning"
                                            effect="dark"
                                            :closable="false"
                                            description="Fill this survey and send it to the supplier.."
                                            show-icon>
                                        </el-alert>
                                         <el-card shadow="always" style="margin-bottom: 20px;">
                                             <h6>Select type of problem</h6>
                                             <el-select v-model="productReportTask.value1" style="width: 100%;" multiple placeholder="Select type of problem">
                                                    <el-option
                                                    v-for="item in options"
                                                    :key="item.value"
                                                    :label="item.label"
                                                    :value="item.value">
                                                    </el-option>
                                                </el-select>
                                                <h6 style="margin-top: 20px;">Remarks</h6>
                                                <el-input
                                                    type="textarea"
                                                    style="width: 100%;"
                                                    :autosize="{ minRows: 2, maxRows: 4}"
                                                    placeholder="Please input remarks"
                                                    v-model="productReportTask.remarks">
                                                    </el-input>
                                         </el-card>
                                          <el-card shadow="always" style="margin-bottom: 20px;">
                                              <h2>Product Supplier</h2>
                                                <el-alert
                                        style="margin-top: 20px; margin-bottom: 30px;"
                                            title="Product Supplier"
                                            type="info"
                                            effect="dark"
                                            :closable="false"
                                            description="This is the supplier who is responsible for this product"
                                            show-icon>
                                        </el-alert>
                                         <center>
                                             <el-avatar shape="square" :src="imgsupplier" :size="100" fit="fill" style="margin-bottom: 3px; margin-top: 10px;"></el-avatar>
                                             <h4>{{productReportTask.supplier}}</h4>
                                         </center>
                                          </el-card>
                                          <el-button type="primary" style="float: right; margin-top: 10px; margin-bottom: 10px;" @click="onsendreport()">Send report to supplier</el-button>
                                </div>
                                </el-drawer>
<!-- end el drawer for return orders -->
                                    <el-drawer
                                    title="I am the title"
                                    :visible.sync="drawer"
                                    :with-header="false">
                                    
                                    <div style="margin-top: 30px; padding: 25px;" class="container">
                                        <h2>System Receiving</h2>
                                        <el-alert
                                        style="margin-top: 20px; margin-bottom: 30px;"
                                            title="Product Assurance"
                                            type="warning"
                                            effect="dark"
                                            :closable="false"
                                            description="This will be the final step before this product enters the product inventory. make sure you double check the product you've handled."
                                            show-icon>
                                        </el-alert>

                                        <el-card shadow="always" style="margin-bottom: 20px;">
                                            <h5>Please select expiration date for this product.</h5>
                                            <el-date-picker
                                            style=" width: 100%; margin-bottom: 5px;"
                                            v-model="expiration.expirydate"
                                            format="yyyy/MM/dd hh:mm:ss A"
                                            value-format="yyyy/MM/dd hh:mm:ss A"
                                            type="datetime"
                                            placeholder="Select date and time">
                                            </el-date-picker>
                                        </el-card>

                                        <el-card shadow="always">
                                            <h4>The product you will received</h4>
                                            <div class="row" style="margin-top: 30px;">
                                                <div class="col-md-6">
                                                    <h5>Generated Product Code : {{syncinventoryTask.pcode}}</h5>
                                                </div>
                                                <div class="col-md-6">
                                                    <h5>Product Name : {{syncinventoryTask.pname}}</h5>
                                                </div>
                                            </div>
                                            <div class="row" style="margin-top: 30px;">
                                                <div class="col-md-6">
                                                    <h5>Product Supplier : {{syncinventoryTask.psupplier}}</h5>
                                                </div>
                                                <div class="col-md-6">
                                                    <h5>Product pricing : &#8369;{{syncinventoryTask.pprice}}</h5>
                                                </div>
                                            </div>
                                            <div class="row" style="margin-top: 30px;">
                                                <div class="col-md-6">
                                                    <h5>Product quantity : {{syncinventoryTask.pquantity}}</h5>
                                                </div>
                                                <div class="col-md-6">
                                                   
                                                </div>
                                            </div>
                                        </el-card>
                                        <el-button type="primary" style="float: right; margin-top: 20px;" @click="onsave()">Save</el-button>
                                    </div>

                                    </el-drawer>
            </el-card>
        </div>
    </div>
</template>

<script>
import {listofpurchase, receivetheorder, getimage, bulkentryreportproduct, removepurchase} from "@/store/request-common"
export default {
    data(){
        return{
            imgsupplier: '',
            returndrawer: false,
             pageSize: 5,
              page: 1,
              listLoading: true,
              productArray: [],
              searchable: '',
              drawer: false,
              expiration:{
                  expirydate: ''
              },
              syncinventoryTask: {
                  pcode: '',
                  pname: '',
                  pquantity: '',
                  pprice: '',
                  psupplier: '',
                  poid: ''
              },
              options: [{
          value: 'Incomplete Order',
          label: 'Incomplete Order'
        }, {
          value: 'Product Already Expired',
          label: 'Product Already Expired'
        }, {
          value: 'Product Damage',
          label: 'Product Damage'
        }, {
          value: 'Incorrect Order',
          label: 'Incorrect Order'
        }],
        
        productReportTask: {
                value1: [],
                supplier: '',
                remarks: '',
                productID: '',
                supplierEmail: '',
                productName: '',
                ponum: ''
        }
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
        this.fetchproducts();
        this.makeid(5)
    },
    methods: {
        onremove(ponum){
             this.$confirm('Are you sure you want remove this order?', 'Warning', {
                confirmButtonText: 'OK',
                cancelButtonText: 'Cancel',
                type: 'warning'
                }).then(() => {
                                       const loading = this.$loading({
                    lock: true,
                    text: 'please wait...',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                    });
                    setTimeout(() => {
                        removepurchase(ponum).then((response) => {
                            if(response.data === "Success delete"){
                                this.fetchproducts();
                                loading.close()
                                this.$notify.success({
                                    title: 'Okay!',
                                    message: 'Successfully deleted.',
                                    offset: 100
                                    });
                            }
                    })
                    }, 2000)
                    
                })
        },
        onsendreport(){
            if(!this.productReportTask.value1){
                this.$notify.warning({
                                title: 'Uh oh',
                                message: 'Please choose problem type.',
                                offset: 100
                                });
                                return false
            }
            this.$confirm('Are you sure you want send this as report?', 'Warning', {
                confirmButtonText: 'OK',
                cancelButtonText: 'Cancel',
                type: 'warning'
                }).then(() => {
                     const loading = this.$loading({
                    lock: true,
                    text: 'please wait...',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                    });
                    setTimeout(() => {
                        bulkentryreportproduct(this.productReportTask)
                        .then(response => {
                                if(response.data === "success report"){
                                    loading.close()
                                    this.$notify.success({
                                    title: 'Okay!',
                                    message: 'Successfully send report.',
                                    offset: 100
                                    });
                                    this.returndrawer = false;
                                    this.productReportTask.value1 = []
                                    this.fetchproducts();
                                }
                        }).catch(() => {
                             loading.close()
                                    this.$notify.success({
                                    title: 'Okay!',
                                    message: 'Successfully send report.',
                                    offset: 100
                                    });
                                    this.returndrawer = false;
                                    this.productReportTask.value1 = []
                                    this.fetchproducts();
                        })
                    }, 3000)
                })
        },
        onreturnorder(supplier, id, pname, ponumber){
            this.productReportTask.supplier = supplier;
            this.productReportTask.productID = id;
            this.productReportTask.productName = pname
            this.productReportTask.ponum = ponumber
           this.returndrawer = true;
           getimage(supplier).then(response => {
            this.imgsupplier = response.data[0].supplierimgurl
            this.productReportTask.supplierEmail = response.data[0].supplieremail
           })
        },
        onsave(){
           if(!this.expiration.expirydate){
                this.$notify.warning({
                                title: 'Uh oh',
                                message: 'Please select expiration date.',
                                offset: 100
                                });
                                return false;
           }
           else{ 
                this.$confirm('Are you sure you want to receive this?', 'Warning', {
                confirmButtonText: 'OK',
                cancelButtonText: 'Cancel',
                type: 'warning'
                }).then(() => {
                    const loading = this.$loading({
                    lock: true,
                    text: 'Receiving, please wait...',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                    });
                    setTimeout(() => {
                        receivetheorder(this.syncinventoryTask, this.expiration, this.syncinventoryTask).then(response => {
                            loading.close()
                            if(response.data === "success receive"){
                                this.$notify.success({
                                title: 'Yey',
                                message: 'Successfully received.',
                                offset: 100
                                });
                                this.fetchproducts();
                                this.makeid(5)
                                this.drawer= false;
                            }
                            else if(response.data === "invalid date"){
                                this.$notify.error({
                                title: 'Oops',
                                message: 'You cant input invalid expiration date please try again.',
                                offset: 100
                                });
                                return false;
                            }
                        })
                    }, 3000)
                })
           }
        },
        onreceive(ponum, pname, pquantity, pprice, psupplier, id){
            this.drawer = true;
            this.syncinventoryTask.pname = pname;
            this.syncinventoryTask.pquantity = pquantity;
            this.syncinventoryTask.pprice = pprice;
            this.syncinventoryTask.psupplier = psupplier
            this.syncinventoryTask.poid = id
        },
        setPage (val) {
        this.page = val
      },  
       fetchproducts(){
           listofpurchase().then(response => {
               this.productArray = response.data;
               this.listLoading = false;
           })
        },
        makeid(length) {
            var result           = [];
            var characters       = '0123456789';
            var charactersLength = characters.length;
            for ( var i = 0; i < length; i++ ) {
                result.push(characters.charAt(Math.floor(Math.random() *
            charactersLength)));
            }
            return this.syncinventoryTask.pcode = result.join('');
            },
            onremoverow(row){
            this.tableData.splice(row,1)
        },
    }
}
</script>