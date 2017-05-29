;(function () {
  'use strict'

  angular
    .module('app')
    .controller('usersController', usersController)

  function usersController ($scope, $timeout, usersService) {
    var vm = this

    // Variables
    vm.userAvatar = ''
    vm.notification = false

    // Methods
    vm.addUser = addUser
    vm.updateUser = updateUser
    vm.deleteUser = deleteUser
    vm.removeAvatar = removeAvatar

    function addUser (first, last, avatar) {
      var user = {
        'first_name': first,
        'last_name': last
      }
      usersService.addUser(user, function (err, user) {
        if (err) {
          vm.error = err
        } else {
          vm.notification = 'User added!'
          $timeout(function () {
            vm.notification = false
          }, 3000)

          user.avatar = vm.userAvatar
          vm.users.unshift(user)
        }
      })
    }

    function updateUser (id, first, last, avatar, index) {
      var user = {
        'id': id,
        'first_name': first,
        'last_name': last
      }
      usersService.updateUser(user, function (err, user) {
        if (err) {
          vm.error = err
        } else {
          vm.users[index] = user
          vm.users[index].avatar = avatar
          vm.notification = 'User updated!'
          $timeout(function () {
            vm.notification = false
          }, 3000)
        }
      })
    }

    function deleteUser (id, index) {
      usersService.deleteUser(id, function (res) {
        if (res.status === 204) {
          vm.users.splice(index, 1)
          vm.notification = 'User deleted!'
        } else {
          vm.notification = 'There was an error!'
        }
        $timeout(function () {
          vm.notification = false
        }, 3000)
      })
    }

    function removeAvatar (index) {
      vm.users[index].avatar = null
    }

    // Source: https://stackoverflow.com/questions/31665305/angularjs-upload-and-display-image-using-filereader-api-multiple-files
    $scope.imageUpload = function (element) {
      var reader = new window.FileReader()
      reader.onload = vm.imageIsLoaded
      reader.readAsDataURL(element.files[0])
    }

    vm.imageIsLoaded = function (e) {
      $scope.$apply(function () {
        vm.userAvatar = e.target.result
      })
    }

    // Populate the DOM with some users
    usersService.getUsers(function (err, users) {
      if (err) {
        vm.error = err
      } else {
        vm.users = users
      }
    })
  }
})()
