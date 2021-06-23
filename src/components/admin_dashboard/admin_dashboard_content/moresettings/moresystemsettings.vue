<template>
    <div>
        <div class="container">
            <el-tabs :tab-position="tabPosition" style="height: 100%;">
                <el-tab-pane label="Default Settings">
                    <el-card shadow="always">
                        <h4>Default Settings</h4>
                        <hr>
                        <div style="margin-top: 20px;">
                            <el-card shadow="hover">
                                    <h3 style="margin-bottom: 20px;">Purchase Order</h3>
                                    <div v-show="needtosave">
                                        <el-alert
                                            title="You need to save this new settings update"
                                            type="warning" :closable="false">
                                        </el-alert>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-6">
                                             <el-switch
                                    style="display: block; margin-bottom: 10px;"
                                    v-model="settings.purchasesettings"
                                    active-color="#13ce66"
                                    inactive-color="#ff4949"
                                    active-text="Enable purchase order"
                                    @change="onenable"
                                    inactive-text="Disable purchase order">
                                    </el-switch>
                                        </div>
                                        <div class="col-md-6">
                                            <el-switch
                                        style="display: block; margin-bottom: 10px;"
                                        v-model="settings.purchasesettings2"
                                        active-color="#13ce66"
                                        inactive-color="#ff4949"
                                        :disabled="ondisable1"
                                        active-text="Enable PO in inventory"
                                        inactive-text="Disable PO in inventory">
                                        </el-switch>
                                        </div>
                                    </div>
                                   
                                        <div class="row">
                                            <div class="col-md-6">
                                                  <el-switch
                                        style="display: block; margin-bottom: 10px;"
                                        v-model="settings.purchasesettings3"
                                        active-color="#13ce66"
                                        inactive-color="#ff4949"
                                        :disabled="ondisable2"
                                        active-text="Enable PO listview"
                                        inactive-text="Disable PO listview">
                                        </el-switch>
                                            </div>
                                            <div class="col-md-6">
                                                 <el-switch
                                        style="display: block; margin-bottom: 10px;"
                                        v-model="settings.purchasesettings4"
                                        active-color="#13ce66"
                                        inactive-color="#ff4949"
                                        :disabled="ondisable3"
                                        active-text="Multiple Entry"
                                        inactive-text="Single Entry">
                                        </el-switch>
                                            </div>
                                        </div>
                                  
                                       
                                </el-card>
                        </div>
                        <el-button type="primary" plain style="float: right; margin-bottom: 10px; margin-top: 10px;" @click="onsavesettings()">Save</el-button>
                    </el-card>
                </el-tab-pane>
                <el-tab-pane label="Config">Config</el-tab-pane>
                <el-tab-pane label="Role">Role</el-tab-pane>
                <el-tab-pane label="Task">Task</el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
import {systemsettings, savedsettings} from "@/store/request-common"
export default {
    data(){
        return{
            tabPosition: 'left',
            settings: {
                purchasesettings: false,
                purchasesettings2: false,
                purchasesettings3: false,
                purchasesettings4: false
            },
            ondisable1: true,
            ondisable2: true,
            ondisable3: true,
            needtosave: false
        }
    },
    created(){
        this.getsavedsettings()
    },  
    methods: {
        getsavedsettings(){
            savedsettings().then(response => {
                this.needtosave = false;
               if(response.data[0].enablePO == 1){
                   this.settings.purchasesettings = true;
                   this.ondisable1 = false;
                   this.ondisable2 = false;
                   this.ondisable3 = false;
               }else{
                   this.settings.purchasesettings = false;
               }
                if(response.data[0].enablePOInventory == 1){
                   this.settings.purchasesettings2 = true
               }else{
                   this.settings.purchasesettings2 = false
               }
               if(response.data[0].enableListview == 1){
                   this.settings.purchasesettings3 = true;
               }else{
                   this.settings.purchasesettings3 = false;
               }
               if(response.data[0].viewentry == 1){
                   this.settings.purchasesettings4 = true;
               }else{
                   this.settings.purchasesettings4 = false
               }
            })
        },
        onsavesettings(){
            this.$confirm('This will save the settings. Continue?', 'Warning', {
                confirmButtonText: 'OK',
                cancelButtonText: 'Cancel',
                type: 'warning'
                }).then(() => {
                     const loading = this.$loading({
                    lock: true,
                    text: 'Saving, please wait...',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                    });
                    setTimeout(() => {
                        systemsettings(this.settings).then(response => {
                            if(response.data === "success settings"){
                                loading.close()
                                this.$notify.success({
                                title: 'Yey',
                                message: 'Successfully update',
                                offset: 100
                                });
                                this.getsavedsettings()
                            } 
                            else if(response.data === "update settings success"){
                                loading.close()
                                this.$notify.success({
                                title: 'Yey',
                                message: 'Successfully update',
                                offset: 100
                                });
                                this.getsavedsettings()
                            }
                        })
                    }, 3000)
                })
        },
        onenable(){
            if(this.settings.purchasesettings === true){
                this.ondisable1 = false;
                this.ondisable2 = false;
                this.ondisable3 = false;
                this.needtosave = true;
            }else{
                this.ondisable1 = true;
                this.ondisable2 = true;
                this.ondisable3 = true;
                this.settings.purchasesettings2 = false;
                this.settings.purchasesettings3 = false;
                this.settings.purchasesettings4 = false;
                this.needtosave = true;
            }
        }
    }
}
</script>