var app = angular.module('citypes.component', [])
.directive('citypes', function () {
    return {
        templateUrl: '../views/citypes/type_list.html',
        controller:userController
    };
})
.directive('citypes.add', function () {
    return {
        templateUrl: '../views/citypes/type_add.html',
    };
})
.directive('citypes.edit', function () {
    return {
        templateUrl: '../views/citypes/type_edit.html',
    };
})
