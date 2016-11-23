var app = angular.module('header.component', []);
app.directive("header", function () {
    return {
        templateUrl: '../views/components/header.html'
    };
});