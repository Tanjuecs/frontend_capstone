<template>
    <div>
        <div class="container-fluid">
             <div class="container" style="margin-bottom: 20px;">
                 <div style="display: inline;">
                     <el-button style="margin-bottom: 5px;" type="primary" @click="onadd_admin()">Add Administrator</el-button>
                     <el-button style="margin-bottom: 5px;" type="primary" @click="onadd_cashier()">Add Cashier</el-button>
                 </div>
                <!-- Add Admin Dialog -->
                 <el-drawer
            title="Add Administrator"
            :visible.sync="drawer"
            :with-header="false">

            <div class="container" style="margin-top: 50px; padding: 25px;">
                <h4>Add administrators</h4>
                <el-alert
                    title="Here you can add administrators users."
                    type="success" :closable="false">
                </el-alert>

                <el-card shadow="always" style="margin-top: 20px;">
                    <!-- 1 -->
                    <div class="row" style="margin-bottom: 20px;">
                        <div class="col-sm">

                            <el-input
                            placeholder="Please input first name"
                            v-model="add_admin_task.adminfirstname"
                            clearable>
                            </el-input>
                        </div>
                        <div class="col-sm">
                            <el-input
                            placeholder="Please input last name"
                            v-model="add_admin_task.adminlastname"
                            clearable>
                            </el-input>
                        </div>
                    </div>
                    <!-- 2 -->
                            <el-input
                            placeholder="Please input email"
                            v-model="add_admin_task.adminemail"
                             style="width: 100%; margin-bottom: 20px;"
                            clearable>
                            </el-input>

                            <div class="row" style="margin-bottom: 20px;">
                                <div class="col-sm">
                                     <el-input
                                    placeholder="Please input password"
                                    style="margin-bottom: 10px;"
                                    v-model="add_admin_task.adminpassword"
                                    type="password"
                                    clearable show-password>
                                    </el-input>
                                    <el-button type="warning" @click="ongenerate()" style="width: 100%; margin-bottom: 5px;" plain size="small">Generate Password</el-button>
                                    <el-button type="primary" @click="copyclip()" style="width: 100%; margin-left: 0px;" plain size="small">Copy to clipboard</el-button>
                                </div>
                                <div class="col-sm">
                                     <el-input
                                    placeholder="Please confirm password"
                                    v-model="add_admin_task.adminconfirmpass"
                                    type="password"
                                    clearable show-password>
                                    </el-input>
                                </div>
                            </div>
                        <el-card style="margin-top: 10px; margin-bottom: 10px;" shadow="always">
                            <h5>Default settings</h5>
                            <el-alert
                            style="margin-bottom: 20px;"
                                title="You can't edit this default settings upon adding."
                                type="warning" :closable="false">
                            </el-alert>
                            <el-switch
                                    style="display: block; margin-bottom: 20px;"
                                    v-model="add_admin_task.isadmin"
                                    active-color="#13ce66"
                                    inactive-color="#ff4949"
                                    active-text="Administrator"
                                    disabled
                                    inactive-text="Not administrator">
                                    </el-switch>

                                    <el-switch
                                    style="display: block; margin-bottom: 20px;"
                                    v-model="add_admin_task.isactivate"
                                    active-color="#13ce66"
                                    inactive-color="#ff4949"
                                    active-text="Activate"
                                    disabled
                                    inactive-text="Deactivate">
                                    </el-switch>

                                    <el-switch
                                    style="display: block; margin-bottom: 20px;"
                                    v-model="add_admin_task.googleverified"
                                    active-color="#13ce66"
                                    inactive-color="#ff4949"
                                    active-text="Google Verified"
                                    disabled
                                    inactive-text="Not verified">
                                    </el-switch>
                        </el-card>
                    <el-button type="primary" @click="onsubmit()" :loading="btnloading" style="margin-bottom: 20px; float: right;">{{btnloading ? 'Submitting ...' : 'Submit'}}</el-button>
                </el-card>
            </div>

            </el-drawer>
             <!-- End Add Admin Dialog -->
             <!-- Start add cashier -->
          <el-drawer
            title="Add Cashier"
            :visible.sync="cashierdrawer"
            :with-header="false">

            <div class="container" style="margin-top: 50px; padding: 25px;">
                <h4>Add Cashier</h4>
                <el-alert
                    title="Here you can add Cashier users."
                    type="success" :closable="false">
                </el-alert>

                <el-card shadow="always" style="margin-top: 20px;">
                    <!-- 1 -->
                    <div class="row" style="margin-bottom: 20px;">
                        <div class="col-sm">

                            <el-input
                            placeholder="Please input first name"
                            v-model="add_cashier_task.cashierfirstname"
                            clearable>
                            </el-input>
                        </div>
                        <div class="col-sm">
                            <el-input
                            placeholder="Please input last name"
                            v-model="add_cashier_task.cashierlastname"
                            clearable>
                            </el-input>
                        </div>
                    </div>
                    <!-- 2 -->
                            <el-input
                            placeholder="Please input email"
                            v-model="add_cashier_task.cashieremail"
                             style="width: 100%; margin-bottom: 20px;"
                            clearable>
                            </el-input>

                            <div class="row" style="margin-bottom: 20px;">
                                <div class="col-sm">
                                     <el-input
                                    placeholder="Please input password"
                                    style="margin-bottom: 10px;"
                                    v-model="add_cashier_task.cashierpassword"
                                    type="password"
                                    clearable show-password>
                                    </el-input>
                                    <el-button type="warning" @click="ongeneratecashier()" style="width: 100%; margin-bottom: 5px;" plain size="small">Generate Password</el-button>
                                    <el-button type="primary" @click="copyclipcashier()" style="width: 100%; margin-left: 0px;" plain size="small">Copy to clipboard</el-button>
                                </div>
                                <div class="col-sm">
                                     <el-input
                                    placeholder="Please confirm password"
                                    v-model="add_cashier_task.cashierconfirmpass"
                                    type="password"
                                    clearable show-password>
                                    </el-input>
                                </div>
                            </div>
                        <el-card style="margin-top: 10px; margin-bottom: 10px;" shadow="always">
                            <h5>Default settings</h5>
                            <el-alert
                            style="margin-bottom: 20px;"
                                title="You can't edit this default settings upon adding."
                                type="warning" :closable="false">
                            </el-alert>
                            <el-switch
                                    style="display: block; margin-bottom: 20px;"
                                    v-model="add_cashier_task.iscashier"
                                    active-color="#13ce66"
                                    inactive-color="#ff4949"
                                    active-text="Cashier"
                                    disabled
                                    inactive-text="Not Cashier">
                                    </el-switch>

                                    <el-switch
                                    style="display: block; margin-bottom: 20px;"
                                    v-model="add_cashier_task.isactivate"
                                    active-color="#13ce66"
                                    inactive-color="#ff4949"
                                    active-text="Activate"
                                    disabled
                                    inactive-text="Deactivate">
                                    </el-switch>

                                    <el-switch
                                    style="display: block; margin-bottom: 20px;"
                                    v-model="add_cashier_task.googleverified"
                                    active-color="#13ce66"
                                    inactive-color="#ff4949"
                                    active-text="Google Verified"
                                    disabled
                                    inactive-text="Not verified">
                                    </el-switch>
                        </el-card>
                    <el-button type="primary" @click="onsubmitcashier()" :loading="btnloading" style="margin-bottom: 20px; float: right;">{{btnloading ? 'Submitting ...' : 'Submit'}}</el-button>
                </el-card>
            </div>

            </el-drawer>
             <!-- end add cashier -->
                 <hr>
                                  <div style="display: inline;">
                                        <el-input
                                    style="margin-bottom: 5px; width: 30%;"
                                    placeholder="Search"
                                    v-model="searchable"
                                    clearable>
                                    </el-input>&nbsp;

                                      <el-select v-model="value" @change="onfilteruser()" filterable placeholder="Filter users">
                                        <el-option
                                        v-for="item in options"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                        </el-option>
                                    </el-select>&nbsp;



                                    <!-- <el-popover
                                        placement="right"
                                        width="400"
                                        trigger="click">
                                        <el-card style="width: 100%; margin-bottom: 10px; height: auto;" shadow="always">
                                            <div class="row">
                                                <div class="col-md-4">
                                                    <img src="https://cdn1.iconfinder.com/data/icons/popicon-bluetone-seo-1/256/10-256.png"
                                                     alt="No image" style="width: 100%; height: auto; border-radius: 2px;">
                                                </div>
                                                <div class="col-md-8">
                                                    <h3>Administrator</h3>
                                                    <p>Show all archives for administrator</p>
                                                    <el-button @click="fetch_archive_admin()" style="width: 100%;" type="warning">Fetch list</el-button>

                                                </div>
                                            </div>
                                        </el-card>
                                        <el-card style="width: 100%; margin-bottom: 10px; height: auto;" shadow="always">
                                            <div class="row">
                                                <div class="col-md-4">
                                                    <img src="https://cdn0.iconfinder.com/data/icons/business-finance-vol-2-56/512/cashier_window_bank_finance-256.png"
                                                     alt="No image" style="width: 100%; height: auto; border-radius: 2px;">
                                                </div>
                                                <div class="col-md-8">
                                                    <h3>Cashiers</h3>
                                                    <p>Show all archives for cashiers</p>
                                                    <el-button style="width: 100%;" type="warning" @click="fetch_archive_customer()">Fetch list</el-button>

                                                </div>
                                            </div>
                                        </el-card>

                                        <el-button type="warning" slot="reference">Show archives</el-button>
                                    </el-popover>&nbsp; -->
                                    <el-button @click="fetch_all()"  type="info">Fetch all</el-button>
                                  </div>
                                    <h3>{{dynamicTitle}}</h3>
                                  <el-table
                                    :key="0"
                                    v-loading="listLoading"
                                    :data="pagedTableData"
                                    border
                                    fit
                                    highlight-current-row
                                    style="width: 100%;"

                                    >
                                    <el-table-column label="ID" prop="id" align="center"  >
                                        <template slot-scope="{row}">
                                        <span>{{ row.id }}</span>
                                        </template>
                                    </el-table-column>

                                    
                                    <el-table-column label="First name" align="center" >

                                        <template slot-scope="{row}">
                                        <span class="link-type" >{{ row.firstname }}</span>
                                        <!-- <el-tag>{{ row.type | typeFilter }}</el-tag> -->
                                        </template>
                                    </el-table-column>

                                     <el-table-column label="Last name"  align="center">
                                        <template slot-scope="{row}">
                                        <span class="link-type" >{{ row.lastname }}</span>
                                        <!-- <el-tag>{{ row.type | typeFilter }}</el-tag> -->
                                        </template>
                                    </el-table-column>

                                    
                                    <!-- <el-table-column label="Status"  align="center">

                                        <template slot-scope="{row}">
                                        <div v-if="row.isstatus == 1 && row.isarchive == 0">
                                            <el-tag type="success">
                                            Active
                                        </el-tag>
                                        </div>
                                        <div v-else-if="row.isstatus == 1 && row.isarchive == 1">
                                                <el-tag type="warning">
                                            Deleted
                                        </el-tag>
                                        </div>
                                        <div v-else>
                                            <el-tag type="danger">
                                            Inactive
                                        </el-tag>
                                        </div>
                                        </template>
                                    </el-table-column>

                                    <el-table-column label="Verified" align="center">
                                        <template slot-scope="{row}">
                                        <div v-if="row.isverified == 1 && row.isarchive == 0">
                                            <el-tag type="success">
                                            Yes
                                        </el-tag>
                                        </div>
                                        <div v-else-if="row.isverified == 1 && row.isarchive == 1">
                                            <el-tag type="warning">
                                            Deleted
                                        </el-tag>
                                        </div>
                                        <div v-else>
                                            <el-tag type="danger">
                                            No
                                        </el-tag>
                                        </div>
                                        </template>
                                    </el-table-column> -->


                                    <el-table-column label="User Level" width="150" align="center">
                                        <template slot-scope="{row}">
                                        <div v-if="row.istype == 1">
                                            <el-tag effect="dark" type="success">
                                            Administrator
                                        </el-tag>
                                        </div>
                                        <div v-else>
                                            <el-tag effect="dark" type="warning">
                                            Cashier
                                        </el-tag>
                                        </div>
                                        
                                        </template>
                                    </el-table-column>

                                    <el-table-column label="Created"  align="center">
                                        <template slot-scope="{row}">
                                        <span>{{ row.createdAt | moment("calendar") }}</span>
                                        </template>
                                    </el-table-column>

                                    <el-table-column width="300" label="More Actions"  align="center">
                                        <template slot-scope="{row}">
                                            <div class="row">
                                                <div class="col-md-6">
                                                     <div v-if="row.isstatus == 1">

                                        </div>
                                        <div v-else>
                                            <el-button @click="onremoveuser(row.id, row.firstname, row.lastname, row.istype)" type="danger" size="small">Remove</el-button>&nbsp;
                                            
                                        </div>
                                       
                                                </div>
                                                <div class="col-md-6">
 <el-button type="warning" size="small">Change Password</el-button>
                                                </div>
                                            </div>
                                        </template>
                                    </el-table-column>

                                    </el-table>
                                    <el-pagination layout="prev, pager, next" :page-size="pageSize" :total="this.oopusers.length" @current-change="setPage">
                                    </el-pagination>
                        </div>
        </div>
    </div>
