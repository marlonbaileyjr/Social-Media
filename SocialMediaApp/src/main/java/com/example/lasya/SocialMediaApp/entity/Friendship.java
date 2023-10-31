package com.example.lasya.SocialMediaApp.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

import lombok.Data;

import java.time.LocalDateTime;

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

    @Column(name = "uploadTime")
    private LocalDateTime uploadTime;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "followerId", referencedColumnName = "userId", insertable = false, updatable = false)
    @JsonBackReference
    private User follower;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "followedId", referencedColumnName = "userId", insertable = false, updatable = false)
    @JsonBackReference
    private User followed;

    @Override
    public String toString() {
        return "Friendship{" +
                "friendshipId=" + friendshipId +
                ", followerId=" + followerId +
                ", followedId=" + followedId +
                '}';
    }

}