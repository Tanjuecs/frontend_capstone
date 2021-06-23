<template>
    <div>
        <div class="container">
            <el-tabs type="card">
                <el-tab-pane label="Add Suppliers">
                    <!-- modify in future development : System Settings Dynamic step title and desc -->
                    <el-steps :active="stepsactive">
                        <el-step title="Supplier Image" description="Upload a picture of your supplier"></el-step>
                        <el-step title="Supplier Details" description="Provide some details for your supplier"></el-step>
                        <el-step title="Finish" description="You're all caught up"></el-step>
                        </el-steps>
                        <div v-if="stepsactive == 0">
                            <el-card shadow="always" style="padding: 20px; margin-top: 20px; margin-bottom: 20px;">
                        <h5>Suppliers Upload Image</h5>
                       <el-tag>Step 1 : Suppliers Upload Image (Optional)</el-tag>
                        <center>
                        <el-avatar shape="square" :size="100" fit="fill" style="margin-bottom: 3px; margin-top: 10px;" :src="img1"></el-avatar>
                            <p style="color: gray;">Preview of image will appear after the uploading.</p>
                        <input type="file" class="btn btn-outline-primary" style="margin-bottom: 6px;" @change="previewImage" accept="image/*" />
                        <el-progress :text-inside="true" style="margin-bottom: 10px;" :stroke-width="26" :percentage="uploadpercent"></el-progress>
                        <el-button type="primary" style=" margin-bottom: 10px;" plain @click="onupload()">Upload now</el-button>
                    </center>
                    </el-card>
                    
                        </div>
                        <div v-else-if="stepsactive == 1">
                            <el-card shadow="always" style="padding: 20px; margin-top: 20px; margin-bottom: 20px;">
                                <div>
                                    <h5>Suppliers Identification Code</h5>
                       <el-tag type="danger">Suppliers IC (Required)</el-tag>&nbsp;
                       <el-tooltip content="This identification code is for search feature" placement="top">
  <i class="el-icon-info"></i>
