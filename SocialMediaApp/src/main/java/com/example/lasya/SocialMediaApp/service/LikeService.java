package com.example.lasya.SocialMediaApp.service;

import com.example.lasya.SocialMediaApp.entity.Like;
import org.springframework.http.ResponseEntity;

import java.sql.Timestamp;
import java.util.List;

public interface LikeService {

    List<Like> findByPost_PostId(int postId);

    ResponseEntity<String> addLikeToPost(int userId, int postId, Timestamp uploadTime);

    ResponseEntity<String> deleteLikeById(int likeId);
}
