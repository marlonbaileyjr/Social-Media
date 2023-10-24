package com.example.lasya.social_media_application.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NonNull;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;
import java.util.List;

@Data
@Entity
@Table(name = "`user`", catalog = "social_media_application")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "userId")
    private int userId;

    public User() {
        super();
    }

    public User(int id) {
        super();
        this.userId = id;
    }

    @Lob
    @Column(name = "profilePicture", columnDefinition = "LONGBLOB")
    private byte[] profilePicture;

    @Column(name="bio")
    private String bio;

    @NonNull
    @Column(name="firstName")
    private String firstName;
    @Column(name="lastName")
    private String lastName;
    @Column(name = "password")
    private String password;

    @Column(name = "dateOfBirth")
    private Date dateOfBirth;

    @Column(name = "dateJoined",  nullable = false)
    @JsonSerialize(using = CustomDateSerializer.class)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss.SSSSSS")
    private Date dateJoined;

    @Column(name = "email", unique = true, nullable = false)
    private String email;

    @Column(name = "userName", unique = true)
    private String userName;

    @Column(name = "lastLogin", nullable = false)
    @JsonSerialize(using = CustomDateSerializer.class)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss.SSSSSS")
    private Date lastLogin;

    @PrePersist
    public void prePersist() {
        this.lastLogin = Date.from(LocalDateTime.now().atZone(ZoneId.systemDefault()).toInstant());
        System.out.println("Last Login set to: " + this.lastLogin);
    }

    public Date getDateJoined() {
        System.out.println("Getting dateJoined: " + dateJoined);
        return dateJoined;
    }

    public Date getLastLogin() {
        return lastLogin;
    }

//    @OneToMany(mappedBy = "follower")
//    private List<Friendship> friendships;
//
//    @OneToMany(mappedBy = "user")
//    private List<Like> likes;
//
//    @OneToMany(mappedBy = "user")
//    private List<Post> posts;
//
//    @OneToMany(mappedBy = "user")
//    private List<Comment> comments;

    public User(String userName, String password) {
        this.userName = userName;
        this.password = password;
    }
}
