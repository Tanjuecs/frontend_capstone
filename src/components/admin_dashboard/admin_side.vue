<template>
    <div>
        <div id="layoutSidenav">
            <div id="layoutSidenav_nav">
                <nav class="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
                    <div class="sb-sidenav-menu">
                        <div class="nav" id="mycustomscroll">
                           <el-menu
                                default-active="1"
                                class="el-menu-vertical-demo"
                                @open="handleOpen"
                                @close="handleClose"
                                background-color="#212529"
                                text-color="#fff"
                                active-text-color="#ffd04b">

                                    <el-menu-item index="1" @click="ondashboard()">
                                    <img src="https://cdn2.iconfinder.com/data/icons/scenarium-vol-1-2/128/005_workplace_workspace_computer_desktop_dashboard_account_analytics-256.png"
                                     alt="no image" style="width: 15%; height:auto;">&nbsp;
                                    <span>Dashboard</span>
                                </el-menu-item>

                                    <el-menu-item index="2" @click="onusermanagement()">
                                    <img src="https://cdn4.iconfinder.com/data/icons/productivity-5/488/5-team_up-256.png"
                                     alt="no image" style="width: 15%; height:auto;">&nbsp;
                                    <span>User Management</span>
                                </el-menu-item>
                                
                                <el-submenu index="3">
                                    <template slot="title">
                                    <img src="https://cdn3.iconfinder.com/data/icons/logistics-87/512/inventory-Check-list-store-product-256.png"
                                     alt="no image" style="width: 15%; height:auto;">&nbsp;
                                    <span>Product Inventory</span>
                                    </template>
                                   
                                    <el-menu-item index="3-1" @click="productinventory()">
                                        <img src="https://cdn1.iconfinder.com/data/icons/e-commerce-retro-pack-vol-1/115/inventory_management-256.png"
                                     alt="no image" style="width: 15%; height:auto;">&nbsp;
                                        Inventory Viewing
                                        </el-menu-item>
                                    <el-menu-item index="3-2" @click="addproductinventory()">
                                        <img src="https://cdn3.iconfinder.com/data/icons/flat-icons-web/40/Plus_01-66-256.png"
                                     alt="no image" style="width: 15%; height:auto;">&nbsp;
                                        Inventory / Stocks
                                    </el-menu-item>
                                    
                                    
                                </el-submenu>

                                

                                    <el-submenu index="4">
                                    <template slot="title">
                                    <img src="https://cdn1.iconfinder.com/data/icons/business-finance-vol-3-39/512/business_plan_product_industry-256.png"
                                     alt="no image" style="width: 15%; height:auto;">&nbsp;
                                    <span>Product Resource</span>
                                    </template>
                                    <el-menu-item index="5-1" @click="onproductsupplier()">
                                        <img src="https://cdn4.iconfinder.com/data/icons/job-recruitment-5/64/Supplier-products-cargo-distributor-retail-256.png"
                                     alt="no image" style="width: 15%; height:auto;">&nbsp;
                                        Suppliers
                                        </el-menu-item>
                                    
                                </el-submenu>

                                <el-submenu index="5">
                                    <template slot="title">
                                    <img src="https://cdn0.iconfinder.com/data/icons/smashicons-business-yellow-vol-1/60/53_-Finalize_Sale-_business_finance_marketing-256.png"
                                     alt="no image" style="width: 15%; height:auto;">&nbsp;
                                    <span>finalization</span>
                                    </template>
                                    <el-menu-item index="5-1" @click="onproductfinal()">
                                        <img src="https://cdn2.iconfinder.com/data/icons/scenarium-vol-3-1/128/020_crate_delivery_parachute_present_product_air_cloud-256.png"
                                     alt="no image" style="width: 15%; height:auto;">&nbsp;
                                        Product finalization 
                                        </el-menu-item>
                                  <el-menu-item index="5-2" @click="onproductactivator()">
                                    <img src="https://cdn3.iconfinder.com/data/icons/marketing-management-7/64/activation-marketing-process-business-256.png"
                                         alt="no image" style="width: 15%; height:auto;">&nbsp;
                                    Product Activation
                                  </el-menu-item>
                                    
                                </el-submenu>
                                <!-- div if = if true this will be shown if not hide -->

                                    <div v-if="identify.enablePO == 0">

                                    </div>
                                    <div v-else>
                                        <el-submenu index="6">
                                    <template slot="title">
                                    <img src="https://cdn4.iconfinder.com/data/icons/shopping-e-commerce-10/33/order-256.png"
                                     alt="no image" style="width: 15%; height:auto;">&nbsp;
                                    <span>Orders</span>
                                    </template>
                                    <el-menu-item index="6-1" @click="onpurchaseorder()">
                                        <img src="https://cdn2.iconfinder.com/data/icons/flat-seo-web-ikooni/128/flat_seo3-25-256.png"
                                     alt="no image" style="width: 15%; height:auto;">&nbsp;
                                        Purchase Order
                                        </el-menu-item>
                                        <el-menu-item index="6-2" @click="onreceivedorder()">
                                        <img src="https://cdn1.iconfinder.com/data/icons/delivery-19/90/received_a_box-256.png"
                                     alt="no image" style="width: 15%; height:auto;">&nbsp;
                                        Received Order
                                        </el-menu-item>
                                        <el-menu-item index="6-3">
                                        <img src="https://cdn2.iconfinder.com/data/icons/miscellaneous-7-color-shadow/128/return_order_product-256.png"
                                     alt="no image" style="width: 15%; height:auto;">&nbsp;
                                        Return Orders
                                        </el-menu-item>
                                </el-submenu>
                                    </div>

    <!-- div if end -->

                                    <el-submenu index="7">
                                    <template slot="title">
                                    <img src="https://cdn1.iconfinder.com/data/icons/zake-miscellaneous-011/64/grid_view_menu_category-512.png"
                                     alt="no image" style="width: 15%; height:auto;">&nbsp;
                                    <span>Product Category</span>
                                    </template>
                                    <el-menu-item index="7-1" @click="onproductcategory()">
                                        <img src="https://cdn1.iconfinder.com/data/icons/e-commerce-stuff/300/search_product_category-256.png"
                                     alt="no image" style="width: 15%; height:auto;">&nbsp;
                                        Category
                                        </el-menu-item>

                                </el-submenu>

                                

                                 <el-menu-item index="8" @click="onstockonhand()">
                                    <img src="https://cdn2.iconfinder.com/data/icons/picons-basic-2/57/basic2-237_line_chart_analytics-256.png"
                                     alt="no image" style="width: 15%; height:auto;">&nbsp;
                                    <span>Stock on hand</span>
                                </el-menu-item>

                                  <el-submenu index="9">
                                    <template slot="title">
                                    <img src="https://cdn4.iconfinder.com/data/icons/popicon-business-bluetone-part-3-5/256/42-256.png"
                                     alt="no image" style="width: 15%; height:auto;">&nbsp;
                                    <span>Reports</span>
                                    </template>
                                    <el-menu-item index="9-1" @click="onhistory()">
                                        <img src="https://cdn2.iconfinder.com/data/icons/time-and-date-1/48/Past-256.png"
                                     alt="no image" style="width: 15%; height:auto;">&nbsp;
                                        Histories
                                        </el-menu-item>

                                        <!-- <el-menu-item index="10-2" @click="onmoresettings()">
                                        <img src="https://cdn2.iconfinder.com/data/icons/business-filled-outline-style-1-set-1/256/21-256.png"
                                     alt="no image" style="width: 15%; height:auto;">&nbsp;
                                        More settings
                                        </el-menu-item> -->
                                    
                                </el-submenu>

                                <el-submenu index="10">
                                    <template slot="title">
                                    <img src="https://cdn0.iconfinder.com/data/icons/artificial-intelligence-49/64/robot_settings_smart_future_tech-256.png"
                                     alt="no image" style="width: 15%; height:auto;">&nbsp;
                                    <span>Settings</span>
                                    </template>
                                    <el-menu-item index="10-1" @click="onexceltemplate()">
                                        <img src="https://cdn3.iconfinder.com/data/icons/logos-brands-3/24/logo_brand_brands_logos_excel-256.png"
                                     alt="no image" style="width: 15%; height:auto;">&nbsp;
                                        Excel Templates
                                        </el-menu-item>

                                        <el-menu-item index="10-2" @click="onmoresettings()">
                                        <img src="https://cdn2.iconfinder.com/data/icons/business-filled-outline-style-1-set-1/256/21-256.png"
                                     alt="no image" style="width: 15%; height:auto;">&nbsp;
                                        More settings
                                        </el-menu-item>
                                    
                                </el-submenu>
                                
                                </el-menu>
                                
                        </div>
                    </div>
                    <div class="sb-sidenav-footer">
                        <div v-if="this.istypes == '1'">
                            <div class="small ps-5">Logged in as: &nbsp;&nbsp;<el-tag type="success">Administrator</el-tag></div>
                        </div>
                    </div>
                </nav>
            </div>
            <div id="layoutSidenav_content">
                <!-- content -->
                <main>
                    <div class="container-fluid px-4">
                        <router-view></router-view>
                        
                    </div>
                </main>
                
                <footer class="py-4 bg-light mt-auto">
                    <div class="container-fluid px-4">
                        <div class="d-flex align-items-center justify-content-between small">
                            <div class="text-muted">Copyright &copy; Burger Mania {{ new Date().getFullYear() }}</div>
                            <div>
                                <!-- <a href="#">Privacy Policy</a>
                                &middot;
                                <a href="#">Terms &amp; Conditions</a> -->
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    </div>
</template>

