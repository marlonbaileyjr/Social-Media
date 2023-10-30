package com.example.lasya.SocialMediaApp.service;

import com.example.lasya.SocialMediaApp.bean.PostBean;
import com.example.lasya.SocialMediaApp.bean.UserBean;
import com.example.lasya.SocialMediaApp.entity.Pictures;
import com.example.lasya.SocialMediaApp.entity.Post;
import com.example.lasya.SocialMediaApp.entity.User;
import com.example.lasya.SocialMediaApp.exception.PostNotFoundException;
import com.example.lasya.SocialMediaApp.repository.PostRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class PostServiceImpl implements PostService {
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
        Optional<Post> optionalPost = postRepository.findById(postId);

        if (optionalPost.isPresent()) {
            Post post = optionalPost.get();
            // Update the fields of the post entity with the values from postBean
            post.setCaption(postBean.getCaption());
            post.setUploadTime(postBean.getUploadTime());
            int userId = postBean.getUserId(); // Get the userId from the postBean
            post.setUser(new User(userId));
            // Save the updated post entity
            Post updatedPost = postRepository.save(post);
            // Convert the updated post entity to a PostBean and return it
            return getBeanFromEntity(updatedPost);
        } else {
            // Handle the case where the post with the given postId is not found
            throw new PostNotFoundException("Post does not exist: " + postId);
        }
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
    public List<Post> findPostsFromFriendsByUserId(int userId) {
        logger.info("Querying for posts of user with userId: " + userId);
        List<Post> posts = postRepository.findPostsFromFriendsByUserId(userId);
        logger.info("Found " + posts.size() + " posts");
        logger.info("posts: {}", posts);
        return posts;
    }

    @Override
    public List<byte[]> getMediaFromPost(int postId) {
        return postRepository.getMediaFromPost(postId);
    }

    @Override
    @Transactional
    public void addPost(String caption, Date uploadTime, UserBean user) {
        if (uploadTime == null) {
            // Handle the case where uploadTime is null
            throw new IllegalArgumentException("uploadTime cannot be null");
        }
        logger.info("Insert Data: caption={}, uploadTime={}, userId={}", caption, uploadTime, user.getUserId());
        postRepository.addPost(caption, uploadTime, user.getUserId());
    }

    private java.sql.Date convertToSqlDate(Date date) {
        return new java.sql.Date(date.getTime());
    }

    @Override
    @Transactional
    public Pictures addPicture(byte[] media, String type, int order, Date uploadTime, Post post) {
        logger.info("inside addPicture method");
        Pictures newPicture = new Pictures();
        newPicture.setMedia(media);
        newPicture.setType(type);
        newPicture.setOrder(order);
        newPicture.setUploadTime(uploadTime);
        newPicture.setPost(post);
//        logger.info("newPicture: " + newPicture);
        post.getPictures().add(newPicture);
        postRepository.save(post);
        return newPicture;
    }

    @Override
    public Post findPostByPostId(int postId){
        return postRepository.findPostByPostId(postId);
    }

    @Override
    public boolean existsPostByPostId(int postId) {
        return false;
    }

    @Override
    public Pictures getCreatedPicture() {
        return null;
    }

    @Override
    public Pictures getLatestPictureByPostId(int postId) {
        List<Pictures> pictures = postRepository.findLatestPictureByPostId(postId);
        if (!pictures.isEmpty()) {
            return pictures.get(0); // The first picture in the list is the latest one
        }
        return null;
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
        return post;
    }

}