</el-tooltip>
                       <br>
                       <label style="margin-top: 10px;">Identification Code</label>
                               <el-input
                                    placeholder="Please input identification code"
                                    v-model="supplierTask.supplierIC"
                                    clearable>
                                    </el-input>
                                </div>
                              <div style="margin-top: 20px;">
                                  <hr>
                                    <h5>Suppliers Details</h5>
                       <el-tag type="danger">Suppliers Details (Required)</el-tag>
                       <div class="row" style="margin-top: 20px;">
                           <div class="col-sm">
                               <label>Firstname</label>
                               <el-input
                                    placeholder="Please input firstname"
                                    v-model="supplierTask.supplierfirstname"
                                    clearable>
                                    </el-input>
                           </div>
                           <div class="col-sm">
                               <label>Lastname</label>
                               <el-input
                                    placeholder="Please input lastname"
                                    v-model="supplierTask.supplierlastname"
                                    clearable>
                                    </el-input>
                           </div>
                       </div>
                              </div>
                           <div style="margin-top: 20px;">
                               <hr>
                               <h5>Suppliers Address</h5>
                       <el-tag type="danger">Suppliers Address (Required)</el-tag>
                       <div style="margin-top: 20px;">
                           <label>Primary Address</label>
                           <el-input
                            type="textarea"
                            style="margin-bottom: 20px;"
                            :autosize="{ minRows: 2, maxRows: 4}"
                            placeholder="Please input primary address"
                            v-model="supplierTask.supplierprimary">
                            </el-input>
                            <label>Secondary Address (Optional)</label>
                           <el-input
                            type="textarea"
                            :autosize="{ minRows: 2, maxRows: 4}"
                            placeholder="Please input secondary address"
                            v-model="supplierTask.suppliersecondary">
                            </el-input>
                       </div>
                       <div style="margin-top: 20px;">
                           <hr>
                               <h5>Suppliers Contact Details</h5>
                       <el-tag type="danger">Suppliers Contact Details (Required)</el-tag>
                           <div class="row" style="margin-top: 20px;">
                               <div class="col-sm">
                                   <label>Mobile Number</label>
                                   <el-input
                                    placeholder="Please input mobile number"
                                    v-model="supplierTask.suppliernumber"
                                    clearable>
                                    </el-input>
                               </div>
                               <div class="col-sm">
                                   <label>Email</label>
                                   <el-input
                                    placeholder="Please input email address"
                                    v-model="supplierTask.supplieremail"
                                    clearable>
                                    </el-input>
                               </div>
                           </div>
                       </div>
                           </div>
                            </el-card>
                        </div>
                        <div v-else-if="stepsactive == 3" style="padding: 25px;">
                            <el-card shadow="always" style="margin-top: 30px;">
                                <center>
                                    <img src="https://cdn2.iconfinder.com/data/icons/scenarium-vol-2-1/128/044_check_ok_done_final-128.png"
                                     alt="No image" class="img-fluid" style="width: 7%; height: auto;">
                                     <h3 style="margin-top: 10px; font-weight: bold;">Successfully Completed</h3>
                                     <p>You have Successfully completed all steps. </p>
                                </center>
                            </el-card>
                        </div>
                        <!-- next and previous button here -->
                        <div v-if="stepsactive == 0">
                        <el-button type="primary" style="float: right; margin-bottom: 10px;" @click="onnext()">Next</el-button>
                    </div>
                    <div v-else-if="stepsactive != 0">
                        <div v-if="stepsactive != 3">
                                <el-button type="primary" @click="onnext()" style="float: right; margin-bottom: 10px; margin-top: 10px;">
                                Next
                            </el-button>&nbsp;
                                <el-button type="primary" @click="onprevious()" style="float: right; margin-bottom: 10px; margin-right: 10px; margin-top: 10px;">
                                Previous
                            </el-button>
                            </div>
                            <div v-else style="padding: 25px;">
                                 <el-button @click="onstartover()" type="primary" style="float: right; margin-bottom: 10px; margin-top: 10px;">
                                Start Over
                            </el-button>
                            </div>
                    </div>
                    <div v-else>
                        
                    </div>
                </el-tab-pane>
                <el-tab-pane label="View suppliers">
                    <el-card shadow="always" style="margin-top: 30px; margin-bottom: 20px;" >
                        <el-input
                                    style="margin-bottom: 5px; width: 30%; margin-right: 10px;"
                                    placeholder="Search"
                                    v-model="searchable"
                                    clearable>
                                    </el-input>
                                    <el-button type="primary" style="margin-right: 10px;" plain @click="onfindduplicates()">Find duplicates</el-button>
                                    <el-button type="primary" plain @click="ongetall()">Get All</el-button>
                        <el-button style="float: right; margin-bottom: 10px;" type="primary" plain @click="onswitchview()">{{dataview ? 'Switch to listview' : 'Switch to gridview'}}</el-button>
                        <div v-if="dataview == true">
                            <div v-if="suppliersList == ''">
                                <img src="https://cdn.dribbble.com/users/2382015/screenshots/6065978/no_result.gif"
                                       alt="No Data" style="width: 100%; height: auto;" class="img-fluid">
                            </div>
                            <div v-else>
                                <div class="row" id="mycustomscroll">
                            <div class="col-sm" >
                                    <el-card style="margin-bottom: 20px;" v-for="item in pagedTableData" :key="item.id" shadow="hover">
                                    <el-tag style="margin-bottom: 20px;">Suppliers identification code : {{item.supplierIdentificationCode}}</el-tag>
                                    <center>
                                        <el-avatar shape="square" :size="100" fit="fill" style="margin-bottom: 3px; margin-top: 10px;" :src="item.supplierimgurl"></el-avatar>
                                        <h3>{{item.supplierfirstname + " " + item.supplierlastname}}</h3>
                                    </center>
                                    <hr>
                                    <h5 style="margin-top: 20px;"> Suppliers Information </h5>
                                    <div class="row" style="margin-top: 20px;">
                                        <div class="col-sm">
                                            <span>Email : {{item.supplieremail}}</span>
                                        </div>
                                        <div class="col-sm">
                                            <span>Contact Number : {{item.suppliernumber}}</span>
                                        </div>
                                    </div>
                                    <div class="row" style="margin-top: 20px;">
                                        <div class="col-sm">
                                            <span>Address : {{item.supplierprimaryaddress + " " + item.suppliersecondaryaddress}}</span>
                                        </div>
                                        <div class="col-sm">
                                            <span>Created : {{item.createdAt | moment("calendar")}}</span>
                                        </div>
                                    </div>
                                    <el-button @click="oncall(item.suppliernumber)" type="info" style="float: right; margin-bottom: 10px; margin-top: 20px;"><i class="el-icon-phone"></i> Call</el-button>
                                    <el-button @click="onsendemailoutlook(item.supplieremail)" type="warning" style="float: right; margin-bottom: 10px; margin-top: 20px; margin-right: 10px;"><i class="el-icon-message"></i> Send an email</el-button>
                                    <el-button @click="onremovesupplier(item.id)" type="danger" style="float: right; margin-bottom: 10px; margin-top: 20px; "><i class="el-icon-delete-solid"></i> Remove</el-button>
                                    <el-button @click="onmodifysupplier(
                                        item.id, item.supplierfirstname, item.supplierlastname, item.supplieremail, item.suppliernumber, item.supplierimgurl
                                    )" type="primary" style="float: right; margin-bottom: 10px; margin-top: 20px; "><i class="el-icon-edit"></i> Modify</el-button>
                                </el-card>
                                <!-- modify supplier starts -->
                                            <el-dialog
                                            style="background-color: #ECEFFC;"
                                                    title="Modify Supplier"
                                                    :visible.sync="modifysupplierdialog"
                                                    width="70%"
                                                    :before-close="handleClose">
                                                    <div class="row">
                                                        <div class="col-sm">
                                                            <h5>Edit form</h5>
                                                    <span>Here you can easily edit details for supplier</span>
                                                    <hr>
                                                        <el-card shadow="always">
                                                                <div class="row" style="margin-bottom: 20px;">
                                                                    <center>
                                                                        <el-avatar shape="square" :size="100" fit="fill" style="margin-bottom: 3px; margin-top: 10px;" :src="modifyimg1"></el-avatar>
                                                                            <p style="color: gray;">Preview of image will appear after the uploading.</p>
                                                                        <input type="file" class="btn btn-outline-primary" style="margin-bottom: 6px;" @change="modifypreviewImage" accept="image/*" />
                                                                        <el-progress :text-inside="true" style="margin-bottom: 10px;" :stroke-width="26" :percentage="modifyuploadpercent"></el-progress>
                                                                        <el-button type="primary" style=" margin-bottom: 10px;" plain @click="modifyonupload()">Upload now</el-button>
                                                                    </center>
                                                                    <div class="col-sm">
                                                                        <label>Edit firstname</label>
                                                                        <el-input
                                                                            placeholder="Please input firstname"
                                                                            v-model="modifySupplier.modifyfname"
                                                                            clearable>
                                                                            </el-input>
                                                                    </div>
                                                                    <div class="col-sm">
                                                                        <label>Edit lastname</label>
                                                                        <el-input
                                                                            placeholder="Please input lastname"
                                                                            v-model="modifySupplier.modifylname"
                                                                            clearable>
                                                                            </el-input>
                                                                    </div>
                                                                </div>
                                                                <div class="row" style="margin-bottom: 20px;">
                                                                    <div class="col-sm">
                                                                        <label>Edit phone number</label>
                                                                        <el-input
                                                                            placeholder="Please input phone number"
                                                                            v-model="modifySupplier.modifynumber"
                                                                            clearable>
                                                                            </el-input>
                                                                    </div>
                                                                    <div class="col-sm">
                                                                        <label>Edit email</label>
                                                                        <el-input
                                                                            placeholder="Please input lastname"
                                                                            v-model="modifySupplier.modifylname"
                                                                            clearable>
                                                                            </el-input>
                                                                    </div>
                                                                </div>
                                                                <el-button type="primary" style="float: right; margin-bottom: 10px;" @click="onsavemodifysupplier()">Save</el-button>
                                                        </el-card>
                                                        </div>
                                                        <div class="col-sm">
                                                            <img src="https://cdn.dribbble.com/users/949592/screenshots/4171049/customise.jpg?compress=1&resize=800x600" 
                                                            alt="No image" style="width: 100%; height: auto;" class="img-fluid">
                                                        </div>
                                                    </div>
                                                    
                                                    </el-dialog>
                                                    <!-- modify supplier ends -->
                                <el-pagination layout="prev, pager, next" :page-size="pageSize" :total="this.suppliersList.length" @current-change="setPage">
                                    </el-pagination>
                            </div>
                        </div>
                            </div>
                        </div>
                        <!-- list view mode -->
                        <div v-else>
                            <el-table
                                    :key="0"
                                    v-loading="listLoading"
                                    :data="pagedTableData"
                                    border
                                    fit
                                    highlight-current-row
                                    style="width: 100%;"
                                    
                                    >
                                    <el-table-column label="IC" prop="id" sortable="custom" align="center"  >
                                        <template slot-scope="{row}">
                                        <span>{{ row.supplierIdentificationCode }}</span>
                                        </template>
                                    </el-table-column>
                                    
                                    <el-table-column label="Image" >
                                        <template slot-scope="{row}">
                                        <img :src="row.supplierimgurl" style="width: 100%; height: auto;" class="img-fluid" alt="No image">
                                        <!-- <el-tag>{{ row.type | typeFilter }}</el-tag> -->
                                        </template>
                                    </el-table-column>

                                    <el-table-column label="Firstname" >
                                        <template slot-scope="{row}">
                                        <span class="link-type" >{{ row.supplierfirstname }}</span>
                                        <!-- <el-tag>{{ row.type | typeFilter }}</el-tag> -->
                                        </template>
                                    </el-table-column>

                                     <el-table-column label="Lastname" >
                                        <template slot-scope="{row}">
                                        <span class="link-type" >{{ row.supplierlastname }}</span>
                                        <!-- <el-tag>{{ row.type | typeFilter }}</el-tag> -->
                                        </template>
                                    </el-table-column>

                                    <el-table-column label="Mobile Number" >
                                        <template slot-scope="{row}">
                                        <span class="link-type" >&#8369;{{ row.suppliernumber }}</span>
                                        <!-- <el-tag>{{ row.type | typeFilter }}</el-tag> -->
                                        </template>
                                    </el-table-column>

                                    <el-table-column label="Status" class-name="status-col" >
                                        <template slot-scope="{row}">
                                        <div v-if="row.isstatus == 1">
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
                                        <div v-if="row.isstatus == 0">
                                            <el-button type="primary" size="mini" style="width: 100%; margin-bottom: 10px;">Modify</el-button>
                                            <el-button type="danger" size="mini" style="width: 100%; margin-left: 0px;">Remove</el-button>
                                        </div>
                                        <div v-else>
                                        </div>
                                        </template>
                                    </el-table-column>

                                    </el-table>
                                    <el-pagination layout="prev, pager, next" :page-size="pageSize" :total="this.suppliersList.length" @current-change="setPage">
                                    </el-pagination>
                        </div>
                    </el-card>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div> 
