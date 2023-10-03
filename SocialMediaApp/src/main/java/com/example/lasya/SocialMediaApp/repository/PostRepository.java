package com.example.lasya.SocialMediaApp.repository;

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

    @Query("SELECT p FROM Post p INNER JOIN Friendship f ON p.user.userId = f.followedId WHERE f.follower = :userId")
    List<Post> findPostsFromFriends(@Param("userId") int userId);

    @Query("SELECT p.media FROM Pictures p WHERE p.post.postId = :postId")
    List<byte[]> getMediaFromPost(@Param("postId") int postId);

    @Modifying
    @Query(value = "INSERT INTO Post(caption, uploadTime, userId) " +
            "VALUES (:caption, :uploadTime, :userId)", nativeQuery = true)
    void addPost(@Param("caption") String caption,
                 @Param("uploadTime") java.sql.Date uploadTime,  // Use java.sql.Date
                 @Param("userId") int userId);

    @Modifying
    @Query(value = "INSERT INTO Picture(media, type, order, uploadTime, post_post_id) " +
            "VALUES (:media, :type, :order, :uploadTime, :postId)", nativeQuery = true)
    void addPicture(@Param("media") byte[] media,
                    @Param("type") String type,
                    @Param("order") int order,
                    @Param("uploadTime") Date uploadTime,
                    @Param("postId") int postId);


    @Modifying
    @Query("DELETE FROM Post p WHERE p.postId = :postId")
    void deletePostById(@Param("postId") int postId);
}

