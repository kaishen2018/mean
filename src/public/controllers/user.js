function userController($scope, $http, $state, $stateParams) {
    $scope.users = {};
    $scope.user = {};
    // when the page loads, all API calls users
    $http.get('http://localhost:8888/api/user')
      .success(function (data) {
          $scope.users = data;
          $scope.genderSelect = [{ name: "男", id: '1' },
              { name: "女", id: '0' }]
          $scope.user.gender = '1';
          console.log(data);
      })
      .error(function (err) {
          console.log('Error: ', err);
      });


    // when a new user added, send the text to API
    $scope.addUser = function () {
        $http.post('http://localhost:8888/api/user', $scope.user)
          .success(function (data) {
              $scope.user = {};
              $scope.users = data;
              $state.go('user');
          })
          .error(function (err) {
              console.log('Error :', err);
          });
    };

    // when  user updated, send the text to API
    $scope.updateUser = function () {
        $http.put('http://localhost:8888/api/user', $scope.user)
          .success(function (data) {
              $scope.user = {};
              $scope.users =data;
              $state.go('user');
          })
          .error(function (err) {
              console.log('Error :', err);
          });
    };

    // Delete a user
    $scope.deleteUser = function (id) {
        $http.delete('http://localhost:8888/api/user/' + id)
          .success(function (data) {
              $scope.user = {};
              $scope.users = data;
              $state.go('user');
          })
          .error(function (err) {
              console.log('Error : ', err);
          })
    };

    $scope.showMsg = function (msg) {
        alert('msg');
    };

    $scope.gotoUserDetail = function (id) {
        $state.go('user.detail', { userId: id });
    }

    // get detail of one user
    $scope.getUser = function () {
        var id = $stateParams.userId
        $http.get('http://localhost:8888/api/user/' + id)
          .success(function (data) {
              $scope.user = data;
              $scope.user.gender = JSON.stringify(data.gender);
              $scope.user.birthday = new Date(data.birthday);
              console.log(data)
          })
          .error(function (err) {
              console.log('Error :', err);
          });
    };
}