<template>
    <div>
           <div class="container" style="margin-bottom: 10px;">
                   <div class="row">
                       <div class="col-md-6">
                            <el-card shadow="always">
                        <div class="row">
                            <div class="col-md-5">
                                <h4>Product Category</h4>
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
                                    
                                    <el-table-column label="category name" >
                                        <template slot-scope="{row}">
                                        <span>{{row.categoryname}}</span>
                                        <!-- <el-tag>{{ row.type | typeFilter }}</el-tag> -->
                                        </template>
                                    </el-table-column>

                                    <el-table-column label="Created" >
                                        <template slot-scope="{row}">
                                        <span class="link-type" >{{ row.createdAt | moment('calendar') }}</span>
                                        <!-- <el-tag>{{ row.type | typeFilter }}</el-tag> -->
                                        </template>
                                    </el-table-column>

                                     <el-table-column label="" >
                                        <template slot-scope="{row}">
                                        <el-button type="danger" size="small" @click="onremove(row.id)">Remove</el-button>
                                        <!-- <el-tag>{{ row.type | typeFilter }}</el-tag> -->
                                        </template>
                                    </el-table-column>

                                    </el-table>
                                     <el-pagination layout="prev, pager, next" :page-size="pageSize" :total="this.categoryList.length" @current-change="setPage">
                                    </el-pagination>
                       </div>
                   </div>
               </div> 
    </div>
</template>

<script>
import {listcategory, onremovecategory} from "@/store/request-common"
import axios from 'axios'
export default {
    data(){
        return {
            dialogVisible: false,
            listview: true,
            listLoading: true,
            pageSize: 5,
              page: 1,
            categoryTask: {
                categoryname: ''
            },
            categoryList: [],
            categorydynamicadding: [],
            searchable: ''
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
       
     }
    },
    created(){
        this.getallcategories()
    },
    methods: {
        onremoverow(row){
            this.categorydynamicadding.splice(row,1)
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
                for(var x = 0; x < this.categorydynamicadding.length; x++){
                    var request = axios.post(`https://localhost:44370/api/product-category-management/add-category?categoryname=${this.categorydynamicadding[x].categoryname}`);
                }
                request.then(response => {
                      if(response.data === "success"){
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
            }, 5000)
            }
             
        },
        onaddnewcategory(){
            this.categorydynamicadding.push({
                categoryname: this.categoryTask.categoryname
            })
        },
        getallcategories(){
            listcategory().then(response => {
                this.categoryList = response.data
                this.listLoading = false;
            })
        },
        setPage (val) {
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