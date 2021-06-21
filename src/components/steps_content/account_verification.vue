<template>
    <div>
        <el-card shadow="always" style="margin-top: 30px;">
            <label>Verification Code</label>
                            <el-input
                            placeholder="Please input verification code"
                            v-model="personal_task.account_code"
                            clearable>
                            </el-input>
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