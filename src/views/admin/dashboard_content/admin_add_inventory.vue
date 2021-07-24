<template>
    <div>
        <div class="mt-3">
            <h1>Product Inventory | Add Inventory / Stocks</h1>
        <p style="font-size: 15px">Here you can add products for your inventory.</p>
        <el-alert
            title="Product management / Adding inventory / stocks."
            type="success" :closable="false">
        </el-alert>
        <div class="container-fluid">
            <div style="margin-top: 20px;">
                
            <el-button  type="primary" plain @click="onimportexcel()">Import Excel</el-button>
            <el-button  type="warning" plain @click="pullproductsdialogVisible = true">Pull Products from Stocks</el-button>
            <!-- Dialog for pull product from stocks -->
                <el-dialog
                    title="Pull products from stocks"
                    :visible.sync="pullproductsdialogVisible"
                    width="70%"
                    :before-close="pullhandleClose">
                    <el-alert
                                        style="margin-top: 20px; margin-bottom: 30px;"
                                            title="Pull Products"
                                            type="info"
                                            effect="dark"
                                            :closable="false"
                                            description="Here you can pull some products from your stock on hand."
                                            show-icon>
                                        </el-alert>
                                    <el-input
                                    style="margin-bottom: 5px; width: 30%;"
                                    placeholder="Search"
                                    v-model="searchable"
                                    clearable>
                                    </el-input>
                                    <el-button type="primary" style="float: right; margin-bottom: 10px;" @click="onrefresh()">Refresh</el-button>
                         <el-table
                                    :key="0"
                                    v-loading="listLoading"
                                    :data="pagedTableData"
                                    border
                                    fit
                                    highlight-current-row
                                    style="width: 100%;"
                                    
                                    >
                                    <el-table-column label="Stock number" prop="id" sortable="custom" align="center"  >
                                        <template slot-scope="{row}">
                                        <span>{{ row.stockNumber }}</span>
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
                                        <span class="link-type" >{{ row.productname }}</span>
                                        <!-- <el-tag>{{ row.type | typeFilter }}</el-tag> -->
                                        </template>
                                    </el-table-column>

                                     <el-table-column label="Product Quantity" >
                                        <template slot-scope="{row}">
                                        <span class="link-type" >{{ row.productquantity }}</span>
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

                                            <el-popover
                                                placement="left"
                                                width="400"
                                                trigger="click">
                                                <el-card shadow="always">
                                                    <h4>Enter Quantity</h4>
                                                    <el-input
                                                        placeholder="Please input quantity"
                                                        v-model="task.pquantity"
                                                        style="margin-bottom: 20px;"
                                                        clearable>
                                                        </el-input>
                                                        <el-button type="primary" style="float: right; margin-bottom: 10px;" @click="onconfirmpullproduct(
                                                            row.stockID,
                                                            row.stockNumber,
                                                            row.productname,
                                                            row.productquantity,
                                                            row.productprice,
                                                            row.productsupplier,
                                                            row.productimgurl,
                                                            row.productcategory,
                                                            row.expirationprod
                                                            )">Confirm</el-button>
                                                </el-card>
                                                 <el-button slot="reference" type="success" style="width: 100%;">Pull</el-button>
                                                </el-popover>
                                      
                                        </template>
                                    </el-table-column>

                                    </el-table>
                                    <el-pagination layout="prev, pager, next" :page-size="pageSize" :total="this.productArrayable.length" @current-change="setPage">
                                    </el-pagination>

                    <span slot="footer" class="dialog-footer">
                        <el-button @click="pullproductsdialogVisible = false">Cancel</el-button>
                    </span>
                    </el-dialog>
            <!-- End Dialog for pull product from stocks -->
            <!-- Dialog for import excel -->
            <el-dialog
                title="Invetory Import from Excel"
                :visible.sync="exceldialogsheet"
                width="60%"
                :before-close="handleClose">
                <p>The system will auto compute the total price of the products.</p>
                <el-card shadow="always" style="margin-bottom: 20px;">
                    <h5>Excel Template for Inventory System</h5>
                    <p>If you haven't download the excel format for this inventory please click this link to view all uploaded excel templates. Please navigate to template list</p>
                    <el-link type="primary" @click="onviewall()">View all</el-link>

                </el-card>
                <input type="file" ref="fileExcel" style="display: none;" class="btn btn-outline-primary" @change="prevexcel" 
                accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" />
                <el-card shadow="always">
                    <h5>Upload excel file</h5>
                    <p>Upon uploading excel the system will generate data from excel to database, please be patience while waiting.</p>
                    <div v-if="exldata != ''">
                        <el-alert
                            title="Nice! Now you can click the upload button!"
                            type="success" :closable="false">
                        </el-alert>
                    </div>
                    <div v-else>

                    </div>
                   <el-link @click="onchoose()" style="margin-bottom: 10px;" type="primary">Choose file</el-link><br>
                             <el-checkbox v-model="stocksornotchecked">Sync to stocks</el-checkbox>
                    
                </el-card>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="exceldialogsheet = false">Cancel</el-button>
                    <el-button type="primary" @click="onupload()">Upload now</el-button>
                    
                </span>
                </el-dialog>
            <!-- End dialog for import excel -->
        </div>
        </div>
        
        </div>
        <div id="testscroll">
            <div style="margin-top: 30px;">
            <inventoryadding :getallstocks="getallstocks" :getListProductInventory="getListProductInventory" :getallproductlist="getallproductlist"/>
        </div>
        </div>
        
    </div>
