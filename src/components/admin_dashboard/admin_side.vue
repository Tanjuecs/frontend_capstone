<template>
    <div>
        <div id="layoutSidenav">
            <div id="layoutSidenav_nav">
                <nav class="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
                    <div class="sb-sidenav-menu">
                        <div class="nav" id="mycustomscroll">
                           <el-menu
                                default-active="2"
                                class="el-menu-vertical-demo"
                                @open="handleOpen"
                                @close="handleClose"
                                background-color="#212529"
                                text-color="#fff"
                                active-text-color="#ffd04b">
                                <el-menu-item-group title="Dashboard">
                                    <el-menu-item index="1" @click="ondashboard()">
                                    <img src="https://cdn2.iconfinder.com/data/icons/scenarium-vol-1-2/128/005_workplace_workspace_computer_desktop_dashboard_account_analytics-256.png"
                                     alt="no image" style="width: 15%; height:auto;">&nbsp;
                                    <span>Dashboard</span>
                                </el-menu-item>
                                    </el-menu-item-group>
                                
                                <el-menu-item-group title="User Management">
                                    <el-menu-item index="2" @click="onusermanagement()">
                                    <img src="https://cdn2.iconfinder.com/data/icons/popicon-part-2/256/30-256.png"
                                     alt="no image" style="width: 15%; height:auto;">&nbsp;
                                    <span>User Management</span>
                                </el-menu-item>
                                    </el-menu-item-group>
                                <el-menu-item-group title="Product Inventory">
                                <el-submenu index="3">
                                    <template slot="title">
                                    <img src="https://cdn4.iconfinder.com/data/icons/check-out-vol-1-colored/48/JD-22-256.png"
                                     alt="no image" style="width: 15%; height:auto;">&nbsp;
                                    <span>Product Inventory</span>
                                    </template>
                                    <el-menu-item-group title="Inventory System">
                                        
                                    <el-menu-item index="3-1" @click="productinventory()">
                                        <img src="https://cdn4.iconfinder.com/data/icons/business-1114/55/64-256.png"
                                     alt="no image" style="width: 15%; height:auto;">&nbsp;
                                        Inventory Activation
                                        </el-menu-item>
                                    <el-menu-item index="3-2" @click="addproductinventory()">
                                        <img src="https://cdn3.iconfinder.com/data/icons/flat-icons-web/40/Plus_01-66-256.png"
                                     alt="no image" style="width: 15%; height:auto;">&nbsp;
                                        Add Inventory
                                    </el-menu-item>
                                    </el-menu-item-group>
                                    
                                </el-submenu>
                                </el-menu-item-group>
                                 <el-menu-item-group title="System Settings">
                                <el-submenu index="4">
                                    <template slot="title">
                                    <img src="https://cdn0.iconfinder.com/data/icons/artificial-intelligence-49/64/robot_settings_smart_future_tech-256.png"
                                     alt="no image" style="width: 15%; height:auto;">&nbsp;
                                    <span>Settings</span>
                                    </template>
                                    <el-menu-item-group title="Excel Settings">
                                        
                                    <el-menu-item index="4-1" @click="onexceltemplate()">
                                        <img src="https://cdn3.iconfinder.com/data/icons/logos-brands-3/24/logo_brand_brands_logos_excel-256.png"
                                     alt="no image" style="width: 15%; height:auto;">&nbsp;
                                        Excel Templates
                                        </el-menu-item>
                                       
                                    </el-menu-item-group>
                                    
                                </el-submenu>
                                 </el-menu-item-group>

                                <el-menu-item-group title="Product Management">
                                    <el-submenu index="5">
                                    <template slot="title">
                                    <img src="https://cdn1.iconfinder.com/data/icons/business-finance-vol-3-39/512/business_plan_product_industry-256.png"
                                     alt="no image" style="width: 15%; height:auto;">&nbsp;
                                    <span>Product Management</span>
                                    </template>
                                    <el-menu-item-group title="Product Suppliers">
                                    <el-menu-item index="5-1" @click="onproductsupplier()">
                                        <img src="https://cdn4.iconfinder.com/data/icons/job-recruitment-5/64/Supplier-products-cargo-distributor-retail-256.png"
                                     alt="no image" style="width: 15%; height:auto;">&nbsp;
                                        Suppliers
                                        </el-menu-item>
                                       
                                    </el-menu-item-group>
                                    
                                </el-submenu>
                                </el-menu-item-group>
    <!-- div if = if true this will be shown if not hide -->
                                <el-menu-item-group title="Product Management">
                                    <el-submenu index="6">
                                    <template slot="title">
                                    <img src="https://cdn4.iconfinder.com/data/icons/shopping-e-commerce-10/33/order-256.png"
                                     alt="no image" style="width: 15%; height:auto;">&nbsp;
                                    <span>Purchase Order</span>
                                    </template>
                                    <el-menu-item index="6-1" @click="onpurchaseorder()">
                                        <img src="https://cdn2.iconfinder.com/data/icons/flat-seo-web-ikooni/128/flat_seo3-25-256.png"
                                     alt="no image" style="width: 15%; height:auto;">&nbsp;
                                        Purchase Order
                                        </el-menu-item>

                                        
                                    
                                </el-submenu>
                                </el-menu-item-group>
    <!-- div if end -->
    <el-menu-item-group title="Product Category Management">
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
                                </el-menu-item-group>
                                
                                </el-menu>
                        </div>
                    </div>
                    <div class="sb-sidenav-footer">
                        <div v-if="this.istypes == '1'">
                            <div class="small">Logged in as: <el-tag type="success">Administrator</el-tag></div>
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
export default {
    data(){
        return {
            istypes: '1'
        }
    },
    created(){
        JSON.parse(localStorage.getItem("oauth2_ss::_profileinfo_")).istype = this.istypes
    },
    methods: {
        //routing
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
#mycustomscroll{
    height: 100%;
    overflow: scroll;
}
</style>