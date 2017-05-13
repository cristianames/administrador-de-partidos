package com.thegrid.controllers;

import com.google.api.server.spi.config.Api;
import com.google.api.server.spi.config.ApiMethod;
import com.google.api.server.spi.config.Named;
import com.thegrid.Constants;
import com.thegrid.models.Partido;
import com.thegrid.models.Recomendacion;
import com.thegrid.models.Usuario;
import com.thegrid.services.DatastoreService;
import com.thegrid.services.FacebookService;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@Api(
        name = "partidosmanager",
        version = "v1",
        scopes = {Constants.EMAIL_SCOPE},
        clientIds = {Constants.WEB_CLIENT_ID, Constants.ANDROID_CLIENT_ID, Constants.IOS_CLIENT_ID},
        audiences = {Constants.ANDROID_AUDIENCE}
)
public class RecomendacionesController extends ApiController {


    public List<Recomendacion> listRecomendaciones(HttpServletRequest request) throws Exception {
        Usuario usuario = AuthRequired(request);
        return DatastoreService.getOfy().load().type(Recomendacion.class).filter("usuario", usuario).list();
    }

    public Recomendacion getRecomendacion(@Named("id") Long id, HttpServletRequest request) throws Exception {
        Usuario usuario = AuthRequired(request);
        return DatastoreService.getOfy().load().type(Recomendacion.class).id(id).now();
    }

    @ApiMethod(httpMethod = "delete")
    public void deleteRecomendacion(@Named("id") Long id, HttpServletRequest request) throws Exception {
        Usuario usuario = AuthRequired(request);
        getRecomendacion(id, request).delete();
    }

    @ApiMethod(httpMethod = "post")
    public Recomendacion insertRecomendacion(Recomendacion recomendacion, HttpServletRequest request) throws Exception {
        Usuario from_usuario = AuthRequired(request);

        recomendacion.setFrom_usuario(from_usuario);
        DatastoreService.getOfy().save().entity(recomendacion).now();
        return recomendacion;
    }

}
