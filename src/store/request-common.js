import httpauth from "./0AuthRequest";

export function getmunicipality(){
    return httpauth.get("/api/location-getter/municipalities")
}

export function getprovinceByMunicipality(municipality){
    return httpauth.get(`/api/location-getter/get-province-by-municipality?municipality=${municipality}`)
}

export function sendEmail(obj, savedcode){
    var data = new FormData();
    data.append("firstname", obj.firstname)
    return httpauth.post("/api/registration/check-verification?email=" + obj.customer_email + "&code=" + savedcode, data)
}

export function checkcodeverification(obj){
    return httpauth.post("/api/registration/store-user-001?email=" + obj.customer_email + "&vcode=" + obj.account_code)
}

export function userRegistration(obj){
    var data = new FormData();
    data.append("firstname", obj.firstname)
    data.append("lastname", obj.lastname)
    data.append("municipality", obj.municipality)
    data.append("province", obj.province)
    data.append("address", 
    obj.floor + obj.street + obj.baranggay + obj.building
    )
    data.append("company_name", obj.company_name)
    data.append("address_type", obj.address_type)
    data.append("mobileno", obj.mobile_no)
    data.append("email", obj.customer_email)
    data.append("password", obj.customer_password)
    return httpauth.post("/api/registration/registration-finalization", data)
}

//csrf google login

export function csrf_google_login(email){
    return httpauth.post("/api/csrf-login/google-credentials-checker?email=" + email);
}

export function csrf_session_indicator(obj){
    return httpauth.post("/api/csrf-login/add-update-session?email=" + obj.sessionEmail + "&sessionid=" + obj.sessionID);
}

export function scanSession(){
    return httpauth.post("/api/csrf-login/scan-oauth-session?email=" + localStorage.getItem("oauth2_ss::_ss_"));
}

//standard login

export function standardLogin(obj){
    var data = new FormData();
    data.append("email", obj.email)
    data.append("password", obj.password)
    return httpauth.post("/api/csrf-login/standard-login", data)
}

//logout user

export function userLogout(email){
    return httpauth.post("/api/csrf-login/account-logout?email=" + email)
}

//getall users admin sire

export function listofuseres(){
    return httpauth.get("/api/user-management/getall-users")
}

//user updater

/* 
deactivate
*/
export function deactivate_user(id, indicator){
    return httpauth.post(`/api/user-management/update-user-status?id=${id}&indicator=${indicator}`);
}

export function activate_user(id, indicator){
    return httpauth.post(`/api/user-management/update-user-status?id=${id}&indicator=${indicator}`);
}

/* 
user filtering
*/

export function filter_user(val){
    return httpauth.get(`/api/user-management/user-filtering?value=${val}`)
}

/*
Archive
*/

export function archive_user(id, indicator){
    return httpauth.post(`/api/user-management/archive-user?id=${id}&indicator=${indicator}`)
}
export function fetch_archive_list(indicator){
    return httpauth.get(`/api/user-management/archive-list?indicator=${indicator}`)
}

/*
Add admin
*/

export function add_admin(obj){
    var data = new FormData();
    data.append("firstname", obj.adminfirstname);
    data.append("lastname", obj.adminlastname);
    data.append("email", obj.adminemail);
    data.append("password", obj.adminpassword);
    if(obj.isadmin == true){
        data.append("istype", 1);
    }
    if(obj.googleverified == true){
        data.append("isverified", 1);
        data.append("is_google_verified", 1);
    }
    if(obj.isactivate == true){
        data.append("isstatus", 1);
    }
    if(obj.imgurl != null || obj.imgurl != ""){
        data.append("imageurl", obj.imgurl);
    }
    return httpauth.post(`/api/user-management/adding-admin`, data);
}
export function add_cashier(obj){
    var data = new FormData();
    data.append("firstname", obj.cashierfirstname);
    data.append("lastname", obj.cashierlastname);
    data.append("email", obj.cashieremail);
    data.append("password", obj.cashierpassword);
    if(obj.iscashier == true){
        data.append("istype", 0);
    }
    if(obj.googleverified == true){
        data.append("isverified", 1);
        data.append("is_google_verified", 0);
    }
    if(obj.isactivate == true){
        data.append("isstatus", 0);
    }
    if(obj.imgurl != null || obj.imgurl != ""){
        data.append("imageurl", obj.imgurl);
    }
    return httpauth.post(`/api/user-management/adding-cashier`, data);
}
//fetch all product inventory

