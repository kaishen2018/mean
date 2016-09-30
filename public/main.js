var angularTodo = angular.module('angularTodo', []);

function mainController($scope, $http) {
  $scope.formData = {};

  // when the page loads, all API calls TODOs
  $http.get('/api/todos')
    .success(function(data) {
      $scope.todos = data;
      console.log(data);
    })
    .error(function (err) {
      console.log('Error: ', err);
    });


  // when a new TODO added, send the text to API
  $scope.createTodo = function() {
    $http.post('/api/todos', $scope.formData)
      .success(function (data) {
        $scope.formData = {};
        $scope.todos = data;
        console.log(data)
      })
      .error(function (err) {
        console.log('Error :', err);
      });
  };

  // Delete a TODO
  $scope.deleteTodo = function (id) {
    $http.delete('/api/todos/'+id)
      .success(function(data) {
        $scope.todos = data;
        console.log(data);
      })
      .error(function (err) {
        console.log('Error : ', err);
      })
  };
}