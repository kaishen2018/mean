var app = angular.module('user.component', [])
.directive('user', function () {
    return {
        templateUrl: '../views/user/user_list.html',
        controller:userController
    };
})
.directive('user.add', function () {
    return {
        templateUrl: '../views/user/user_add.html',
    };
})
.directive('user.edit', function () {
    return {
        templateUrl: '../views/user/user_edit.html',
    };
})
