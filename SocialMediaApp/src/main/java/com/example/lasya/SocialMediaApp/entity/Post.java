package com.example.lasya.SocialMediaApp.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
@Entity
@Table(name = "`post`", catalog = "social_media_app")
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "postId")
    private int postId;

    public Post() {
        super();
    }

    public Post(int id) {
        super();
        this.postId = id;
    }

    private String caption;

    @Temporal(TemporalType.DATE)
    @Column(name = "upload_time")
    private java.sql.Date uploadTime;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @OneToMany(mappedBy = "post")
    private List<Pictures> pictures;

    @OneToMany(mappedBy = "post")
    private List<Comment> comments;
}

