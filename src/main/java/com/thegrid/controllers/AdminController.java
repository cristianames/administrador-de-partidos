package com.thegrid.controllers;

import com.google.api.server.spi.config.Api;
import com.google.api.server.spi.config.ApiMethod;
import com.google.api.server.spi.config.Named;
import com.thegrid.Constants;
import com.thegrid.models.Inscripto;
import com.thegrid.models.Partido;
import com.thegrid.models.Recomendacion;
import com.thegrid.models.Usuario;
import com.thegrid.services.DatastoreService;

import java.util.List;

@Api(
        name = "partidosmanager",
        version = "v1",
        scopes = {Constants.EMAIL_SCOPE},
        clientIds = {Constants.WEB_CLIENT_ID, Constants.ANDROID_CLIENT_ID, Constants.IOS_CLIENT_ID},
        audiences = {Constants.ANDROID_AUDIENCE}
)
public class AdminController {
    //Entidad Partido
    @ApiMethod(path="admin/partido")
    public List<Partido> listPartidosAdmin() {
        return DatastoreService.getOfy().load().type(Partido.class).list();
    }

    @ApiMethod(path="admin/partido/{id}")
    public Partido getPartidoAdmin(@Named("id") Long id) {
        return DatastoreService.getOfy().load().type(Partido.class).id(id).now();
    }

    @ApiMethod(httpMethod = "delete", path="admin/partido/{id}")
    public void deletePartidoAdmin(@Named("id") Long id) {
        getPartidoAdmin(id).delete();
    }

    @ApiMethod(httpMethod = "post", path="admin/partido/")
    public Partido insertPartidoAdmin(Partido partido) {
        DatastoreService.getOfy().save().entity(partido).now();
        return partido;
    }

    //Entidad Usuario
    @ApiMethod(path="admin/usuario")
    public List<Usuario> listUsuariosAdmin() {
        return DatastoreService.getOfy().load().type(Usuario.class).list();
    }

    @ApiMethod(path="admin/usuario/{id}")
    public Usuario getUsuarioAdmin(@Named("id") Long id) {
        return DatastoreService.getOfy().load().type(Usuario.class).id(id).now();
    }

    @ApiMethod(httpMethod = "post", path="admin/usuario/")
    public Usuario insertUsuarioAdmin(Usuario usuario) {
        DatastoreService.getOfy().save().entity(usuario).now();
        return usuario;
    }

    @ApiMethod(httpMethod = "delete", path="admin/usuario/{id}")
    public void deleteUsuarioAdmin(@Named("id") Long id) {
        getUsuarioAdmin(id).delete();
    }

    //Entidad Recomendacion
    @ApiMethod(path="admin/recomendacion")
    public List<Recomendacion> listRecomendacionesAdmin() {
        return DatastoreService.getOfy().load().type(Recomendacion.class).list();
    }

    @ApiMethod(path="admin/recomendacion/{id}")
    public Recomendacion getRecomendacionAdmin(@Named("id") Long id) {
        return DatastoreService.getOfy().load().type(Recomendacion.class).id(id).now();
    }

    @ApiMethod(httpMethod = "delete", path="admin/recomendacion/{id}")
    public void deleteRecomendacionAdmin(@Named("id") Long id) {
        getRecomendacionAdmin(id).delete();
    }

    //Entidad Inscripcion
    @ApiMethod(path="admin/inscripto")
    public List<Inscripto> listInscripcionesAdmin() {
        return DatastoreService.getOfy().load().type(Inscripto.class).list();
    }

    @ApiMethod(path="admin/inscripto/{id}")
    public Inscripto getInscriptoAdmin(@Named("id") Long id) {
        return DatastoreService.getOfy().load().type(Inscripto.class).id(id).now();
    }

    @ApiMethod(httpMethod = "delete", path="admin/inscripto/{id}")
    public void deleteInscriptoAdmin(@Named("id") Long id) {
        getInscriptoAdmin(id).delete();
    }
}
