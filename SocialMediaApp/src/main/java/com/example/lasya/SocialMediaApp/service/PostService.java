package com.example.lasya.SocialMediaApp.service;

import com.example.lasya.SocialMediaApp.bean.PostBean;
import com.example.lasya.SocialMediaApp.bean.UserBean;
import com.example.lasya.SocialMediaApp.entity.Post;

import java.sql.Date;
import java.util.List;

public interface PostService {

    public PostBean updatePost(PostBean postBean, int postId);

    public List<PostBean> getAllPosts();

    public PostBean getPostById(int postId);

    public boolean deletePostById(int postId);

    public List<Post> getPostsFromFriends(int userId);

    public List<byte[]> getMediaFromPost(int postId);

    void addPost(String caption, Date uploadTime, UserBean user);

    void addPicture(byte[] media, String type, int order, Date uploadTime, Post post);
}

