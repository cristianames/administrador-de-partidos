adminapp.controller('adminPartidosCreateController', function($scope, AdminUsuarios, AdminPartidos, $location) {
    $scope.cancelar = function() {
        $location.path('/app/admin/partidos');
    };

    AdminUsuarios.query(function(data) {
        $scope.usuarios = data.items;
    });

    $scope.guardar = function () {
        var partido = {
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