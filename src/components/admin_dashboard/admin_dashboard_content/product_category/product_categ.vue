<template>
    <div>
           <div class="container" style="margin-bottom: 10px;">
                   <div class="row">
                       <div class="col-md-6">
                            <el-card shadow="always">
                        <div class="row">
                            <div class="col-md-5">
                                <h4>Product Category | Product Inventory</h4>
                            </div>
                            <div class="col-md-7">
                                <el-button type="success" style="float: right; margin-bottom: 10px;" @click="onaddnewcategory()">Add new category</el-button>
                                 <!-- <el-button type="primary" style="float: right; margin-bottom: 10px; margin-right: 10px;" >{{listview ? 'Gridview' : 'Listview'}}</el-button> -->
                            </div>
                        </div>
                            <!-- <el-input
                                    style="margin-bottom: 5px; width: 30%;"
                                    placeholder="Search"
                                    v-model="searchable"
                                    clearable>
                                    </el-input> -->
                               <el-table
                                    :data="categorydynamicadding"
                                    style="width: 100%">
                                    <el-table-column type="expand">
                                    <template slot-scope="props">
                                        <el-card shadow="always">
                                            
                                            <div class="row">
                                                <div class="col-md-5">
                                                    <h5>Add your category name</h5>
                                                </div>
                                                <div class="col-md-7">
                                                    <el-button type="danger" style="float: right; margin-bottom: 10px;" @click="onremoverow(props.row)">Remove row</el-button>
                                                </div>
                                            </div>
                                            <el-input
                                                placeholder="Please input category name"
                                                v-model="props.row.categoryname"
                                                clearable>
                                                </el-input>
                                        </el-card>
                                    </template>
                                    </el-table-column>
                                    <el-table-column label="Details">
                                        <p>Please select the arrow in the left corner of this table</p>
                                    </el-table-column>
                                    <el-table-column label="Status">
                                        <el-tag type="success" effect="dark">New</el-tag>
                                    </el-table-column>
                                      
                                </el-table>
                                <el-button type="primary" plain style="float: right; margin-bottom: 10px; margin-top: 10px;" @click="onsavebulk()">
                                    Save
                                </el-button>
                                <!-- <el-pagination layout="prev, pager, next" :page-size="pageSize" :total="this.categoryList.length" @current-change="setPage">
                                    </el-pagination> -->
                    </el-card>
                       </div>
                       <div class="col-md-6">
                           <el-table
                                    :key="0"
                                    v-loading="listLoading"
                                    :data="pagedTableData"
                                    border
                                    fit
                                    highlight-current-row
                                    style="width: 100%;"
                                    
                                    >
                                    <el-table-column label="ID" prop="id" sortable="custom" align="center"  >
                                        <template slot-scope="{row}">
                                        <span>{{ row.id }}</span>
                                        </template>
                                    </el-table-column>
                                    
                                    <el-table-column label="Category Name" align="center">
                                        <template slot-scope="{row}">
                                        <span>{{row.categoryname}}</span>
                                        <!-- <el-tag>{{ row.type | typeFilter }}</el-tag> -->
                                        </template>
                                    </el-table-column>

                                    <el-table-column label="Created" align="center">
                                        <template slot-scope="{row}">
                                        <span class="link-type" >{{ row.createdAt | moment('calendar') }}</span>
                                        <!-- <el-tag>{{ row.type | typeFilter }}</el-tag> -->
                                        </template>
                                    </el-table-column>


                                    
                                     <el-table-column width="200" label="Actions" >

                                        <template slot-scope="{row}">
                                        <el-button type="danger" size="small" @click="onremove(row.id)">Remove</el-button>&nbsp;
                                        <el-button type="primary" @click="onedit(row.id, row.categoryname)" size="small">Edit</el-button>
                                        </template>
                                    </el-table-column>

                                    </el-table>
                                    <!-- edit dialog -->
                                            <el-dialog
                                        title="Edit Category"
                                        :visible.sync="dialogVisible"
                                        width="30%"
                                        :before-close="handleClose">
                                        <span>Enter new category name</span>
                                        <el-input
                                        placeholder="Enter new category name"
                                        clearable
                                        v-model="modifyTask.categoryname"
                                        style="margin-top: 10px; margin-bottom: 10px;"
                                        ></el-input>
                                        <span slot="footer" class="dialog-footer">
                                            <el-button @click="dialogVisible = false">Cancel</el-button>
                                            <el-button type="primary" @click="onconfirmmodify()">Confirm</el-button>
                                        </span>
                                        </el-dialog>
                                    <!-- close edit dialog -->
                                     <el-pagination layout="prev, pager, next" :page-size="pageSize" :total="this.categoryList.length" @current-change="setPage">
                                    </el-pagination>
                       </div>
                   </div>
                   <div style="margin-top: 30px;" class="row">
                       <div class="col-md-6">
                           <el-card shadow="always">
                        <div class="row">
                            <div class="col-md-5">
                                <h4>Product Category | Product Finalization</h4>
                            </div>
                            <div class="col-md-7">
                                <el-button type="success" style="float: right; margin-bottom: 10px;" @click="onaddnewcategoryfinal()">Add new category</el-button>
                                 <!-- <el-button type="primary" style="float: right; margin-bottom: 10px; margin-right: 10px;" >{{listview ? 'Gridview' : 'Listview'}}</el-button> -->
                            </div>
                        </div>
                           
                               <el-table
                                    :data="finaliztioncategorydynamicadding"
                                    style="width: 100%">
                                    <el-table-column type="expand">
                                    <template slot-scope="props">
                                        <el-card shadow="always">
                                            
                                            <div class="row">
                                                <div class="col-md-5">
                                                    <h5>Add your category name</h5>
                                                </div>
                                                <div class="col-md-7">
                                                    <el-button type="danger" style="float: right; margin-bottom: 10px;" @click="onremoverowfinal(props.row)">Remove row</el-button>
                                                </div>
                                            </div>
                                            <el-input
                                                placeholder="Please input category name"
                                                v-model="props.row.categoryname"
                                                clearable>
                                                </el-input>
                                        </el-card>
                                    </template>
                                    </el-table-column>
                                    <el-table-column label="Details">
                                        <p>Please select the arrow in the left corner of this table</p>
                                    </el-table-column>
                                    <el-table-column label="Status">
                                        <el-tag type="success" effect="dark">New</el-tag>
                                    </el-table-column>
                                      
                                </el-table>
                                <el-button type="primary" plain style="float: right; margin-bottom: 10px; margin-top: 10px;" @click="onsavebulkfinal()">
                                    Save
                                </el-button>
                                <!-- <el-pagination layout="prev, pager, next" :page-size="pageSize" :total="this.categoryList.length" @current-change="setPage">
                                    </el-pagination> -->
                    </el-card>
                       </div>
                       <div class="col-md-6">
                           <el-table
                                    :key="0"
                                    v-loading="listLoadingfinal"
                                    :data="pagedTableDatafinal"
                                    border
                                    fit
                                    highlight-current-row
                                    style="width: 100%;"
                                    
                                    >
                                    <el-table-column label="ID" prop="id" sortable="custom" align="center"  >
                                        <template slot-scope="{row}">
                                        <span>{{ row.id }}</span>
                                        </template>
                                    </el-table-column>
                                    
                                    <el-table-column label="Category Name" align="center">
                                        <template slot-scope="{row}">
                                        <span>{{row.categoryname}}</span>
                                        <!-- <el-tag>{{ row.type | typeFilter }}</el-tag> -->
                                        </template>
                                    </el-table-column>

                                    <el-table-column label="Created" align="center">
                                        <template slot-scope="{row}">
                                        <span class="link-type" >{{ row.createdAt | moment('calendar') }}</span>
                                        <!-- <el-tag>{{ row.type | typeFilter }}</el-tag> -->
                                        </template>
                                    </el-table-column>


                                    
                                     <el-table-column width="200" label="Actions" >

                                        <template slot-scope="{row}">
                                        <el-button type="danger" size="small" @click="onremovedatafinal(row.id)">Remove</el-button>&nbsp;
                                        <el-button type="primary" @click="oneditdatafinal(row.id, row.categoryname)" size="small">Edit</el-button>
                                        </template>
                                    </el-table-column>

                                    </el-table>
                                    <!-- edit dialog -->
                                            <el-dialog
                                        title="Edit Category"
                                        :visible.sync="dialogVisiblefinal"
                                        width="30%"
                                        :before-close="handleClose">
                                        <span>Enter new category name</span>
                                        <el-input
                                        placeholder="Enter new category name"
                                        clearable
                                        v-model="modifyTaskFinal.categoryname"
                                        style="margin-top: 10px; margin-bottom: 10px;"
                                        ></el-input>
                                        <span slot="footer" class="dialog-footer">
                                            <el-button @click="dialogVisiblefinal = false">Cancel</el-button>
                                            <el-button type="primary" @click="onconfirmmodifyfinal()">Confirm</el-button>
                                        </span>
                                        </el-dialog>
                                    <!-- close edit dialog -->
                                     <el-pagination layout="prev, pager, next" :page-size="pageSize" :total="this.categoryfinallist.length" @current-change="setPagefinal">
                                    </el-pagination>
                       </div>
                   </div>
               </div> 
    </div>
