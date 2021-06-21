import Vue from 'vue'
import VueRouter from 'vue-router'


function makeid(length) {
  var result           = [];
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
    result.push(characters.charAt(Math.floor(Math.random() *
charactersLength)));
 }
 return result.join('');
}

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Index',
    component: () => import("@/views/index")
  },
  {
    path: '/registration',
    name: 'Registration',
    component: () => import("@/views/registration")
  },
  {
    path: '/admindashboard' + makeid(200),
    name: 'admindashboard',
    component: () => import('@/views/admin/admin'),
    children: [
      {
        path: '/admindashboard' + makeid(200),
        name: 'admindashboard',
        component: () => import("@/views/admin/dashboard_content/adminIndex")
      },
      {
        path: '/usermanagement' + makeid(200),
        name: 'User Management',
        component: () => import("@/views/admin/dashboard_content/admin_user_management")
      },
      {
        path: '/product_inventory' + makeid(200),
        name: 'Product Inventory',
        component: () => import("@/views/admin/dashboard_content/admin_inventory")
      },
      {
        path: '/add_product_inventory' + makeid(200),
        name: 'Product Inventory Add',
        component: () => import("@/views/admin/dashboard_content/admin_add_inventory")
      },
      {
        path: '/excel_templates' + makeid(200),
        name: 'Excel Template',
        component: () => import("@/views/admin/dashboard_content/admin_excel")
      },
      {
        path: '/product_supplier' + makeid(200),
        name: 'Product Supplier',
        component: () => import("@/views/admin/dashboard_content/admin_supplier")
      },
      {
        path: '/purchase_order' + makeid(200),
        name: 'Purchase Order',
        component: () => import("@/views/admin/dashboard_content/admin_purchase_order")
      },
      {
        path: '/product_category' + makeid(200),
        name: 'Product Category',
        component: () => import("@/views/admin/dashboard_content/admin_category")
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
