var app = angular.module('app.component', []);
app.directive("app", function () {
    return {
        templateUrl: '../views/components/app.html'
    };
});
//app.directive("sidebar", function () {
//    return {
//        templateUrl: 'views/components/main-sidebar.html'
//    };
//});