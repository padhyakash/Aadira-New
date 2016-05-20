/**
 *  Module
 *
 * Description
 */
angular.module('main')
    .service('productService', function ($http) {

        this.getProducts = function (callback) {
            $http.get('api/products').then(callback);
        };

        this.getProductCategories = function (callback) {
            $http.get('api/products/categories').then(callback);
        };

        this.getProductsByCategory = function (category, callback) {
            $http.get('api/products/cat/' + category).then(callback);
        };

        this.getProductbyId = function (id, callback) {
            $http.get('api/products/' + id).then(callback);
        };

        this.getNumbers = function (num, callback) {
            console.log(num);
            $http.get('api/files', {params: {num: num}}).then(callback);
        };

        // this.login = function (callback) {
        //
        //     Parse.initialize("123456789");
        //     Parse.serverURL = 'http://localhost:3000/parse';
        //
        //     Parse.User.logIn("rajat.ady", "rajat225", {
        //         success: function (user) {
        //             // Do stuff after successful login.
        //             console.log(user);
        //         },
        //         error: function (user, error) {
        //             // The login failed. Check error to see why.
        //             console.log(error);
        //         }
        //     });
        // }

    });

//parse-dashboard --appId 123456789 --masterKey 987654321 --serverURL "http://localhost:3000/parse" --appName Aadira
