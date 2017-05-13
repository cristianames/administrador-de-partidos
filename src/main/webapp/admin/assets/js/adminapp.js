
var adminapp = angular.module('adminapp', ['ngRoute', 'ngResource', 'ngMap']);

adminapp.run(['$rootScope', '$window', '$location',
    function($rootScope, $window, $location) {

    }]);

adminapp.config(function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $routeProvider
        .when('/', {
            templateUrl: 'admin/views/home.html',
            controller: 'homeController'
        })
        .when('/app/admin/', {
            templateUrl: 'admin/views/home.html',
            controller: 'homeController'
        })
        .when('/app/admin/partidos', {
            templateUrl: 'admin/views/partidos.html',
            controller: 'adminPartidosController'
        })
        .when('/app/admin/partidos/create/', {
            templateUrl: 'admin/views/partidosForm.html',
            controller: 'adminPartidosCreateController'
        })
        .when('/app/admin/partidos/edit/:id', {
            templateUrl: 'admin/views/partidosForm.html',
            controller: 'adminPartidosEditController'
        })
        .when('/app/admin/usuarios', {
            templateUrl: 'admin/views/usuarios.html',
            controller: 'adminUsuariosController'
        })
        .when('/app/admin/usuarios/create', {
            templateUrl: 'admin/views/usuariosForm.html',
            controller: 'adminUsuariosCreateController'
        })
        .when('/app/admin/usuarios/edit/:id', {
            templateUrl: 'admin/views/usuariosForm.html',
            controller: 'adminUsuariosEditController'
        })
        .when('/app/admin/inscripciones', {
            templateUrl: 'admin/views/inscripciones.html',
            controller: 'adminInscripcionesController'
        })
        .when('/app/admin/recomendaciones', {
            templateUrl: 'admin/views/recomendaciones.html',
            controller: 'adminRecomendacionesController'
        })
        .when('/error', {
            templateUrl: 'views/error.html',
            controller: 'emptyController'
        })
        .otherwise({
            redirectTo: '/error'
        });
});

adminapp.factory("AdminPartidos", ['$resource', function($resource) {
    return $resource("/_ah/api/partidosmanager/v1/admin/partido/:id", null,
        {
            'query': { method:'GET', isArray: false }
        });
}]);

adminapp.factory("AdminUsuarios", ['$resource', function($resource) {
    return $resource("/_ah/api/partidosmanager/v1/admin/usuario/:id", null,
        {
            'query': { method:'GET', isArray: false }
        });
}]);

adminapp.factory("AdminInscripciones", ['$resource', function($resource) {
    return $resource("/_ah/api/partidosmanager/v1/admin/inscripto/:id", null,
        {
            'query': { method:'GET', isArray: false }
        });
}]);

adminapp.factory("AdminRecomendaciones", ['$resource', function($resource) {
    return $resource("/_ah/api/partidosmanager/v1/admin/recomendacion/:id", null,
        {
            'query': { method:'GET', isArray: false }
        });
}]);

adminapp.directive('checkImage', function($http) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            attrs.$observe('ngSrc', function(ngSrc) {
                if (ngSrc == 'Unknown') {
                    $http.get('admin/assets/img/icon-grey-person.png').success(function(){
                        element.attr('src', 'admin/assets/img/icon-grey-person.png'); // set default image
                    });
                } else {
                    element.attr('src', ngSrc);
                }
            });
        }
    };
});