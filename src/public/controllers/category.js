function categoryController($scope, $http, $state, $stateParams) {
    $scope.categories = {};
    $scope.category = {};
    $scope.sub = {};
    // when the page loads, all API calls users
    $http.get('http://localhost:8888/api/category')
      .success(function (data) {
          $scope.categories = data;
          $scope.subselected = "";
          console.log(data);
      })
      .error(function (err) {
          console.log('Error: ', err);
      });


    // when a new category added, send the text to API
    $scope.addCategory = function () {
        $http.post('http://localhost:8888/api/category', $scope.category)
          .success(function (data) {
              $scope.category = {};
              $scope.categories = data;
              $state.go('category');
          })
          .error(function (err) {
              console.log('Error :', err);
          });
    };

    // when  category updated, send the text to API
    $scope.updateCategory = function () {
        $http.put('http://localhost:8888/api/category', $scope.category)
          .success(function (data) {
              $scope.category = {};
              $scope.categories = data;
              $state.go('category');
          })
          .error(function (err) {
              console.log('Error :', err);
          });
    };

    // Delete a category
    $scope.deleteCategory = function (id) {
        $http.delete('http://localhost:8888/api/category/' + id)
          .success(function (data) {
              $scope.category = {};
              $scope.categories = data;
              $state.go('category');
          })
          .error(function (err) {
              console.log('Error : ', err);
          })
    };

    $scope.showMsg = function (msg) {
        alert('msg');
    };

    $scope.gotoCategoryDetail = function (id) {
        $state.go('category.detail', { categoryId: id });
    }

    // get detail of one category
    $scope.getCategory = function () {
        var id = $stateParams.categoryId
        $http.get('http://localhost:8888/api/category/' + id)
          .success(function (data) {
              $scope.category = data;
              console.log(data)
          })
          .error(function (err) {
              console.log('Error :', err);
          });
    };
    $scope.selectSub = function (index) {
        $scope.sub = $scope.category.subCategory[index];
    }
    $scope.addSub = function () {
        $scope.category.subCategory.push($scope.sub);
    }
    $scope.deleteSub = function (index) {
        $scope.category.subCategory.splice(index, 1);
    }
}