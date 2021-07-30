<template>
    <div>
        <div class="container-fluid">
            <el-tabs type="card">
                 <el-tab-pane label="Purchase order multiple entry">
              <div v-if="identify.viewentry == 0">
                  <h3>Purchase Order Multiple Entry</h3>
                <p>If you want this feature please enable multiple entry on system settings</p>
              </div>
              <div v-else>
                    <el-card shadow="always">
                <div class="row">
                    <div class="col-md-5">
                        <h5>Your purchase order</h5>
                    </div>
                    <div class="col-md-7">
                        <el-button style="float: right; margin-bottom: 10px;" type="success" @click="onaddnewpurchase()">Add new purchase order</el-button>
                    </div>
                    
                    <el-table
                        :data="tableData"
                        style="width: 100%">
                        <el-table-column type="expand">
                        <template slot-scope="props">
                            <el-card shadow="always">
                                <div class="row">
                                    <div class="col-md-5">
                                        <h4>Edit order details</h4>
                                    </div>
                                    <div class="col-md-7">
                                        <el-button type="danger" style="float: right; margin-bottom: 10px;" @click="onremoverow(props.row)">Remove row</el-button>
                                    </div>
                                </div>
                                <div style="margin-top: 10px;" class="row">
                                    <div class="col-sm">
                                        <label>Product name</label> <el-tag type="danger" effect="dark" size="mini">Required</el-tag>
                                        <el-input
                                        style="margin-top: 10px;"
                                            placeholder="Please input product name"
                                            v-model="props.row.productname"
                                            clearable>
                                            </el-input>
                                    </div>
                                    <div class="col-sm">
                                        <label>Product quantity</label> <el-tag type="danger" effect="dark" size="mini">Required</el-tag>
                                        <el-input
                                        style="margin-top: 10px;"
                                            placeholder="Please input product quantity"
                                            v-model="props.row.productquantity"
                                            clearable>
                                            </el-input>
                                    </div>
                                </div>
                                <!-- second row -->
                                <div style="margin-top: 10px;" class="row">
                                    <div class="col-sm">
                                        <label>Product price</label> <el-tag type="danger" effect="dark" size="mini">Required</el-tag>
                                        <el-input
                                        style="margin-top: 10px;"
                                            placeholder="Please input product price"
                                            v-model="props.row.productprice"
                                            clearable>
                                            </el-input>
                                    </div>
                                    <div class="col-sm">
                                        <label>Product supplier</label> <el-tag type="danger" effect="dark" size="mini">Required</el-tag> <el-link style="margin-top: -5px;" type="primary">Edit supplier details</el-link><br>
                                        <el-select style="margin-top: 10px; width: 100%;" v-model="props.row.productsupplier" filterable placeholder="Select supplier">
                                            <el-option
                                            v-for="item in listofsuppliers"
                                            :key="item.supplierfirstname"
                                            :label="item.supplierfirstname"
                                            :value="item.supplierfirstname">
                                            </el-option>
                                        </el-select>
                                    </div>
                                </div>
                            </el-card>
                        </template>
                        </el-table-column>
                       <el-table-column
                        label="PO Number" prop="ponumber">
                        </el-table-column>
                        <el-table-column
                        label="Status">
                        <el-tag type="success" effect="dark">New !</el-tag>
                        </el-table-column>
                        
                    </el-table>
                   
                </div>
                 <el-button @click="onsavepurchase()" style="float: right; margin-bottom: 10px; margin-top: 10px;" type="primary" plain>Save</el-button>
            </el-card>
              </div>
            </el-tab-pane>
            <el-tab-pane label="Purchase Order">
                <el-card shadow="always">
                    <h5>Purchase Order Single Entry</h5>
                    <hr>
                    <div class="row">
                        <div class="col-md-5">
                        <h5>Your purchase order</h5>
                    </div>
                    <div class="col-md-7">
                        <el-button style="float: right; margin-bottom: 10px;" type="success" @click="onaddnewpurchasesingle()">New purchase order</el-button>
                    </div>

        <!-- table list single entry -->
         <el-input
                                    style="margin-bottom: 10px; margin-top: 10px;"
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
                                        <el-button type="primary" plain @click="onviewinvoice(
                                            row.psupplier, row.ponumber, row.pname, row.pquantity,
                                            row.pprice
                                        )">View invoice</el-button>
                                        </template>
                                    </el-table-column>

                                    </el-table>
                                    <el-pagination layout="prev, pager, next" :page-size="pageSize" :total="this.singleEntryList.length" @current-change="setPage">
                                    </el-pagination>
                                    <!-- end -->
                    </div>
                </el-card>
                <!-- el drawer -->
    <el-dialog
                    title="Purchase order details"
                    :visible.sync="invoicevisible"
                    width="50%"
                    :before-close="handleClose">
        <div style="margin-top: 30px;" >
            <!-- <el-button type="primary" @click="onprint()">Print</el-button> -->
            <Invoice
            id="printMe"
      :company="company"
      :customer="customer"
      :invoice="invoice"
      :variant="1"
      currency="php"
    />
    
        </div>
        
    </el-dialog>

                <!-- end el drawer -->
                <el-dialog
                    title="Add purchase order"
                    :visible.sync="dialogVisible"
                    width="50%"
                    :before-close="handleClose">
                    <span>Here you can add your purchase order</span>
                    <div style="margin-top: 20px;" class="row">
                        <div class="col-md-6">
                            <label>Product name</label> <el-tag type="danger" effect="dark" size="mini">Required</el-tag>
                                        <el-input
                                        style="margin-top: 10px;"
                                            placeholder="Please input product name"
                                            v-model="singlepurchaseTask.productname"
                                            clearable>
                                            </el-input>
                        </div>
                        <div class="col-md-6">
                             <label>Product quantity</label> <el-tag type="danger" effect="dark" size="mini">Required</el-tag>
                                        <el-input
                                        style="margin-top: 10px;"
                                            placeholder="Please input product quantity"
                                            v-model="singlepurchaseTask.productQuantity"
                                            clearable>
                                            </el-input>
                        </div>
                    </div>
                    <div style="margin-top: 10px;" class="row">
                                    <div class="col-sm">
                                        <label>Product price</label> <el-tag type="danger" effect="dark" size="mini">Required</el-tag>
                                        <el-input
                                        style="margin-top: 10px;"
                                            placeholder="Please input product price"
                                            v-model="singlepurchaseTask.productprice"
                                            clearable>
                                            </el-input>
                                    </div>
                                    <div class="col-sm">
                                        <label>Product supplier</label> <el-tag type="danger" effect="dark" size="mini">Required</el-tag> 
                                        <el-select style="margin-top: 10px; width: 100%;" v-model="singlepurchaseTask.productsupplier" filterable placeholder="Select supplier">
                                            <el-option
                                            v-for="item in listofsuppliers"
                                            :key="item.supplierfirstname"
                                            :label="item.supplierfirstname"
                                            :value="item.supplierfirstname">
                                            </el-option>
                                        </el-select>
                                    </div>
                                </div>
                    <span slot="footer" class="dialog-footer">
                        <el-button @click="dialogVisible = false">Cancel</el-button>
                        <el-button type="primary" @click="onconfirm()">Confirm</el-button>
                    </span>
                    </el-dialog>
            </el-tab-pane>
            <!-- <el-tab-pane label="Role">Role</el-tab-pane>
            <el-tab-pane label="Task">Task</el-tab-pane> -->
        </el-tabs>
            
        </div>
    </div>
