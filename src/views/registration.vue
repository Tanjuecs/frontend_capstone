<template>
    <div>
        <navigation />
        <div class="container-fluid">
            <div class="row" style="margin-top: 20px;">
            <div class="col-md-6"
            >
                <img src="https://cdn.dribbble.com/users/4958643/screenshots/10679810/media/d9e8b2fe0dbffa0246c9b7ab35547b84.jpg?compress=1&resize=1200x900"
                 alt="No Image" style="width: 100%; height: auto; margin-top: 50px;" class="img-fluid">
            </div>
            <div class="col-md-6" style="border-left: 3px solid #F8F9FA;">
                <div style="margin-top: 30px;">
                    <h3>Registration</h3>
                    <div id="component-container"></div>
                    <!-- <div id="dropin-container"></div> -->
                    <p>After filling up you may use login with Google on your next login.</p>
                    <!-- Stepper -->
                   <el-steps :active="active" align-center style="margin-top: 30px;">
  <el-step title="Step 1" description="Personal Information"></el-step>
  <el-step title="Step 2" description="Customer Location"></el-step>
  <el-step title="Step 3" description="Account Details"></el-step>
  <el-step title="Step 4" description="Account Verification"></el-step>
  <el-step title="Step 5" description="Finish"></el-step>
</el-steps>
                    <!-- end of my stepper -->
    <!-- Content per steps -->
    <!-- step 1 -->
    <div v-if="active == 0">
        <personalStep  :personal_task="personal_task" :active="active" />
    </div>
    <!-- step 2 -->
    <div v-else-if="active == 1">
        <location :municipality="municipality" :personal_task="personal_task"
        :province="province" :address_type="address_type" />
    </div>
    <!-- step 3 -->
    <div v-else-if="active == 2">
        <contactdetails :personal_task="personal_task"/>
    </div>
    <!-- step 4 -->
    <div v-else-if="active == 3">
        <accountverifier :personal_task="personal_task"/>
    </div>
    <!-- step 6 -->
    <div v-else-if="active == 5">
        <finishing />
    </div>
    <!-- End of content per steps -->
     <div v-if="active == 0">
         <el-button type="primary" @click="onnext()" style="float: right; margin-bottom: 10px; margin-top: 10px;">
                                Next
                            </el-button>
     </div>
     <div v-else-if="active != 0">
         
                            <div v-if="active != 5">
                                <el-button type="primary" @click="onnext()" style="float: right; margin-bottom: 10px; margin-top: 10px;">
                                Next
                            </el-button>&nbsp;
                                <el-button type="primary" @click="onprevious()" style="float: right; margin-bottom: 10px; margin-right: 10px; margin-top: 10px;">
                                Previous
                            </el-button>
                            </div>
                            <div v-else>

                            </div>
     </div>
     
                </div>
            </div>
        </div>
        </div>
    </div>
</template>

<script>

