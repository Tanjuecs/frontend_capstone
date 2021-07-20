<template>
    <div>
        <div style="margin-top: 30px;" class="container-fluid">
            <el-card shadow="always">
                <h2 style="margin-top: 20px; margin-bottom: 20px;">Reports</h2>
                 <el-tabs type="card">
                    <el-tab-pane label="Login History">
                        <el-card shadow="hover" style="margin-top: 20px;">
                            <h3>Login History Report</h3>
                                <listofhistories  />
                        </el-card>
                    </el-tab-pane>
                    <el-tab-pane label="Activity Log">
                        <div style="margin-top: 20px;" class="container">
                            <div class="row">
                                <div class="col-md-6">
                                    <el-card shadow="always">
                                        <div class="row">
                                            <div class="col-md-6">
                                                <h4 style="margin-bottom: 20px;">User Management Activity Logs</h4>
                                            </div>
                                            <div class="col-md-6">
                                                <el-button style="margin-bottom: 20px; float: right;" type="success" size="small">Export Excel</el-button>
                                            </div>
                                        </div>
                                        <tableusermanage :listoflogs="listoflogsusermanagement" />
                                    </el-card>
                                </div>
                                <div class="col-md-6">
                                    <el-card shadow="always">
                                        <h4>Product Inventory Activation Activity Logs</h4>
                                    </el-card>
                                </div>
                            </div>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="Sales Reports">Role</el-tab-pane>
                    <el-tab-pane label="Users Reports">Task</el-tab-pane>
                </el-tabs>
            </el-card>
        </div>
    </div>
</template>


<script>
import listofhistories from "@/components/ListHistories/logintablehistory"
import tableusermanage from 
"@/components/admin_dashboard/ActivityLogs/usermanagement_logs/usermanagementlogs"
import {usermanagementlogs} from "@/store/request-common"
export default {
components: {
    listofhistories, tableusermanage
},
data(){
    return{
        listoflogsusermanagement: []
    }
},
created(){
    this.getlogs_user_management()
},
methods: {
    getlogs_user_management(){
        usermanagementlogs().then(res => {
            this.listoflogsusermanagement = res.data
        })
    }
}
}
</script>