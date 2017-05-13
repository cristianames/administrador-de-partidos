app.controller('mainController', function($scope, $rootScope, $http, $location) {
    $scope.tengoHeader = function() {
        return $http.defaults.headers.common['x-access-token'];
    };

    $scope.mostrarMensajeNoLoggeo = function() {
      return $rootScope.loggedUser != undefined && !$rootScope.loggedUser;
    };

    $scope.login = function(){
        FB.login(function(response){
            if (response.authResponse) {
                $location.path($rootScope.nextRoute);
            }
            else{
                alert("No te logeaste correctamente!")
            }
        }, {
            scope: 'user_friends, publish_actions, publish_pages'
        });
    }

    $scope.logout = function() {
        FB.logout();
    }
});