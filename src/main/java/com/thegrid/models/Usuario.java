package com.thegrid.models;

import com.googlecode.objectify.annotation.Entity;
import com.googlecode.objectify.annotation.Id;
import com.googlecode.objectify.annotation.Index;
import com.thegrid.services.DatastoreService;
import com.thegrid.services.FacebookService;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
public class Usuario implements IModel {
    @Getter
    @Id
    private Long id;

    @Getter
    @Setter
    @Index
    private String facebook_id;

    @Getter
    @Setter
    private String token;

    @Getter
    @Setter
    private String name;

    @Getter
    @Setter
    private String photoUrl;

    @Override
    public void delete() {
        DatastoreService.getOfy().delete().entity(this);
    }
}
