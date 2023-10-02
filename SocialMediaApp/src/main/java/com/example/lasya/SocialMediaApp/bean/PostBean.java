package com.example.lasya.SocialMediaApp.bean;

import lombok.Data;
import lombok.NonNull;
import org.antlr.v4.runtime.misc.NotNull;

import java.util.Date;

@Data
public class PostBean {
    private int postId;

    @NotNull
    private String caption;
    private Date uploadTime;

    private int userId;

    // Add the setter method for userId
    public void setUserId(int userId) {
        this.userId = userId;
    }

}
