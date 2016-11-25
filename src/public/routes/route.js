function mainRoute($locationProvider, $stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/home');

  /**
   * Definition of Home
   */
  $stateProvider.state('home', {
    url: '/home',
    template: '<home></home>'
  });

  /**
   * Definition of User Module
   *
   */
  $stateProvider.state('user', {
    url: '/user',
    template: '<user></user>',

  })
    .state('user.add', {
      url: '/add',
      template: '<user.add></user.add>'
    })
    .state('user.detail',
      {
        url: '/detail/:userId',
        template: '<user.edit></user.edit>',
        controller: function ($scope, $state, $stateParams) {
          console.log("enter detail of :", $stateParams.userId);
          $scope.getUser($scope, $state, $stateParams);
        }
      });

  /**
   * Definition of Category Module
   *
   */
  $stateProvider.state('category', {
    url: '/category',
    template: '<category></category>',

  })
    .state('category.add', {
      url: '/add',
      template: '<category.add></category.add>'
    })
    .state('category.detail',
      {
        url: '/detail/:categoryId',
        template: '<category.edit></category.edit>',
        controller: function ($scope, $state, $stateParams) {
          console.log("enter detail of :", $stateParams.userId);
          $scope.getCategory($scope, $state, $stateParams);
        }
      });

  /**
   * Definition of CI types Module
   *
   */
  $stateProvider.state('citypes', {
    url: '/citypes',
    template: '<citypes></citypes>',

  })
    .state('citypes.add', {
      url: '/add',
      template: '<citypes.add></citypes.add>'
    })
    .state('citypes.detail',
      {
        url: ':typeId',
        template: '<citypes.edit></citypes.edit>',
        controller: function ($scope, $state, $stateParams) {
          console.log("enter detail of :", $stateParams.typeId);
          $scope.getUser($scope, $state, $stateParams);
        }
      });
}