<script>
import {savedsettings} from "@/store/request-common"
export default {
    data(){
        return {
            istypes: '1',
            identify: [],
            after10days:[],
        }
    },
    created(){
        JSON.parse(localStorage.getItem("oauth2_ss::_profileinfo_")).istype = this.istypes
        this.settingsidentifier()
        setInterval(() => {
            this.settingsidentifier()
        }, 5000)
        
    },
    methods: {
        
        settingsidentifier(){
            savedsettings().then(response => {
                if(response.data[0] === undefined || response.data[0] === ''){

                }else{
                    this.identify = response.data[0]
                }
            })
        },
        //routing
        onhistory(){
            const loading = this.$loading({
          lock: true,
          text: 'please wait..',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        setTimeout(() => {
          loading.close()
          this.$router.push({name: 'Product History'}).catch(() => {})

        }, 2000)
        },
      onproductactivator(){
        const loading = this.$loading({
          lock: true,
          text: 'please wait..',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        setTimeout(() => {
          loading.close()
          this.$router.push({name: 'Product Activator'}).catch(() => {})

        }, 2000)
      },
        onproductfinal(){
            const loading = this.$loading({
                    lock: true,
                    text: 'please wait..',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                    });
                    setTimeout(() => {
                        loading.close()
                        this.$router.push({name: 'Product Final'}).catch(() => {})
                         
                    }, 2000)
        },
        onstockonhand(){
             const loading = this.$loading({
                    lock: true,
                    text: 'please wait..',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                    });
                    setTimeout(() => {
                        loading.close()
                        this.$router.push({name: 'Stocks on hand'}).catch(() => {})
                         
                    }, 2000)
        },
        onreceivedorder(){
            const loading = this.$loading({
                    lock: true,
                    text: 'please wait..',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                    });
                    setTimeout(() => {
                        loading.close()
                        this.$router.push({name: 'Receive Orders'}).catch(() => {})
                         
                    }, 2000)
        },
        onmoresettings(){
            const loading = this.$loading({
                    lock: true,
                    text: 'please wait..',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                    });
                    setTimeout(() => {
                        loading.close()
                        this.$router.push({name: 'More Settings'}).catch(() => {})
                         
                    }, 2000)
        },
        onproductcategory(){
             const loading = this.$loading({
                    lock: true,
                    text: 'please wait..',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                    });
                    setTimeout(() => {
                        loading.close()
                        this.$router.push({name: 'Product Category'}).catch(() => {})
                         
                    }, 2000)
        },
        onpurchaseorder(){
             const loading = this.$loading({
                    lock: true,
                    text: 'please wait..',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                    });
                    setTimeout(() => {
                        loading.close()
                        this.$router.push({name: 'Purchase Order'}).catch(() => {})
                         
                    }, 2000)
        },
        onproductsupplier(){
            const loading = this.$loading({
                    lock: true,
                    text: 'please wait..',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                    });
                    setTimeout(() => {
                        loading.close()
                        this.$router.push({name: 'Product Supplier'}).catch(() => {})
                         
                    }, 2000)
        },
        onexceltemplate(){
             const loading = this.$loading({
                    lock: true,
                    text: 'please wait..',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                    });
                    setTimeout(() => {
                        loading.close()
                        this.$router.push({name: 'Excel Template'}).catch(() => {})
                         
                    }, 2000)
        },
    onusermanagement(){
        const loading = this.$loading({
                    lock: true,
                    text: 'please wait..',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                    });
                    setTimeout(() => {
                        loading.close()
                        this.$router.push({name: 'User Management'}).catch(() => {})
                         
                    }, 2000)
    },
    ondashboard(){
        const loading = this.$loading({
                    lock: true,
                    text: 'please wait..',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                    });
       setTimeout(() => {
           loading.close()
            this.$router.push({name: 'admindashboard'}).catch(() => {})
       }, 2000)
    },
    productinventory(){
        const loading = this.$loading({
                    lock: true,
                    text: 'please wait..',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                    });
       setTimeout(() => {
           loading.close()
            this.$router.push({name: 'Product Inventory'}).catch(() => {})
       }, 2000)
    },
    addproductinventory(){
         const loading = this.$loading({
                    lock: true,
                    text: 'please wait..',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                    });
       setTimeout(() => {
           loading.close()
            this.$router.push({name: 'Product Inventory Add'}).catch(() => {})
       }, 2000)
    },
        //end routing
       
      
    }
    
}
</script>

<style scoped>
/* #mycustomscroll{
    height: 100%;
    overflow: scroll;
} */
</style>