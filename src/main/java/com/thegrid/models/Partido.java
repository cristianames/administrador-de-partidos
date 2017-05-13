package com.thegrid.models;

import com.google.appengine.repackaged.org.codehaus.jackson.annotate.JsonIgnore;
import com.googlecode.objectify.Key;
import com.googlecode.objectify.Ref;
import com.googlecode.objectify.annotation.Entity;
import com.googlecode.objectify.annotation.Id;

import com.googlecode.objectify.annotation.Index;
import com.thegrid.services.DatastoreService;
import com.thegrid.services.FacebookService;
import lombok.Getter;

import java.util.ArrayList;
import java.util.List;

@Entity
public class Partido implements IModel {

    @Getter
    @Id
    private Long id;

    @Getter
    private String deporte;
    @Getter
    private Integer cant_personas;
    @Getter
    private String lugar;

    @Index
    private Ref<Usuario> usuario;
    public Usuario getUsuario() {
        return usuario.get();
    }
    public void setUsuario(Usuario usuario) {
        this.usuario = Ref.create(usuario);
    }

    @Override
    public void delete() {
        DatastoreService.getOfy().delete().keys(DatastoreService.getOfy().load().type(Inscripto.class).filter("partido", this).keys());
        DatastoreService.getOfy().delete().keys(DatastoreService.getOfy().load().type(Recomendacion.class).filter("partido", this).keys());
        DatastoreService.getOfy().delete().entity(this);
    }

    public Integer getTotalInscriptos() {
        return DatastoreService.getOfy().load().type(Inscripto.class).filter("partido", this).count();
    }

    @JsonIgnore
    public List<Inscripto> getInscriptos() {
        return DatastoreService.getOfy().load().type(Inscripto.class).filter("partido", this).list();
    }

    @JsonIgnore
    public boolean estaCompleto() {
        return this.getTotalInscriptos() >= this.getCant_personas();
    }

    @JsonIgnore
    public boolean estaEstrictamenteCompleto() {
        return this.getTotalInscriptos() == this.getCant_personas();
    }

    public void publish() {
        FacebookService.publishPartido(this);
    }

    public void notifyUser() { FacebookService.notifyUser(this); }

    public void notifyInscriptos() {
        if(estaEstrictamenteCompleto()) {
            FacebookService.notifyInscriptos(getInscriptos());
        }
    }
}
