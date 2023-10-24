package com.example.lasya.SocialMediaApp.exception;

public class CommentTextNotFoundException extends RuntimeException{
    private static final long serialVersionUID = 1L;

    public CommentTextNotFoundException(String msg) {
        super(msg);
    }
}
