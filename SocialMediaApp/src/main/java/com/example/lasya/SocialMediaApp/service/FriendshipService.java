package com.example.lasya.SocialMediaApp.service;

import com.example.lasya.SocialMediaApp.entity.Friendship;
import com.example.lasya.SocialMediaApp.entity.User;

import java.util.List;

public interface FriendshipService {

    List<Friendship> findByFollowedUserId(int userId);

    List<Friendship> findByFollowerUserId(int userId);

    boolean existsByFollowerAndFollowed(User follower, User followed);

    void deleteByFollowerUserIdAndFollowedUserId(int followerUserId, int followedUserId);
}

