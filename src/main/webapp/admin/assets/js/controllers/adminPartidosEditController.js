adminapp.controller('adminPartidosEditController', function($scope, AdminUsuarios, AdminPartidos, $location, $routeParams) {
    $scope.cancelar = function() {
        $location.path('/app/admin/partidos');
    };

    $scope.editando = "noSoyUndefined";

    AdminUsuarios.query(function(data) {
        $scope.usuarios = data.items;

        AdminPartidos.get({ id: $routeParams.id }, function(partido){
            //console.log(partido);
            $scope.idPartido = partido.id;
            $scope.cant_personas = partido.cant_personas;
            $scope.deporte = partido.deporte;
            $scope.address = partido.lugar;
            $scope.usuarioAsociado = $scope.usuarios.find(function(u){return u.id == partido.usuario.id;});
        });
    });

    $scope.guardar = function () {
        var partido = {
            id: $scope.idPartido,
            usuario: $scope.usuarioAsociado,
            cant_personas: $scope.cant_personas,
            deporte: $scope.deporte,
            lugar: $scope.address
        };

        AdminPartidos.save(partido, function(response) {
            //console.log(response);
            $location.path('/app/admin/partidos');
        });
    };

    $scope.placeChanged = function(place) {
        $scope.types = "['address']";
        $scope.place = this.getPlace();
        $scope.map.setCenter($scope.place.geometry.location);
    }

    var geocoder= new google.maps.Geocoder();
    var address='Buenos Aires, Argentina';
    geocoder.geocode({'address':address},function(results,status) {
        if (status == google.maps.GeocoderStatus.OK) {
            $scope.map.setCenter(results[0].geometry.location);
            $scope.map.setZoom(11);
        } else {
            alert(status);
        }
    });
});