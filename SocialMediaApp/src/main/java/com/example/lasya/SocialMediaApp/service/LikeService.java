package com.example.lasya.SocialMediaApp.service;

import com.example.lasya.SocialMediaApp.entity.Like;
import org.springframework.http.ResponseEntity;

import java.sql.Timestamp;
import java.util.List;
import java.util.Map;

public interface LikeService {

    List<Map<String, Object>> findByPost_PostId(int postId);

    ResponseEntity<String> addLikeToPost(int userId, int postId, Timestamp uploadTime);

    ResponseEntity<String> deleteLikeById(int likeId);

    public boolean checkIfLikeExists(int likeId);
}
