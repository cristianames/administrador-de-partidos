adminapp.controller('adminUsuariosCreateController', function($scope, AdminUsuarios, $location) {
    $scope.cancelar = function() {
        $location.path('/app/admin/usuarios');
    };

    $scope.guardar = function () {
        var usuario = {
            facebook_id: $scope.usuarioFbID,
        };

        AdminUsuarios.save(usuario, function(response) {
            //console.log(response);
            $location.path('/app/admin/usuarios');
        });
    };
});
