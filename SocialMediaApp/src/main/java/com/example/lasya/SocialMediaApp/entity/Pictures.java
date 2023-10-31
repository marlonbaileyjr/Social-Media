package com.example.lasya.SocialMediaApp.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "`pictures`", catalog = "social_media_app")
public class Pictures {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int pictureId;

    public Pictures() {
        super();
    }

    public Pictures(int id) {
        super();
        this.pictureId = id;
    }

    @Lob
    @Column(name = "media", columnDefinition = "LONGBLOB")
    private byte[] media;

    private String type;
    @Column(name = "`order_int`")
    private int order;

    @Column(name = "uploadTime")
    private java.sql.Date uploadTime;

    @ManyToOne
    @JoinColumn(name = "postId")
    @JsonBackReference
    private Post post;
}


