package com.example.lasya.SocialMediaApp.exception;

public class MediaNotFoundException extends RuntimeException{
    private static final long serialVersionUID = 1L;

    public MediaNotFoundException(String msg) {
        super(msg);
    }
}
