package com.example.lasya.SocialMediaApp.service;

import com.example.lasya.SocialMediaApp.entity.Comment;
import com.example.lasya.SocialMediaApp.exception.CommentTextNotFoundException;
import com.example.lasya.SocialMediaApp.repository.CommentRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class CommentServiceImpl implements CommentService{
    private static final Logger logger = LoggerFactory.getLogger(CommentServiceImpl.class);
    private final CommentRepository commentRepository;

    @Autowired
    public CommentServiceImpl(CommentRepository commentRepository) {
        super();
        this.commentRepository = commentRepository;
    }

    @Override
    public List<Comment> findByPostPostId(int postId) {
        return commentRepository.findByPostPostId(postId);
    }

    @Override
    @Transactional
    public void deleteByCommentId(int commentId) {
        commentRepository.deleteByCommentId(commentId);
    }

    @Override
    @Transactional
    public void editComment(int commentId, String newText) {
        if (newText != null && !newText.isEmpty()) {
            commentRepository.editComment(commentId, newText);
        } else {
            throw new CommentTextNotFoundException("New comment text not found");
        }
    }

    @Override
    @Transactional
    public void addCommentToPost(int postId, int userId, String text, Integer parentCommentId, LocalDateTime uploadTime) {
        logger.info("inside addCommentToPost method");
        commentRepository.addCommentToPost(postId, userId, text, parentCommentId, uploadTime);
    }

    @Override
    public boolean existsByCommentId(int commentId) {
        return false;
    }

}

