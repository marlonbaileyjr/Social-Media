package com.example.lasya.SocialMediaApp.bean;

import jakarta.annotation.Nonnull;
import lombok.Data;
import java.time.LocalDateTime;

@Data
public class FriendshipBean {
    private int friendshipId;

    @Nonnull
    private int follower;
    private int followed;
    private LocalDateTime uploadTime;
}
