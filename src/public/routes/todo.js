/**
 * Created by kaishen on 02/11/2016.
 */

function todoRoute($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise("/todos");

  $stateProvider
    .state('todos', {
      url: '/todos',
      templateUrl: '../views/todo_list.html',
      controller: function ($scope, $state) {
        console.log("enter list");
      }
    })
    .state('todos.add', {
      url: '/add',
      templateUrl: '../views/todo_add.html',
      controller: function ($scope, $state) {
        console.log("enter add");
      }
    })
    .state('todos.detail', {
      url: '/detail/:todoId',
      templateUrl: '../views/todo_detail.html',
      controller: function ($scope, $state, $stateParams) {
        console.log("enter detail of :", $stateParams.todoId);
        $scope.getTodo($scope, $state, $stateParams);
      }
    })
    .state('state1', {
      url: "/state1",
      templateUrl: "../views/state1.html"
    })
    .state('state1.list', {
      url: "/list",
      templateUrl: "views/state1.list.html",
      controller: function($scope) {
        $scope.items = ["A", "List", "Of", "Items"];
        console.log('state1 list')
      }
    })
    .state('state2', {
      url: "/state2",
      templateUrl: "../views/state2.html"
    })
    .state('state2.list', {
      url: "/list",
      templateUrl: "../views/state2.list.html",
      controller: function($scope) {
        $scope.things = ["A", "Set", "Of", "Things"];
      }
    });
}