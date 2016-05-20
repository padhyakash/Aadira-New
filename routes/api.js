var express = require('express');
var router = express.Router();
var dir = "./files/";
var WooCommerceAPI = require('woocommerce-api');
var fs = require('fs');
var Mobile = require('../models/PromoNumbers');
var mongoose = require('mongoose');
// mongoose.connect("mongodb://localhost:27017/aadira");


var WooCommerce = new WooCommerceAPI({
    url: 'https://www.aadira.com',
    consumerKey: 'ck_97e0fd604381f1f9705cfa92d08c4e94afa0593c',
    consumerSecret: 'cs_21600b8e414753c99624ede9f3061372506acb23'
});


router.get('/aadira/index', function (request, response, next) {

});


/**
 *---------------------------------------------- PRODUCT CATEGORIES ----------------------------------------------------*
 * @METHOD - GET
 * @ENDPOINT - /products/categories
 * @DESCRIPTION - Gets all the product categories
 * @REQUEST - Auth Token {Protected by ACL}
 * @RESPONSE - Array of product categories
 *
 */

router.get('/products/categories', function (request, response, next) {

    WooCommerce.get('products/categories', function (err, data, res) {
        parseGetResponse(response, res, err);
    });
});
/**********************************************************************************************************************/

/*------------------------------------------------------- PRODUCTS ----------------------------------------------------*/


/**
 *
 * @METHOD - GET
 * @ENDPOINT - /products
 * @DESCRIPTION - Gets all the products [LIMIT - 12]
 * @REQUEST - Auth Token {Protected by ACL}
 * @RESPONSE - Array of products
 *
 * */

router.get('/products', function (request, response, next) {

    WooCommerce.get('products', function (err, data, res) {
        parseGetResponse(response, res, err);
    });

});

/**********************************************************************/

/**
 *
 * @METHOD - GET
 * @ENDPOINT - /products/cat/:name
 * @DESCRIPTION - Gets all the products filtered by a category [LIMIT - 12]
 * @REQUEST - Auth Token {Protected by ACL} , :name - The name of the product category
 * @RESPONSE - Array of products for the requested by category (@param-name)
 *
 * */

router.get('/products/cat/:name', function (request, response, next) {
    var categoryName = request.params.name;
    console.log(categoryName);
    WooCommerce.get('products?filter[category]=' + categoryName, function (err, data, res) {
        parseGetResponse(response, res, err);
    });

});

/**********************************************************************/

/**
 *
 * @METHOD - GET
 * @ENDPOINT - /products/:id
 * @DESCRIPTION - Gets a single product by id [LIMIT - 12]
 * @REQUEST - Auth Token {Protected by ACL} , :id - The id of the requested product
 * @RESPONSE - Single product requested by product identifier (@param-id)
 *
 * */


router.get('/products/:id', function (request, response, next) {

    var id = request.params.id;
    WooCommerce.get('products/' + id, function (err, data, res) {
        parseGetResponse(response, res, err);
    });

});

/**********************************************************************/

/**
 *
 * @METHOD - GET
 * @ENDPOINT - /products/count
 * @DESCRIPTION - Gets the total number of products available
 * @REQUEST - Auth Token {Protected by ACL}
 * @RESPONSE - Total Count of products
 *
 *
 * */


router.get('/products/count', function (request, response, next) {

    WooCommerce.get('products/count', function (err, data, res) {
        parseGetResponse(response, res, err);
    });
});

/**********************************************************************/

/**
 * %%%%%%%%%%%%%%%%%%     USE WITH CAUTION      %%%%%%%%%%%%%%%%%%%%%%
 * @METHOD - POST
 * @ENDPOINT - /products
 * @DESCRIPTION - Creates a new product
 * @REQUEST - Auth Token {Protected by ACL},
 * @RESPONSE - Total Count of products
 *
 *
 * */


router.post('/products', function (request, response, next) {

    WooCommerce.post('products', data, function (err, data, res) {
        console.log(res);
    });
});


/**********************************************************************/

/***********************************************************************************************************************/

/*----------------------------------------------- COUPONS -------------------------------------------------------------*/


/**
 *
 * @METHOD - GET
 * @ENDPOINT - /coupons
 * @DESCRIPTION - Gets all the coupons
 * @REQUEST - Auth Token {Protected by ACL}
 * @RESPONSE - Array of all the coupons
 *
 *
 * */

router.get('/coupons', function (request, response, next) {

    WooCommerce.get('coupons', function (err, data, res) {
        parseGetResponse(response, res, err);
    });
});

/**********************************************************************/


/**
 *
 * @METHOD - GET
 * @ENDPOINT - /coupons/:id
 * @DESCRIPTION - Gets a single coupon by id
 * @REQUEST - Auth Token {Protected by ACL}, :id - The id of the requested coupon
 * @RESPONSE - Single coupon requested by coupon identifier (@param-id)
 *
 *
 * */

