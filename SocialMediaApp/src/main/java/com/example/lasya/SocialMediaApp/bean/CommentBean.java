package com.example.lasya.SocialMediaApp.bean;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class CommentBean {

    private int commentId;

    private String text;
    private LocalDateTime commentTime;
}