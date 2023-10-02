package com.example.lasya.SocialMediaApp.service;

import com.example.lasya.SocialMediaApp.entity.Comment;

import java.util.List;

public interface CommentService {

    List<Comment> findByPostPostId(int postId);

    void deleteByCommentId(int commentId);

    void editComment(int commentId, String newText);

    void addCommentToPost(int postId, String text);

}
