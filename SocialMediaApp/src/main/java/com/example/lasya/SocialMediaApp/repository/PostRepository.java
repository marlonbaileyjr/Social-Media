package com.example.lasya.SocialMediaApp.repository;

import com.example.lasya.SocialMediaApp.entity.Pictures;
import com.example.lasya.SocialMediaApp.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.sql.Date;
import java.util.List;

@Repository
public interface PostRepository extends JpaRepository<Post, Integer> {

    List<Post> findByPostId(int postId);

    List<Post> findAll();

    @Query("SELECT p FROM Post p INNER JOIN Friendship f ON p.user.userId = f.followedId WHERE f.follower.userId = :userId")
    List<Post> findPostsFromFriendsByUserId(int userId);

    @Query("SELECT p.media FROM Pictures p WHERE p.post.postId = :postId")
    List<byte[]> getMediaFromPost(@Param("postId") int postId);

    @Modifying
    @Query(value = "INSERT INTO Post(caption, upload_time, user_id) " +
            "VALUES (:caption, :uploadTime, :userId)", nativeQuery = true)
    void addPost(@Param("caption") String caption,
                 @Param("uploadTime") Date uploadTime,
                 @Param("userId") int userId);

    @Modifying
    @Query(value = "INSERT INTO Pictures(media, type, order_int, upload_time, post_id) VALUES (?, ?, ?, ?, ?)", nativeQuery = true)
    void addPicture(byte[] media, String type, int order, Date uploadTime, int post);

    @Modifying
    @Query("DELETE FROM Post p WHERE p.postId = :postId")
    void deletePostById(@Param("postId") int postId);

    boolean existsPostByPostId(int postId);

    Post findPostByPostId(int postId);

    @Query("SELECT pic FROM Post p JOIN p.pictures pic WHERE p.postId = :postId ORDER BY pic.pictureId DESC")
    List<Pictures> findLatestPictureByPostId(@Param("postId") int postId);
}

