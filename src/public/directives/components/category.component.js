var app = angular.module('category.component', [])
.directive('category', function () {
    return {
        templateUrl: '../views/category/category_list.html',
        controller: categoryController
    };
})
.directive('category.add', function () {
    return {
        templateUrl: '../views/category/category_add.html',
    };
})
.directive('category.edit', function () {
    return {
        templateUrl: '../views/category/category_edit.html',
    };
})
