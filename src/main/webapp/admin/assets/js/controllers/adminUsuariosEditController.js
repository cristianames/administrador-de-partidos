adminapp.controller('adminUsuariosEditController', function($scope, AdminUsuarios, $location, $routeParams) {

    $scope.editando = 'noSoyUndefined';

    AdminUsuarios.get({ id: $routeParams.id }, function(usuario){
        //console.log(usuario);
        $scope.usuarioID = usuario.id;
        $scope.usuarioFbID = usuario.facebook_id;
    });

    $scope.cancelar = function() {
        $location.path('/app/admin/usuarios');
    };

    $scope.guardar = function () {
        var usuario = {
            id: $scope.usuarioID,
            facebook_id: $scope.usuarioFbID,
        };

        AdminUsuarios.save(usuario, function(response) {
            //console.log(response);
            $location.path('/app/admin/usuarios');
        });
    };
});