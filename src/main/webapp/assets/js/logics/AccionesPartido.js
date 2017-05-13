app.factory('AccionesPartido',function (PartidoArecomendar, Inscripto, $location) {
    return {
        anotarme: function(partido, lambda){
            var inscripto = {
                'partido': {
                    'id': partido.id
                }
            };
            Inscripto.save(inscripto, function(response){
                partido.inscripcion = response;
                if (lambda != undefined) lambda()});
        },
        desanotarme: function(partido){
            Inscripto.delete({ id: partido.inscripcion.id}, function (response) {
                partido.inscripcion = undefined;
            });
        },
        info: function(partido){
            $location.path("app/partidos/"+partido.id);
        },
        recomendar: function(partido){
            PartidoArecomendar.setPartidoArecomendar(partido);
            $location.path("app/recomendar");
        }

    };
});
