package com.example.lasya.SocialMediaApp.exception;

public class PostNotCreatedException extends RuntimeException{
    private static final long serialVersionUID = 1L;

    public PostNotCreatedException(String msg) {
        super(msg);
    }
}
