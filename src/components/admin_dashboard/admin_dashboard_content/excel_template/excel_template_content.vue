<template>
    <div>
        <div class="container-fluid" style="margin-bottom: 50px;">
              <el-tabs type="card" @tab-click="handleClick">
                    <el-tab-pane label="Documentation">Documentation</el-tab-pane>
                    <el-tab-pane label="Upload Excel Template">
                        <div class="container">
                            <div class="row">
                                <div class="col-sm">
                                       <el-card shadow="always">
                                           <h4>Upload your excel template.</h4>
                                            <el-input
                                        placeholder="Please input template name"
                                        v-model="templateTask.templatename" style="margin-bottom: 30px;"
                                        clearable>
                                        </el-input>
                                        <center>
                                           
                                            <input type="file" class="btn btn-outline-primary" style="margin-bottom: 6px;" @change="previewImage" accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" />
                                            <el-progress :text-inside="true" style="margin-bottom: 10px;" :stroke-width="26" :percentage="uploadpercent"></el-progress>
                                            <el-button type="primary" style=" margin-bottom: 10px;" plain @click="onupload()">Upload now</el-button>
                                        </center>
                                        <el-button type="primary" plain style="float: right; margin-bottom: 20px;" @click="onexcelsave()">Save</el-button>
                                       </el-card>
                                </div>
                                <div class="col-sm">
                                    <img src="https://cdn.dribbble.com/users/745861/screenshots/15380971/media/cc616fe8ef9ee288f82bebf81fb5a44d.png?compress=1&resize=1200x900"
                                     alt="" style="width: 100%; height: auto;" class="img-fluid">
                                </div>
                            </div>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="Export excel template">
                        
                        <div id="mycustomscroll">
                            <div class="row">
                            <div class="col-sm">
                                <el-card shadow="always" id="excelcard1">
                                    <center>
                                        <img src="https://cdn1.iconfinder.com/data/icons/e-commerce-retro-pack-vol-1/115/inventory_management-256.png" 
                                        alt="No image" style="width: 25%; height: auto; margin-bottom: 20px;">
                                        <h5>Inventory / Stocks</h5>
                                        <p>Export your custom excel template for your inventory or stocks</p>
                                    </center>
                                    <div class="row">
                                       
                                       <el-popover
                                            placement="right"
                                            width="400"
                                            trigger="click">
                                            <el-card shadow="always">
                                               <center>
                                                    <img src="https://cdn3.iconfinder.com/data/icons/documentation-blue-red/61/037_-_Copy_Document-256.png" 
                                                alt="No image" style="width: 25%; height: auto;" class="img-fluid">
                                                <h4>Documentation</h4>
                                               </center>
                                                
                                                <p>View our documentation regarding with inventory / stocks excel format</p>
                                                <el-button style="width: 100%; margin-top: 10px;" type="warning">View</el-button>
                                            </el-card>
                                             <el-card shadow="always" style="margin-top: 10px;">
                                               <center>
                                                    <img src="https://cdn4.iconfinder.com/data/icons/logos-and-brands/512/119_Excel_logo_logos-256.png" 
                                                alt="No image" style="width: 25%; height: auto;" class="img-fluid">
                                                <h4>Export to Excel</h4>
                                               </center>
                                                
                                                <p>This is applicable for both inventory and stocks data.</p>
                                                
                                                <download-excel
                                            class="btn btn-default"
                                            :data="json_data"
                                            worksheet="My Worksheet"
                                            name="filename.xls"
                                            style="width: 100%;"
                                            >
                                                <el-button type="primary" style="width: 100%;">Export</el-button>
                                            </download-excel>
                                            </el-card>
                                            <el-button slot="reference" type="warning" style="width: 100%;">More Actions</el-button>
                                            </el-popover>
                                       <!-- <download-excel
                                            class="btn btn-default"
                                            :data="json_data"
                                            worksheet="My Worksheet"
                                            name="filename.xls"
                                            >
                                                <el-button style="width: 100%;" @click="onexport()" type="danger">Export</el-button>
                                            </download-excel> -->
                                            
                                    </div>
                                </el-card>
                            </div>
                            
                            <div class="col-sm">

                            </div>
                            <div class="col-sm">

                            </div>
                        </div>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="Templates List">
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
                                    
                                    
                                    <el-table-column label="Template Name" >
                                        <template slot-scope="{row}">
                                        <span class="link-type" >{{ row.tname }}</span>
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
                                        <a :href="row.turl" target="_blank" class="btn btn-primary">Download</a>
                                        </template>
                                    </el-table-column>

                                    </el-table>
                                    <el-pagination layout="prev, pager, next" :page-size="pageSize" :total="this.templatelist.length" @current-change="setPage">
                                    </el-pagination>
                    </el-tab-pane>
                </el-tabs>
        </div>
    </div>
