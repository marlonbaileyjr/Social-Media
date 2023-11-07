package com.example.lasya.SocialMediaApp.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

import java.util.ArrayList;
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

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id")
    @JsonBackReference
    private User user;

    @OneToMany(mappedBy = "post", fetch = FetchType.EAGER,  cascade = CascadeType.PERSIST)
    @JsonBackReference
    private List<Pictures> pictures = new ArrayList<>();

    @OneToMany(fetch = FetchType.EAGER, mappedBy = "post")
    @JsonBackReference
    private List<Comment> comments;

    @Override
    public String toString() {
        return "Post{postId=" + postId + ", caption='" + caption + "', uploadTime=" + uploadTime + "}";
    }
    public Post(int postId, String caption, java.sql.Date uploadTime, int userId) {
        this.postId = postId;
        this.caption = caption;
        this.uploadTime = uploadTime;
        this.user = new User(userId);
    }

}

