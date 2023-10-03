package com.example.lasya.SocialMediaApp.repository;

import com.example.lasya.SocialMediaApp.entity.Like;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LikeRepository extends JpaRepository<Like, Integer> {

    List<Like> findByPost_PostId(int postId);

    @Modifying
    @Query(value = "INSERT INTO Like(post_id) VALUES (:postId)", nativeQuery = true)
    void addLikeToPost(@Param("postId") int postId);

    @Modifying
    @Query("DELETE FROM Like l WHERE l.likeId = :likeId")
    void deleteLikeById(@Param("likeId") int likeId);
}