</template>

<script>
import inventoryadding from "@/components/admin_dashboard/admin_dashboard_content/product_inventory/add_inventory"
import {importExcelGenerateData, fetchAllProductInventory, fetchlistofstocks, pullrequestforproduct} from "@/store/request-common"
export default {
    data(){
        return{
            productArrayable: [],
            exldata: '',
            exceldialogsheet: false,
            getallproductlist: [], pullproductsdialogVisible: false,
             pageSize: 5,
              page: 1,
              listLoading: true,
              
              searchable: '',
              task: {
                  pquantity: '',
                  stocknum: '',
                  prodname: '',
                  prodprice: '',
                  prodimg: '',
                  prodcategory: '',
                  prodtotal: '',
                  stockID: '',
                  prodsupplier: '',
                  expirationprod: ''
              },
              stocksornotchecked: false
        }
    },
   computed: {
          pagedTableData() {
       if(this.searchable){
      return this.productArrayable.filter((item)=>{
        return this.searchable.toLowerCase().split(' ').every(v => item.productname.toLowerCase().includes(v) || item.stockNumber.toString().toLowerCase().includes(v))
      })
      }else{
        return this.productArrayable.slice(this.pageSize * this.page - this.pageSize, this.pageSize * this.page)
      }
       
     }
    },
    components: {
        inventoryadding
    },
    
    
    created(){
        this.getallstocks();
    },
    methods: {
        onrefresh(){
           
             const loading = this.$loading({
                    lock: true,
                    text: 'Refresh..',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                    });
                    setTimeout(() => {
 this.getallstocks();
 loading.close()
                    }, 1000)
        },
        getListProductInventory(){
            fetchAllProductInventory().then((response) => {
                this.getallproductlist = response.data
            })
        },
         setPage (val) {
        this.page = val
      }, 
        onconfirmpullproduct(id, pcode, pname, pquantity, pprice, psupplier, pimg, pcategory, expirationprod){
            
            if(!this.task.pquantity){
                this.$notify.error({
                                title: 'Oops!',
                                message: 'Please enter quantity',
                                offset: 100
                                });
                                return false;
            }
            else if(this.task.pquantity > pquantity){
                this.$notify.error({
                                title: 'Oops!',
                                message: 'Please input valid quantity',
                                offset: 100
                                });
                                return false;
            }
            else{
                
                this.task.stockID = id
                this.task.stocknum = pcode
                this.task.prodname = pname
                this.task.prodprice = pprice
                this.task.prodsupplier = psupplier
                this.task.prodimg = pimg
                this.task.prodcategory = pcategory
                this.task.expirationprod = expirationprod
                console.log(this.task)
                this.$confirm('Are you sure you want to pull this product?', 'Warning', {
                confirmButtonText: 'OK',
                cancelButtonText: 'Cancel',
                type: 'warning'
                }).then(() => {
                     const loading = this.$loading({
                    lock: true,
                    text: 'please wait..',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                    });
                    setTimeout(() => {
                        pullrequestforproduct(this.task)
                        .then(response => {
                            if(response.data === "pull success"){
                                loading.close()
                                this.$notify.success({
                                title: 'Nice!',
                                message: 'Successfully Pull!',
                                offset: 100
                                });
                                this.getListProductInventory()
                                this.getallstocks();
                                this.pullproductsdialogVisible = false;
                            }
                        })
                    }, 3000)
                })
            }
        },
         getallstocks(){
            fetchlistofstocks().then(response => {
                this.productArrayable = response.data
                this.listLoading = false;
            })  
        },
         pullhandleClose(done) {
        this.$confirm('Are you sure to close this dialog?')
          .then(_ => {
            this.pullproductsdialogVisible = false;
          })
          .catch(_ => {});
      },
       
        onimportexcel(){
            this.exceldialogsheet = true;
            this.getListProductInventory();
        },
        onviewall(){
            const loading = this.$loading({
                    lock: true,
                    text: 'please wait..',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                    });
                    setTimeout(() => {
                        loading.close()
                        this.$router.push({name: 'Excel Template'}).catch(() => {})
                         
                    }, 2000)
        },
        onchoose(){
            this.$refs.fileExcel.click();
        },
        prevexcel(event){
            this.exldata = event.target.files[0]
        },
         getListProductInventory(){
            fetchAllProductInventory().then((response) => {
                this.getallproductlist = response.data
                
            })
        },
        
        onupload(){
            if(!this.exldata){
                 this.$notify.error({
                                title: 'Oops!',
                                message: 'No such file. please choose excel file',
                                offset: 100
                                });
                                return false;
            }else {
                 this.$confirm('Upon importing excel this will generate and auto compute the result. Continue?', 'Warning', {
                confirmButtonText: 'OK',
                cancelButtonText: 'Cancel',
                type: 'warning'
                }).then(() => {
                    const loading = this.$loading({
                    lock: true,
                    text: 'Importing, please wait...',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                    });
                    setTimeout(() => {
                        importExcelGenerateData(this.exldata, this.stocksornotchecked).then(response => {
                            if(response.data === "not supported"){
                                this.$notify.error({
                                title: 'Oops!',
                                message: 'The selected file is not supported',
                                offset: 100
                                });
                                loading.close()
                                return false;
                            }else if(response.data === "success import"){
                                this.$notify.success({
                                title: 'Yey!',
                                message: 'Successfully Imported!',
                                offset: 100
                                });
                                loading.close();
                                this.getListProductInventory()
                                this.exceldialogsheet = false;
                            }
                            else if(response.data === "something went wrong")
                            {
                                this.$notify.error({
                                title: 'Oops!',
                                message: 'Something went wrong',
                                offset: 100
                                });
                                loading.close()
                                return false;
                            }
                            else if(response.data === "selected file is empty"){
                                this.$notify.error({
                                title: 'Oops!',
                                message: 'Selected File is Empty!',
                                offset: 100
                                });
                                loading.close()
                                return false;
                            }
                            else if(response.data === "invalid file"){
                                this.$notify.error({
                                title: 'Oops!',
                                message: 'Invalid file!',
                                offset: 100
                                });
                                loading.close()
                                return false;
                            }
                            else if(response.data === "bad request"){
                                this.$notify.error({
                                title: 'Oops!',
                                message: 'Bad Request',
                                offset: 100
                                });
                                loading.close()
                                return false;
                            }
                        })
                    }, 10000) //set time out can be remove depend on huge number of excel rows
                }).catch(() => {

                })
            }
        }
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