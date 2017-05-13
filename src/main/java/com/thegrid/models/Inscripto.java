package com.thegrid.models;

import com.googlecode.objectify.Ref;
import com.googlecode.objectify.annotation.Entity;
import com.googlecode.objectify.annotation.Id;
import com.googlecode.objectify.annotation.Index;
import com.googlecode.objectify.annotation.Load;
import com.thegrid.services.DatastoreService;
import com.thegrid.services.FacebookService;
import lombok.Getter;

@Entity
public class Inscripto implements IModel {
    @Id
    @Getter
    private Long id;

    @Getter
    private String puesto;

    @Index
    private Ref<Usuario> usuario;
    public Usuario getUsuario() { return usuario.get(); }
    public void setUsuario(Usuario usuario) {
        this.usuario = Ref.create(usuario);
    }

    @Index
    private Ref<Partido> partido;
    public Partido getPartido() { return partido.get(); }
    public void setPartido(Partido partido) {
        this.partido = Ref.create(partido);

        //Cuando se setee el partido actualizar puesto de inscripcion
        puesto = "Titular";
        if (this.getPartido().estaCompleto()){ puesto = "Suplente"; }
    }

    @Override
    public void delete() {
        DatastoreService.getOfy().delete().entity(this);
    }

}