</template>

<script>
import {purchasesorder, fetchaddedsuppliers, listofpurchase, bulkentrypurchaseorder, savedsettings, singleentrypurchaseorder} from "@/store/request-common"
//   import { htmlToPaper } from 'vue-html-to-paper';
  export default {
    data() {
      return {
          listofsuppliers: [],
        //   invoice
    company: {
        name: "Burger Mania",
        address: ""
      },
      invoice: {
        id: "",
        items: [
          {
            description: "",
            price: "",
            quantity: ""
          },
        ],
        dueDate: ""
      },
      customer: {
        name: "",
      },
      logo: "",
        // end invoice
        dialogVisible:false,
        validator: true,
        invoicevisible: false,
        identify: [],
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
        singlepurchaseTask: {
            ponumber: '',
            productname: '',
            productQuantity: '',
            productprice: '',
            productsupplier: ''
        },
        tableData: [],
        singleEntryList:[],
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
      return this.singleEntryList.filter((item)=>{
        return this.searchable.toLowerCase().split(' ').every(v => item.pname.toLowerCase().includes(v) || item.ponumber.toString().toLowerCase().includes(v))
      })
      }else{
        return this.singleEntryList.slice(this.pageSize * this.page - this.pageSize, this.pageSize * this.page)
      }
       
     }
    },
    created(){
        this.getalllist()
        this.settingsidentifier()
        this.makeponumber(5)
        this.getallsuppliers()
    },  
    methods: {
        
        getallsuppliers(){
            fetchaddedsuppliers().then((resolve) => {
                this.listofsuppliers = resolve.data
            })
        },
        onviewinvoice(supplier, ponumber, pname, pquantity, pprice){
            this.invoicevisible = true
            this.invoice.items[0].description = pname;
            this.invoice.items[0].price = pprice
            this.invoice.items[0].quantity = pquantity
            this.customer.name = supplier
            this.invoice.id = ponumber
        },
        onconfirm(){
            if(!this.singlepurchaseTask.productname || !this.singlepurchaseTask.productQuantity
            || !this.singlepurchaseTask.productprice || !this.singlepurchaseTask.productsupplier){
                this.$notify.error({
                                title: 'Oops',
                                message: 'Something is empty, please check fields.',
                                offset: 100
                                });
                    return false;
            }
            else{
                this.$confirm('Before proceeding please double check your purchase entries. Continue?', 'Warning', {
                confirmButtonText: 'OK',
                cancelButtonText: 'Cancel',
                type: 'warning'
                }).then(() => {
                    const loading = this.$loading({
                    lock: true,
                    text: 'Processing, please wait...',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                    });
                    setTimeout(() => {
                        singleentrypurchaseorder(this.singlepurchaseTask)
                        .then((resolve) => {
                            if(resolve.data === "success single entry"){
                                this.$notify.success({
                                title: 'Yey',
                                message: 'Successfully Added.',
                                offset: 100
                                });
                                loading.close();
                                this.getalllist()
                                this.dialogVisible=false
                            }
                        })
                    }, 3000)
                })
            }
        },
        onaddnewpurchasesingle(){
            this.dialogVisible = true;
        },
        settingsidentifier(){
            savedsettings().then(response => {
                if(response.data[0] === undefined || response.data[0] === ''){

                }else{
                 this.identify = response.data[0]
                }
            })
        },
        onsavepurchase()
        {
            //loop validate
            for(var x = 0; x < this.tableData.length; x++){
                if(!this.tableData[x].productname || !this.tableData[x].productquantity
                || !this.tableData[x].productprice || !this.tableData[x].productsupplier){
                    this.$notify.error({
                                title: 'Oops',
                                message: 'Something is empty, please check fields.',
                                offset: 100
                                });
                    return false;
                }
            }
             this.$confirm('Before proceeding please double check your purchase entries. Continue?', 'Warning', {
                confirmButtonText: 'OK',
                cancelButtonText: 'Cancel',
                type: 'warning'
                }).then(() => {
                     const loading = this.$loading({
                    lock: true,
                    text: 'Processing, please wait...',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                });
                setTimeout(() => {
                    bulkentrypurchaseorder(this.tableData)
                    .then(response => {
                        if(response.data === "success purchase"){
                            this.$notify.success({
                                title: 'Yey',
                                message: 'Successfully Added.',
                                offset: 100
                                });
                                loading.close();
                                this.tableData = [];
                                this.getalllist()
                                this.settingsidentifier()
                                this.makeponumber(5)
                                this.getallsuppliers()
                        }
                    })
                }, 3000)
                    
                })
        },
        onremoverow(row){
            this.tableData.splice(row,1)
        },
        onaddnewpurchase(){
            this.makeid(5)
            this.tableData.push({
                productname: this.purchaseTask.productname,
                productquantity: this.purchaseTask.productQuantity,
                productprice: this.purchaseTask.productprice,
                productsupplier: this.purchaseTask.productsupplier,
                ponumber: this.purchaseTask.ponumber
            })
        },
        getalllist(){
            listofpurchase().then(response => {
                this.singleEntryList = response.data;
                this.listLoading = false
            })
        },
        setPage(val){
            this.page = val
        },
        makeid(length) {
            var result           = [];
            var characters       = '0123456789';
            var charactersLength = characters.length;
            for ( var i = 0; i < length; i++ ) {
                result.push(characters.charAt(Math.floor(Math.random() *
            charactersLength)));
            }
            return this.purchaseTask.ponumber = "PO" + "-" + result.join('');
            },
            makeponumber(length) {
            var result           = [];
            var characters       = '0123456789';
            var charactersLength = characters.length;
            for ( var i = 0; i < length; i++ ) {
                result.push(characters.charAt(Math.floor(Math.random() *
            charactersLength)));
            }
            return this.singlepurchaseTask.ponumber = "PO" + "-" + result.join('');
            }
    }
  }
</script>