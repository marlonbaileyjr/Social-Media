package com.example.lasya.SocialMediaApp.bean;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.annotation.Nonnull;
import lombok.Data;
import java.util.Date;

@Data
public class UserBean {

    private int userId;

    @Nonnull
    private String firstName;
    private String lastName;
    private String userName;
    private String email;
    private String password;
    private byte[] profilePicture;
    private String bio;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private Date dateOfBirth;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private Date dateJoined;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private Date lastLogin;

    // Default constructor
    public UserBean() {
        // Default constructor with no arguments
    }

    public UserBean(String userName) {
        this.userName = userName;
    }

    public UserBean(int userId) {
       this.userId = userId;
    }

}
