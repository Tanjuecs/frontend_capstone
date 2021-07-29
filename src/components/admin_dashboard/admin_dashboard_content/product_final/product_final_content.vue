<template>
    <div>
        <div style="margin-top: 30px;" class="container-fluid">
            <el-steps :active="activesteps" align-center>
            <el-step title="Product finalization / adding" description="Create a product finalization"></el-step>
            <el-step title="Select raw products/ingredients" description="Select raw products, this will deduct the quantity based on your input."></el-step>
            <el-step title="Finish" description="Product successfully created"></el-step>

            </el-steps>
            <div v-if="activesteps == 0" style="margin-top: 20px;">
                <el-card shadow="always">
                        <h4>Add product finalization</h4>
                        <el-alert
                                        style="margin-top: 20px; margin-bottom: 30px;"
                                            title="Product finalization"
                                            type="info"
                                            effect="dark"
                                            :closable="false"
                                            description="You can finalize here your product and choose raw materials for it and this may appear on your POS system. After adding you must activate the product you've activated"
                                            show-icon>
                                        </el-alert>
                                        <center>
                                        <el-avatar shape="square" :size="100" fit="fill" style="margin-bottom: 3px;" :src="taskfinalization.productImageUrl"></el-avatar>
                                            <p style="color: gray;">Preview of image will appear after the uploading.</p>
                                        <input type="file" class="btn btn-outline-primary" style="margin-bottom: 6px;" @change="previewImage" accept="image/*" />
                                        <el-progress :text-inside="true" style="margin-bottom: 10px;" :stroke-width="26" :percentage="uploadpercent"></el-progress>
                                        <el-button type="primary" style=" margin-bottom: 10px;" plain @click="onupload()">Upload now</el-button>
                                    </center>
                                    <label>Enter product name</label>
                                    <el-input
                                    style="margin-bottom: 20px;"
                                    placeholder="Please input"
                                    v-model="taskfinalization.prodname"
                                    clearable>
                                    </el-input>

                                     <div class="row">
                                         <div class="col-md-6">
                                             <label>Enter product quantity</label>
                                                <el-input
                                                style="margin-bottom: 20px;"
                                                placeholder="Please input"
                                                v-model="taskfinalization.prodquantity"
                                                clearable>
                                                </el-input>
                                         </div>
                                         <div class="col-md-6">
                                              <label>Enter product final price</label>
                                                <el-input
                                                style="margin-bottom: 20px;"
                                                placeholder="Please input"
                                                v-model="taskfinalization.prodprice"
                                                clearable>
                                                </el-input>
                                         </div>
                                     </div>

                                    <label>select product category</label>
                                    <el-select style="width: 100%;" v-model="taskfinalization.prodcategory" filterable placeholder="Select">
                                        <el-option
                                        
                                        v-for="item in options"
                                        :key="item.categoryname"
                                        :label="item.categoryname"
                                        :value="item.categoryname">
                                        </el-option>
                                    </el-select>

                                    
                                    <el-button @click="onnextfinalization()" type="primary" plain style="float: right; margin-bottom: 20px; margin-top: 20px;">Next</el-button>

                    </el-card>
            </div>
            <div v-else-if="activesteps == 1" style="margin-top: 20px;">
              <div class="container-fluid">
                <el-input
                    style="margin-bottom: 5px; width: 30%; margin-right: 10px;"
                    placeholder="Search"
                    v-model="searchable"
                    clearable>
                </el-input>
                <el-select @change="onselectfilter" style="margin-right: 10px;" v-model="filtervalue" filterable placeholder="Select">
                  <el-option
                      v-for="item in filteroptions"
                      :key="item.categoryname"
                      :label="item.categoryname"
                      :value="item.categoryname">
                  </el-option>
                </el-select>
                <el-button @click="ongetall()" type="warning" plain>Get All</el-button>
                <div class="row">
                  <div class="col-md-6">
                    <el-card shadow="always">
                      <el-table
                
                    ref="multipleTable"
                    :data="pagedTableData"
                    style="width: 100%"
                    :cell-style="tableRowClassName"
                    @selection-change="handleSelectionChange"
                    >
                  <el-table-column
                      type="selection"
                      :selectable="selectable"
                      width="55">
                  </el-table-column>
                  <el-table-column
                      label="Product Image"
                      width="200">
                    <template slot-scope="scope">
                      <img :src="scope.row.productimgurl"
                      alt="No image" style="width: 50%; height: auto;"
                      class="img-fluid"/>
                    </template>
                  </el-table-column>
                  <el-table-column
                      label="Product Name"
                      width="150">
                    <template slot-scope="scope">
                     {{scope.row.productName}}
                    </template>
                  </el-table-column>
                  <el-table-column
                      label="Product Quantity"
                      style="width: 100%;">
                    <template slot-scope="scope">
                      {{scope.row.product_quantity}}
                    </template>
                  </el-table-column>

                  <el-table-column
                      label="Invalid Quantities"
                      style="width: 100%;">
                    <template slot-scope="scope">
                      <div v-if="scope.row.product_quantity < taskfinalization.prodquantity">
                        <el-tag
                        type="danger"
                        >Invalid Quantity</el-tag>
                      </div>
                      <div v-else>
                        <el-tag
                        type="success"
                        >Quantity Good Condition</el-tag>
                      </div>
                    </template>
                  </el-table-column>

                </el-table>
                <el-pagination layout="prev, pager, next" :page-size="pageSize" :total="this.allstockslist.length" @current-change="setPage">
                </el-pagination>
                    </el-card>
                  </div>
                  <div class="col-md-6">
                    <el-card shadow="always">
                      <center>
                        <h2>Preview : from your product finalization form</h2>
                      <el-avatar shape="square" :size="100" fit="fill" style="margin-bottom: 3px;" :src="taskfinalization.productImageUrl"></el-avatar>
                      </center>
                      <div class="row" style="margin-top: 20px;">
                        <div class="col-md-6">
                          <h3>Product name : {{taskfinalization.prodname}}</h3>
                        </div>
                        <div class="col-md-6">
                          <h3>Product Quantity : {{taskfinalization.prodquantity}}</h3>
                        </div>
                      </div>
                      <div class="row" style="margin-top: 20px;">
                        <div class="col-md-6">
                          <h3>Product category : {{taskfinalization.prodcategory}}</h3>
                        </div>
                        <div class="col-md-6">
                          <h3>Product Code : {{taskfinalization.prodcode}}</h3>
                        </div>
                      </div>
                    </el-card>
                  </div>
                </div>
              </div>
                <div style="display: inline;">
                    <el-button @click="onnextfinalization1()" type="primary" plain style="float: right; margin-bottom: 20px; margin-top: 20px;">Next</el-button>
                    <el-button @click="onpreviousfinalization()" type="primary" plain style="float: right; margin-bottom: 20px; margin-top: 20px; margin-right: 10px;">Previous</el-button>
                    
                </div>
                
            </div>
          <div v-else-if="activesteps == 3" style="margin-top: 20px;">
              <div class="container">
                <el-card shadow="always">
                  <el-alert
                      style="margin-top: 20px; margin-bottom: 30px;"
                      title="You're all caught up"
                      type="success"
                      effect="dark"
                      :closable="false"
                      description="You can now activate the product you've created. The activated product may appear on POS System."
                      show-icon>
                  </el-alert>
                  <center>
                  <img src="https://cdn3.iconfinder.com/data/icons/start-up-4/44/box-256.png"
                  alt="No image"
                  style="width: 10%; height: auto; margin-bottom: 20px;"
                  class="img-fluid"/>
                    <h1>You're all caught up!</h1>
                    <hr>
                    <el-card style="margin-top: 20px;" shadow="always">

                      <p style="font-size: 20px;">Good job! The product you've created can now activate on product activation and may appear on your Point of Sales System.</p>
                      <el-button @click="onstartover()" type="primary">Start over</el-button>
                    </el-card>
                  </center>
                </el-card>
              </div>
          </div>
        </div>
    </div>