export function fetchAllProductInventory(){
    return httpauth.get(`/api/product-inventory/fetchinginventory`)
}

export function fetchAllProductInventoryByFilter(filter){
    return httpauth.get(`/api/product-inventory/fetchinginventory-filter-by-bool?filter=${filter}`)
}


/*
Product Inventory Request
Created date : 15/06/2021
*/

export function adding_product_inventory(obj){
    var productdata = new FormData();
    productdata.append("productName", obj.productName)
    productdata.append("productCode", obj.productCode)
    productdata.append("productQuantity", obj.productQuantity)
    productdata.append("productPrice", obj.productPrice)
    productdata.append("productSupplier", obj.productSupplier)
    productdata.append("productImageUrl", obj.productImageUrl)
    productdata.append("productcategory", obj.productcategory)
    if(obj.isadmin === true){
        productdata.append("isadmin", 1)
    }
    if(obj.isstatus === false){
        productdata.append("isstatus", 0)
    }
    return httpauth.post("/api/product-inventory/adding-product-inventory", productdata)
}

/* 
product inventory removing
created 15/07/2021
*/

export function removeproduct(id){
    return httpauth.post(`/api/product-inventory/product-inventory-deletion?prodid=${id}`)
}

/* 
product inventory filter search
created date : 16/06/2021
*/
export function filter_by_date(datefrom, dateto)
{
    return httpauth.get(`/api/product-inventory/filter-search?fromdate=${datefrom}&to=${dateto}`)
}

/*
product inventory more filter search
created date : 16/06/2021
*/
export function more_filter_search(obj){
                var data = new FormData();
                data.append("code", obj.filterbycode)
                data.append("pname", obj.filterbypname)
                data.append("pstatus", obj.filterbystatus1)
                data.append("filterbased", obj.filterbased)
                data.append("filterbycateg", obj.filterbycateg)
    return httpauth.post("/api/product-inventory/more-options", data)
}

/*
product inventory modify
created date: 16/06/2021
*/

export function product_modify(obj){
    var modifieddata = new FormData()
    modifieddata.append("modifyproductname", obj.modifyproductname)
    modifieddata.append("modifyproductquantity", obj.modifyproductquantity)
    modifieddata.append("modifyproductprice", obj.modifyproductprice)
    modifieddata.append("modifyproductsupplier", obj.modifyproductsupplier)
    modifieddata.append("modifyproductimageurl", obj.modifyproductimageurl)
    modifieddata.append("modifyPID", obj.modifyPID)
    modifieddata.append("modifycategory", obj.modifycategory)
    return httpauth.post(`/api/product-inventory/product-inventory-modification`, modifieddata)
}

/* 
system settings - excel import and save
created at : 17/06/2021
*/

export function saveExcel(obj){
    var data = new FormData();
    data.append("templatename", obj.templatename)
    data.append("templateurl", obj.templateURL)
    return httpauth.post(`/api/save-excel/data-save`, data)
    
}

/*
Product Inventory Import Excel
created at : 16/06/2021
*/ 

export function importExcelGenerateData(file){
    var data = new FormData();
    data.append("file", file)
    return httpauth.post(`/api/inventory-ai/artificial-intel-auto-compute`,  data)
}

/*
Fetch excel list templates
created at : 16/06/2021
*/ 

export function getlisttemplates(){
    return httpauth.get(`/api/inventory-ai/get-list-excel-save`)
}

/*
product activation
created at : 16/06/2021
*/

export function activateproduct(id){
    return httpauth.post(`/api/activation/product-activation?prodid=${id}`)
}
export function deactivateproduct(id){
    return httpauth.post(`/api/activation/product-deactivation?prodid=${id}`)
}

/*
product suppliers
created at : 17/06/2021
*/

