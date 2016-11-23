var app = angular.module('sidebar.component', []);
app.directive('sidebar', function () {
    return {
        templateUrl: '../views/components/sidebar.html'
    };
});