package com.example.lasya.SocialMediaApp.repository;

import com.example.lasya.SocialMediaApp.entity.Like;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.sql.Timestamp;
import java.util.List;
import java.util.Map;

@Repository
public interface LikeRepository extends JpaRepository<Like, Integer> {

    @Query(value = "SELECT NEW map(l.likeId, l.uploadTime, l.user.userId) FROM Like l JOIN l.post p WHERE p.postId = :postId")
    List<Map<String, Object>> findByPost_PostId(int postId);

    @Modifying
    @Query(value = "INSERT INTO like_table (user_id, post_id, upload_time) VALUES (:userId, :postId, :uploadTime)", nativeQuery = true)
    void addLikeToPost(@Param("userId") int userId, @Param("postId") int postId, @Param("uploadTime") Timestamp uploadTime);

    @Modifying
    @Query("DELETE FROM Like l WHERE l.likeId = :likeId")
    void deleteLikeById(@Param("likeId") int likeId);

    boolean existsByLikeId(int likeId);
}
