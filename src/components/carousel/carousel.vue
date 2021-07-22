<template>
    <div>
        <div class="carousel fade-carousel slide" data-ride="carousel" data-interval="4000" id="bs-carousel">
  <!-- Overlay -->

  <!-- Indicators -->
  <ol class="carousel-indicators">
    <li data-target="#bs-carousel" data-slide-to="0" class="active"></li>
  </ol>

  <!-- Wrapper for slides -->
  <div class="carousel-inner">
    <div class="item slides active">
      <div class="slide-1">
        <div class="overlay"></div>
      </div>
      <div class="hero">
         <a class="navbar-brand me-2" href="#">

      <p><img src="../../assets/logogo.gif" alt="bmlogo" width="200" height="200" style="display: block; margin-left: auto; margin-right: auto;" >
      </p>

    </a>
        <hgroup>
          <font style="font-size: 100px; letter-spacing:4.6px; text-shadow: #474747 3px 5px 2px, 2px 4px 2px rgba(81,72,0,0.28); color: white;">
           <strong> <img src="" style="width: 10%; height: auto;" alt="">
            BURGER MANIA</strong></font>
          <h2 style="color: white;"><font style="letter-spacing: 6px">Point-of-Sales | Inventory Management</font></h2>
         <center>
           <div style="margin-top: 50px;">
             <div class="row">
               <div class="col-sm">
                 
        <!-- <b-button lg="4" class="pb-2"  variant="outline-secondary">Home</b-button> -->
       
               </div>
               <div class="col-sm">
                  <el-button round id="loginbtn" type="primary" plain @click="onlogin()">Login</el-button>
        
               </div>
               <div class="col-sm">
                 
               </div>
             </div>
           </div>
         </center>
        </hgroup>
        
      </div>
    </div>
   
   
  </div>
</div>
<el-dialog
  title="Welcome! Please login."
  :visible.sync="dialogVisible"
  width="35%"
  :before-close="handleClose">
  
 <el-input
 style="margin-bottom: 10px;"
  placeholder="Please input email"
  v-model="task.email"
  clearable>
</el-input>

<el-input
  placeholder="Please input password"
  v-model="task.password"
  type="password"
  clearable show-password>
</el-input>

<el-link @click="onforgot()" type="primary">Forgot password?</el-link>
<!-- <div >
  <span>Don't have an account ? </span>
<el-link style="margin-bottom: 10px; margin-top: 5px;" @click="onnavigateRegister()" type="primary">Register</el-link>
</div> -->
<!-- Google Button -->
<center><br>
  <div>
  <GoogleLogin :params="params" :renderParams="renderParams" :onSuccess="onSuccess"></GoogleLogin>
</div>
</center>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">Cancel</el-button>
    <el-button type="primary" @click="onsignin()">Confirm</el-button>
  </span>
</el-dialog>
    </div>
