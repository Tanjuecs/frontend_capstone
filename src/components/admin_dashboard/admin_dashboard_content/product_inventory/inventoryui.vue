<template>
    <div>
        <div class="container">
                                     <el-input
                                    style="margin-bottom: 5px; width: 30%;"
                                    placeholder="Search"
                                    v-model="searchable"
                                    clearable>
                                    </el-input>
                                    <el-switch
                                        style="display: block; margin-bottom: 20px;"
                                        @change="onswits()"
                                        v-model="value2"
                                        active-color="#13ce66"
                                        inactive-color="#ff4949"
                                        active-text="All active"
                                        inactive-text="All inactive">
                                        </el-switch>
                                    <el-table
                                    :key="0"
                                    v-loading="listLoading"
                                    :data="pagedTableData"
                                    border
                                    fit
                                    highlight-current-row
                                    style="width: 100%;"
                                    
                                    >
                                    <el-table-column label="Product Code" prop="id" sortable="custom" align="center"  >
                                        <template slot-scope="{row}">
                                        <span>{{ row.productCode }}</span>
                                        </template>
                                    </el-table-column>
                                    
                                    <el-table-column label="Product Image" align="center">
                                        <template slot-scope="{row}">
                                        <img :src="row.productimgurl" style="width: 100%; height: auto;" class="img-fluid" alt="No image">
                                        <!-- <el-tag>{{ row.type | typeFilter }}</el-tag> -->
                                        </template>
                                    </el-table-column>

                                    <el-table-column label="Product Name" align="center">
                                        <template slot-scope="{row}">
                                        <span class="link-type" >{{ row.productName }}</span>
                                        <!-- <el-tag>{{ row.type | typeFilter }}</el-tag> -->
                                        </template>
                                    </el-table-column>

                                     <el-table-column label="Product Quantity" align="center">
                                        <template slot-scope="{row}">
                                        <span class="link-type" >{{ row.product_quantity }}</span>
                                        <!-- <el-tag>{{ row.type | typeFilter }}</el-tag> -->
                                        </template>
                                    </el-table-column>

                                    

                                    

                                    
                                    <el-table-column label="Status" class-name="status-col" align="center">
                                        <template slot-scope="{row}">
                                        <div v-if="row.product_status == 1">
                                            <el-tag type="success">
                                            Active
                                        </el-tag>
                                        </div>
                                        <div v-else>
                                                <el-tag type="warning">
                                            Inactive
                                        </el-tag>
                                        </div>
                                        </template>
                                    </el-table-column>

                                    
                                    <el-table-column label="Created"  align="center">
                                        <template slot-scope="{row}">
                                        <span>{{ row.createdAt | moment("calendar") }}</span>
                                        </template>
                                    </el-table-column>

                                    <el-table-column label="More Actions" align="center">
                                        <template slot-scope="{row}">
                                        <div v-if="row.product_status == 1">
                                           <el-button @click="ondeactivate(row.productID)" type="danger" style="width: 100%;" size="medium">
                                                   Deactivate
                                               </el-button>
                                        </div>
                                        <div v-else>
                                               <el-button @click="onactivate(row.productID)" type="success" style="width: 100%;" size="medium">
                                                   Activate
                                               </el-button>
                                        </div>
                                        </template>
                                    </el-table-column>
                                    

                                    </el-table>
                                    <el-pagination layout="prev, pager, next" :page-size="pageSize" :total="this.productArray.length" @current-change="setPage">
                                    </el-pagination>
        </div>
    </div>
</template>

<script>
import {fetchAllProductInventoryByFilter, activateproduct, deactivateproduct} from "@/store/request-common"
import {mapGetters} from 'vuex'
export default {
    computed: {
          pagedTableData() {
       if(this.searchable){
      return this.productArray.filter((item)=>{
        return this.searchable.toLowerCase().split(' ').every(v => item.productName.toLowerCase().includes(v) || item.productID.toString().toLowerCase().includes(v))
      })
      }else{
        return this.productArray.slice(this.pageSize * this.page - this.pageSize, this.pageSize * this.page)
      }
       
     },
     ...mapGetters({
         get_response_product_history_activation: 'get_response_product_history_activation'
     })
    },
    data(){
        return {
            value2: false,
            pageSize: 5,
              page: 1,
              listLoading: true,
              productArray: [],
              searchable: '',
              activitylog_code: ''
        }
    },
    created(){
        this.fetchproducts()
        this.makeactivation_code(5)
    },
    methods:{
        ondeactivate(id){
        const loading = this.$loading({
                    lock: true,
                    text: 'Deactivating, please wait...',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                });
                setTimeout(() => {
                deactivateproduct(id).then(response => {
                    if(response.data === "update success"){
                        this.$notify.success({
                                title: 'Yey',
                                message: 'Successfully Deactivated',
                                offset: 100
                                });
                                loading.close();
                                this.fetchproducts()
                    }
                })
            }, 3000)
        },
        onswits(){
            const loading = this.$loading({
                    lock: true,
                    text: 'Activating, please wait...',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                });
                setTimeout(() => {
                    this.fetchproducts()
                    loading.close()
                }, 2000)
        },
        makeactivation_code(length) {
            var result           = [];
            var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            var charactersLength = characters.length;
            for ( var i = 0; i < length; i++ ) {
                result.push(characters.charAt(Math.floor(Math.random() *
            charactersLength)));
            }
            return this.activitylog_code = result.join('');
            },
        onactivate(id){
            const loading = this.$loading({
                    lock: true,
                    text: 'Activating, please wait...',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                });
            setTimeout(() => {
                activateproduct(id).then(response => {
                    if(response.data === "update success"){
                        this.$notify.success({
                                title: 'Yey',
                                message: 'Successfully Activated',
                                offset: 100
                                });
                                loading.close();
                                this.fetchproducts()
                            this.$store.dispatch(`ACTIONS_PRODUCT_HISTORY_ACTIVATION`, {
                                self: this,
                                code: this.activitylog_code
                            })
                    } else if(response.data === "cant activate"){
                        this.$notify.error({
                                title: 'Oops',
                                message: 'Sorry but this product cant activate',
                                offset: 100
                                });
                                loading.close();
                                return false
                    }
                })
            }, 3000)
        },
        activity_log_product_activation_response(){
            if(this.get_response_product_history_activation === "success"){
                console.log(this.get_response_product_history_activation)
            }
        },
        fetchproducts(){
            fetchAllProductInventoryByFilter(this.value2).then(response => {
                this.productArray = response.data
                this.listLoading = false;
            })
        },
         setPage (val) {
        this.page = val
      },  
    }
}
</script>