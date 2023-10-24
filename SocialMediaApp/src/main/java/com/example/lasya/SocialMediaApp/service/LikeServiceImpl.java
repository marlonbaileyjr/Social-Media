package com.example.lasya.SocialMediaApp.service;

import com.example.lasya.SocialMediaApp.entity.Post;
import com.example.lasya.SocialMediaApp.exception.PostNotFoundException;
import com.example.lasya.SocialMediaApp.repository.LikeRepository;
import com.example.lasya.SocialMediaApp.repository.PostRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class LikeServiceImpl implements LikeService {
    private static final Logger logger = LoggerFactory.getLogger(LikeServiceImpl.class);
    private final LikeRepository likeRepository;

    private final PostRepository postRepository;

    @Autowired
    public LikeServiceImpl(LikeRepository likeRepository, PostRepository postRepository) {
        super();
        this.likeRepository = likeRepository;
        this.postRepository = postRepository;
    }

    @Override
    public List<Map<String, Object>> findByPost_PostId(int postId) {
        List<Map<String, Object>> originalResults = likeRepository.findByPost_PostId(postId);
        logger.info("originalResults: " + originalResults);
        if (!(originalResults.isEmpty())) {
            List<Map<String, Object>> formattedResults = originalResults.stream()
                    .map(result -> {
                        Map<String, Object> formattedResult = new HashMap<>();
                        formattedResult.put("likeId", result.get("0"));
                        formattedResult.put("uploadTime", result.get("1"));
                        formattedResult.put("userId", result.get("2"));
                        return formattedResult;
                    })
                    .collect(Collectors.toList());
            return formattedResults;
        }else{
            throw new PostNotFoundException("Post not found with postId: " + postId);
        }
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
