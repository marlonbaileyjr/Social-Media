package com.example.lasya.SocialMediaApp.repository;

import com.example.lasya.SocialMediaApp.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Integer> {
    List<Comment> findByPostPostId(int postId);

    // Delete a comment by commentId
    public void deleteByCommentId(int commentId);

    // Custom query method to edit a comment by its ID
    @Modifying
    @Query("UPDATE Comment c SET c.text = :text WHERE c.commentId = :id")
    void editComment(@Param("id") int id, @Param("text") String text);

    @Modifying
    @Query(value = "INSERT INTO Comment c (c.post, c.text) SELECT p, :text FROM Post p WHERE p.postId = :postId", nativeQuery = true)
    void addCommentToPost(@Param("postId") int postId, @Param("text") String text);
}
