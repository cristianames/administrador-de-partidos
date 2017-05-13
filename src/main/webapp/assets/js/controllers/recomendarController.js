app.controller('recomendarController', function ($scope, Friends, Recomendacion, PartidoArecomendar) {
    $scope.friends = [];
    $scope.ready = false;
    
    Friends.query(function(data) {
        if(data.items != undefined){
            data.items.forEach(function(friend){
                friend.recomendado = false;
            });
            $scope.friends = data.items;
            $scope.ready = true;
        }
    });

    $scope.recomendar = function(friend){
        Recomendacion.save({
            usuario: friend,
            partido: PartidoArecomendar.getPartidoArecomendar(),
            from_usuario: friend
        }, function(response){
            $scope.friends.splice($scope.friends.indexOf(friend), 1);
        });
    }

    $scope.enviarRecomendaciones = function(){
        $location.path('/app/recomendaciones');
    }

});
