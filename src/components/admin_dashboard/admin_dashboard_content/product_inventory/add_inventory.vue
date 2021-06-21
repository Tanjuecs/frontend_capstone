<template>
    <div>
        <div class="container-fluid">
            <div class="row">
                <div class="col-sm">
                    <el-card shadow="always" style="margin-bottom: 20px;">
                        <h5>Add product form</h5>
                    <div style="margin-top: 20px;"><label>Product Code :</label> <el-tag type="danger" effect="dark">{{productTask.productCode}}</el-tag></div>
                    <center>
                        <el-avatar shape="square" :size="100" fit="fill" style="margin-bottom: 3px;" :src="img1"></el-avatar>
                            <p style="color: gray;">Preview of image will appear after the uploading.</p>
                        <input type="file" class="btn btn-outline-primary" style="margin-bottom: 6px;" @change="previewImage" accept="image/*" />
                        <el-progress :text-inside="true" style="margin-bottom: 10px;" :stroke-width="26" :percentage="uploadpercent"></el-progress>
                        <el-button type="primary" style=" margin-bottom: 10px;" plain @click="onupload()">Upload now</el-button>
                    </center>
                            <div class="row" style="margin-top: 50px;">
                                <div class="col-sm">
                                    <label>Product name</label>
                                    <el-input
                                        placeholder="Please input product name"
                                        v-model="productTask.productName"
                                        clearable>
                                        </el-input>
                                </div>
                                <div class="col-sm">
                                    <label>Product quantity</label>
                                    <el-input
                                        placeholder="Please input product quantity"
                                        v-model="productTask.productQuantity"
                                        type="number"
                                        clearable>
                                        </el-input>
                                </div>
                            </div>
                            <div class="row" style="margin-top: 20px;">
                                <div class="col-sm">
                                    <label>Product price</label>
                                    <el-input
                                        placeholder="Please input product price"
                                        v-model="productTask.productPrice"
                                        type="number"
                                        clearable>
                                        </el-input>
                                </div>
                                <div class="col-sm">
                                    <label>Product supplier</label>
                                      <el-select v-model="productTask.productSupplier" style="width: 100%;" filterable placeholder="Select supplier">
                                        <el-option
                                        v-for="item in options"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                        </el-option>
                                    </el-select>
                                </div>
                            </div>
                            <el-card style="margin-top: 30px;" shadow="always">
                                <h5>Product Preview</h5>
                                <el-alert
                                    title="This will be the product preview."
                                    type="warning" :closable="false">
                                </el-alert>
                                  <el-timeline style="margin-top: 50px;">
                                        <el-timeline-item :timestamp="preview.previewData | moment('calendar')" placement="top">
                                        <el-card>
                                           <div class="row">
                                               <div class="col-md-3">
                                                   <img :src="productTask.productImageUrl" class="img-fluid"
                                                   style="width: 100%; height: auto;" alt="NO image">
                                               </div>
                                               <div class="col-md-9">
                                                   <p>Product Code : <el-tag effect="dark">{{productTask.productCode}}</el-tag></p>
                                                    <h4>Product Name : {{productTask.productName}}</h4>
                                                    <p>Product Quantity : {{productTask.productQuantity}}</p>
                                                    <p>Product price : &#8369; {{productTask.productPrice}}</p>
                                                    <p>Product supplier : {{productTask.productSupplier}}</p>
                                                    <p>Administrator added : {{preview.previewData | moment('calendar')}}</p>
                                                    <p>Status : <el-tag effect="dark" type="danger">Inactive</el-tag></p>
                                                    <div style="margin-top: 20px;">
                                                        <h4>Total Price : {{productTask.productPrice * productTask.productQuantity}}</h4>
                                                    </div>
                                               </div>
                                           </div>
                                        </el-card>
                                        </el-timeline-item>
                                    </el-timeline>
                            </el-card>
                            <el-card style="margin-top: 30px;" shadow="always">
                                <h5>Default settings</h5>
                                <el-switch
                                style="display: block; margin-bottom: 30px;"
                                v-model="productTask.isadmin"
                                disabled
                                active-color="#13ce66"
                                inactive-color="#ff4949"
                                active-text="Administrator"
                                inactive-text="Not admin">
                                </el-switch>
                                <el-switch
                                style="display: block; margin-bottom: 30px;"
                                v-model="productTask.isstatus"
                                disabled
                                active-color="#13ce66"
                                inactive-color="#ff4949"
                                active-text="Active"
                                inactive-text="Inactive">
                                </el-switch>
                            </el-card>
                            <el-button type="primary" plain style="float: right; margin-bottom: 20px; margin-top: 20px;"
                            @click="onsaveproduct()">Save</el-button>
                    </el-card>
                </div>
                <div class="col-sm">
                    <el-card shadow="always" id="mycustomscroll" >
                        <h5>All added products</h5>
                        <label>Search by product name :</label>&nbsp;
                        <el-input
                                    style="margin-bottom: 5px; width: 30%;"
                                    placeholder="Search"
                                    v-model="searchable"
                                    clearable>
                                    </el-input><br>
                        <label style="margin-right: 10px;">From : </label>
                        <el-date-picker
                        v-model="filterable.fromdate"
                        format="yyyy/MM/dd"
                        value-format="yyyy/MM/dd"
                        type="date"
                        placeholder="Select date from">
                        </el-date-picker> &nbsp;
                        <label style="margin-right: 10px;">To : </label>
                        <el-date-picker
                        style="margin-right: 10px;"
                        v-model="filterable.todate"
                        format="yyyy/MM/dd"
                        value-format="yyyy/MM/dd"
                        type="date"
                        placeholder="Select date to">
                        </el-date-picker>
                        <div style="display: inline;">
                            <el-button type="warning" plain size="small" @click="dialogVisible = true">More filters</el-button>
                        <el-button type="primary" plain size="small" @click="onsearchbydate()">Search</el-button>
                        </div>
                        
                        <!-- Element Dialog for More Filters -->
                            <el-dialog
                            
                                title="Edit more search filters"
                                :visible.sync="dialogVisible"
                                width="50%"
                                :before-close="handleClose">
                                <div style="padding: 25px;">
                                     <el-alert
                                 style="margin-bottom: 20px;"
                                    title="Note : You can only filter minimal search options here."
                                    type="error" :closable="false">
                                </el-alert>
                                <el-card style="margin-bottom: 20px; width: 30%;" shadow="hover">
                                    <el-switch
                                    style="display: block;"
                                    v-model="morefilter.filterbased"
                                    active-color="#13ce66"
                                    inactive-color="#ff4949"
                                    active-text="Exact result"
                                    inactive-text="Filter based">
                                    </el-switch>
                                </el-card>
                               <div class="row">
                                   <div class="col-sm">
                                        <el-card shadow="hover" id="filter1">
                                            <h5>Search by product code</h5>
                                    <el-input
                                    placeholder="Please input product code"
                                    v-model="morefilter.filterbycode"
                                    clearable>
                                    </el-input>
                                        </el-card>
                                   </div>
                                   <div class="col-sm">
                                       <el-card shadow="hover" id="filter2">
                                            <h5>Search by product name</h5>
                                    <el-input
                                    placeholder="Please input product name"
                                    v-model="morefilter.filterbypname"
                                    clearable>
                                    </el-input>
                                       </el-card>
                                   </div>
                               </div>
                               <div class="row" style="margin-top: 30px;">
                                   <div class="col-sm">
                                        <el-card shadow="hover" id="filter3">
                                            <h5>Search by status</h5>
                                    <el-radio v-model="morefilter.filterbystatus1" label="1">Active</el-radio>
                                    <el-radio v-model="morefilter.filterbystatus1" label="0">Inactive</el-radio>
                                        </el-card>
                                   </div>
                                   <div class="col-sm">
                                        <el-card shadow="hover" id="filter4">
                                            <div style="display: inline;">
                                                <h6>Get all result</h6>
                                    <el-button type="primary" size="mini" plain style="width: 100%;" @click="ongetall()">Get All</el-button>
                                            </div>
                                        </el-card>
                                   </div>
                               </div>
                                </div>
                                <span slot="footer" class="dialog-footer">
                                    <el-button @click="dialogVisible = false">Cancel</el-button>
                                    <el-button type="primary" @click="onsearchnow()">Search now</el-button>
                                </span>
                                </el-dialog>
                        <!-- Element Dialog for more filters end -->
                        <hr>
                          <div v-if="getallproductlist == null || getallproductlist == ''">
                              <center>
                                  <div style="margin-top: 30px;">
                                      <img src="https://cdn.dribbble.com/users/2382015/screenshots/6065978/no_result.gif"
                                       alt="No Data" style="width: 100%; height: auto;" class="img-fluid">
                                  </div>
                              </center>
                          </div>
                          <div v-else>
                              <el-timeline style="margin-top: 50px;" >
                                <el-timeline-item v-for="item in pagedTableData" :key="item.productID" :timestamp="item.createdAt | moment('calendar')" placement="top">
                                <el-card style="padding: 15px;">
                                    <div class="row">
                                        <div class="col-md-3">
                                                   <img :src="item.productimgurl" class="img-fluid"
                                                   style="width: 100%; height: auto;" alt="NO image">
                                               </div>
                                    <div class="col-md-9">
                                        <p>Product Code : <el-tag effect="dark">{{item.productCode}}</el-tag></p>
                                                    <h4>Product Name : {{item.productName}}</h4>
                                                    <p>Product Quantity : {{item.product_quantity}}</p>
                                                    <p>Product price : &#8369; {{item.product_price}}</p>
                                                    <p>Product supplier : {{item.product_supplier}}</p>
                                                    <p>Administrator added : {{item.createdAt | moment('calendar')}}</p>
                                                    <p>Status : <el-tag effect="dark" type="danger">Inactive</el-tag></p>
                                                    <div style="margin-top: 20px;">
                                                        <h4>Total Price : &#8369; {{item.product_price * item.product_quantity}}</h4>
                                                    </div>
                                                    <el-card shadow="always" style="background-color: #2D2D30; color: white; border-radius: 20px;">
                                                        <h5>More Actions</h5>
                                                        <div class="row">
                                                            <div class="col-sm">
                                                                <el-button type="primary" style="width: 100%;"
                                                                @click="onmodifyproduct(
                                                                    item.productID,
                                                                    item.productName,
                                                                    item.product_price,
                                                                    item.product_quantity,
                                                                    item.product_supplier,
                                                                    item.productimgurl
                                                                )"
                                                                >Modify</el-button>
                                                            
                                                            </div>
                                                            <div class="col-sm">
                                                                <el-button type="danger" style="width: 100%;" @click="onremoveproduct(item.productID)">Remove</el-button>
                                                            </div>
                                                        </div>
                                                        <!-- Modify dialog -->
                                                        <el-dialog
                                                            title="Product Inventory Modify"
                                                            :visible.sync="modifyDialog"
                                                            width="50%"
                                                            :before-close="handleClose">
                                                                <center>
                                                                    <el-avatar shape="square" :size="100" fit="fill" style="margin-bottom: 3px;" :src="modifyimg1"></el-avatar>
                                                                        <p style="color: gray;">Preview of image will appear after the uploading.</p>
                                                                    <input type="file" class="btn btn-outline-primary" style="margin-bottom: 6px;" @change="modifypreviewImage" accept="image/*" />
                                                                    <el-progress :text-inside="true" style="margin-bottom: 10px;" :stroke-width="26" :percentage="modifyuploadpercent"></el-progress>
                                                                    <el-button type="primary" style=" margin-bottom: 10px;" plain @click="modifyonupload()">Upload now</el-button>
                                                                </center>
                                                                <div class="row" style="margin-top: 20px;">
                                                                   <div class="col-sm">
                                                                        <label>Product name</label>
                                                                        <el-input
                                                                            placeholder="Please input product name"
                                                                            v-model="modifyTask.modifyproductname"
                                                                            clearable>
                                                                            </el-input>
                                                                    </div>
                                                                    <div class="col-sm">
                                                                        <label>Product quantity</label>
                                                                        <el-input
                                                                            placeholder="Please input product quantity"
                                                                            v-model="modifyTask.modifyproductquantity"
                                                                            type="number"
                                                                            clearable>
                                                                            </el-input>
                                                                    </div>
                                                                </div>
                                                                <div class="row" style="margin-top: 20px;">
                                                                        <div class="col-sm">
                                                                            <label>Product price</label>
                                                                            <el-input
                                                                                placeholder="Please input product price"
                                                                                v-model="modifyTask.modifyproductprice"
                                                                                type="number"
                                                                                clearable>
                                                                                </el-input>
                                                                        </div>
                                                                        <div class="col-sm">
                                                                            <label>Product supplier</label>
                                                                            <el-select v-model="modifyTask.modifyproductsupplier" style="width: 100%;" filterable placeholder="Select supplier">
                                                                                <el-option
                                                                                v-for="item in options"
                                                                                :key="item.value"
                                                                                :label="item.label"
                                                                                :value="item.value">
                                                                                </el-option>
                                                                            </el-select>
                                                                        </div>
                                                                    </div>
                                                            <span slot="footer" class="dialog-footer">
                                                                <el-button @click="modifyDialog = false">Cancel</el-button>
                                                                <el-button type="primary" @click="onmodifysave()">Save</el-button>
                                                            </span>
                                                            </el-dialog>
                                                        <!-- end modify dialog -->
                                                    </el-card>
                                                    
                                    </div>
                                    </div>
                                </el-card>
                                </el-timeline-item>
                            </el-timeline>
                          </div>
                    </el-card>
                     <el-pagination layout="prev, pager, next" :page-size="pageSize" :total="this.getallproductlist.length" @current-change="setPage">
                                    </el-pagination>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import 
{
adding_product_inventory,
fetchAllProductInventory,
removeproduct,
filter_by_date,
more_filter_search,
product_modify} from "@/store/request-common"
import firebase from 'firebase';
export default {
    props: {
        getallproductlist: Array
    },
    data(){
        return {
            searchable: '',
            dialogVisible: false,
            modifyDialog: false,
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
        value: '',
        img1: '',
            imageData: null,
            uploadpercent: 0,
            
            // modify registered data
            modifyuploadpercent: 0,
            modifyimg1: '',
            modifyimagedata: '',
            
            preview:{
            previewData: new Date().toLocaleString()
            },
            //end preview area
            //product task
            productTask: {
                productCode: 0,
                productName: '',
                productQuantity: 0,
                productPrice: '',
                productSupplier: '',
                isadmin: true,
                isstatus: false,
                productImageUrl: ''
            },
            getallproductlist:[],
            filterable: {
                fromdate: '',
                todate:''
            },
            morefilter: {
                filterbycode: '',
                filterbypname: '',
                filterbystatus1: '',
                filterbased: false,
            },
            //end product task
            // end modify registered data
            modifyTask: {
                modifyproductimageurl: '',
                modifyproductname: '',
                modifyproductquantity: 0,
                modifyproductprice: '',
                modifyproductsupplier: '',
                modifyPID: ''
            },
            
            //preview area
            pageSize: 2,
              page: 1,
        }
    },
    computed: {
          pagedTableData() {
       if(this.searchable){
      return this.getallproductlist.filter((item)=>{
        return this.searchable.toLowerCase().split(' ').every(v => item.productName.toLowerCase().includes(v))
      })
      }else{
        return this.getallproductlist.slice(this.pageSize * this.page - this.pageSize, this.pageSize * this.page)
      }
       
     }
    },
    created(){
        this.getListProductInventory()
        this.makeproductCode(5)
    },
    methods:{
        setPage(val){
this.page = val
        },
        onmodifysave(){
             if(!this.modifyTask.modifyproductname ||  !this.modifyTask.modifyproductquantity
            || !this.modifyTask.modifyproductprice){
                 this.$notify.error({
                                title: 'Oops',
                                message: 'Something is empty, please try again.',
                                offset: 100
                                });   
                                return false;
            } else if(this.modifyTask.modifyproductquantity <= 0 || this.modifyTask.modifyproductprice <= 0){
                 this.$notify.error({
                                title: 'Oops',
                                message: 'This is invalid quantity or product price.',
                                offset: 100
                                });   
                                return false;
            }else{
                this.$confirm('Are you sure you want to update this product?', 'Warning', {
                confirmButtonText: 'OK',
                cancelButtonText: 'Cancel',
                type: 'warning'
                }).then(() => {
                    const loading = this.$loading({
                    lock: true,
                    text: 'Updating, please wait...',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                });
                setTimeout(() => {
                    product_modify(this.modifyTask).then(response => {
                        if(response.data === "empty"){
                            loading.close()
                            this.$notify.error({
                                title: 'Oops',
                                message: 'This is invalid quantity or product price.',
                                offset: 100
                                });   
                                return false;
                        } else if(response.data === "success modify"){
                            loading.close()
                            this.$notify.success({
                                title: 'Yes!',
                                message: 'Successfully update.',
                                offset: 100
                                });   
                                this.modifyDialog = false
                                this.getListProductInventory()
                        }
                    })
                }, 4000)
                }).catch(() => {
                    this.$notify.info({
                                title: 'Info',
                                message: 'No action.',
                                offset: 100
                                });   
                                return false
                })
            }
        },
        onmodifyproduct(productID,productName,product_price,product_quantity,product_supplier,productimgurl){
            this.modifyDialog = true;
            this.modifyTask.modifyPID = productID
            this.modifyTask.modifyproductname = productName
            this.modifyTask.modifyproductprice = product_price
            this.modifyTask.modifyproductquantity = product_quantity
            this.modifyTask.modifyproductsupplier = product_supplier
            this.modifyimg1 = productimgurl
            this.modifyTask.modifyproductimageurl = productimgurl
        },
        ongetall(){
             const loading = this.$loading({
                    lock: true,
                    text: 'Searching, please wait...',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                });
            setTimeout(() => {
                this.getListProductInventory()
                this.dialogVisible = false;
                    loading.close()
            }, 4000)
        },
        onsearchnow(){
            this.$confirm('This will give you result based on your filter. Continue?', 'Warning', {
                confirmButtonText: 'OK',
                cancelButtonText: 'Cancel',
                type: 'warning'
                }).then(() => {
                    const loading = this.$loading({
                    lock: true,
                    text: 'Searching, please wait...',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                });
                setTimeout(() => {
                more_filter_search(this.morefilter).then(response => {
                    this.dialogVisible = false;
                    loading.close()
                    this.getallproductlist = response.data
                     this.$notify.success({
                                title: 'Yey',
                                message: 'Successfully Searched',
                                offset: 100
                                });
                })
                }, 3000)
                })
                .catch(() => {
                     this.$notify.info({
                                title: 'Info',
                                message: 'No Action',
                                offset: 100
                                });
                })
        },
        onsearchbydate(){
            if(!this.filterable.fromdate || !this.filterable.todate){
                this.$notify.error({
                                title: 'Oops',
                                message: 'Unable to search',
                                offset: 100
                                });
                                return false;
            }else{
                const loading = this.$loading({
                    lock: true,
                    text: 'Searching, please wait...',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                });
                setTimeout(() => {
                    filter_by_date(this.filterable.fromdate, this.filterable.todate)
            .then(response => {
                loading.close()
                this.getallproductlist = response.data
            })
                    }, 3000)      
            }  
        },
        onremoveproduct(id){
           this.$confirm('Are you sure you want to remove this product?', 'Warning', {
                confirmButtonText: 'OK',
                cancelButtonText: 'Cancel',
                type: 'warning'
                }).then(() => {
                    const loading = this.$loading({
                    lock: true,
                    text: 'Adding product data, please wait...',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                });
                setTimeout(() => {
                    removeproduct(id).then((response) => {
                        if(response.data === "success deletion"){
                            loading.close()
                            this.getListProductInventory()
                            this.$notify.success({
                                title: 'Yey',
                                message: 'Successfully removed',
                                offset: 100
                                });
                        }
                    })
                }, 3000)
                }).catch(() => {
                   this.$notify.info({
                    title: 'Info',
                    message: 'No Action',
                    offset: 100
                    });
                    return false; 
                }) 
        },
        getListProductInventory(){
            fetchAllProductInventory().then((response) => {
                this.getallproductlist = response.data
                console.log(response.data)
                this.makeproductCode(5)
            })
        },
        onsaveproduct(){
            if(!this.productTask.productName ||  !this.productTask.productQuantity
            || !this.productTask.productPrice || !this.productTask.productImageUrl){
                 this.$notify.error({
                                title: 'Oops',
                                message: 'Something is empty, please try again.',
                                offset: 100
                                });   
                                return false;
            } else if(this.productTask.productQuantity <= 0 || this.productTask.productPrice <= 0){
                 this.$notify.error({
                                title: 'Oops',
                                message: 'This is invalid quantity or product price.',
                                offset: 100
                                });   
                                return false;
            } else{
                this.$confirm('Are you sure you want to add this product?', 'Warning', {
                confirmButtonText: 'OK',
                cancelButtonText: 'Cancel',
                type: 'warning'
                }).then(() => {
                    const loading = this.$loading({
                    lock: true,
                    text: 'Adding product data, please wait...',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                });
                setTimeout(() => {
                    adding_product_inventory(this.productTask)
                    .then((resp) => {
                        if(resp.data === "success product inventory"){
                            loading.close()
                            this.$notify.success({
                                title: 'Yey',
                                message: 'Successfully Added',
                                offset: 100
                                });
                                this.getListProductInventory()
                        } else if(resp.data === "empty"){
                             loading.close()
                            this.$notify.error({
                                title: 'Oops',
                                message: 'Something is empty, please try again.',
                                offset: 100
                                });   
                                return false;
                        }
                    })
                }, 3000)
                }).catch(() => {
                    this.$notify.info({
                    title: 'Info',
                    message: 'No Action',
                    offset: 100
                    });
                    return false;
                })
            }
        },
        makeproductCode(length) {
            var result           = [];
            var characters       = '0123456789';
            var charactersLength = characters.length;
            for ( var i = 0; i < length; i++ ) {
                result.push(characters.charAt(Math.floor(Math.random() *
            charactersLength)));
            }
            return this.productTask.productCode = result.join('');
            },
            // modify preview image function
                modifypreviewImage(event){
                    this.modifyuploadpercent = 0;
                    this.modifyimg1=null;
                    this.modifyimagedata = event.target.files[0]
                },
            //end modify preview image function
        previewImage(event) {
            this.uploadpercent = 0;
            this.img1=null;
            this.imageData = event.target.files[0];
        },
        modifyonupload(){
            this.$confirm('Are you sure you want to upload this new image?', 'Warning', {
                confirmButtonText: 'OK',
                cancelButtonText: 'Cancel',
                type: 'warning'
                }).then(() => {
                    const loading = this.$loading({
                    lock: true,
                    text: 'Uploading Image, please wait...',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                    });
                    this.modifyimg1 = null;
                    const checkstorage = firebase.storage().ref(`${this.modifyimagedata.name}`)
                    .getDownloadURL().then((resolve) => {
                        const ref = firebase.storage().ref(`product_inventory/${this.modifyimagedata.name}`);
                        ref.push(this.modifyimagedata.name).then(() => {
                            ref.getDownloadURL().then((url) => {
                                loading.close()
                                this.$notify.success({
                                title: 'Yey',
                                message: 'Successfully Uploaded',
                                offset: 100
                                });
                                this.modifyTask.modifyproductimageurl = url;
                            })
                        })
                    }).catch((err) => {
                        const storageRef = firebase.storage().ref(`product_inventory/${this.modifyimagedata.name}`)
                        .put(this.modifyimagedata);
                        storageRef.on(`state_changed`, snapshot => {
                            this.modifyuploadpercent = (snapshot.bytesTransferred/snapshot.totalBytes) * 100;
                        }, error => {console.log(error.message)},
                        () => {
                            this.modifyuploadpercent = 100;
                            storageRef.snapshot.ref.getDownloadURL().then((url) => {
                                this.modifyimg1 = url;
                                loading.close()
                                this.$notify.success({
                                title: 'Yey',
                                message: 'Successfully Uploaded',
                                offset: 100
                                });
                                this.modifyTask.modifyproductimageurl = url;
                            })
                        })
                    })
                })
        },
        onupload() {
             const loading = this.$loading({
                    lock: true,
                    text: 'Uploading Image, please wait...',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                });
            this.img1 = null;
             
            const checkstorage = firebase.storage().ref(`${this.imageData.name}`)
            .getDownloadURL()
            .then((resolve) => {
               const ref = firebase.storage().ref(`product_inventory/${this.imageData.name}`);
               ref.put(this.imageData.name).then(() => {
                   ref.getDownloadURL().then((url) => {
                       loading.close()
                       this.$notify.success({
                                title: 'Yey',
                                message: 'Successfully Uploaded',
                                offset: 100
                                });
                       this.productTask.productImageUrl = url;
                   })
               })
            }).catch((err) => {
                const storageRef = firebase.storage().ref(`product_inventory/${this.imageData.name}`).put(this.imageData);
                 storageRef.on(`state_changed`, snapshot => {
                this.uploadpercent = (snapshot.bytesTransferred/snapshot.totalBytes) * 100;

            }, error => {console.log(error.message)},
            () => {
                this.uploadpercent = 100;
                storageRef.snapshot.ref.getDownloadURL().then((url) => {
                    this.img1 = url;
                    loading.close()
                    this.$notify.success({
                                title: 'Yey',
                                message: 'Successfully Uploaded',
                                offset: 100
                                });
                    this.productTask.productImageUrl = url;
                })
            })
            })
        },
    }
}
</script>


<style scoped>
#filter1{
    background: linear-gradient(321.82deg,#21f2ff,#4181ff 59.22%,#4475ff 98.02%),#7196ff;
    color: white;
    border-radius: 10px;
}
#filter2{
    background: linear-gradient(141.85deg,#7e7bff,#ff73fa);
     color: white;
     border-radius: 10px;
}
#filter3{
    background: linear-gradient(
321.73deg
,#ffcd4b -1.09%,#ee6315 100.65%);
color: white;
border-radius: 10px;
}
#filter4{
    background: linear-gradient(
142.53deg
,#00a295,#26e8f4 98.75%),#3dcda7;
color: white;
border-radius: 10px;
}
</style>