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
                                    
                                    <el-table-column label="Product Image" >
                                        <template slot-scope="{row}">
                                        <img :src="row.productimgurl" style="width: 100%; height: auto;" class="img-fluid" alt="No image">
                                        <!-- <el-tag>{{ row.type | typeFilter }}</el-tag> -->
                                        </template>
                                    </el-table-column>

                                    <el-table-column label="Product Name" >
                                        <template slot-scope="{row}">
                                        <span class="link-type" >{{ row.productName }}</span>
                                        <!-- <el-tag>{{ row.type | typeFilter }}</el-tag> -->
                                        </template>
                                    </el-table-column>

                                     <el-table-column label="Product Quantity" >
                                        <template slot-scope="{row}">
                                        <span class="link-type" >{{ row.product_quantity }}</span>
                                        <!-- <el-tag>{{ row.type | typeFilter }}</el-tag> -->
                                        </template>
                                    </el-table-column>

                                    <el-table-column label="Product Price" >
                                        <template slot-scope="{row}">
                                        <span class="link-type" >&#8369;{{ row.product_price }}</span>
                                        <!-- <el-tag>{{ row.type | typeFilter }}</el-tag> -->
                                        </template>
                                    </el-table-column>

                                     <el-table-column label="Product Total" >
                                        <template slot-scope="{row}">
                                            
                                        <span class="link-type" >&#8369;{{ row.product_price * row.product_quantity }}</span>
                                        <!-- <el-tag>{{ row.type | typeFilter }}</el-tag> -->
                                        </template>
                                    </el-table-column>

                                    
                                    <el-table-column label="Status" class-name="status-col" >
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

                                    <el-table-column label="More actions"  align="center">
                                        <template slot-scope="{row}">
                                        <div v-if="row.product_status == 1">
                                            <el-button type="danger" style="width: 100%;" @click="ondeactivate(row.productID)">Deactivate</el-button>
                                        </div>
                                        <div v-else>
                                            <el-button type="success" style="width: 100%;" @click="onactivate(row.productID)">Activate</el-button>
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
       
     }
    },
    data(){
        return {
            value2: false,
            pageSize: 5,
              page: 1,
              listLoading: true,
              productArray: [],
              searchable: ''
        }
    },
    created(){
        this.fetchproducts()
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
                    }
                })
            }, 3000)
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