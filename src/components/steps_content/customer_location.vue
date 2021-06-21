<template>
    <div>
        <el-card shadow="always" style="margin-top: 20px;">
            <div class="row">
                <div class="col-sm">
                    <label>Select municipality (required)</label>
                        <el-select @change="onselectprovince()" style="width: 100%;" v-model="personal_task.municipality" filterable placeholder="Select your municipality">
                        <el-option
                        v-for="item in municipality"
                        :key="item.municipality"
                        :label="item.municipality"
                        :value="item.municipality">
                        </el-option>
                    </el-select>     
                </div>
                <div class="col-sm">
                    <label>Select Province (required)</label>
                        <el-select style="width: 100%;" v-model="personal_task.province" filterable placeholder="Select your province">
                        <el-option
                        v-for="item in province"
                        :key="item.province"
                        :label="item.province"
                        :value="item.province">
                        </el-option>
                    </el-select>     
                </div>
            </div>
            <!-- second row -->
            <div class="row" style="margin-top: 10px;">
                <div class="col-sm">
                    <label>Floor/Dept/House No.</label>
                            <el-input
                            placeholder="Please input Floor/Dept/House No"
                            v-model="personal_task.floor"
                            clearable>
                            </el-input>
                </div>
                <div class="col-sm">
                    <label>Street. (required)</label>
                            <el-input
                            placeholder="Please input Street"
                            v-model="personal_task.street"
                            clearable>
                            </el-input>
                </div>
            </div>
             <div class="row" style="margin-top: 10px;">
                <div class="col-sm">
                    <label>Village / Baranggay.</label>
                            <el-input
                            placeholder="Please input Village / Baranggay"
                            v-model="personal_task.baranggay"
                            clearable>
                            </el-input>
                </div>
                <div class="col-sm">
                    <label>Building.</label>
                            <el-input
                            placeholder="Please input Building"
                            v-model="personal_task.building"
                            clearable>
                            </el-input>
                </div>
            </div>
            <!-- third row -->
            <div class="row" style="margin-top: 10px;">
                <div class="col-sm">
                    <label>Select address type (required)</label>
                        <el-select style="width: 100%;" v-model="personal_task.address_type" filterable placeholder="Select your address type">
                        <el-option
                        v-for="item in address_type"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>     
                </div>
                <div class="col-sm">
                    <label>Company name.</label>
                            <el-input
                            placeholder="Please input company name"
                            v-model="personal_task.company_name"
                            clearable>
                            </el-input>
                </div>
            </div>
        </el-card>
    </div>
</template>

<script>
//import function from request-common
import {getprovinceByMunicipality} from "@/store/request-common"
export default {
    props: {
        municipality: Array,
        personal_task: Object,
        province: Array, address_type: Array
    },
    methods:{
        onselectprovince(){
            getprovinceByMunicipality(this.personal_task.municipality)
            .then((response) => {
                this.province = response.data
            })
        }
    }
}
</script>