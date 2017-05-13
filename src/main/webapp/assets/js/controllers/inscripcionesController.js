app.controller('inscripcionesController', function($scope, $http, $location, Inscripto, AccionesPartido) {
    $scope.accionesPartido = AccionesPartido;
    $scope.inscriptos = [];

    Inscripto.query(function(data) {
        $scope.inscriptos = data.items;
    });

    $scope.desanotarme = function(inscripto){
        Inscripto.delete({ id: inscripto.id},
            function () {$scope.inscriptos.splice($scope.inscriptos.indexOf(inscripto), 1);});
    };
});