</template>
<script>
import GoogleLogin from 'vue-google-login';
//import function from request common
import {csrf_google_login, csrf_session_indicator, standardLogin, loginhistory} from "@/store/request-common"
import routers from "@/router/index";
  export default {
    components: {
            GoogleLogin
        },
    data() {
      return {
        slide: 0,
        sliding: null,
        dialogVisible: false,
        task: {
        email: '', password: ''
      },
        params: {
                    client_id: "276210162071-6vdmv9penibbvjce463suctmoddvmqkk.apps.googleusercontent.com" //Localhost
                    // client_id: "276210162071-51kdasipabb443pmfi0cthgfkvrof67u.apps.googleusercontent.com" //production
                },
                   renderParams: {
                    width: 250,
                    height: 50,
                    longtitle: true
                },
                sessionTask: {
                  sessionID: 0,
                  sessionEmail: ''
                }
      }
    },
    methods: {
      onsignin(){
      if(!this.task.email || !this.task.password){
        this.$notify.error({
                            title: 'Uh oh!',
                            message: 'empty fields.',
                            offset: 100
                            });
                            return false;
      }else{
        const loading = this.$loading({
                    lock: true,
                    text: 'Logging in, please wait..',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                    });
                    setTimeout(() => {
                      standardLogin(this.task).then((rs) => {
                        console.log(rs.data)
                        if(rs.data.message === "empty"){
                          loading.close()
                          this.$notify.error({
                            title: 'Uh oh!',
                            message: 'empty fields.',
                            offset: 100
                            });
                            return false;
                        }else if(rs.data === "disabled"){
                          loading.close()
                          this.$notify.error({
                            title: 'Uh oh!',
                            message: 'Unfortunately your account is disable.',
                            offset: 100
                            });
                            return false;
                        }
                        else if(rs.data === "invalid"){
                          loading.close()
                          this.$notify.error({
                            title: 'Uh oh!',
                            message: 'Invalid password.',
                            offset: 100
                            });
                            return false;
                        }
                        else if(rs.data === "not found"){
                          loading.close()
                          this.$notify.error({
                            title: 'Uh oh!',
                            message: 'This account was not found.',
                            offset: 100
                            });
                            return false;
                        }
                        else if(rs.data.message === "SUCCESS"){
                          localStorage.setItem("oauth2_ss::_ss_", this.task.email)
                          sessionStorage.setItem("oauth2_ss::_ss_", this.task.email)
                          loading.close()
                          this.historyloginmanagement()
                           var logObject = { 
                            firstname: rs.data.databulk.firstname,
                            lastname: rs.data.databulk.lastname,
                            uid: rs.data.databulk.id,
                            istype : rs.data.databulk.istype,
                            email: rs.data.databulk.email
                          }
                   localStorage.setItem("oauth2_ss::_profileinfo_", JSON.stringify(logObject))
                          sessionStorage.setItem("oauth2_ss::_ss_", this.task.email)
                          
                          this.sessionTask.sessionEmail = this.task.email;
                          this.session_update_or_add();
                          routers.push({name: 'admindashboard'})
                        }
                      })
                    }, 3000)
        
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
      return this.sessionTask.sessionID = result.join('');
      },
      onSuccess(googleUser) {
            console.log(googleUser);
            csrf_google_login(googleUser.getBasicProfile().It)
            .then((response) => {
              if(response.data.response_message === "proceed login admin") {
                //route to dashboard admin
                this.googleloginhistory(googleUser.getBasicProfile().It)
                const loading = this.$loading({
                    lock: true,
                    text: 'Redirecting, please wait..',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                    });
                    setTimeout(() => {
                      
                   sessionStorage.setItem("oauth2_ss::_ss_", googleUser.getBasicProfile().It)
                   localStorage.setItem("oauth2_ss::_ss_", googleUser.getBasicProfile().It)
                   this.sessionTask.sessionEmail = googleUser.getBasicProfile().It;
                   var logObject = { 
                     firstname: response.data.bundle[0].firstname,
                     lastname: response.data.bundle[0].lastname,
                     uid: response.data.bundle[0].id,
                     istype : response.data.bundle[0].istype,
                     email: response.data.bundle[0].email
                   }
                   localStorage.setItem("oauth2_ss::_profileinfo_", JSON.stringify(logObject))
                    this.session_update_or_add();
                   loading.close()
                    }, 3000)
              }
              else if(response.data.response_message === "proceed login customer"){
                //route to dashboard customer
              }
              else if(response.data === "disable"){
                this.$notify.warning({
                            title: 'Uh oh!',
                            message: 'Your account is disabled.',
                            offset: 100
                            });
                            return false;
              }else if(response.data === "not verified") {
                this.$notify.warning({
                            title: 'Uh oh!',
                            message: 'Your account is not yet verified.',
                            offset: 100
                            });
                            //show modal to input verification code.
                            return false;
              }
              else if(response.data === "email not exists") {
                this.$notify.error({
                            title: 'Uh oh!',
                            message: 'We cant find this account. please register',
                            offset: 100
                            });
                            return false;
              }
            })
        },
         session_update_or_add: function() {
          csrf_session_indicator(this.sessionTask).then((response) => {
            // console.log(response.data)
            if(response.data === "session added") { 
              routers.push({name: 'admindashboard'})
              this.$notify.success({
                            title: 'Welcome!',
                            message: 'Successfully logged in',
                            offset: 100
                            });
            } else if(response.data === "update session") { 
              routers.push({name: 'admindashboard'})
              this.$notify.success({
                            title: 'Welcome!',
                            message: 'Successfully logged in',
                            offset: 100
                            });
            }
          })
                     
        },
        handleClose(done) {
        this.$confirm('Are you sure to close this dialog?')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
      onforgot(){
      this.$router.push({name: 'Forgot Password'}).catch(() => {})
    },
      historyloginmanagement(){
      loginhistory(this.task.email).then(response => {
        if(response.data.message === "success"){
          console.log(response.data.message)
        }
      })
    },
    googleloginhistory(email){
      loginhistory(email).then(response => {
        if(response.data.message === "success"){
          console.log(response.data.message)
        }
      })
    },
      onSlideStart(slide) {
        this.sliding = true
      },
      onSlideEnd(slide) {
        this.sliding = false
      },
      onhome(){
      this.$router.push({name: 'Index'}).catch(() => {})
    },
    onlogin(){
      this.dialogVisible = true
    },
    onaboutus(){
      this.$router.push({name: 'About Us'}).catch(() => {})
    },
    }
  }
</script>

<style scoped>
/*
Fade content bs-carousel with hero headers
Code snippet by maridlcrmn (Follow me on Twitter @maridlcrmn) for Bootsnipp.com
Image credits: unsplash.com
*/

/********************************/
/*       Fade Bs-carousel       */
/********************************/
#homebtn{
  padding: 15px;
  width: 100%;
}
#loginbtn{
  padding: 15px;
  width: 100%;
  font-size: 20px;
}
.fade-carousel {
    position: relative;
    height: 100vh;
}
.fade-carousel .carousel-inner .item {
    height: 100vh;
}
.fade-carousel .carousel-indicators > li {
    margin: 0 2px;
    background-color: #f39c12;
    border-color: #f39c12;
    opacity: .7;
}
.fade-carousel .carousel-indicators > li.active {
  width: 10px;
  height: 10px;
  opacity: 1;
}

