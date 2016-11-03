angular.module('angularTodo', ['ui.router'])
  .controller('todoController', todoController)
  .config(todoRoute);
