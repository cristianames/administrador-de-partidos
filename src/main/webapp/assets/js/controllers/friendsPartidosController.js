app.controller('friendsPartidosController', function($scope, $location, FriendPartido, Inscripto, AccionesPartido) {
    $scope.accionesPartido = AccionesPartido;
    $scope.partidos = [];
    FriendPartido.query(function(data) {
        $scope.partidos = data.items;
        Inscripto.query(function(data) {
            data.items.forEach(function(inscripto){
                var partido = $scope.partidos.find(function(p){ return p.id ==  inscripto.partido.id});
                if(partido != undefined)
                    partido.inscripcion = inscripto;
            });
        });
    });
});