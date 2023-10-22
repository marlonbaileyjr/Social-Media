package com.example.lasya.SocialMediaApp.bean;

import jakarta.annotation.Nonnull;
import lombok.Data;
import java.sql.Date;

@Data
public class PostBean {
    private int postId;

    @Nonnull
    private String caption;
    private Date uploadTime;

    private int userId;

    // Add the setter method for userId
    public void setUserId(int userId) {
        this.userId = userId;
    }

    public PostBean() {
        // constructor implementation
    }


}