/********************************/
/*          Hero Headers        */
/********************************/
.hero {
    position: absolute;
    top: 40%;
    left: 50%;
    z-index: 3;
    color: #fff;
    text-align: center;
    text-transform: uppercase;
      -webkit-transform: translate3d(-50%,-50%,0);
         -moz-transform: translate3d(-50%,-50%,0);
          -ms-transform: translate3d(-50%,-50%,0);
           -o-transform: translate3d(-50%,-50%,0);
              transform: translate3d(-50%,-50%,0);
}
.hero h1 {
    font-size: 6em;    
    font-weight: bold;
    margin: 0;
    padding: 0;
}

.fade-carousel .carousel-inner .item .hero {
    opacity: 0;
    -webkit-transition: 2s all ease-in-out .1s;
       -moz-transition: 2s all ease-in-out .1s; 
        -ms-transition: 2s all ease-in-out .1s; 
         -o-transition: 2s all ease-in-out .1s; 
            transition: 2s all ease-in-out .1s; 
}
.fade-carousel .carousel-inner .item.active .hero {
    opacity: 1;
    -webkit-transition: 2s all ease-in-out .1s;
       -moz-transition: 2s all ease-in-out .1s; 
        -ms-transition: 2s all ease-in-out .1s; 
         -o-transition: 2s all ease-in-out .1s; 
            transition: 2s all ease-in-out .1s;    
}

/********************************/
/*            Overlay           */
/********************************/
.overlay {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 2;
    opacity: .7;
}

/********************************/
/*          Custom Buttons      */
/********************************/
.btn.btn-lg {padding: 10px 40px;}
.btn.btn-hero,
.btn.btn-hero:hover,
.btn.btn-hero:focus {
    color: #f5f5f5;
    background-color: #1abc9c;
    border-color: #1abc9c;
    outline: none;
    margin: 20px auto;
}

/********************************/
/*       Slides backgrounds     */
/********************************/
.fade-carousel .slides .slide-1, 
.fade-carousel .slides .slide-2,
.fade-carousel .slides .slide-3 {
  height: 100vh;
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  opacity: 0.7;
}
.fade-carousel .slides .slide-1 {
  background-image: url(../../assets/bg.jpg); 
}
/* .fade-carousel .slides .slide-2 {
  background-image: url(https://ununsplash.imgix.net/photo-1416339684178-3a239570f315?q=75&fm=jpg&s=c39d9a3bf66d6566b9608a9f1f3765af);
}
.fade-carousel .slides .slide-3 {
  background-image: url(https://ununsplash.imgix.net/photo-1416339276121-ba1dfa199912?q=75&fm=jpg&s=9bf9f2ef5be5cb5eee5255e7765cb327);
} */

/********************************/
/*          Media Queries       */
/********************************/
@media screen and (min-width: 980px){
    .hero { width: 980px; }    
}
@media screen and (max-width: 640px){
    .hero h1 { font-size: 4em; }    
}
</style>