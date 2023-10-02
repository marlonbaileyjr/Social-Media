package com.example.lasya.SocialMediaApp.exception;

public class FriendshipNotFoundException extends RuntimeException{
    private static final long serialVersionUID = 1L;

    public FriendshipNotFoundException(String msg) {
        super(msg);
    }
}