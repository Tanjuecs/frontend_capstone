<template>
    <div>
        <el-card shadow="always" style="margin-top: 30px;">
            <div class="row">
                <div class="col-sm">
                    <label>Mobile Number (required)</label>
                            <el-input
                            placeholder="Please input mobile number"
                            v-model="personal_task.mobile_no"
                            clearable  maxlength="11"
                            show-word-limit>
                            </el-input>
                </div>
                <div class="col-sm">
                     <label style="margin-bottom: 3px;">Email <el-tag type="danger"  effect="dark" size="mini">Required</el-tag></label>
                            <el-input
                            placeholder="Please input email"
                            v-model="personal_task.customer_email"
                            clearable>
                            </el-input>
                </div>
            </div>
            <!-- second row -->
            <div class="row" style="margin-top: 10px;">
                <div class="col-sm">
                    <label>Password (required)</label>
                            <el-input
                            placeholder="Please input password"
                            type="password"
                            v-model="personal_task.customer_password"
                            clearable show-password>
                            </el-input>
                </div>
                <div class="col-sm">
                     <label>Confirm Password (required)</label>
                            <el-input
                            placeholder="Please confirm password"
                            type="password"
                            v-model="personal_task.customer_confirm_password"
                            clearable show-password>
                            </el-input>
                </div>
            </div>
        </el-card>
    </div>
</template>

<script>
export default {
    props: {
        personal_task: Object
    }
}
</script>