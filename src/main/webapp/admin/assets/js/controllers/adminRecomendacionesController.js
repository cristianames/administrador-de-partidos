adminapp.controller('adminRecomendacionesController', function($scope, AdminRecomendaciones) {
    AdminRecomendaciones.query(function(data) {
        $scope.recomendaciones = data.items;
        $scope.recomendaciones.forEach(function(p) {console.log(p)});
    });

    $scope.eliminar = function(recomendacion) {
        AdminRecomendaciones.delete({ id: recomendacion.id}, function(response) {
            $scope.deseleccionar();
            $scope.recomendaciones.splice($scope.recomendaciones.indexOf(recomendacion), 1);
            console.log("Recomendacion eliminada! ID: " + recomendacion.id);
        });
    };

    $scope.info = function (recomendacion) {
        $scope.recomendacionSeleccionada = recomendacion;
    };

    $scope.deseleccionar = function() {
        $scope.recomendacionSeleccionada = undefined;
    };
});