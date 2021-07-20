<template>
    <div>
        <div v-if="activeSteps == 0">
            <span>Enter email</span>
        <el-input
            placeholder="Please input"
            v-model="taskForgot.email"
            clearable>
            </el-input>
            <el-button @click="onnext()" style="float: right; margin-top: 20px; margin-bottom: 20px;" type="primary">
                Next
            </el-button>
        </div>
        <div v-else-if="activeSteps == 1">
            <span>Enter verification code</span>
            <el-input
                placeholder="Please input"
                v-model="taskForgot.verificationcode"
                clearable>
                </el-input>
                <el-button @click="onnextverification()" style="float: right; margin-top: 20px; margin-bottom: 20px;" type="primary">
                Next
            </el-button>
                <el-button @click="onpreviousverification()" style="float: right; margin-top: 20px;margin-right: 10px;  margin-bottom: 20px;" type="primary">
                Previous
            </el-button>
                
        </div>
        <div v-else-if="activeSteps == 2">
            <span>Enter new password</span>
            <el-input
            type="password"
            show-password
                placeholder="Please input"
                style="margin-bottom: 10px;"
                v-model="taskForgot.newpassword"
                clearable>
                </el-input>
                <span>Confirm Password</span>
            <el-input
            type="password"
            show-password
                placeholder="Please input"
                v-model="taskForgot.confirmpass"
                clearable>
                </el-input>
                  <el-button @click="onfinishresetpassword()" style="float: right; margin-top: 20px; margin-bottom: 20px;" type="primary">
                Finish
            </el-button>
                <el-button @click="onpreviousverification()" style="float: right; margin-top: 20px;margin-right: 10px;  margin-bottom: 20px;" type="primary">
                Previous
            </el-button>
        </div>
        <div v-else-if="activeSteps == 4">
            <center>
                        
                <img src="https://cdn.dribbble.com/users/1537480/screenshots/4729147/groww-01.jpg?compress=1&resize=800x600"
                 alt="No image"
                 style="width: 100%; height: auto; margin-bottom: 20px;"
                 class="img-fluid">
                 <h3>You're all caught up!</h3>
                 <h1>You've successfully changed your password!</h1>
                 <p>You can now proceed to the login area.</p>
            </center>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        taskForgot: Object,
        onnext: Function,
        activeSteps: Number,
        onnextverification: Function,
        onpreviousverification: Function,
        onfinishresetpassword: Function
    },
}   
</script>