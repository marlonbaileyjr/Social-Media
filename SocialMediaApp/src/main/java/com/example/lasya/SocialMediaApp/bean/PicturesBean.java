package com.example.lasya.SocialMediaApp.bean;

import jakarta.annotation.Nonnull;
import lombok.Data;
import java.time.LocalDateTime;

@Data
public class PicturesBean {

    private int pictureId;

    @Nonnull
    private byte[] media;
    private String type;
    private int order;
    private LocalDateTime uploadTime;
}
