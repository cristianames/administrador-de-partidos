package com.thegrid.models;

import com.googlecode.objectify.Ref;
import com.googlecode.objectify.annotation.Entity;
import com.googlecode.objectify.annotation.Id;
import com.googlecode.objectify.annotation.Index;
import com.googlecode.objectify.annotation.Load;
import com.thegrid.services.DatastoreService;
import lombok.Getter;

@Entity
public class Recomendacion implements IModel {
    @Getter
    @Id
    private Long id;

    @Index
    private Ref<Usuario> usuario;
    public Usuario getUsuario() { return usuario.get(); }
    public void setUsuario(Usuario usuario) {
        this.usuario = Ref.create(usuario);
    }

    private Ref<Usuario> from_usuario;
    public Usuario getFrom_usuario() { return from_usuario.get(); }
    public void setFrom_usuario(Usuario usuario) {
        this.from_usuario = Ref.create(usuario);
    }

    @Index
    private Ref<Partido> partido;
    public Partido getPartido() { return partido.get(); }
    public void setPartido(Partido partido) { this.partido = Ref.create(partido); }

    @Override
    public void delete() {
        DatastoreService.getOfy().delete().entity(this);
    }
}