</template>

<script>
import {
listofuseres,
deactivate_user,
activate_user,
filter_user,
archive_user,
fetch_archive_list, add_admin,add_cashier, activitylog_usermanagement, activitylog_usermanagement_remove, remove_user,
archive_users
} from "@/store/request-common";
//import dialogusermanagement from "@/components/admin_dashboard/admin_dashboard_content/usrmngmnt_modal/dialog_usermanagement";
export default {
    components: {
        //dialogusermanagement
    },
      data(){
          return{
              //add admin registered data
                add_admin_task: {
                    isadmin: true,
                isactivate: true,
                googleverified: true,
                adminfirstname: '', adminlastname: '',
                adminemail: '', adminpassword: '', adminconfirmpass: '',
                imgurl: 'https://cdn.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png'
                },
                drawer: false,
                cashierdrawer: false,
                btnloading: false,
              //end admin registered data

            //   Add Cashier regitered data
            add_cashier_task: {
                    iscashier: true,
                isactivate: true,
                googleverified: true,
                cashierfirstname: '', cashierlastname: '',
                cashieremail: '', cashierpassword: '', cashierconfirmpass: '',
                imgurl: 'https://cdn.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png'
                },
            //end cashier registered data



              dynamicTitle: 'All Users',
              oopusers: [],
              searchable: '',
              pageSize: 5,
              page: 1,
              listLoading: true,
              editableTabsValue: '1',
              editableTabs: [{
                title: 'User Management',
                name: '1',
                content: ''
                }],
                 options: [{
                    value: '1',
                    label: 'Administrators'
                    }, {
                    value: '0',
                    label: 'Cashiers'
                    }, ],
                    value: '',
                    codeactivity: '',
                    archiveID: ''
          }
      },
    computed: {
          pagedTableData() {
       if(this.searchable){
      return this.oopusers.filter((item)=>{
        return this.searchable.toLowerCase().split(' ').every(v => item.firstname.toLowerCase().includes(v) || item.id.toString().toLowerCase().includes(v))
      })
      }else{
        return this.oopusers.slice(this.pageSize * this.page - this.pageSize, this.pageSize * this.page)
      }

     }
    },
    created(){
        this.fetchAllUsersdata()
        this.makeid(5)
        this.makearchiveid(5)
    },
    methods: {
        onremoveuser(uid, firstname, lastname, type){
            this.$confirm('Are you sure you want to remove this user?', 'Warning', {
                confirmButtonText: 'OK',
                cancelButtonText: 'Cancel',
                type: 'warning'
                }).then(() =>
                {
                    const loading = this.$loading({
                    lock: true,
                    text: 'Removing, Please wait..',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                    });
                    setTimeout(()=> {
                      archive_users(uid, firstname, lastname, type, this.archiveID).then(res => {
                          if(res.data.message === "success"){
                            loading.close()
                            this.$notify.success({
                            title: 'Success',
                            message: 'Successfully remove',
                            offset: 100
                            });
                            this.fetchAllUsersdata();
                            activitylog_usermanagement_remove(this.codeactivity).then(res => {
                                    if(res.data.message === "success"){
                                        this.makeid(5)
                                        this.makearchiveid(5)
                                    }
                                })
                          }
                      })
                    }, 3000)
                }).catch(() => {
                        this.$notify.info({
                            title: 'Info',
                            message: 'Cancel remove',
                            offset: 100
                            });
                            return false;
                })
        },
        makeid(length) {
            var result           = [];
            var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            var charactersLength = characters.length;
            for ( var i = 0; i < length; i++ ) {
                result.push(characters.charAt(Math.floor(Math.random() *
            charactersLength)));
            }
            return this.codeactivity = result.join('');
            },
            makearchiveid(length) {
            var result           = [];
            var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            var charactersLength = characters.length;
            for ( var i = 0; i < length; i++ ) {
                result.push(characters.charAt(Math.floor(Math.random() *
            charactersLength)));
            }
            return this.archiveID = result.join('');
            },
        onsubmitcashier(){
            this.$confirm('Are you sure you want to add this user as cashier?', 'Warning', {
                confirmButtonText: 'OK',
                cancelButtonText: 'Cancel',
                type: 'warning'
                }).then(() => {
                        this.btnloading = true;
                        const loading = this.$loading({
                    lock: true,
                    text: 'adding, Please wait..',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                    });
                        setTimeout(() => {

                            add_cashier(this.add_cashier_task).then(response => {
                                if(response.data === "success") {
                                    loading.close()
                                    this.btnloading = false;
                                    this.$message({
                                        message: 'Successfully Added',
                                        type: 'success'
                                    })
                                    this.fetchAllUsersdata();
                                    //clear fields - assign to jastine or sherilyn
                                }
                            })
                        }, 4000)
                })
                .catch(()=> {
                     this.$message('No action');
                     return false;
                })
        },
        onadd_cashier(){
            this.cashierdrawer = true;
        },
        copyclip(){
            this.$copyText(this.add_admin_task.adminpassword).then(() => {
                         this.$notify.success({
                                title: 'Success',
                                message: 'Successfully copied to clipboard',
                                offset: 100
                                });
                                return false;
            })
        },
        copyclipcashier(){
            this.$copyText(this.add_cashier_task.cashierpassword).then(() => {
                         this.$notify.success({
                                title: 'Success',
                                message: 'Successfully copied to clipboard',
                                offset: 100
                                });
                                return false;
            })
        },
        ongenerate(){
            if(!this.add_admin_task.adminpassword){
                const loading = this.$loading({
                    lock: true,
                    text: 'generating, Please wait..',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                    });
            setTimeout(() => {
                loading.close()
                this.generateSystemPassword(10);
                this.add_admin_task.adminconfirmpass = this.add_admin_task.adminpassword
                this.$notify.success({
                                title: 'Success',
                                message: 'Successfully generated',
                                offset: 100
                                });
                                return false;
            }, 3000)
            }else{
                this.$confirm('Are you sure you want to generate password?', 'Warning', {
                confirmButtonText: 'OK',
                cancelButtonText: 'Cancel',
                type: 'warning'
                }).then(() => {
                    this.add_admin_task.adminpassword = "";
                    this.add_admin_task.adminconfirmpass = "";

                     const loading = this.$loading({
                    lock: true,
                    text: 'generating, Please wait..',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                    });
            setTimeout(() => {
                loading.close()
                this.generateSystemPassword(10);
                this.add_admin_task.adminconfirmpass = this.add_admin_task.adminpassword
                this.$notify.success({
                                title: 'Success',
                                message: 'Successfully generated',
                                offset: 100
                                });
                                return false;
            }, 3000)
                }).catch(() => {
                    this.$notify.info({
                                title: 'Info',
                                message: 'No action',
                                offset: 100
                                });
                                return false;
                })
            }

        },
        ongeneratecashier(){
            if(!this.add_cashier_task.cashierpassword){
                const loading = this.$loading({
                    lock: true,
                    text: 'generating, Please wait..',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                    });
            setTimeout(() => {
                loading.close()
                this.generateSystemPasswordcashier(10);
                this.add_cashier_task.cashierconfirmpass = this.add_cashier_task.cashierpassword
                this.$notify.success({
                                title: 'Success',
                                message: 'Successfully generated',
                                offset: 100
                                });
                                return false;
            }, 3000)
            }else{
                this.$confirm('Are you sure you want to generate password?', 'Warning', {
                confirmButtonText: 'OK',
                cancelButtonText: 'Cancel',
                type: 'warning'
                }).then(() => {
                    this.add_cashier_task.cashierpassword = "";
                    this.add_cashier_task.cashierconfirmpass = "";

                     const loading = this.$loading({
                    lock: true,
                    text: 'generating, Please wait..',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                    });
            setTimeout(() => {
                loading.close()
                this.generateSystemPasswordcashier(10);
                this.add_cashiertask.cashierconfirmpass = this.add_cashier_task.cashierpassword
                this.$notify.success({
                                title: 'Success',
                                message: 'Successfully generated',
                                offset: 100
                                });
                                return false;
            }, 3000)
                }).catch(() => {
                    this.$notify.info({
                                title: 'Info',
                                message: 'No action',
                                offset: 100
                                });
                                return false;
                })
            }

        },
        generateSystemPassword(length){
            var result = "";
            var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            var charlength = characters.length;
            for(var i = 0; i < length; i++){
                result += characters.charAt(Math.floor(Math.random() * charlength));
            }
            return this.add_admin_task.adminpassword = result;
        },
        generateSystemPasswordcashier(length){
            var result = "";
            var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            var charlength = characters.length;
            for(var i = 0; i < length; i++){
                result += characters.charAt(Math.floor(Math.random() * charlength));
            }
            return this.add_cashier_task.cashierpassword = result;
        },
        onsubmit(){
                this.$confirm('Are you sure you want to add this user as admin?', 'Warning', {
                confirmButtonText: 'OK',
                cancelButtonText: 'Cancel',
                type: 'warning'
                }).then(() => {
                        this.btnloading = true;
                        const loading = this.$loading({
                    lock: true,
                    text: 'adding, Please wait..',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                    });
                        setTimeout(() => {
                            add_admin(this.add_admin_task).then(response => {
                                if(response.data === "success") {
                                    loading.close()
                                    this.btnloading = false;
                                    this.$message({
                                        message: 'Successfully Added',
                                        type: 'success'
                                    })
                                    this.fetchAllUsersdata();
                                    activitylog_usermanagement(this.codeactivity).then(res => {
                                        if(res.data.message === "success"){
                                            this.makeid(5)
                                        }
                                    })
                                    //clear fields - assign to jastine or sherilyn
                                }
                            })
                        }, 4000)
                })
                .catch(()=> {
                     this.$message('No action');
                     return false;
                })
        },
        onadd_admin(){
            this.drawer = true
        },

        fetch_all(){
            this.fetchAllUsersdata()
        },
        fetch_archive_admin(){
          this.listLoading = true;
           setTimeout(() => {
                fetch_archive_list(1).then((response) => {
                    this.listLoading = false;
                this.oopusers = response.data;
            })
           }, 3000)
        },
        fetch_archive_customer(){
        this.listLoading = true;
           setTimeout(() => {
                fetch_archive_list(3).then((response) => {
                    this.listLoading = false;
                this.oopusers = response.data;
                // console.log(response.data)
            })
           }, 3000)
        },
        onremove(id){
            this.$confirm('Are you sure you want to remove this user?', 'Warning', {
                confirmButtonText: 'OK',
                cancelButtonText: 'Cancel',
                type: 'warning'
                }).then(() =>
                {
                    const loading = this.$loading({
                    lock: true,
                    text: 'Removing, Please wait..',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                    });
                    setTimeout(()=> {
                        archive_user(id, 3).then((response) => {
                            if(response.data === "Success archive"){
                                loading.close()
                                this.$notify.success({
                                title: 'Success',
                                message: 'Successfully remove',
                                offset: 100
                                });
                                this.fetchAllUsersdata();
                            }
                        })
                    }, 3000)
                }).catch(() => {
                        this.$notify.info({
                            title: 'Info',
                            message: 'Cancel remove',
                            offset: 100
                            });
                            return false;
                })
        },
        onfilteruser()
        {
            this.listLoading = true;
            filter_user(this.value).then((response) => {
                if(response.data === "empty"){
                    alert("invalid fetch");
                    return false;
                }else{
                   setTimeout(() => {
                        this.listLoading = false;
                    this.oopusers = response.data
                    if(this.value === "1"){
                        this.dynamicTitle = "All administrators";
                    }else {
                         this.dynamicTitle = "All cashiers";
                    }
                   }, 3000)
                }
            })
        },
        onactivate(id){
 this.$confirm('Are you sure you want to activate this user?', 'Warning', {
                confirmButtonText: 'OK',
                cancelButtonText: 'Cancel',
                type: 'warning'
                }).then(() => {
                    const loading = this.$loading({
                    lock: true,
                    text: 'Activating, Please wait..',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                    });
                    setTimeout(() => {
                        activate_user(id, 2).then((response) => {
                            if(response.data === "invalid id"){
                                loading.close()
                                this.$notify.error({
                            title: 'Error',
                            message: 'Invalid ID, please try again.',
                            offset: 100
                            });
                                return false;
                            }else if(response.data === "success activate") {
                                loading.close()
                                this.fetchAllUsersdata()
                                 this.$notify.success({
                            title: 'Success',
                            message: 'Successfully Activated',
                            offset: 100
                            });

                            }
                        })
                    }, 3000)
                }).catch(() => {
                    this.$notify.info({
                            title: 'Info',
                            message: 'Cancel deactivationn',
                            offset: 100
                            });
                            return false;
                })
        },
        ondeactivate(id){
            this.$confirm('Are you sure you want to deactivate this user?', 'Warning', {
                confirmButtonText: 'OK',
                cancelButtonText: 'Cancel',
                type: 'warning'
                }).then(() => {
                    const loading = this.$loading({
                    lock: true,
                    text: 'Deactivating, Please wait..',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                    });
                    setTimeout(() => {
                        deactivate_user(id, 1).then((response) => {
                            if(response.data === "invalid id"){
                                loading.close()
                                this.$notify.error({
                            title: 'Error',
                            message: 'Invalid ID, please try again.',
                            offset: 100
                            });
                                return false;
                            }else if(response.data === "success deactivate") {
                                loading.close()
                                this.fetchAllUsersdata()
                                 this.$notify.success({
                            title: 'Success',
                            message: 'Successfully Deactivated',
                            offset: 100
                            });

                            }
                        })
                    }, 3000)
                }).catch(() => {
                    this.$notify.info({
                            title: 'Info',
                            message: 'Cancel deactivationn',
                            offset: 100
                            });
                            return false;
                })
        },
      setPage (val) {
        this.page = val
      },
      fetchAllUsersdata(){
          listofuseres().then((response) => {
              this.listLoading = false;
              this.oopusers = response.data.bulk
              console.log(this.oopusers)
          })
      }
    },

}
</script>
