package com.thegrid.controllers;



import com.restfb.DefaultFacebookClient;
import com.restfb.FacebookClient;
import com.restfb.Version;
import com.restfb.types.User;
import com.thegrid.Constants;
import com.thegrid.models.Usuario;
import com.thegrid.services.DatastoreService;
import com.thegrid.services.FacebookService;

import javax.servlet.http.HttpServletRequest;


public class ApiController {

    private static final String ACCESS_TOKEN_HEADER = "x-access-token";

    protected Usuario AuthRequired(HttpServletRequest request) throws Exception {
        String token = getAccessToken(request);

        User user = FacebookService.getUser(token);
        Usuario usuario = DatastoreService.getOfy().load().type(Usuario.class).filter("facebook_id", user.getId()).first().now();

        if(usuario == null) {
            usuario = new Usuario();
            usuario.setFacebook_id(user.getId());
        }

        usuario.setToken(token);

        usuario.setName(FacebookService.getName(usuario));
        usuario.setPhotoUrl(FacebookService.getPhotoUrl(usuario));

        DatastoreService.getOfy().save().entity(usuario).now();
        return usuario;
    }

    protected String getAccessToken(HttpServletRequest request) throws Exception {
        String token = request.getHeader(ACCESS_TOKEN_HEADER);

        if(token == null) {
            throw new Exception("x-access-token is required");
        }

        return token;
    }
}

