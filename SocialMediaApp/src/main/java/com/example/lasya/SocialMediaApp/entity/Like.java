package com.example.lasya.SocialMediaApp.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "`like_table`", catalog = "social_media_app")
public class Like {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int likeId;

    public Like() {
        super();
    }

    public Like(int id) {
        super();
        this.likeId = id;
    }

    @Column(name = "uploadTime")
    private java.sql.Date uploadTime;

    @ManyToOne
    @JoinColumn(name = "userId")
    private User user;

    @ManyToOne
    @JoinColumn(name = "post_id")
    private Post post;

}
