package com.example.lasya.SocialMediaApp.repository;

import com.example.lasya.SocialMediaApp.entity.Friendship;
import com.example.lasya.SocialMediaApp.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FriendshipRepository extends JpaRepository<Friendship, Integer> {

    List<Friendship> findByFollowedUserId(int userId);

    // Get followed users for a given user
    List<Friendship> findByFollowerUserId(int userId);

    // Check if a friendship exists
    boolean existsByFollowerAndFollowed(User follower, User followed);

    // Delete a friendship
    void deleteByFollowerUserIdAndFollowedUserId(int followerUserId, int followedUserId);
}

