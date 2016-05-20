var app = angular.module('main');


app.controller('homeCtrl', function ($scope, $stateParams, productService) {
    $scope.start = function () {

        var sync = true;
        // for (var i = 0; i < 10; i++) {
        //     if (sync) {
        //         sync = false;
        var i = 5;
        productService.getNumbers(i, function (response) {
            console.log("Request " + (i + 1) + " complete");
            console.log(response);
            // sync = true;
            // JSONToCSVConvertor(response.data, "Numbers", true);
        });
    };
    //     }
    //
    // }
});

app.controller('categoryCtrl', function ($scope, $stateParams, productService) {

    $('.productCard-img').ready(function () {
        console.log($('.productCard-img').width());
        $('.productCard-img').height($('.productCard-img').width() * 1)
    });

    console.log($stateParams.name);

    $scope.categoryName = $stateParams.name;

    $scope.feteched = false;
    background_loader($scope.categoryName);


    productService.getProductsByCategory($stateParams.name, function (response) {
        $scope.products = response.data.products;
        // console.log($scope.products1);

        $scope.feteched = true;

        console.log($scope.products);


    });


    $scope.status = '  ';

    $scope.trimText = function (length, str) {
        var s = str.split('');
        if (str.length < length) {
            return str;
        }
        var cutLength = s.length - (length - 3);
        s.splice(length, cutLength);
        s.push('.', '.', '.');

        return s.join("");
    }

});


app.controller('DialogCtrl', function ($scope) {


    // console.log("sdfg");
});

app.controller('productCtrl', function ($scope, $stateParams, productService) {
    $scope.productName = $stateParams.name;
    // console.log($scope.productName);

    $scope.dataFetched = false;
    productService.getProductbyId($scope.productName, function (response) {
        // console.log(response);
        $scope.product = response.data.product;
        console.log($scope.product);

        $scope.product.description = String($scope.product.description).replace(/<[^>]+>/gm, '')

        $('.image-showcase').css('background', 'url(' + $scope.product.featured_src + ') 36% 0 no-repeat');

        $scope.dataFetched = true;

    });

});

function background_loader($name) {

    var accessories = "images/image_1.jpg";
    var bottoms = "images/image_2.jpg"
    var dresses = "images/image_3.jpg";
    var indian = "images/image_1.jpg";
    var indowestern = "images/image_2.jpg";
    var tops = "images/image_3.jpg";
    var jackets = "images/image_1.jpg";

    var bg;
    switch ($name) {
        case "accessories":
            // statements_1
            bg = accessories;
            break;

        case "bottoms":
            // statements_1
            bg = bottoms;
            break;

        case "dresses":
            // statements_1
            bg = dresses;
            break;

        case "indian":
            // statements_1
            bg = indian;
            break;

        case "tops":
            // statements_1
            bg = tops;
            break;

        case "jackets":
            // statements_1
            bg = jackets;
            break;

        case "indo-western":
            // statements_1
            bg = indowestern;
            break;

        default:
            // statements_def
            break;
    }

    $('.section').css('background-color', 'rgba(40, 140, 240,0.25)');
    $('.category-bg').css('background-image', 'url(' + bg + ')');

}
















