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

export function fetchAllProductInventoryByFilter(){
    return httpauth.get(`/api/product-inventory/fetchinginventory-filter-by-bool`)
}


/*
Product Inventory Request
Created date : 15/06/2021
*/

export function adding_product_inventory(obj){
    var productdata = new FormData();
    if(obj.decisionval === true){
        productdata.append("productsync", 1)
    }
    else{
        productdata.append("productsync", 0)
    }
    productdata.append("productName", obj.productName)
    productdata.append("productCode", obj.productCode)
    productdata.append("productQuantity", obj.productQuantity)
    productdata.append("productPrice", obj.productPrice)
    productdata.append("productSupplier", obj.productSupplier)
    productdata.append("productImageUrl", obj.productImageUrl)
    productdata.append("productcategory", obj.productcategory)
    productdata.append("productexpiration", obj.productExpiration)
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

export function removeproduct(id, quantity, pcode){
    return httpauth.post(`/api/product-inventory/product-inventory-deletion?prodid=${id}&pcode=${pcode}&pquantity=${quantity}`)
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
    if(obj.tagalert === true){
        obj.tagalert = "1";
    }else{
        obj.tagalert = "0";
    }
    modifieddata.append("pcode", obj.pcode)
    modifieddata.append("modifyproductname", obj.modifyproductname)
    modifieddata.append("modifyproductquantity", obj.modifyproductquantity)
    modifieddata.append("modifyproductprice", obj.modifyproductprice)
    modifieddata.append("modifyproductsupplier", obj.modifyproductsupplier)
    modifieddata.append("modifyproductimageurl", obj.modifyproductimageurl)
    modifieddata.append("modifyPID", obj.modifyPID)
    modifieddata.append("modifycategory", obj.modifycategory)
    return httpauth.post(`/api/product-inventory/product-inventory-modification?tagalert=${obj.tagalert}`, modifieddata)
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

export function importExcelGenerateData(file, valbool){
    var data = new FormData();
    data.append("file", file)
    return httpauth.post(`/api/inventory-ai/artificial-intel-auto-compute?valbool=${valbool}`,  data)
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
    var result = httpauth.post(`/api/purchase-order/bulk-entry-purchase?quantity=${parseInt(obj[x].productquantity)}&price=${obj[x].productprice}&ponumber=${obj[x].ponumber}&pname=${obj[x].productname}&supplier=${obj[x].productsupplier}`)
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

/*
system settings for inventory
created at : 23/06/2021
*/

export function systemsettingsforinventory(obj){
    if(obj.inventorysettings === true){
        obj.inventorysettings = "1"
    }else{
        obj.inventorysettings = "0"
    }
    if(obj.inventorysupplier === true){
        obj.inventorysupplier = "1"
    }else{
        obj.inventorysupplier = "0"
    }
    if(obj.inventoryexpiration === true){
        obj.inventoryexpiration = "1"
    }else{
        obj.inventoryexpiration = "0"
    }
    return httpauth.post(`/api/system-settings/update-inventory-settings?enableinvent=${obj.inventorysettings}&enablesupplier=${obj.inventorysupplier}&enableexpiration=${obj.inventoryexpiration}`)
}

/*
get system settings for inventory
created at : 23/06/2021
*/

export function getsystemsettingsforinventory(){
    return httpauth.get(`/api/system-settings/get-inventory-settings`)
}

/*
received order
created at : 23/06/2021
*/

export function receivetheorder(obj, obj1, obj2){
    var data = new FormData();
    data.append("pcode", obj2.pcode)
    data.append("pname", obj2.pname)
    data.append("pquantity", obj2.pquantity)
    data.append("pprice", obj2.pprice)
    data.append("psupplier", obj2.psupplier)
    return httpauth.post(`/api/purchase-order/received-order?id=${obj.poid}&pcode=${obj.pcode}&expiry=${obj1.expirydate}`, data)
}

/*
viewing expiration date
created at : 24/06/2021
*/

export function viewingexpirationdate(productCode){
    return httpauth.get(`/api/product-invetory-view-expired/view-expiration?pcode=${productCode}`)
}

/*
product expired
created at : 24/06/2021
*/

export function productexpired(){
    return httpauth.get(`/api/expired-notif/product-expired`)
}

export function productexpiredafter10days(){
    return httpauth.get(`/api/expired-notif/check-10-days-before-expiration`)
}

/*
get supplier image
created at : 25/06/2021
*/

export function getimage(supplier)
{
    return httpauth.get(`/api/purchase-order/get-supplier-image?supplier=${supplier}`)
}

/*
product report
created at : 27/06/2021
*/

export function bulkentryreportproduct(obj, pcode){

    return httpauth.post(`/api/report-problem/product-report?id=${obj.productID}&supplieremail=${obj.supplierEmail}&productname=${obj.productName}&problem1=${obj.value1[0]}&problem2=${obj.value1[1]}&problem3=${obj.value1[2]}&problem4=${obj.value1[3]}&remarks=${obj.remarks}&supplier=${obj.supplier}&ponumber=${obj.ponum}`)
}

/*
fetch all stocks
created at : 28/06/2021
*/

export function fetchlistofstocks(){
    return httpauth.get(`/api/product-inventory/fetch-stocks-on-hand`)
}

/*
pull product from stocks
created at : 28/06/2021
*/

export function pullrequestforproduct(obj){
        var data = new FormData();
        data.append("prodimg", obj.prodimg)
        return httpauth.post(`/api/pull-request-product/sync-data-to-product-inventory?id=${obj.stockID}&pname=${obj.prodname}&pcode=${obj.stocknum}&pquantity=${obj.pquantity}&pprice=${obj.prodprice}&supplier=${obj.prodsupplier}&category=${obj.prodcategory}&expiration=${obj.expirationprod}`, data)
       
        
        // if(obj.expirationprod === null || obj.expirationprod === ''){
            
        // }else{

        // }
        
}

/*
check stock if exist before modifying
created at : 29/06/2021
*/

export function CHECK_STOCK_BEFORE_MODIFY(pcode){
    try {
        return httpauth.post(`/api/product-inventory/check-if-exist-in-stocks?pcode=${pcode}`)
    } catch (error) {
        console.log(error)
    }
}

/*
check quantity stock empty
created at : 29/06/2021
*/

export function STOCK_EMPTY_NOTIF(){
    try {
        return httpauth.get(`/api/pull-request-product/check-stock-quantity-notification`)
    } catch (error) {

    }
}
/*
get product with zero quantity
created at : 29/06/2021
*/

export function getzero(){
    return httpauth.get(`/api/pull-request-product/get-product-with-zero-quantity`)
}

/*
get all stocks on hand
created at : 29/06/2021
*/

export function getallstocks(){
    return httpauth.get(`/api/pull-request-product/get-all-stocks-on-hand`)
}

/*
refill quantity via select
created at : 30/06/2021
*/

export function pushrefillbyviaselect(obj, id){
    return httpauth.post(`/api/pull-request-product/refill-increase-quantity-by-dropdown?quantity=${obj.value}&id=${id}`)
}

/*
refill quantity via custom input
created at : 30/06/2021
*/

export function pushrefillbyviacustom(obj, id){
    return httpauth.post(`/api/pull-request-product/refill-increase-quantity-by-dropdown?quantity=${obj.custominput}&id=${id}`)
}

/*
remove zero stock product
created at : 30/06/2021
*/

export function removezerostock(id){
    return httpauth.post(`/api/pull-request-product/remove-zero-quantity-stocks?id=${id}`)
}

/*
sort of expired on stocks on hand
created at : 07/01/2021
*/

export function sorting_expired_product_stocks(valbool){
     return httpauth.get(`/api/sort-stocks/sort-of-expired?valbool=${valbool}`)
}

/*
remove purchase order
created at : 07/09/2021
*/

export function removepurchase(ponumber){
    try {
        return httpauth.post(`/api/purchase-order/remove-po?ponum=${ponumber}`)
    } catch (error) {
        console.log(error)
    }
}

/*
product finalization
created at : 07/12/2021
*/

export function prod_final_get_all_categories(){
    try {
        return httpauth.get(`/api/product-finalization/list-of-categories`)
    } catch (error) {
        console.log(error)
    }
}

/*
product finalization - adding
created at : 07/12/2021
*/

export function addproductfinal(obj){
    try {
        var data = new FormData();
        data.append("prodimg", obj.productImageUrl)
        
        return httpauth.post(`/api/product-finalization/product-add?prodname=${obj.prodname}&prodquantity=${obj.prodquantity}&prodcategory=${obj.prodcategory}&prodprice=${obj.prodprice}&prodcode=${obj.prodcode}`, data)
    } catch (error) {
        console.log(error)
    }
}

/*
product finalization - fetching all stocks
created at : 07/12/2021
*/

export function getallstocksfinalization(){
    return httpauth.get(`/api/product-finalization/list-of-stocks`)
}

/*
product finalization - select raw materials
created at : 07/12/2021
*/

export function selectedrawmat(pname, stock, pimage){
    try {
        var data = new FormData()
        data.append("prodimg", pimage)
        return httpauth.post(`/api/product-finalization/selected-product?pname=${pname}&pcode=${stock}`, data)
    } catch (error) {
        console.log(error)
    }
}

/*
product finalization - list of selected raw materials
created at : 07/12/2021
*/

export function listofselectedrawmat(){
    try {
        return httpauth.get(`/api/product-finalization/get-selected-raw`)
    } catch (error) {
        console.log(error)
    }
}

/*
product finalization - list of selected raw materials remove
created at : 07/12/2021
*/

export function getridselection(id){
    try {
        return httpauth.post(`/api/product-finalization/deletion-selection?id=${id}`)
    } catch (error) {
        console.log(error)
    }
}

/*
product finalization - get all product code for selected raw
created at : 07/12/2021
*/

export function getallpcodeforselectedraw(){
    try {
        return httpauth.get(`/api/product-finalization/get-product-code-selected-raw`)
    } catch (error) {
        console.log(error)
    }
}

/*
product finalization - deduction of selected raw
created at : 07/12/2021
*/

export async function product_quantity_deduction(quantity, obj){
    for(var x = 0; x < obj.length; x++){
        console.log(obj)
        var result = httpauth.post(`/api/product-finalization/update-deduct-quantity-product?quantity=${quantity}&pcode=${obj[x].productCode}`)
    }
    return await result;
}

/*
product finalization - clear selected raw
created at : 07/12/2021
*/

export function clearallraws(){
    return httpauth.post(`/api/product-finalization/clear-selected-raws`)
}
/*
product finalization - filter table
created at : 07/13/2021
*/
export function filterrawmats(val){
    try {
        return httpauth.get(`/api/product-finalization/filter-list-ingredients?category=${val}`)
    }catch (e) {
        console.log(e);
    }

}
/*
product finalization - get all finalize product
created at : 07/13/2021
*/

export function getallfinalize(){
    try{
        return httpauth.get(`/api/product-finalization/get-all-finalize-product`)
    }catch (e) {
        console.log(e)
    }
}
/*
product finalization - graph first test
created at : 07/13/2021
*/
export function graphcheck(filtergraph){
    try{
        return httpauth.get(`/api/product-finalization/get-all-finalize-graph?filter=${filtergraph}`)
    }catch (e) {
        console.log(e)
    }
}

/*
product finalization - product activator - activate
created at : 07/16/2021
*/
export function activate_product_finalization(id){
    try{
        return httpauth.post(`/api/product-finalization/product-finalization-activator?id=${id}`)
    }catch(e){
        console.log(e)
    }
}

/*
product finalization - product activator - deactivate
created at : 07/16/2021
*/

export function deactivate_product_finalization(id){
    try{
        return httpauth.post(`/api/product-finalization/product-finalization-deactivator?id=${id}`)
    }catch(e){
        console.log(e)
    }
}

/*
product finalization - product activator - get activated
created at : 07/16/2021
*/

export function getactivatedproducts(){
    try{
        return httpauth.get(`/api/product-finalization/product-finalization-get-activated-products`)
    }
    catch(e){
        console.log(e)
    }
}

/*
product finalization - product activator - get deactivated
created at : 07/16/2021
*/

export function getdeactivatedproducts(){
    try{
        return httpauth.get(`/api/product-finalization/product-finalization-get-deactivated-products`)
    }
    catch(e){
        console.log(e)
    }
}

/*
product finalization - product activator - remove product
created at : 07/16/2021
*/

export function removeproductfinalization(id, pcode){
    try{
        return httpauth.post(`/api/product-finalization/product-finalization-remove?id=${id}&pcode=${pcode}`)
    }
    catch(e){
        console.log(e)
    }
}

/*
product finalization - product raw mats history
created at : 07/16/2021
*/

export async function product_finalization_history_raw_mats(createdCode, obj){
    try {
          for(var i = 0; i < obj.length; i++)
          {
            var result = httpauth.post(`/api/product-finalization/product-finalization-raw-history?createdpcode=${createdCode}&inventorycode=${obj[i].productCode}`)
          }
          return await result;
    } catch (error) {
        console.log(error)
    }
}

/*
product finalization - get and identify product code ingredients and raw
created at : 07/16/2021
*/

export function getrawpercreatedproducts(pcode){
    try {
        return httpauth.get(`/api/product-finalization/identify-product-code?pcode=${pcode}`)
    } catch (error) {
        console.log(error)
    }
}

/*
product finalization - get all product from inventory based on product code
created at : 07/16/2021
*/

export function getallproductfinalize(pcode){
    try {
        return httpauth.get(`/api/product-finalization/get-all-product-from-inventory-via-code?inventorycode=${pcode}`)
    } catch (error) {
        console.log(error)
    }
}

/*
product finalization - product inventory ascending
created at : 07/17/2021
*/

export function ascendquantity(quantity, obj){
    try {
        for(var x = 0; x < obj.length; x++){
            console.log(obj)
            var result = httpauth.post(`/api/product-finalization/asceding-quantity-product-inventory?quantity=${quantity}&pcode=${obj[x].productCode}`)
        }
        return result;
    } catch (error) {
        alert("error in ascending" + error);
    }
}

/*
Account - forgot password
created at : 07/17/2021
*/

export function email_finder(email){
    try {
        return httpauth.post(`/api/forgot-password/email-finder?email=${email}`)
    } catch (error) {
        alert("error in email finder" + error)
    }
}

/*
Account - forgot password send code
created at : 07/17/2021
*/

export function sendForgotEmail(email, code){
    try {
        return httpauth.post(`/api/forgot-password/verification-email-send?email=${email}&vcode=${code}`)
    } catch (error) {
        alert("Error in sending code" + error)
    }
}

/*
Account - forgot password add history
created at : 07/17/2021
*/

export function forgotpassword_add_history(vcode){
    try {
        return httpauth.post(`/api/forgot-password/add-forgot-history?vcode=${vcode}`)
    } catch (error) {
        alert("error in adding forgot history" + error)
    }
}

/*
Account - forgot password identify code
created at : 07/17/2021
*/

export function identify_code_entry(vcode){
    try {
        return httpauth.post(`/api/forgot-password/identify-code?vcode=${vcode}`)
    } catch (error) {
        alert("error in identifying code" + error)
    }
}

/*
Account - forgot password - change password
created at : 07/17/2021
*/

export function forgot_change_password(password, email){
    try {
        return httpauth.post(`/api/forgot-password/change-password?password=${password}&email=${email}`)
    } catch (error) {
        alert("error in changing password" + error)
    }
}


/*
Login - login history adding
created at : 07/20/2021
*/

export function loginhistory(email){
    try {
        var data = new FormData();
        data.append("email", email)
        data.append("message", "This user has been logged in")
        data.append("status", "1");
        return httpauth.post(`/api/login-history-management/add-login-history`, data)
    } catch (error) {
        alert("error in adding login history" + error)
    }
}

/*
Login - list of histories
created at : 07/20/2021
*/

export function listofhistorieslogin(){
    try {
        return httpauth.get(`/api/login-history-management/list-of-login-histories`)
    } catch (error) {
        alert("error in fetching login history" + error)
    }
}

/*
remove login history
created at : 07/20/2021
*/

export function remove_login_history(id){
    try {
        return httpauth.post(`/api/login-history-management/remove-list-history-login?id=${id}`)
    } catch (error) {
        alert("error in removing login history" + error)
    }
}

/*
remove logout history
created at : 07/20/2021
*/

export function logouthistory(email){
    try {
        var data = new FormData()
        data.append("email", email)
        data.append("message" , "This user has been logout")
        data.append("status", "0")
        return httpauth.post(`/api/login-history-management/add-logout-history`, data)
    } catch (error) {
        alert("error in logout history" + error)
    }
}

/*
add activity log user management
created at : 07/20/2021
*/

export function activitylog_usermanagement(code){
    try {
        var data = new FormData()
        data.append("message", "The Administrator added another administrator")
        data.append("status", "User Management")
        data.append("code", code)
        return httpauth.post(`/api/activity-log-management/add-activity-log-user-management`, data)
    } catch (error) {
        alert("error in activity log adding" + error)
    }
}

export function activitylog_usermanagement_remove(code){
    try {
        var data = new FormData()
        data.append("message", "The Administrator removed an account")
        data.append("status", "User Management")
        data.append("code", code)
        return httpauth.post(`/api/activity-log-management/add-activity-log-user-management`, data)
    } catch (error) {
        alert("error in activity log adding" + error)
    }
}

/*
remove user in user management list
created at : 07/20/2021
*/

export function remove_user(id){
    try {
        return httpauth.post(`/api/user-management/remove-permanent-user?id=${id}`)
    } catch (error) {
        alert("error in removing" + error)
    }
}

/*
list of user management logs
created at : 07/20/2021
*/

export function usermanagementlogs(){
    try {
        return httpauth.get(`/api/activity-log-management/get-all-user-management-logs`)
    } catch (error) {
        alert("error in user management list of logs" + error)
    }
}

/*
archive users delete
created at : 07/21/2021
*/

export function archive_users(uid, firstname, lastname, type, arrid){
    try {
        var data = new FormData()
        data.append("archiveid", arrid)
        data.append("firstname", firstname)
        data.append("lastname", lastname)
        data.append("type", type)
        data.append("clientid", uid)
        data.append("message", "Administrator removed a user")
        return httpauth.post(`/api/archive-users-management/add-archive?id=${uid}`, data)
    } catch (error) {
        alert("error in archive users" + error)
    }
}

/*
archive users list
created at : 07/21/2021
*/

export function getallarchivesusers(){
  try {
    return httpauth.get(`/api/archive-users-management/get-all-archives-users`)
  } catch (e) {
    alert("error in fetching all archives" + e)
  } finally {
    alert("fetch in finally")
  }
}
