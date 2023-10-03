package com.example.lasya.SocialMediaApp.service;

import com.example.lasya.SocialMediaApp.bean.PostBean;
import com.example.lasya.SocialMediaApp.bean.UserBean;
import com.example.lasya.SocialMediaApp.entity.Post;
import com.example.lasya.SocialMediaApp.entity.User;
import com.example.lasya.SocialMediaApp.exception.PostNotFoundException;
import com.example.lasya.SocialMediaApp.repository.PostRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.security.Timestamp;
import java.sql.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class PostServiceImpl implements PostService{
    private static final Logger logger = LoggerFactory.getLogger(PostServiceImpl.class);
    private final PostRepository postRepository;
    private final UserService userService;

    @Autowired
    public PostServiceImpl(PostRepository postRepository, UserService userService) {
        super();
        this.postRepository = postRepository;
        this.userService = userService;
    }

    @Override
    public PostBean updatePost(PostBean postBean, int postId) {
        return null;
    }

    @Override
    public List<PostBean> getAllPosts() {
        List<Post> posts = postRepository.findAll();
        List<PostBean> postBeans;
        postBeans = posts.stream().map(this::getBeanFromEntity).collect(Collectors.toList());
        return postBeans;
    }

    @Override
    public PostBean getPostById(int postId) {
        Post post;
        Optional<Post> postById = postRepository.findById(postId);
        if (postById.isEmpty()) {
            throw new PostNotFoundException("Post does not exist: " + postId);
        }
        post = postById.get();
        return getBeanFromEntity(post);
    }

    @Override
    public boolean deletePostById(int postId) {
        Optional<Post> optionalPost = postRepository.findById(postId);
        logger.debug("optionalPost:{} ", optionalPost);
        if (optionalPost.isEmpty()) {
            throw new PostNotFoundException("Post does not exist: " + postId);
        }
        postRepository.deleteById(postId);
        return true;
    }

    @Override
    public List<Post> getPostsFromFriends(int userId) {
        return postRepository.findPostsFromFriends(userId);
    }

    @Override
    public List<byte[]> getMediaFromPost(int postId) {
        return postRepository.getMediaFromPost(postId);
    }

    @Override
    public void addPost(String caption, Date uploadTime, UserBean user) {
        postRepository.addPost(caption, (java.sql.Date) uploadTime, user.getUserId());
    }

    @Override
    public void addPicture(byte[] media, String type, int order, Date uploadTime, Post post) {
        postRepository.addPicture(media, type, order, (java.sql.Date) uploadTime, post.getPostId());
    }

    private PostBean getBeanFromEntity(Post post) {
        PostBean postBean = new PostBean();
        postBean.setPostId(post.getPostId());
        postBean.setCaption(post.getCaption());
        postBean.setUploadTime(post.getUploadTime());
        UserBean userBean = userService.getBeanFromEntity(post.getUser());
        // userId is a foreign key in the Post entity
        if (post.getUser() != null) {
            postBean.setUserId(post.getUser().getUserId());
        }
        // logic for handling pictures and comments if needed
        return postBean;
    }

    private Post getEntityFromBean(PostBean postBean) {
        Post post = new Post();
        post.setCaption(postBean.getCaption());
        post.setUploadTime((java.sql.Date) postBean.getUploadTime());
        // userId is a foreign key in the Post entity
        User user = new User();
        user.setUserId(postBean.getUserId());
        post.setUser(user);
        // logic for handling pictures and comments if needed
        return post;
    }

}

