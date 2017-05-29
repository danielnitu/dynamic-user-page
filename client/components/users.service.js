;(function () {
  'use strict'

  angular
    .module('app')
    .service('usersService', usersService)

  function usersService ($http) {
    var api = 'https://reqres.in/api/users'

    return {
      getUsers: getUsers,
      addUser: addUser,
      updateUser: updateUser,
      deleteUser: deleteUser
    }

    function getUsers (cb) {
      $http
        .get(api + '?per_page=4&page=' + Math.ceil(Math.random() * 3))
        .then(function (res) {
          cb(null, res.data.data)
        }, function (err) {
          cb(err, null)
        })
    }

    function addUser (user, cb) {
      $http
        .post(api, user)
        .then(function (res) {
          cb(null, res.data)
        }, function (err) {
          cb(err, null)
        })
    }

    function updateUser (user, cb) {
      $http
        .put(api, user)
        .then(function (res) {
          cb(null, res.data)
        }, function (err) {
          cb(err, null)
        })
    }

    function deleteUser (id, cb) {
      $http
        .delete(api + '/' + id)
        .then(function (res) { cb(res) })
    }
  }
})()
