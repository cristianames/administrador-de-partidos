app.factory('PartidoArecomendar', function() {
    var partidoArecomendar;

    return {
        setPartidoArecomendar: function(partido) {
            partidoArecomendar = partido;
        },
        getPartidoArecomendar:  function(){
            return partidoArecomendar;
        }
    }
});