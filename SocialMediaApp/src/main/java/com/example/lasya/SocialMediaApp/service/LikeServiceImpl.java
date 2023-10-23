package com.example.lasya.SocialMediaApp.service;

import com.example.lasya.SocialMediaApp.entity.Like;
import com.example.lasya.SocialMediaApp.repository.LikeRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;
import java.util.List;

@Service
public class LikeServiceImpl implements LikeService {
    private static final Logger logger = LoggerFactory.getLogger(LikeServiceImpl.class);
    private final LikeRepository likeRepository;

    @Autowired
    public LikeServiceImpl(LikeRepository likeRepository) {
        super();
        this.likeRepository = likeRepository;
    }

    @Override
    public List<Like> findByPost_PostId(int postId) {
        logger.info("inside findByPost_PostId method");
        List<Like> likes = likeRepository.findByPost_PostId(postId);
        // Log the retrieved likes for debugging
        logger.debug("Likes found: {}", likes);
        return likes;
    }

    @Override
    @Transactional
    public ResponseEntity<String> addLikeToPost(int userId, int postId, Timestamp uploadTime) {
        likeRepository.addLikeToPost(userId, postId, uploadTime);
        return ResponseEntity.ok("Like added successfully.");
    }

    @Override
    public ResponseEntity<String> deleteLikeById(int likeId) {
        likeRepository.deleteLikeById(likeId);
        return null;
    }
}
