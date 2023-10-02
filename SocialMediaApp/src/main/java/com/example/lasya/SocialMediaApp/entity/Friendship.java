package com.example.lasya.SocialMediaApp.entity;

import jakarta.persistence.*;

import lombok.Data;

@Data
@Entity
@Table(name = "`friendship`", catalog = "social_media_app")
public class Friendship {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int friendshipId;

    public Friendship() {
        super();
    }

    public Friendship(int id) {
        super();
        this.friendshipId = id;
    }

    private int followerId;
    private int followedId;
    private String userName;

    @Column(name = "uploadTime")
    private java.sql.Date uploadTime;

    @ManyToOne
    @JoinColumn(name = "followerId", referencedColumnName = "userId", insertable = false, updatable = false)
    private User follower;

    @ManyToOne
    @JoinColumn(name = "followedId", referencedColumnName = "userId", insertable = false, updatable = false)
    private User followed;

}