</template>

<script>
import {prod_final_get_all_categories, getalllistfinalcateg, filterrawmats, addproductfinal, getallstocksfinalization, selectedrawmat, listofselectedrawmat, getridselection, getallpcodeforselectedraw, product_quantity_deduction, clearallraws, product_finalization_history_raw_mats} from "@/store/request-common"
import firebase  from "firebase"
export default {
    data(){
        return{
          filtervalue: '',
          filteroptions: [],
          options: [],
            tableData: [],
        multipleSelection: [],
            uploadpercent: 0,
            activesteps: 0,
            img1: '',
            imageData: '',
                taskfinalization: {
                    prodname: '',
                    prodquantity: 0,
                    prodprice: 0,
                    prodcategory: '',
                    productImageUrl: '',
                    prodcode: ''
                },
                allstockslist:[],
                 pageSize: 5,
              page: 1,
              listLoading: true,
              searchable: '',
              listofrawmats: [], searchableselected: '',
              selectionshit: 'selection'
        }
    },
    computed: {
          pagedTableData() {
       if(this.searchable){
      return this.allstockslist.filter((item)=>{
        return this.searchable.toLowerCase().split(' ').every(v => item.productname.toLowerCase().includes(v) || item.stockID.toString().toLowerCase().includes(v))
      })
      }else{
        return this.allstockslist.slice(this.pageSize * this.page - this.pageSize, this.pageSize * this.page)
      }
       
     },
     pagedTableDataselected() {
       if(this.searchable){
      return this.allstockslist.filter((item)=>{
        return this.searchable.toLowerCase().split(' ').every(v => item.prodname.toLowerCase().includes(v) || item.id.toString().toLowerCase().includes(v))
      })
      }else{
        return this.listofrawmats.slice(this.pageSize * this.page - this.pageSize, this.pageSize * this.page)
      }
       
     }
    },
    created(){
      this.getallprodcategfinal()
        this.getallcategories()
        this.makeid(10)
        this.takeallstocks()
        this.allrawmats()
        
    },
    methods: {
      ongetall: function(){
        const loading = this.$loading({
          lock: true,
          text: 'please wait...',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        setTimeout(() => {
          this.takeallstocks()
          loading.close()
        }, 1000)

      },
      onselectfilter(){
        const loading = this.$loading({
          lock: true,
          text: 'please wait...',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        setTimeout(() => {
          filterrawmats(this.filtervalue).then(res => {
            this.allstockslist = res.data
            loading.close()
          })
        }, 1000)

      },
      onstartover(){
        this.getallcategories()
        this.makeid(10)
        this.takeallstocks()
        this.allrawmats()
        this.taskfinalization.prodprice = 0
        this.taskfinalization.prodname = ""
        this.taskfinalization.prodquantity = 0
        this.taskfinalization.prodcategory = ""
        this.taskfinalization.productImageUrl = ""
        this.activesteps = 0
      },
      selectable(row, index){
        if(row.product_quantity < this.taskfinalization.prodquantity){
            return false
          }else{
            return true
          }
      },
        handleSelectionChange(val) {
        this.multipleSelection = val;
        console.log(this.multipleSelection)
      },
        onnextfinalization(){
            if(!this.taskfinalization.prodname || !this.taskfinalization.prodquantity
            || !this.taskfinalization.prodprice || !this.taskfinalization.prodcategory
            || !this.taskfinalization.productImageUrl){
               this.$notify.warning({
                                title: 'Oops',
                                message: 'Something is empty please try again',
                                offset: 100
                                }); 
                                return false
            }else{
                this.activesteps++
            }
            
        },
        onnextfinalization1(){
           product_quantity_deduction(this.taskfinalization.prodquantity, this.multipleSelection)
              .then(resp => {
                if(resp.data === "success"){
                  this.onsaveproductfinal()
                } else if(resp.data === "invalid quantity"){
                  this.$notify.warning({
                                title: 'Oops',
                                message: 'Invalid Quantity',
                                offset: 100
                                }); 
                                return false
                }
                else{
                  this.$notify.error({
                                title: 'Oops',
                                message: 'something went wrong please try again',
                                offset: 100
                                });
                                return false
                }
              })
          
        },
        history_product_finalization(){
          product_finalization_history_raw_mats(this.taskfinalization.prodcode, this.multipleSelection).then(res => {
            console.log(res.data)
          })
        },
        onpreviousfinalization(){
            this.activesteps--
        },
        getallproductcodeforselectedraw(){
            getallpcodeforselectedraw().then(response => {
                product_quantity_deduction(this.taskfinalization.prodquantity, response.data)
                .then(resp => {
                    console.log(resp.data)
                })
            })
        },
        onremoveselection(id){
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
                        getridselection(id).then(resolve => {
                            if(resolve.data === "success"){
                                loading.close()
                                this.$notify.success({
                                title: 'Yey',
                                message: 'Successfully removed',
                                offset: 100
                                });
                                this.allrawmats()
                            }
                        })
                    }, 2000)
                })
        },
        allrawmats(){
            listofselectedrawmat().then(resolve => {
                this.listofrawmats = resolve.data
                console.log(resolve.data)
            })
        },
        onselectraw(pname, stocknumber, pimage){
            
                    const loading = this.$loading({
                    lock: true,
                    text: 'please wait...',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                    });
                    setTimeout(() => {
                        selectedrawmat(pname, stocknumber, pimage).then(resolve => {
                            if(resolve.data === "success"){
                                loading.close()
                                this.$notify.success({
                                title: 'Yey',
                                message: 'Successfully selected',
                                offset: 100
                                });
                                this.allrawmats()
                            } else if(resolve.data === "exist"){
                                loading.close()
                                this.$notify.warning({
                                title: 'Oops',
                                message: 'Raw material already exist',
                                offset: 100
                                });
                                this.allrawmats()
                                return false
                            }
                        })
                    }, 1000)
        },
        setPage (val) {
        this.page = val
      },  
      setPage1(val){
this.page = val
      },
        takeallstocks(){
            getallstocksfinalization().then(resp => {
                this.allstockslist = resp.data
                console.log(this.allstockslist)
            })
        },
        makeid(length) {
            var result           = [];
            var characters       = '0123456789';
            var charactersLength = characters.length;
            for ( var i = 0; i < length; i++ ) {
                result.push(characters.charAt(Math.floor(Math.random() *
            charactersLength)));
            }
            return this.taskfinalization.prodcode = result.join('');
            },
            cleanselectedraw(){
                clearallraws().then(response => {
                    console.log(response.data)
                    this.allrawmats()
                })
            },
        onsaveproductfinal(){
            
            if(this.taskfinalization.prodquantity <= 0 || this.taskfinalization.prodprice <= 0){
                this.$notify.error({
                                title: 'Oops',
                                message: 'invalid product quantity or price',
                                offset: 100
                                });
                                return false
            }else{

              const loading = this.$loading({
                lock: true,
                text: 'please wait...',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
              });
              setTimeout(() => {
                addproductfinal(this.taskfinalization).then((resolve) => {
                  console.log(resolve.data)
                  if(resolve.data === "success"){
                    loading.close()
                    this.$notify.success({
                      title: 'Yey',
                      message: 'Successfully added to Product Activation',
                      offset: 100
                    });
                    this.getallcategories()
                    this.takeallstocks()
                    this.allrawmats()
                    this.history_product_finalization()
                    this.activesteps = 3;
                  }else if(resolve.data === "empty"){
                    loading.close()
                    this.$notify.error({
                      title: 'Oops',
                      message: 'Something is empty, please try again.',
                      offset: 100
                    });
                    return false
                  }
                  else if(resolve.data === "invalid quantity"){
                    loading.close()
                    this.$notify.error({
                      title: 'Oops',
                      message: 'Invalid quantity please try again.',
                      offset: 100
                    });
                    this.getallcategories()
                    this.takeallstocks()
                    this.allrawmats()
                    return false
                  }
                })
              }, 3000)
            }
        },
        getallprodcategfinal(){
          getalllistfinalcateg().then(response => {
            this.options = response.data
          })
        },
        getallcategories(){
            prod_final_get_all_categories().then(response => {
                this.filteroptions = response.data
                
            })
        },
        previewImage(event){
            this.img1 = event.target.files[0]
            this.uploadpercent = 0
            this.imageData = event.target.files[0]
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
               const ref = firebase.storage().ref(`productfinalimages/${this.imageData.name}`);
               ref.put(this.imageData.name).then(() => {
                   ref.getDownloadURL().then((url) => {
                       loading.close()
                       this.$notify.success({
                                title: 'Yey',
                                message: 'Successfully Uploaded',
                                offset: 100
                                });
                       this.taskfinalization.productImageUrl = url;
                       this.img1 = url
                   })
               })
            }).catch((err) => {
                const storageRef = firebase.storage().ref(`productfinalimages/${this.imageData.name}`).put(this.imageData);
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
                    this.taskfinalization.productImageUrl = url;
                    this.img1 = url
                })
            })
            })
        }
    }
}
</script>


<style scoped>
.el-table .warning-row {
background: 'rgb(252, 230, 190)';
}

.el-table .success-row {
background: 'rgb(252, 230, 190)';
}

.el-table .other-row {
background: 'rgb(252, 230, 190)';
}
</style>