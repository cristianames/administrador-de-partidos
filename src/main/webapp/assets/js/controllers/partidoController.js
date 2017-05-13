app.controller('partidoController', function($rootScope, $scope, $location, $routeParams, Inscripto, Partido, PartidoInscripto, Recomendacion, AccionesPartido) {

    $scope.accionesPartido = AccionesPartido;

    Partido.get({ id: $routeParams.id }, function(data) {
        $scope.partido = data;

        PartidoInscripto.query({ id: $routeParams.id }, function(data1) {
            $scope.inscriptos = data1.items;
        });

        Inscripto.query(function(data) {
            var inscripto = data.items.find(function(i){ return i.partido.id == $scope.partido.id})
            if(inscripto) $scope.partido.inscripcion = inscripto;
        });
    });

    $scope.onEliminar = function(partido){
        Partido.delete({ id: partido.id},
            function () {$location.path("app/partidos");});
    };
    $scope.onRecomendar = function(partido){
        var recomendacion = {
            'partido': {
                'id': partido.id
            }
        };
        Recomendacion.save(recomendacion, function() {})
    };
});