<template>
    <div>
        <div class="mt-3">
            <h3>Product Inventory | Add Inventory</h3>
        <p>Here you can add products for your inventory</p>
        <el-alert
            title="Product management / Adding inventory."
            type="success" :closable="false">
        </el-alert>
        <div class="container-fluid">
            <div style="margin-top: 20px;">
                
            <el-button  type="primary" plain @click="onimportexcel()">Import Excel</el-button>
            <!-- Dialog for import excel -->
            <el-dialog
                title="Invetory Import from excel"
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
                            title="Nice! now you can click the upload button!"
                            type="success" :closable="false">
                        </el-alert>
                    </div>
                    <div v-else>

                    </div>
                    <el-link @click="onchoose()" type="primary">Choose file</el-link>
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
        <div style="margin-top: 30px;">
            <inventoryadding :getallproductlist="getallproductlist"/>
        </div>
    </div>
</template>

<script>
import inventoryadding from "@/components/admin_dashboard/admin_dashboard_content/product_inventory/add_inventory"
import {importExcelGenerateData, fetchAllProductInventory} from "@/store/request-common"
export default {
    components: {
        inventoryadding
    },
    data(){
        return{
            exldata: '',
            exceldialogsheet: false,
            getallproductlist: []
        }
    },
    methods: {
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
                        importExcelGenerateData(this.exldata).then(response => {
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