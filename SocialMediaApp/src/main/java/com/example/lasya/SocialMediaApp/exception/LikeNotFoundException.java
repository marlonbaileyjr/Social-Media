package com.example.lasya.SocialMediaApp.exception;

public class LikeNotFoundException extends RuntimeException{
    private static final long serialVersionUID = 1L;

    public LikeNotFoundException(String msg) {
        super(msg);
    }
}