export function addsupplier(obj){
    var data = new FormData();
    data.append("supplierIC", obj.supplierIC)
    data.append("supplierfirstname", obj.supplierfirstname)
    data.append("supplierlastname", obj.supplierlastname)
    data.append("supplierprimary", obj.supplierprimary)
    data.append("suppliersecondary", obj.suppliersecondary)
    data.append("suppliernumber", obj.suppliernumber)
    data.append("supplieremail", obj.supplieremail)
    if(!obj.supplierImageURL){
        data.append("supplierimgurl", "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1200px-No-Image-Placeholder.svg.png")
    }else{
        data.append("supplierimgurl", obj.supplierImageURL)
    }
    return httpauth.post(`/api/supplier-management/adding-supplier`, data)
}

/*
fetch added suppliers
created at : 18/06/2021
*/

export function fetchaddedsuppliers(){
    return httpauth.get(`/api/supplier-management/fetch-added-suppliers`)
}

/*
remove suppliers
created at : 18/06/2021
*/

export function removesupplier(id){
    return httpauth.post(`/api/supplier-management/remove-supplier?id=${id}`)
}

/*
find duplicate IC in suppliers
created at : 18/06/2021
*/

export function getduplicates(){
    return httpauth.get(`/api/supplier-management/find-duplicate-supplier`)
}

/*
product modify 
created at : 18/06/2021
*/

export function modifysupplier(obj){
    var data = new FormData();
    data.append("id", obj.modifyID)
    data.append("fname", obj.modifyfname)
    data.append("lname", obj.modifylname)
    data.append("number", obj.modifynumber)
    data.append("email", obj.modifyemail)
    data.append("simg", obj.modifyimgURL)
    return httpauth.post(`/api/supplier-management/modification-supplier`, data)
}

/*
purchase order loop behind 
created at : 21/06/2021
*/

export function purchasesorder(array){
    var data = new FormData();
    data.append("productname", array.productname)
    data.append("productQuantity", array.productQuantity)
    data.append("productprice", array.productprice)
    data.append("productsupplier", array.productsupplier)
    return httpauth.post(`/api/purchase-order/bulk-entry`, data)
}

/*
purchase order get all list
created at : 21/06/2021
*/

export function listofpurchase(){
    return httpauth.get(`/api/purchase-order/list-purchase-order`)
}


/*
product category adding
created at : 21/06/2021
*/




/*
product category listing
created at : 21/06/2021
*/

export function listcategory(){
    return httpauth.get(`/api/product-category-management/get-list-category`)
}

/*
system settings
created at : 22/06/2021
*/

export function systemsettings(obj){
    var data = new FormData();
    var enableposettings = "";
    if(obj.purchasesettings === false){
        enableposettings = "0"
    }else{
        enableposettings = "1"
    }
    if(obj.purchasesettings2 === false){
        data.append("enablepoinventory", 0)
    }else{
        data.append("enablepoinventory", 1)
    }
    if(obj.purchasesettings3 === false){
        data.append("enablelistview", 0)
    }else{
        data.append("enablelistview", 1)
    }
    if(obj.purchasesettings4 === false){
        data.append("viewentry", 0)
    }else{
        data.append("viewentry", 1)
    }
    return httpauth.post(`/api/system-settings/check-settings?enableposettings=${enableposettings}`, data)
}

/*
system settings fetching
created at : 22/06/2021
*/

export function savedsettings(){
    return httpauth.get(`/api/system-settings/get-po-settings`)
}

/*
category deleting
created at : 22/06/2021
*/

export function onremovecategory(id){
    return httpauth.post(`/api/product-category-management/remove-category?id=${id}`)
}

/*
bulk entry purchase order
created at : 22/06/2021
*/

export async function bulkentrypurchaseorder(obj){
    for(var x = 0; x < obj.length; x++){
    var result = httpauth.post(`/api/purchase-order/bulk-entry-purchase?quantity=${parseInt(obj[x].productquantity)}&price=${obj[x].productprice}&ponumber=${obj[x].ponumber}&pname=${obj[x].productname}&supplier=${obj[x].productsupplier}`, data)
    }
    return await result;
}

/*
single entry purchase order
created at : 22/06/2021
*/

export function singleentrypurchaseorder(obj){
    var data = new FormData();
    data.append("ponumber", obj.ponumber)
    data.append("pname", obj.productname)
    data.append("pquantity", obj.productQuantity)
    data.append("pprice", obj.productprice)
    data.append("psupplier", obj.productsupplier)
    return httpauth.post(`/api/purchase-order/single-entry-purchase-order`, data)
}