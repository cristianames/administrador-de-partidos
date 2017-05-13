package com.thegrid.services;


import com.googlecode.objectify.Objectify;
import com.googlecode.objectify.ObjectifyService;
import com.thegrid.models.*;

import static com.googlecode.objectify.ObjectifyService.ofy;

public class DatastoreService {
    static {
        ObjectifyService.register(Partido.class);
        ObjectifyService.register(Inscripto.class);
        ObjectifyService.register(Usuario.class);
        ObjectifyService.register(Recomendacion.class);
    }

    public static Objectify getOfy() {
        return ofy();
    }


}
