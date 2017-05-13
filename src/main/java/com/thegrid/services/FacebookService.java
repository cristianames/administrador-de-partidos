package com.thegrid.services;


import com.restfb.*;
import com.restfb.types.FacebookType;
import com.restfb.types.User;
import com.thegrid.Constants;
import com.thegrid.models.Partido;
import com.thegrid.models.Usuario;
import com.thegrid.models.Inscripto;

import java.util.ArrayList;
import java.util.List;

public class FacebookService {

    public static FacebookClient getFacebookClient(String token) {
        return new DefaultFacebookClient(token, Constants.FACEBOOK_APP_SECRET, Version.VERSION_2_5);
    }

    public static FacebookClient getFacebookAppClient() {
        FacebookClient.AccessToken appAccessToken = new DefaultFacebookClient( Version.VERSION_2_5)
                .obtainAppAccessToken(Constants.FACEBOOK_APP_KEY, Constants.FACEBOOK_APP_SECRET);
        return getFacebookClient(appAccessToken.getAccessToken());
    }

    public static void notify(String message, String facebook_id) {
        FacebookClient facebookClient = getFacebookAppClient();

        facebookClient.publish(facebook_id+"/notifications", FacebookType.class,
                Parameter.with("template", message));
    }

    public static User getUser(String token) {
        return getFacebookClient(token).fetchObject("me", User.class);
    }

    public static String getName(Usuario usuario) {
        if(usuario.getToken() == null)
            return "Unknown";

        return getUser(usuario.getToken()).getName();
    }

    public static void publishPartido(Partido partido) {
        String publish_message = "Cree el partido: #" + partido.getId() + " para participar vengan a PartidosManager!";

        FacebookClient facebookClient = getFacebookClient(partido.getUsuario().getToken());
        facebookClient.publish("me/feed", FacebookType.class,
                Parameter.with("message", publish_message));
    }

    public static void notifyUser(Partido partido){
        String notify_message = partido.getUsuario().getName() + " se ha inscripto a tu partido: #" +partido.getId();

        notify(notify_message, partido.getUsuario().getFacebook_id());
    }

    public static void notifyInscriptos(List<Inscripto> inscriptos) {
        for(Inscripto inscripto : inscriptos) {
            String notify_message = inscripto.getUsuario().getName() + " se ha completado el partido: #" +inscripto.getPartido().getId();
            notify(notify_message, inscripto.getUsuario().getFacebook_id());
        }
    }

    public static String getPhotoUrl(Usuario usuario) {
        if(usuario.getToken() == null)
            return "Unknown";

        FacebookClient facebookClient = getFacebookClient(usuario.getToken());
        User user = facebookClient.fetchObject(usuario.getFacebook_id(), User.class, Parameter.with("fields", "picture"));
        return user.getPicture().getUrl();
    }

    public static List<Usuario> getFriends(Usuario usuario){

        FacebookClient facebookClient = getFacebookClient(usuario.getToken());
        Connection<User> myFriends = facebookClient.fetchConnection("me/friends", User.class);
        List<Usuario> usuarioList = new ArrayList<Usuario>();

        for(User friend: myFriends.getData()){
            Usuario friendUsuario = DatastoreService.getOfy().load().type(Usuario.class).filter("facebook_id", friend.getId()).first().now();
            if(friendUsuario != null)
                usuarioList.add(friendUsuario);
        }
        return usuarioList;
    }
}
