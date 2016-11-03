function todoController($scope, $http, $state, $stateParams) {
  $scope.formData = {};

  // when the page loads, all API calls TODOs
  $http.get('/api/todos')
    .success(function (data) {
      $scope.todos = data;
      console.log(data);
    })
    .error(function (err) {
      console.log('Error: ', err);
    });


  // when a new TODO added, send the text to API
  $scope.createTodo = function () {
    console.log('----- > createToDo');
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

  // when a new TODO added, send the text to API
  $scope.updateTodo = function () {
    console.log('----- > updateTodo ', JSON.stringify($scope.todo));
    $http.put('/api/todos', $scope.todo)
      .success(function (data) {
        $scope.todo = {};
        $scope.todos = data;
        console.log(data)
      })
      .error(function (err) {
        console.log('Error :', err);
      });
  };

  // Delete a TODO
  $scope.deleteTodo = function (id) {
    $http.delete('/api/todos/' + id)
      .success(function (data) {
        $scope.todo = {};
        $scope.todos = data;
        console.log(data);
      })
      .error(function (err) {
        console.log('Error : ', err);
      })
  };

  $scope.showMsg = function (msg) {
    alert('msg');
  };

  $scope.gotoDetailPage = function (id) {
    $state.go('todos.detail', {todoId: id});
  }

  // get detail of one todo
  $scope.getTodo = function () {
    var id = $stateParams.todoId
    console.log('----- > createToDo')
    $http.get('/api/todos/'+id)
      .success(function (data) {
        $scope.todo = data;
        console.log(data)
      })
      .error(function (err) {
        console.log('Error :', err);
      });
  };
}