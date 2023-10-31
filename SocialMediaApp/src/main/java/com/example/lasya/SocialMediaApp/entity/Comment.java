package com.example.lasya.SocialMediaApp.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "`comment`", catalog = "social_media_app")
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int commentId;

    public Comment() {
        super();
    }

    public Comment(int id) {
        super();
        this.commentId = id;
    }

    private String text;

    private String parentCommentId;

    @Column(name = "uploadTime")
    private java.sql.Date uploadTime;

    @ManyToOne
    @JoinColumn(name = "postId")
    @JsonBackReference
    private Post post;

    @ManyToOne
    @JoinColumn(name = "userId")
    @JsonBackReference
    private User user;

    @Override
    public String toString() {
        return "Comment{commentId=" + commentId + ", text='" + text + "', uploadTime=" + uploadTime + "}";
    }


}
