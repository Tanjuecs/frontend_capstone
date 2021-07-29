<template>
    <div>
       <div style="margin-top: 30px; margin-bottom: 30px;" class="container">
           <el-card shadow="always">    
                        <div class="row">
                    <div class="col-sm"></div>
                    <div class="col-sm">
                                        <center>
                                                <el-avatar shape="square" :size="100" :src="profileUpdater.imageurl" fit="fill" style="margin-bottom: 3px;" ></el-avatar>
                                                 <p style="color: gray;">Preview of image will appear after the uploading.</p>
                                        <input type="file" class="btn btn-outline-primary" style="margin-bottom: 6px;" @change="previewImage" accept="image/*" />
                                        <el-progress :text-inside="true" style="margin-bottom: 10px;" :stroke-width="26" :percentage="uploadpercent"></el-progress>
                                        <el-button type="primary" style=" margin-bottom: 10px;" plain @click="onupload()">Upload now</el-button>
                                            </center>
                    </div>
                    <div class="col-sm"></div>
                </div>
                <div style="margin-top: 20px; margin-bottom: 20px;" class="row">
                    <div class="col-md-6">
                        <el-card shadow="always">
                            <h3>Personal Information</h3>
                                <div style="margin-top: 20px;" class="row">
                                    <div class="col-md-6">
                                        <span>Your firstname</span>
                                        <el-input
                                        placeholder="Please input firstname"
                                        v-model="profileUpdater.firstname"
                                        clearable>
                                        </el-input>

                                    </div>
                                    <div class="col-md-6">
                                        <span>Your lastname</span>
                                        <el-input
                                        placeholder="Please input lastname"
                                        v-model="profileUpdater.lastname"
                                        clearable>
                                        </el-input>

                                    </div>
                                </div>
                        </el-card>  
                    </div>
                    <div class="col-md-6">
                        <el-card shadow="always">
                            <h3>Credentials Information</h3>
                                 <span>Your email</span>
                                        <el-input
                                        style="margin-top: 20px; margin-bottom: 20px;"
                                        placeholder="Please input email"
                                        v-model="profileUpdater.email"
                                        clearable>
                                        </el-input>
                                 <span>Your password</span>
                                        <el-input
                                        style="margin-top: 20px; margin-bottom: 20px;"
                                        placeholder="Please input password"
                                        v-model="profileUpdater.password"
                                        type="password"
                                        clearable>
                                        </el-input>
                                        <span>Confirm Password</span>
                                        <el-input
                                        type="password"
                                        style="margin-top: 20px; margin-bottom: 20px;"
                                        placeholder="Please confirm password"
                                        v-model="profileUpdater.confirmpass"
                                        clearable>
                                        </el-input>
                        </el-card>
                    </div>
                </div>
                <el-button
                type="primary" plain
                style="float: right; margin-top: 10px; margin-bottom: 10px;"
                @click="onsave()"
                >Save</el-button>
           </el-card>
       </div>
    </div>
</template>

<script>
import firebase  from "firebase"
import {profile_update} from "@/store/request-common"
export default {
     data(){
        return {
            catchdetailsArray: [],
            profileUpdater: {
                firstname: '',
                lastname: '',
                email: '',
                password: '',
                imageurl: '',
                confirmpass: '',
                id: ''
            },
            imageData: '',
            uploadpercent:0,
            img1: ''
        }
    },
    created(){
        this.getfulldetails()
    },
    methods: {
        onsave(){
            if(!this.profileUpdater.email || !this.profileUpdater.firstname
            || !this.profileUpdater.lastname || !this.profileUpdater.imageurl){
                this.$notify.error({
                                title: 'Oops',
                                message: 'Empty fields',
                                offset: 100
                                });
                                return false
            }
            else if(this.profileUpdater.password != this.profileUpdater.confirmpass){
                 this.$notify.error({
                                title: 'Oops',
                                message: 'mismatch password',
                                offset: 100
                                });
                                return false
            }
            else{
                this.$confirm('Are you sure you want to remove this product?', 'Warning', {
                cancelButtonText: 'Cancel',
                confirmButtonText: 'Yes',
                type: 'warning'
                }).then(() => {
                    const loading = this.$loading({
                    lock: true,
                    text: 'please wait...',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                    });
                    setTimeout(() => {
                        profile_update(this.profileUpdater).then(response => {
                            if(response.data === "success"){
                                loading.close()
                                this.$notify.success({
                                title: 'Yey',
                                message: 'Successfully updated',
                                offset: 100
                                });
                            }
                        })
                    }, 3000)
                })
            }
        },
        onupload(){
             if(!this.imageData){
                this.$notify.error({
                                title: 'Oops',
                                message: 'Please choose image',
                                offset: 100
                                });
                                return false
            }
            const loading = this.$loading({
                    lock: true,
                    text: 'Uploading Image, please wait...',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                });
            this.img1 = null;
             
            const checkstorage = firebase.storage().ref(`${this.imageData.name}`)
            .getDownloadURL()
            .then((resolve) => {
               const ref = firebase.storage().ref(`profile/${this.imageData.name}`);
               ref.put(this.imageData.name).then(() => {
                   ref.getDownloadURL().then((url) => {
                       loading.close()
                       this.$notify.success({
                                title: 'Yey',
                                message: 'Successfully Uploaded',
                                offset: 100
                                });
                       this.profileUpdater.imageurl = url;
                       this.img1 = url
                   })
               })
            }).catch((err) => {
                const storageRef = firebase.storage().ref(`profile/${this.imageData.name}`).put(this.imageData);
                 storageRef.on(`state_changed`, snapshot => {
                this.uploadpercent = (snapshot.bytesTransferred/snapshot.totalBytes) * 100;

            }, error => {console.log(error.message)},
            () => {
                this.uploadpercent = 100;
                storageRef.snapshot.ref.getDownloadURL().then((url) => {
                    loading.close()
                    this.$notify.success({
                                title: 'Yey',
                                message: 'Successfully Uploaded',
                                offset: 100
                                });
                    this.profileUpdater.imageurl = url;
                    this.img1 = url
                })
            })
            })
        },
        previewImage(event){
             this.img1 = event.target.files[0]
            this.uploadpercent = 0
            this.imageData = event.target.files[0]
        },
        getfulldetails(){
            this.$store.dispatch(`actions_fetch_full_client_details`, {
                email: localStorage.getItem("oauth2_ss::_ss_")
            }).then((res) => {
                this.catchdetailsArray = res.data[0]
                this.profileUpdater.firstname = this.catchdetailsArray.firstname
                this.profileUpdater.lastname = this.catchdetailsArray.lastname
                this.profileUpdater.email = this.catchdetailsArray.email
                this.profileUpdater.imageurl = res.data[0].imageurl
                this.profileUpdater.id = res.data[0].id
            })
        }
    }
}
</script>