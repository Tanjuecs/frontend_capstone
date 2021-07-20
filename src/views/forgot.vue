<template>
    <div>
        <navigation />
    <div style="margin-top: 50px; margin-bottom: 50px;" class="container">
        <div class="row">
            <div class="col-md-6">
                <img src="https://cdn.dribbble.com/users/1292088/screenshots/14996869/media/5d15ac87fbfdcf483a248a9dd8835b40.jpg?compress=1&resize=1200x900"
                 alt="No image"
                 style="width: 100%; margin-top: 50px; height:auto;">
            </div>
            <div class="col-md-6">
                <el-steps :active="activeSteps" align-center>
                <el-step title="Email Finder" description="We need to sure that your email is registered with our system."></el-step>
                <el-step title="Account Verification" description="Enter verification code sent to your email"></el-step>
                <el-step title="Change Credentials" description="Enter your new password here."></el-step>
                <el-step title="Finish" description="You've successfully changed your password."></el-step>
                </el-steps>
                <div v-if="activeSteps == 0">
                    <el-card style="margin-top: 50px;" shadow="always">
            <h3>Email Finder</h3>
            <div style="margin-top: 20px;">
                <forgotcontent :activeSteps="activeSteps" :onnext="onnext" :taskForgot="taskForgot" />
                    </div>
                </el-card>
                </div>
                <div v-else-if="activeSteps == 1">
                    <el-card style="margin-top: 50px;" shadow="always">
                        <h3>Account Verification</h3>
<forgotcontent :activeSteps="activeSteps" :onpreviousverification="onpreviousverification"
 :onnextverification="onnextverification" :onnext="onnext" :taskForgot="taskForgot" />
                    </el-card>
                </div>
                <div v-else-if="activeSteps == 2">
                     <el-card style="margin-top: 50px;" shadow="always">
                        <h3>Change Credentials</h3>
<forgotcontent :activeSteps="activeSteps" :onpreviousverification="onpreviousverification"
 :onnextverification="onnextverification" :onfinishresetpassword="onfinishresetpassword" :onnext="onnext" :taskForgot="taskForgot" />
                    </el-card>
                </div>
                <div v-else-if="activeSteps == 4">
                 <el-card style="margin-top: 50px;" shadow="always">
<forgotcontent :activeSteps="activeSteps" :onpreviousverification="onpreviousverification"
 :onnextverification="onnextverification" :onfinishresetpassword="onfinishresetpassword" :onnext="onnext" :taskForgot="taskForgot" />
                 </el-card>
                </div>
            </div>
        </div>
    </div>
    </div>
</template>

<script>
import navigation from "@/components/nav";
import forgotcontent from "@/components/forgot_content"
import {email_finder, sendForgotEmail, forgotpassword_add_history, identify_code_entry, forgot_change_password} from "@/store/request-common"
export default {
    components: {
        navigation, forgotcontent
    },
    data(){
        return {
            taskForgot: {
                email: '', verificationcode: '', newpassword: '', confirmpass: '' 
            },
            codehelper: '',
            activeSteps: 0
        }
    },
    created(){
        this.makeid(8)
    },
    methods: {
        onfinishresetpassword(){
            if(!this.taskForgot.newpassword || !this.taskForgot.confirmpass){
                this.$notify.warning({
                            title: 'Oops!',
                            message: 'Empty password or confirm password.',
                            offset: 100
                            });
                            return false;
            }else if(this.taskForgot.newpassword != this.taskForgot.confirmpass){
                this.$notify.warning({
                            title: 'Oops!',
                            message: 'Password mismatch.',
                            offset: 100
                            });
                            return false;
            }else{
                forgot_change_password(this.taskForgot.newpassword, this.taskForgot.email).then(response => {
                    if(response.data === "success change"){
                        this.$notify.success({
                            title: 'Noice!',
                            message: 'Successfully change password!.',
                            offset: 100
                            });
                            this.activeSteps = 4;
                    }
                })
            }
        },
        makeid(length) {
            var result           = [];
            var characters       = '0123456789';
            var charactersLength = characters.length;
            for ( var i = 0; i < length; i++ ) {
                result.push(characters.charAt(Math.floor(Math.random() *
            charactersLength)));
            }
            return this.codehelper = result.join('');
            },
        onnext(){
            email_finder(this.taskForgot.email).then(response => {
                if(response.data === "exist"){
                    this.activeSteps++;
                     this.$notify.success({
                            title: 'Noice!',
                            message: 'Email exist! please enter verification code.',
                            offset: 100
                            });
                            sendForgotEmail(this.taskForgot.email, this.codehelper).then(resp=> {
                                forgotpassword_add_history(this.codehelper).then((resp) => {
                                    console.log(resp.data);
                                })
                            })
                } else if(response.data === "not exist"){
                    this.$notify.error({
                            title: 'Oops!',
                            message: 'This email doesnt exist.',
                            offset: 100
                            });
                            return false;
                }
            })
        },
        onnextverification(){
            identify_code_entry(this.taskForgot.verificationcode).then(resp => {
                if(resp.data === "success isdone"){
                    this.$notify.success({
                            title: 'Noice!',
                            message: 'Verification complete!.',
                            offset: 100
                            });
                            this.activeSteps = 2;
                } else if(resp.data === "invalid code"){
                    this.$notify.error({
                            title: 'Oops!',
                            message: 'Invalid code, please try again..',
                            offset: 100
                            });
                            return false;
                }
            })
        },
        onpreviousverification(){
            this.activeSteps--;
        }
    }
}
</script>