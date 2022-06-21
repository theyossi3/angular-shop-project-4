// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    productsUrl: "http://localhost:3030/api/products/",
    productsUrlDelayed: "http://localhost:3030/api/products/delayed/",
    productImagesUrl: "http://localhost:3030/api/products/images/",

    registerUrl: "http://localhost:3030/api/auth/register",
    loginUrl: " http://localhost:3030/api/auth/login",

    addcategoriesurl: "http://localhost:3030/api/categories/add",
    Categoriesallurl: "http://localhost:3030/api/categories/allcategories",

    getbycategoryurl: "http://localhost:3030/api/products/getbycategories/",
    checkorcreatcarturl: "http://localhost:3030/api/cart/checkcart/",
    addtocarturl: "http://localhost:3030/api/cart/addcartitem/",
    getallusercarts: "http://localhost:3030/api/cart/:id",
    getcartitemsusr: "http://localhost:3030/api/cart/",
    removefromcarturl: "http://localhost:3030/api/cart/remove/",
    updatecarturl: "http://localhost:3030/api/cart/update/",

    creatordeurl: "http://localhost:3030/api/order/creat",
    createpdfurl: "http://localhost:3030/api/order/orderpdf",
    getallorderurl: "http://localhost:3030/api/order/getallorder",
    getallorderbyidurl: "http://localhost:3030/api/order/getallorderbyid/",
    cuntordersurl: "http://localhost:3030/api/order/ordercunt"
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