</template>

<script>
import {addsupplier, fetchaddedsuppliers, removesupplier, getduplicates, modifysupplier} from "@/store/request-common"
import firebase from 'firebase'
export default {
    data(){
        return{
            //table start
            listLoading: true,
            searchable: '',
            pageSize: 5,
              page: 1,
            //table ends
            modifysupplierdialog: false,
            img1: '',
            dataview: true, //grid view
            suppliersList: [],
            imgdata: '',
            uploadpercent: 0,
            stepsactive: 0,
            supplierTask: {
                supplierImageURL: '',
                supplierfirstname: '', supplierlastname: '',
                supplierprimary: '', suppliersecondary: '',
                suppliernumber: '', supplieremail :'',
                supplierIC: ''
            },
            modifyimg1: '',
            modifyimgdata: '',
            modifyuploadpercent: 0,
            modifySupplier: {
                modifyimgURL: '',
                modifyID: '',
                modifyfname: '', modifylname: '', modifyemail: '', modifynumber: ''
            }
        }
    },
      computed: {
          pagedTableData() {
       if(this.searchable){
      return this.suppliersList.filter((item)=>{
        return this.searchable.toLowerCase().split(' ').every(v => item.supplierIdentificationCode.toLowerCase().includes(v) || item.supplierfirstname.toLowerCase().includes(v))
      })
      }else{
        return this.suppliersList.slice(this.pageSize * this.page - this.pageSize, this.pageSize * this.page)
      }
       
     }
    },
    created(){
        this.getallsuppliers()
    },
    methods:{
        onsavemodifysupplier(){
            if(!this.modifySupplier.modifyfname || !this.modifySupplier.modifylname
            || !this.modifySupplier.modifyemail || !this.modifySupplier.modifynumber){
                 this.$notify.warning({
                                title: 'Oops',
                                message: 'something is empty',
                                offset: 100
                                });
                                loading.close()
                                return false;
            }else{
                this.$confirm('This will update the supplier information. Continue?', 'Warning', {
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
                        setTimeout(()=> {
                            modifysupplier(this.modifySupplier).then(response => {
                                if(response.data === "empty"){
                                     this.$notify.warning({
                                        title: 'Oops',
                                        message: 'Something is empty',
                                        offset: 100
                                        });
                                        loading.close()
                                        return false;
                                } else if(response.data === "success modify"){
                                    loading.close()
                                     this.$notify.success({
                                title: 'Yey',
                                message: 'Successfully Update',
                                offset: 100
                                });
                                this.getallsuppliers()
                                this.modifysupplierdialog = false
                                }
                            })
                        }, 3000)
                    })
            }
        },
        modifyonupload(){
             const loading = this.$loading({
                    lock: true,
                    text: 'Uploading Image, please wait...',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                });
                this.img1 = null;
                const checkstorage = firebase.storage().ref(`${this.modifyimgdata.name}`)
            .getDownloadURL()
            .then((resolve) => {
               const ref = firebase.storage().ref(`supplier/${this.modifyimgdata.name}`);
               ref.put(this.modifyimgdata.name).then(() => {
                   ref.getDownloadURL().then((url) => {
                       loading.close()
                       this.$notify.success({
                                title: 'Yey',
                                message: 'Successfully Uploaded',
                                offset: 100
                                });
                       this.modifySupplier.modifyimgURL = url;
                   })
               })
            }).catch((err) => {
                const storageRef = firebase.storage().ref(`supplier/${this.modifyimgdata.name}`).put(this.modifyimgdata);
                 storageRef.on(`state_changed`, snapshot => {
                this.modifyuploadpercent = (snapshot.bytesTransferred/snapshot.totalBytes) * 100;

            }, error => {console.log(error.message)},
            () => {
                this.modifyuploadpercent = 100;
                storageRef.snapshot.ref.getDownloadURL().then((url) => {
                    this.img1 = url;
                    loading.close()
                    this.$notify.success({
                                title: 'Yey',
                                message: 'Successfully Uploaded',
                                offset: 100
                                });
                             this.modifySupplier.modifyimgURL = url;
                })
            })
            })
        },
        modifypreviewImage(){
            this.modifyimgdata = event.target.files[0]
            this.modifyimg1 = null
        },
        onmodifysupplier(id, firstname, lastname, email, number, img){
            this.modifysupplierdialog = true;
            this.modifySupplier.modifyID = id
            this.modifySupplier.modifyfname = firstname
            this.modifySupplier.modifylname = lastname
            this.modifySupplier.modifyemail = email
            this.modifySupplier.modifynumber = number
            this.modifySupplier.modifyimgURL = img
            console.log(this.modifySupplier)
        },
        ongetall(){
              this.listLoading = true;
              
            const loading = this.$loading({
                            lock: true,
                            text: 'please wait...',
                            spinner: 'el-icon-loading',
                            background: 'rgba(0, 0, 0, 0.7)'
                        });
                        setTimeout(() => {
                            this.getallsuppliers()
                            loading.close();
                            this.listLoading = false;
                        }, 3000)
        },
        onfindduplicates(){
            this.listLoading = true;
            const loading = this.$loading({
                            lock: true,
                            text: 'please wait...',
                            spinner: 'el-icon-loading',
                            background: 'rgba(0, 0, 0, 0.7)'
                        });
            setTimeout(() => {
                 getduplicates().then(response => {
                     loading.close()
                     this.listLoading = false
                     this.suppliersList = response.data
                    })
            }, 3000)
        },
        onswitchview(){
           if(this.dataview == true){
               this.dataview = false
           } else{
               this.dataview = true
           }
        },
        setPage (val) {
        this.page = val
      },  
        onremovesupplier(id){
            this.$confirm('This supplier will be moved on archive. Continue?', 'Warning', {
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
                            removesupplier(id).then(response => {
                                if(response.data === "success archive"){
                                    loading.close()
                                     this.$notify.success({
                                        title: 'Success',
                                        message: 'Supplier moved to archive successfully',
                                        offset: 100
                                        });  
                                        this.getallsuppliers() 
                                }
                            })
                        }, 3000)
                    })
        },
        oncall(phone){
              this.$confirm('This will open another app for you to call. Continue?', 'Warning', {
                    confirmButtonText: 'OK',
                    cancelButtonText: 'Cancel',
                    type: 'warning'
                    }).then(() => {
                        window.location.href= "tel:" + phone
                    })
        },
        onsendemailoutlook(email){
            this.$confirm('This will open another app for you to send an email. Continue?', 'Warning', {
                    confirmButtonText: 'OK',
                    cancelButtonText: 'Cancel',
                    type: 'warning'
                    }).then(() => {
                        window.location.href= "mailto:" + email
                    })
        },
        getallsuppliers(){
            fetchaddedsuppliers().then(response => {
                this.suppliersList = response.data
                this.listLoading = false;
            })
        },
        onprevious(){
            this.stepsactive--;
        },
        previewImage(event){
            this.imgdata = event.target.files[0]
            this.img1 = null

        },
        onstartover(){
            const loading = this.$loading({
                    lock: true,
                    text: 'adding supplier, please wait...',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                });
                setTimeout(() => {
                    loading.close()
                    this.stepsactive = 0;
                }, 2000)
        },
        onnext(){
            if(this.stepsactive === 0){
                this.stepsactive++;
            } else if(this.stepsactive === 1){
                if(!this.supplierTask.supplierIC){
                    this.$notify.warning({
                                title: 'Uh oh',
                                message: 'Please provide IC',
                                offset: 100
                                });
                                return false;
                } else if(!this.supplierTask.supplierfirstname || !this.supplierTask.supplierlastname){
                    this.$notify.warning({
                                title: 'Uh oh',
                                message: 'Please provide firstname and lastname',
                                offset: 100
                                });
                                return false;
                } else if(!this.supplierTask.supplierprimary){
                    this.$notify.warning({
                                title: 'Uh oh',
                                message: 'Please provide primary address',
                                offset: 100
                                });
                                return false;
                } else if(!this.supplierTask.suppliernumber || !this.supplierTask.supplieremail){
                    this.$notify.warning({
                                title: 'Uh oh',
                                message: 'Please provide number and email',
                                offset: 100
                                });
                                return false;
                }
                else{
                    this.$confirm('This will be the final step. Continue?', 'Warning', {
                    confirmButtonText: 'OK',
                    cancelButtonText: 'Cancel',
                    type: 'warning'
                    }).then(() => {
                        const loading = this.$loading({
                    lock: true,
                    text: 'adding supplier, please wait...',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                });
                setTimeout(() => {
                    addsupplier(this.supplierTask).then(response => {
                        if(response.data === "empty"){
                            this.$notify.warning({
                                title: 'Uh oh',
                                message: 'check the fields',
                                offset: 100
                                });
                                loading.close()
                                return false;
                        } else if(response.data === "success supplier"){
                            loading.close();
                            this.$notify.success({
                                title: 'Noice!',
                                message: 'Successfully added',
                                offset: 100
                                });
                                this.stepsactive = 3
                                this.getallsuppliers()
                        }
                    })
                }, 3000)
                    })
                }
            }
        },
        onupload(){
            const loading = this.$loading({
                    lock: true,
                    text: 'Uploading Image, please wait...',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                });
                this.img1 = null;
                const checkstorage = firebase.storage().ref(`${this.imgdata.name}`)
            .getDownloadURL()
            .then((resolve) => {
               const ref = firebase.storage().ref(`supplier/${this.imgdata.name}`);
               ref.put(this.imgdata.name).then(() => {
                   ref.getDownloadURL().then((url) => {
                       loading.close()
                       this.$notify.success({
                                title: 'Yey',
                                message: 'Successfully Uploaded',
                                offset: 100
                                });
                                this.stepsactive++;
                       this.supplierTask.supplierImageURL = url;
                   })
               })
            }).catch((err) => {
                const storageRef = firebase.storage().ref(`supplier/${this.imgdata.name}`).put(this.imgdata);
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
                                this.stepsactive++;
                    this.supplierTask.supplierImageURL = url;
                })
            })
            })
        }
    }
}
</script>

<style scoped>
#mycustomscroll{
    height: 700px;
    width: 100%;
    overflow: scroll;
}
</style>