//steps content import start
import personalStep from "@/components/steps_content/personal";
import location from "@/components/steps_content/customer_location"
import contactdetails from "@/components/steps_content/customer_contact_details"
import accountverifier from "@/components/steps_content/account_verification"
import finishing from "@/components/steps_content/finish";
//steps content import ends
//import nav
import navigation from "@/components/nav";
//import nav ends
//import functions from request-common
import {getmunicipality, sendEmail, checkcodeverification,
userRegistration} from "@/store/request-common"
//import functions from request-common ends
export default {
    components: {
        navigation, personalStep, location, contactdetails, accountverifier,
        finishing
    },
    data() {
        return{
            active : 0,
            //for step 1 personal information
            personal_task: {
                firstname: '', lastname: '', municipality: '',
                province: '', floor: '', street: '', baranggay: '', building: '', address_type: '',
                company_name: '', mobile_no : '', customer_email: '', customer_password: '', 
                customer_confirm_password: '', account_code: ''
            }, //clear all
            savedverifiercode: '',
            // municipality array of object
            municipality: [],
        // province array of object
         province: [],
        // address type array of object
         address_type: [{
          value: 'Residential',
          label: 'Residential'
        }, {
          value: 'Office',
          label: 'Office'
        }],
        }
    },
    created(){
        this.load_all_municipality()
        this.makegencode(6);
    },
    methods: {

        makegencode(length) {
                var result           = '';
                var characters       = '0123456789';
                var charactersLength = characters.length;
                for ( var i = 0; i < length; i++ ) {
                result += characters.charAt(Math.floor(Math.random() * 
            charactersLength));
            }
            return this.savedverifiercode = result;
            },
        onnext(){
            
          //validate some data from personal task.
          //active identifier for validation
          if(this.active == 0){ // for step 1
                    if(!this.personal_task.firstname || !this.personal_task.lastname){
                        this.$notify.warning({
                            title: 'Oops',
                            message: 'Please check the fields, firstname or lastname is empty',
                            offset: 100
                            });
                            return false;
                    } else{
                        this.active++;
                    }
          } else if(this.active == 1) { //for step 2
                    if(!this.personal_task.municipality || !this.personal_task.province
                || !this.personal_task.street || !this.personal_task.address_type) {
                    this.$notify.warning({
                        title: 'Oops',
                        message: 'Please check the fields',
                        offset: 100
                        });
                        return false;
                } else {
                    this.active++;
                }
          } else if(this.active == 2){ //for step 3
              if(!this.personal_task.mobile_no || !this.personal_task.customer_email
              || !this.personal_task.customer_password || !this.personal_task.customer_confirm_password){
                  this.$notify.warning({
                        title: 'Oops',
                        message: 'Please check the fields',
                        offset: 100
                        });
                        return false;
              }
              else if(this.personal_task.customer_password != this.personal_task.customer_confirm_password){
                  this.$notify.error({
                        title: 'Oops',
                        message: 'Password mismatch',
                        offset: 100
                        });
                        return false;
              }
              
              else{
             
             if(this.personal_task.customer_password.length > 6){
                   const loading = this.$loading({
                    lock: true,
                    text: 'Loading',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                    });
                    setTimeout(() => {
                        sendEmail(this.personal_task, this.savedverifiercode).then((response) => {
                            if(response.data === "sendsuccess1"){
                                loading.close()
                                this.$notify.success({
                            title: 'Yey!',
                            message: 'Please check your email for verification code.',
                            offset: 100
                            });
                            } else if(response.data === "exceed") {
                                loading.close()
                                this.$notify.warning({
                            title: 'Uh oh!',
                            message: 'Youve exceed limit on sending email verification',
                            offset: 100
                            });
                            return false;
                            }
                            else if(response.data === "already verified"){
                                loading.close()
                                this.$notify.warning({
                            title: 'Uh oh!',
                            message: 'We detect that youre already verified, please login instead.',
                            offset: 100
                            });
                            return false;
                            }
                        }).catch(() => {
                            loading.close()
                            this.$notify.success({
                            title: 'Yey!',
                            message: 'Please check your email for verification code.',
                            offset: 100
                            });
                            this.active++;
                        })
                    }, 3000)
              }
              else{
this.$notify.warning({
                        title: 'Oops',
                        message: 'Please provide more than 6 characters password',
                        offset: 100
                        });
                        return false;
              }
                  //send email to customer for account verification
                 
              }
          }
          else if(this.active == 3) //for step 4
          {
              if(!this.personal_task.account_code){
                  this.$notify.warning({
                        title: 'Oops',
                        message: 'Please check the fields',
                        offset: 100
                        });
                        return false;
              }else{
                  //verify if code is correct.
                  const loading = this.$loading({
                    lock: true,
                    text: 'Verifying please wait.',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                    });
                  setTimeout(() => {
                    checkcodeverification(this.personal_task)
                    .then((response) => {
                        if(response.data === "valid code"){
                             userRegistration(this.personal_task)
                             .then((resp) => {
                                 loading.close()
                                 if(resp.data === "admin done"){
                                     this.$notify.success({
                                        title: 'Yes!',
                                        message: 'You are already verified! please login.',
                                        offset: 100
                                        });
                                        this.active = 5;
                                 } else if(resp.data === "customer"){
                                     //final step
                                     this.$notify.success({
                                        title: 'Yes!',
                                        message: 'You are already verified! please login.',
                                        offset: 100
                                        });
                                        this.active = 5;
                                        this.clear_registered_data();
                                 }
                             })
                        }else if(response.data === "invalid code"){
                            loading.close()
                            this.$notify.error({
                                        title: 'Oops',
                                        message: 'Invalid verification code, please try again.',
                                        offset: 100
                                        });
                        }
                    })
                  }, 4000)
              }
          }
       },
       clear_registered_data(){
           this.personal_task.customer_password = "";
           this.personal_task.customer_confirm_password= "";
       },
       onprevious(){
           this.active--;
       },
       load_all_municipality(){
           try {
               getmunicipality().then(response => {
                   this.municipality = response.data
               })
           } catch (error) {
               console.log(error)
           }
       }
    }
}
</script>