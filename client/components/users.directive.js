;(function () {
  'use strict'

  angular
    .module('app')
    .directive('users', users)

  function users () {
    return {
      templateUrl: 'components/users.template.html',
      controller: 'usersController',
      controllerAs: 'users',
      restrict: 'E'
    }
  }
})()
