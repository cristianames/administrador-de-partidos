app.controller('nuevoPartidoController', function($scope, $http, $location, Partido, AccionesPartido) {

    var switchState = true;
    $("[name='switchcheckbox']").bootstrapSwitch();
    $('input[name="switchcheckbox"]').on('switchChange.bootstrapSwitch', function(event, state) {
        switchState = !switchState;
    });

    $scope.onAgregar = function(){
        if($scope.deporte && $scope.cantPersonas && $scope.address){
            Partido.save({
                    'deporte': $scope.deporte,
                    'cant_personas': $scope.cantPersonas,
                    'lugar': $scope.address,
                },
                function(response){
                    if(switchState) {
                        AccionesPartido.anotarme(response,function(){
                            $location.path("app/partidos");
                        });
                    }else $location.path("app/partidos");
                    //console.log(JSON.stringify(response));
                });
        } else alert("Por favor, complete todos los campos");
    };

    $scope.onCancelar = function () {
        $location.path("app/partidos");
    }

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
