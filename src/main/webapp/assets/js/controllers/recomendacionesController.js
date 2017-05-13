app.controller('recomendacionesController', function ($scope, $http, Recomendacion, Inscripto) {

    $scope.recomendaciones = [];

    Recomendacion.query(function(data) {
        $scope.recomendaciones = data.items;
    });

    var borrar = function(recomendacion) {
        Recomendacion.delete({ id: recomendacion.id},
            function (response) {$scope.recomendaciones.splice($scope.recomendaciones.indexOf(recomendacion), 1);});
    }

    $scope.rechazar = function(recomendacion){
        borrar(recomendacion);
    };

    $scope.aceptar = function(recomendacion){
        var inscripto = {
            'partido': {
                'id': recomendacion.partido.id
            },
        };

        Inscripto.save(inscripto, function(response){
            borrar(recomendacion);
        });
    };
});