router.get('/coupons/:id', function (request, response, next) {

    var id = request.params.id;
    console.log(id);
    WooCommerce.get('coupons/' + id, function (err, data, res) {
        parseGetResponse(response, res, err);
    });
});


/**********************************************************************/


/**
 *
 * @METHOD - GET
 * @ENDPOINT - /coupons/count
 * @DESCRIPTION - Gets the total number of coupons available
 * @REQUEST - Auth Token {Protected by ACL}
 * @RESPONSE - Total Count of coupons
 *
 *
 * */
router.get('/coupons/count', function (request, response, next) {

    WooCommerce.get('coupons/count', function (err, data, res) {
        parseGetResponse(response, res, err);
    });
});


/**********************************************************************/

/***********************************************************************************************************************/

/*----------------------------------------------- CUSTOMERS -----------------------------------------------------------*/


/**
 *
 * @METHOD - GET
 * @ENDPOINT - /customers
 * @DESCRIPTION - Gets all the customers from the website
 * @REQUEST - Auth Token {Protected by ACL}
 * @RESPONSE - Array of all the customers
 *
 *
 * */

router.get('/customers', function (request, response, next) {

    WooCommerce.get('customers', function (err, data, res) {
        parseGetResponse(response, res, err);
    });
});

/**********************************************************************/


/**
 *
 * @METHOD - GET
 * @ENDPOINT - /customers/:id
 * @DESCRIPTION - Gets a single customer by id
 * @REQUEST - Auth Token {Protected by ACL}, :id - The id of the requested customer
 * @RESPONSE - Single customer requested by customer identifier (@param-id)
 *
 *
 * */


router.get('/customers/:id', function (request, response, next) {

    var id = request.params.id;
    WooCommerce.get('customers/' + id, function (err, data, res) {
        parseGetResponse(response, res, err);
    });
});

/**********************************************************************/

/**
 *
 * @METHOD - GET
 * @ENDPOINT - /customers/:id/orders
 * @DESCRIPTION - Gets all the orders made by a customer specified by the @param-:id
 * @REQUEST - Auth Token {Protected by ACL}, :id - The id of the requested customer
 * @RESPONSE - Array of all the orders by the requested customer identifier (@param-id)
 *
 *
 * */

router.get('/customers/:id/orders', function (request, response, next) {

    var id = request.params.id;
    WooCommerce.get('customers/' + id + '/orders', function (err, data, res) {
        parseGetResponse(response, res, err);
    });
});

/**********************************************************************/

/***********************************************************************************************************************/

/*------------------------------------------------ORDERS---------------------------------------------------------------*/


/**
 *
 * @METHOD - GET
 * @ENDPOINT - /orders
 * @DESCRIPTION - Gets all the orders
 * @REQUEST - Auth Token {Protected by ACL}
 * @RESPONSE - Array of all the orders
 *
 **/

router.get('/orders', function (request, response, next) {
    WooCommerce.get('orders', function (err, data, res) {
        parseGetResponse(response, res, err);
    });
});

/**********************************************************************/


// router.get('/orders/new', function (request, response, next) {
//     var data = {
//         order: {
//             payment_details: {
//                 method_id: 'cod',
//                 method_title: 'Cash On Delivery',
//                 paid: true
//             },
//             billing_address: {
//                 first_name: 'Mir',
//                 last_name: 'Rayees',
//                 address_1: '969 Market',
//                 address_2: '',
//                 city: 'San Francisco',
//                 state: 'CA',
//                 postcode: '94103',
//                 country: 'IN',
//                 email: 'rajat.ady@gmail.com',
//                 phone: '8147851623'
//             },
//             shipping_address: {
//                 first_name: 'John',
//                 last_name: 'Doe',
//                 address_1: '969 Market',
//                 address_2: '',
//                 city: 'San Francisco',
//                 state: 'CA',
//                 postcode: '94103',
//                 country: 'US',
//                 email: 'rajat.ady@gmail.com',
//                 phone: '8147851623'
//             },
//             customer_id: 12,
//             line_items: [
//                 {
//                     product_id: 3422,
//                     quantity: 50
//                 }
//
//             ],
//             shipping_lines: [
//                 {
//                     method_id: 'flat_rate',
//                     method_title: 'Flat Rate',
//                     total: 10
//                 }
//             ]
//         }
//     };
//     WooCommerce.post('orders', data, function (err, data, res) {
//         parseGetResponse(response, res, err);
//     });
//
// });


/***********************************************************************************************************************/

/*
 * Important functions for parsing responses from the
 * live server and then creating a response for the
 * requesting server.
 *
 *
 * */


function parseGetResponse(response, res, err) {
    if (err) {
        sendErr(response, err);
    }
    response.send(JSON.parse(res));
}

/**********************************************************************/

function sendErr(response, err) {
    console.log(err);
    return response.send(err);
}

/**********************************************************************/


function sendData(response, data) {
    response.send(JSON.parse(data));
}


/**********************************************************************/

/***********************************************************************************************************************/
module.exports = router;

