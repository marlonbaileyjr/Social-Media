package com.example.lasya.SocialMediaApp.service;

import com.example.lasya.SocialMediaApp.bean.PostBean;
import com.example.lasya.SocialMediaApp.bean.UserBean;
import com.example.lasya.SocialMediaApp.entity.Pictures;
import com.example.lasya.SocialMediaApp.entity.Post;

import java.sql.Date;
import java.util.List;

public interface PostService {

    public PostBean updatePost(PostBean postBean, int postId);

    public List<PostBean> getAllPosts();

    public PostBean getPostById(int postId);

    public boolean deletePostById(int postId);

    public List<Post> findPostsFromFriendsByUserId(int userId);

    public List<byte[]> getMediaFromPost(int postId);

    Post addPost(String caption, Date uploadTime, UserBean user);

    Pictures addPicture(byte[] media, String type, int order, Date uploadTime, Post post);

    boolean existsPostByPostId(int postId);

    Pictures getCreatedPicture();

    Post findPostByPostId(int postId);

    Pictures getLatestPictureByPostId(int postId);

    List<Post> findByUserUserId(int userId);
}

