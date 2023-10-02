package com.example.lasya.SocialMediaApp.service;

import com.example.lasya.SocialMediaApp.entity.Like;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface LikeService {

    List<Like> findByPost_PostId(int postId);

    ResponseEntity<String> addLikeToPost(int postId);

    ResponseEntity<String> deleteLikeById(int likeId);
}
