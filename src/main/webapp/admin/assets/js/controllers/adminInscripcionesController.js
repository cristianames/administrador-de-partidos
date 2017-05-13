adminapp.controller('adminInscripcionesController', function($scope, AdminInscripciones) {

    AdminInscripciones.query(function(data) {
        $scope.inscriptos = data.items;
        $scope.inscriptos.forEach(function(p) {console.log(p)});
    });

    $scope.eliminar = function(inscripcion) {
        AdminInscripciones.delete({ id: inscripcion.id}, function(response) {
            $scope.deseleccionar();
            $scope.inscriptos.splice($scope.inscriptos.indexOf(inscripcion), 1);
            console.log("Inscripcion eliminada! ID: " + inscripcion.id);
        });
    };

    $scope.info = function (inscripto) {
        $scope.inscriptoSeleccionado = inscripto;
    }

    $scope.deseleccionar = function() {
        $scope.inscriptoSeleccionado = undefined;
    }
});