</template>
<script>
import JsonExcel from "vue-json-excel";
import firebase from 'firebase';
import {saveExcel, getlisttemplates} from "@/store/request-common"
export default {
    data(){
        return{
            templatedialog1: false,
            pageSize: 5,
              page: 1,
              listLoading: true,
               searchable: '',
            templatelist: [],
            uploadpercent: 0,
            filedata: '',
            templateTask:{
                templatename: '',
                templateURL: ''
            },
            json_data: [
                {
                    productCode: "1234",
                    productName: "Test produc name",
                    productQuantity: 0,
                    productPrice: "100",
                    productSupplier: "Test Supplier",
                    productcategory: "Test Category here"
                },
                ],
    json_meta: [
      [
        {
          key: "charset",
          value: "utf-8",
        },
      ],
    ],
        }
    },
      computed: {
          pagedTableData() {
       if(this.searchable){
      return this.templatelist.filter((item)=>{
        return this.searchable.toLowerCase().split(' ').every(v => item.tname.toLowerCase().includes(v))
      })
      }else{
        return this.templatelist.slice(this.pageSize * this.page - this.pageSize, this.pageSize * this.page)
      }
       
     }
    },
    components:{
       'download-excel':JsonExcel 
    },
    created(){
        this.listoftemplates()
    },
    methods: {
        listoftemplates(){
            getlisttemplates().then(response => {
                this.templatelist = response.data
                this.listLoading = false
            })
        },
         setPage (val) {
        this.page = val
      },  
        onexcelsave(){
            const loading = this.$loading({
                    lock: true,
                    text: 'Saving, please wait...',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                    });
                    setTimeout(() => {
                            saveExcel(this.templateTask)
                            .then(response => {
                                if(response.data === "success save"){
                                    loading.close()
                                    this.$notify.success({
                                title: 'Yey',
                                message: 'Successfully added',
                                offset: 100
                                });
                                this.uploadpercent = 0;
                                this.templateTask.templateURL = '';
                                this.templateTask.templatename = '';
                                this.listoftemplates()
                                }
                            })
                    }, 3000)
        },
        onexport(){
            this.$refs.exportnow.click
        },
        previewImage(event){
            this.uploadpercent = 0;
            this.filedata = event.target.files[0];
        },
        onupload(){
            const loading = this.$loading({
                    lock: true,
                    text: 'Uploading Image, please wait...',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                    });
                    this.modifyimg1 = null;
                    const checkstorage = firebase.storage().ref(`${this.filedata.name}`)
                    .getDownloadURL().then((resolve) => {
                        const ref = firebase.storage().ref(`excelfiles/${this.filedata.name}`);
                        ref.push(this.filedata.name).then(() => {
                            ref.getDownloadURL().then((url) => {
                                loading.close()
                                this.$notify.success({
                                title: 'Yey',
                                message: 'Successfully Uploaded',
                                offset: 100
                                });
                                this.templateTask.templateURL = url;
                            })
                        })
                    }).catch((err) => {
                        const storageRef = firebase.storage().ref(`excelfiles/${this.filedata.name}`)
                        .put(this.filedata);
                        storageRef.on(`state_changed`, snapshot => {
                            this.uploadpercent = (snapshot.bytesTransferred/snapshot.totalBytes) * 100;
                        }, error => {console.log(error.message)},
                        () => {
                            this.uploadpercent = 100;
                            storageRef.snapshot.ref.getDownloadURL().then((url) => {
                                this.templateTask.templateURL = url;
                                loading.close()
                                this.$notify.success({
                                title: 'Yey',
                                message: 'Successfully Uploaded',
                                offset: 100
                                });
                            })
                        })
                    })
        }
    }
}
</script>
<style scoped>
#excelcard1{
    background: linear-gradient(321.82deg,#21f2ff,#4181ff 59.22%,#4475ff 98.02%),#7196ff;
    color: white;
    border-radius: 10px;
}

/* #mycustomscroll{
    height: 100%;
    overflow: scroll;
} */
</style>