adminapp.controller('adminPartidosController', function($scope, AdminPartidos, $location) {

    AdminPartidos.query(function(data) {
        $scope.partidos = data.items;
        //$scope.partidos.forEach(function(p) {console.log(p)});
    });

    $scope.eliminar = function(partido) {
          AdminPartidos.delete({ id: partido.id}, function(response) {
              $scope.deseleccionar();
              $scope.partidos.splice($scope.partidos.indexOf(partido), 1);
              console.log("Partido eliminado! ID: " + partido.id);
          });
    };

    $scope.info = function (partido) {
        $scope.partidoSeleccionado = partido;
    }


    $scope.deseleccionar = function() {
        $scope.partidoSeleccionado = undefined;
    }

    $scope.crear = function() {
        $location.path('/app/admin/partidos/create');
    };

    $scope.editar = function(partido) {
        $location.path('/app/admin/partidos/edit/' + partido.id);
    };
});