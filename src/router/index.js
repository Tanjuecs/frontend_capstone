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
    path: '/about_us',
    name: 'About Us',
    component: () => import("@/views/aboutus")
  },
  {
    path: '/forgot_account',
    name: 'Forgot Password',
    component: () => import("@/views/forgot")
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
        path: '/admindashboard/usermanagement' + makeid(200),
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
      },
      {
        path: '/more_settings' + makeid(200),
        name: 'More Settings',
        component: () => import("@/views/admin/dashboard_content/admin_more_settings")
      },
      {
        path: '/received_orders' + makeid(200),
        name: 'Receive Orders',
        component: () => import("@/views/admin/dashboard_content/admin_received_order")
      },
      {
        path: '/stocks_on_hand' + makeid(200),
        name: 'Stocks on hand',
        component: () => import("@/views/admin/dashboard_content/admin_stock_on_hand")
      },
      {
        path: '/product_final' + makeid(200),
        name: 'Product Final',
        component: () => import("@/views/admin/dashboard_content/admin_product_final")
      },
      {
        path: '/product_activator' + makeid(200),
        name: 'Product Activator',
        component: () => import("@/views/admin/dashboard_content/admin_product_activation")
      },
      {
        path: '/product_history' + makeid(200),
        name: 'Product History',
        component: () => import("@/views/admin/dashboard_content/admin_histories")
      },
      {
        path: '/return_orders' + makeid(200),
        name: 'Return Orders',
        component: () => import("@/views/admin/dashboard_content/admin_return_orders")
      }
    ]
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router
