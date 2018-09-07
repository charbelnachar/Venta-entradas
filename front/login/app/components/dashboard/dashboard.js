'use strict';

// $('body').delegate('#close', 'click', function() {
//   alert('alibaba')
// });

var SheetJSImportDirective = function() {
  return {


  };
};

angular.module('app.dashboard', ['ngRoute', 'checklist-model', 'LocalStorageModule'])

  .config(['$routeProvider', '$httpProvider', function($routeProvider, $httpProvider) {




    $routeProvider.when('/dashboard/', {
      templateUrl: 'components/dashboard/dashboard.html',
      controller: 'dashContrl'

    });



  }])
  .filter('startFromGrid', function() {
    return function(input, start) {
      start = +start;
      return input.slice(start);
    }
  })

  .controller('dashContrl', ['$scope', '$rootScope', '$routeParams', '$location', '$http', '$q', '$window', 'request', 'ip', '$route',
    function($scope, $rootScope, $routeParams, $location, $http, $q, $window, request, ip, $route) {
      $scope.form = true;
      $scope.form2 = true;
      $scope.aux = 'main'
      $scope.aux2 = false
      $scope.auxerror = false
      $scope.si = false;
      $scope.cambio = function() {




        console.log($scope.cable)

        $scope.form = !$scope.form;
        $scope.form2 = true
        $scope.edit = false


      }
      $scope.form = {}
      $scope.form.cedula = "";
      $scope.form.correo = "";
      $scope.form.apellido = "";
      $scope.form.nombre = "";


      // funcion para borrar los datos de session y hacer logout
      $scope.logout = function() {

        delete $window.sessionStorage.token
        // delete $windows.sessionStorage.user
        $location.path("/main")


      }



      $scope.reporte = function ()
      {
        var data = {}
        $scope.auxerror = false
        request.post(ip + '/wango/reporte', data, {
            'Content-Type': 'application/x-www-form-urlencoded'
          })
          .then(function(res) {

            console.log(res)
            if (res.data.error != 0) {

              $scope.auxerror = true
            //  $scope.error = res.data.error
            } else {

              $scope.auxerror = true
                $scope.error = "No Entregadas "+res.data.data.no + " Entregadas "+res.data.data.entregada
            }

          }, function(errorMsg) {
            $scope.auxerror = true
            $scope.error = "Error de conexión"

          });

      }

      $scope.cambiar = function(algo) {
        $scope.auxerror = false
        $scope.aux2 = false
        $scope.si = false
        $scope.aux = algo;
        $scope.form = {}
        $scope.form.cedula = "";
        $scope.form.correo = "";
        $scope.form.apellido = "";
        $scope.form.nombre = "";

      }

      $scope.buscar = function(cedula) {
        $scope.aux2 = false
        $scope.si = false

        var data = {}
        data.cedula = cedula
        request.post(ip + '/wango/buscarC', data, {
            'Content-Type': 'application/x-www-form-urlencoded'
          })
          .then(function(res) {

            if (res.data.error != 0) {

              $scope.auxerror = true
              $scope.error = res.data.error
            } else {
              $scope.aux2 = true
              $scope.auxerror = false
              console.log(res.data.data)
              $scope.data = res.data.data
              $scope.si = true;
            }

          }, function(errorMsg) {
            $scope.auxerror = true
            $scope.error = "Error de conexión"

          });


      }


      $scope.aprobar = function(cedula) {
        $scope.auxerror = false
        $scope.aux2 = false
        $scope.si = false

        var data = {}
        data.cedula=cedula

        request.post(ip + '/wango/aprobar', data, {
            'Content-Type': 'application/x-www-form-urlencoded'
          })
          .then(function(res) {
            console.log(res)
            if (res.data.error != 0) {
              $scope.auxerror = true
              $scope.error = res.data.error
            } else {
              $scope.form = {}
              $scope.form.cedula = "";
              $scope.form.correo = "";
              $scope.form.apellido = "";
              $scope.form.nombre = "";
                $scope.aux = 'main';
            }

          }, function(errorMsg) {
            $scope.auxerror = true
            $scope.error = "Error de conexión"

          });



      }
      var emailValid = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i
      // email.match(emailValid)

      $scope.enviar = function() {
        $scope.auxerror = false
        var data = $scope.form

        var validCorreo = $scope.form.correo.match(emailValid)
        console.log(validCorreo)
        if (validCorreo != null) {
          if ($scope.form.cedula.length > 0) {
            if ($scope.form.nombre.length > 0) {
                if ($scope.form.apellido.length > 0) {
              console.log("entro")
              request.post(ip + '/wango/registro', data, {
                  'Content-Type': 'application/x-www-form-urlencoded'
                })
                .then(function(res) {

                  if (res.data.error != 0) {
                    $scope.auxerror = true
                    $scope.error = res.data.error
                  } else {
                    $scope.form = {}
                    $scope.form.cedula = "";
                    $scope.form.correo = "";
                    $scope.form.apellido = "";
                    $scope.form.nombre = "";
                  }

                }, function(errorMsg) {
                  $scope.auxerror = true
                  $scope.error = "Error de conexión"

                });

            } else {
              $scope.auxerror = true
              $scope.error = "Campo Apellido Vacío"

            }
          } else {
            $scope.auxerror = true
            $scope.error = "Campo Nombre Vacío"

          }
        } else {
          $scope.auxerror = true
          $scope.error = "Campo Cédula Vacío"

        }

        } else {
          $scope.auxerror = true
          $scope.error = "No es un correo valido"
        }





      }









      $scope.bool = true;


    }
  ]);