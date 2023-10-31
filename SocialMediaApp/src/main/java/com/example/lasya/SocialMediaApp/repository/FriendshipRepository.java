package com.example.lasya.SocialMediaApp.repository;

import com.example.lasya.SocialMediaApp.entity.Friendship;
import com.example.lasya.SocialMediaApp.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Date;
import java.util.List;

@Repository
public interface FriendshipRepository extends JpaRepository<Friendship, Integer> {

    @Modifying
    @Query(value = "INSERT INTO friendship (follower_id, followed_id, upload_time) VALUES (:followerId, :followedId, :uploadTime)", nativeQuery = true)
    void addFriendship(@Param("followerId") int followerId, @Param("followedId") int followedId, @Param("uploadTime") Date uploadTime);

    List<Friendship> findByFollowedUserId(int userId);

    // Get followed users for a given user
    List<Friendship> findByFollowerUserId(int userId);

    // Check if a friendship exists
    boolean existsByFollowerAndFollowed(User follower, User followed);

    // Delete a friendship
    void deleteByFollowerUserIdAndFollowedUserId(int followerUserId, int followedUserId);
}

