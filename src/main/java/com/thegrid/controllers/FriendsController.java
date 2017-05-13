package com.thegrid.controllers;



import com.google.api.server.spi.config.Api;
import com.google.api.server.spi.config.ApiMethod;
import com.google.api.server.spi.config.Named;
import com.thegrid.Constants;
import com.thegrid.models.Inscripto;
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
public class FriendsController extends ApiController {

    @ApiMethod(path="friends")
    public List<Usuario> listFriends(HttpServletRequest request) throws Exception {
        Usuario usuario = AuthRequired(request);
        return FacebookService.getFriends(usuario);
    }
}