</template>

<script>
import {listcategory, onremovecategory, listcategoryfinal, onremovecategoryfinal} from "@/store/request-common"
import {mapGetters} from 'vuex'
import axios from 'axios'
export default {
    data(){
        return {
            dialogVisible: false,
            dialogVisiblefinal: false,
            listview: true,
            listLoading: true,
            listLoadingfinal: true,
            pageSize: 5,
              page: 1,
            categoryTask: {
                categoryname: ''
            },
            finalcategoryTask: {
                categoryname: ''
            },
            categoryList: [],
            categoryfinallist: [],
            categorydynamicadding: [],
            finaliztioncategorydynamicadding: [],
            searchable: '',
            searchablefinal: '',
            modifyTask: {
                id: '',
                categoryname: ''
            },
            modifyTaskFinal: {
                id: '',
                categoryname: ''
            }
        }
    },
    computed: {
          pagedTableData() {
       if(this.searchable){
      return this.categoryList.filter((item)=>{
        return this.searchable.toLowerCase().split(' ').every(v => item.categoryname.toLowerCase().includes(v))
      })
      }else{
        return this.categoryList.slice(this.pageSize * this.page - this.pageSize, this.pageSize * this.page)
      }
       
     },
     pagedTableDatafinal(){
         if(this.searchablefinal){
      return this.categoryfinallist.filter((item)=>{
        return this.searchablefinal.toLowerCase().split(' ').every(v => item.categoryname.toLowerCase().includes(v))
      })
      }else{
        return this.categoryfinallist.slice(this.pageSize * this.page - this.pageSize, this.pageSize * this.page)
      }
     },
     ...mapGetters({
         get_response_category_modify: 'get_response_category_modify',
         get_response_category_adding_loop: 'get_response_category_adding_loop'
        })
    },
    created(){
        this.getallcategories()
        this.getallcategfinal()
    },
    methods: {
        onconfirmmodify(){
            this.$confirm('Are you sure you want to update this category?', 'Warning', {
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel',
            type: 'warning'
            }).then(() => {
                const loading = this.$loading({
                    lock: true,
                    text: 'Please wait..',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                    });
                    setTimeout(() => {
                        this.$store.dispatch(`ACTIONS_EDIT_CATEGORY`, {
                            object: this.modifyTask
                        }).then(() => {
                            if(this.get_response_category_modify === "success update"){
                                loading.close()
                                this.$notify.success({
                                title: 'Success',
                                message: 'Update Successfully',
                                offset: 100
                                });
                                this.getallcategories()
                                this.dialogVisible = false
                            }
                        })
                    }, 3000)
            })
        },
        onedit: function(id, categoryname){
            this.dialogVisible = true
            this.modifyTask.id = id
            this.modifyTask.categoryname = categoryname
        },
        onremoverowfinal(row){
            this.finaliztioncategorydynamicadding.splice(row, 1)
        },
        onremoverow(row){
            this.categorydynamicadding.splice(row,1)
        },
        onremovedatafinal(id){
             this.$confirm('This will permanently delete. Continue?', 'Warning', {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(()=>{
        const loading = this.$loading({
                    lock: true,
                    text: 'Removing, Please wait..',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                    });
                    setTimeout(() => {
                        onremovecategoryfinal(id).then(response=>{
                            if(response.data==="invalid id"){
                               loading.close()
                                    this.$notify.error({
                                title: 'Error',
                                message: 'Invalid id',
                                offset: 100
                                });
                                return false;
                            }else if(response.data==="success delete"){
                                loading.close()
                                    this.$notify.success({
                                title: 'Success',
                                message: 'Successfully Deleted',
                                offset: 100
                                });
                               this.getallcategfinal()
                            }
                        })
                    }, 3000);
        })
        },
        oneditdatafinal(id, categoryname){
            this.dialogVisiblefinal = true
            this.modifyTaskFinal.id = id
            this.modifyTaskFinal.categoryname = categoryname
        },
        onconfirmmodifyfinal(){
             this.$confirm('Are you sure you want to update this category?', 'Warning', {
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel',
            type: 'warning'
            }).then(() => {
                const loading = this.$loading({
                    lock: true,
                    text: 'Please wait..',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                    });
                    setTimeout(() => {
                        this.$store.dispatch(`ACTIONS_EDIT_CATEGORY_FINAL`, {
                            object: this.modifyTaskFinal
                        }).then(() => {
                            if(this.get_response_category_modify === "success update"){
                                loading.close()
                                this.$notify.success({
                                title: 'Success',
                                message: 'Update Successfully',
                                offset: 100
                                });
                               this.getallcategfinal()
                                this.dialogVisiblefinal = false
                            }
                        })
                    }, 3000)
            })
        },
        onremove(id){
        this.$confirm('This will permanently delete. Continue?', 'Warning', {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(()=>{
        const loading = this.$loading({
                    lock: true,
                    text: 'Removing, Please wait..',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                    });
                    setTimeout(() => {
                        onremovecategory(id).then(response=>{
                            if(response.data==="invalid id"){
                               loading.close()
                                    this.$notify.error({
                                title: 'Error',
                                message: 'Invalid id',
                                offset: 100
                                });
                                return false;
                            }else if(response.data==="success delete"){
                                loading.close()
                                    this.$notify.success({
                                title: 'Success',
                                message: 'Successfully Deleted',
                                offset: 100
                                });
                                this.getallcategories()
                            }
                        })
                    }, 3000);
        })
        },
        onsavebulkfinal(){
            if(!this.finaliztioncategorydynamicadding[0].categoryname){
                 this.$notify.warning({
                                title: 'Warning',
                                message: 'Empty fields please try again.',
                                offset: 100
                                });
                                return false
            }else{
                const loading = this.$loading({
                    lock: true,
                    text: 'adding, Please wait..',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                    });
                    setTimeout(() => {
                        this.$store.dispatch(`ACTIONS_CATEGORY_LOOP_ADD_FINAL`, {
                            Arrayable: this.finaliztioncategorydynamicadding
                        }).then((res) => {
                            if(res.data === "success"){
                                    loading.close()
                                    this.$notify.success({
                                title: 'Success',
                                message: 'Successfully Added',
                                offset: 100
                                });
                                this.finaliztioncategorydynamicadding = []
                                this.getallcategfinal()
                                }else if(res.data === "exist"){
                                    loading.close()
                                    this.$notify.warning({
                                title: 'Oops',
                                message: 'This category name already exist',
                                offset: 100
                                });
                                return false
                                }
                                else if(res.data === "empty"){
                                    loading.close()
                                    this.$notify.error({
                                title: 'Oops',
                                message: 'Empty fields please try again.',
                                offset: 100
                                });
                                return false
                                }
                        })
                    }, 3000)
            }
        },
        onsavebulk(){
            if(!this.categorydynamicadding[0].categoryname){
                 this.$notify.warning({
                                title: 'Warning',
                                message: 'Empty fields please try again.',
                                offset: 100
                                });
                                return false
            }else{
                const loading = this.$loading({
                    lock: true,
                    text: 'adding, Please wait..',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                    });
            setTimeout(() => {
                this.$store.dispatch(`ACTIONS_CATEGORY_LOOP_ADD`, {
                    Arrayable: this.categorydynamicadding
                }).then(() => {
                      if(this.get_response_category_adding_loop === "success"){
                                    loading.close()
                                    this.$notify.success({
                                title: 'Success',
                                message: 'Successfully Added',
                                offset: 100
                                });
                                this.categorydynamicadding = []
                                this.getallcategories();
                                
                                }else if(response.data === "exist"){
                                    loading.close()
                                    this.$notify.warning({
                                title: 'Oops',
                                message: 'This category name already exist',
                                offset: 100
                                });
                                return false
                                }
                                else if(this.get_response_category_adding_loop === "empty"){
                                    loading.close()
                                    this.$notify.error({
                                title: 'Oops',
                                message: 'Empty fields please try again.',
                                offset: 100
                                });
                                return false
                                }
                })
            }, 5000)
            }
             
        },
        onaddnewcategory(){
            this.categorydynamicadding.push({
                categoryname: this.categoryTask.categoryname
            })
        },
        onaddnewcategoryfinal(){
            this.finaliztioncategorydynamicadding.push({
                categoryname: this.finalcategoryTask.categoryname
            })
        },
        getallcategories(){
            listcategory().then(response => {
                this.categoryList = response.data
                this.listLoading = false;
            })
        },
        getallcategfinal(){
            listcategoryfinal().then(response => {
                this.categoryfinallist = response.data
                this.listLoadingfinal = false
            })
        },
        setPage (val) {
        this.page = val
      }, 
      setPagefinal(val){
          this.page = val
      },
        onconfirm: function(){
            if(!this.categoryTask.categoryname){
                 this.$notify.warninng({
                                title: 'Warning',
                                message: 'Empty fields please try again.',
                                offset: 100
                                });
                                return false
            }else{
                const loading = this.$loading({
                    lock: true,
                    text: 'adding, Please wait..',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                    });
                    setTimeout(() => {
                            productcategoryadding(this.categoryTask).then(response => {
                                if(response.data === "success"){
                                    loading.close()
                                    this.$notify.success({
                                title: 'Success',
                                message: 'Successfully Added',
                                offset: 100
                                });
                                }else if(response.data === "exist"){
                                    loading.close()
                                    this.$notify.warning({
                                title: 'Oops',
                                message: 'This category name already exist',
                                offset: 100
                                });
                                return false
                                }
                                else if(response.data === "empty"){
                                    loading.close()
                                    this.$notify.error({
                                title: 'Oops',
                                message: 'Empty fields please try again.',
                                offset: 100
                                });
                                return false
                                }
                            })
                    }, 3000)
            }
        }
    }
}
</script>