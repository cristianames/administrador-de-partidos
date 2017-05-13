app.controller('misPartidosController', function($scope,$location, Partido, Inscripto, Recomendacion, AccionesPartido) {

    $scope.partidos = [];

    $scope.accionesPartido = AccionesPartido;
    Partido.query(function(data) {
        if(data.items != undefined) {
            $scope.partidos = data.items;
            Inscripto.query(function (data) {
                data.items.forEach(function (inscripto) {
                    var partido = $scope.partidos.find(function (p) {
                        return p.id == inscripto.partido.id
                    });
                    if (partido)
                        partido.inscripcion = inscripto;
                });
            });
        }
    });

    $scope.onNuevoPartido = function(){
        $location.path("/app/partidos/nuevo");
    };

    $scope.onInfo = function(partido){
        $location.path("/app/partidos/" + partido.id);
    };

    $scope.onEliminar = function(partido){
        Partido.delete({ id: partido.id},
            function () {$scope.partidos.splice($scope.partidos.indexOf(partido), 1);});
    };
    $scope.onRecomendar = function(partido){
        var recomendacion = {
            'partido': {
                'id': partido.id
            }
        };
        Recomendacion.save(recomendacion, function() {})
    }
    $scope.onAnotarme = function(partido){
        partido.totalInscriptos++;
        AccionesPartido.anotarme(partido, undefined);
    }
});
