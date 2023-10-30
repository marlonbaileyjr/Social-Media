package com.example.lasya.SocialMediaApp.controller;

import com.example.lasya.SocialMediaApp.bean.PostBean;
import com.example.lasya.SocialMediaApp.bean.UserBean;
import com.example.lasya.SocialMediaApp.entity.Pictures;
import com.example.lasya.SocialMediaApp.entity.Post;
import com.example.lasya.SocialMediaApp.entity.User;
import com.example.lasya.SocialMediaApp.exception.PostNotFoundException;
import com.example.lasya.SocialMediaApp.exception.UserNotFoundException;
import com.example.lasya.SocialMediaApp.repository.PostRepository;
import com.example.lasya.SocialMediaApp.repository.UserRepository;
import com.example.lasya.SocialMediaApp.service.PostService;
import com.example.lasya.SocialMediaApp.service.UserService;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.FileOutputStream;
import java.io.IOException;
import java.sql.Date;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.Instant;
import java.time.format.DateTimeParseException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.validation.Valid;

@CrossOrigin
@RestController
public class PostController {

    private final PostService postService;
    private final UserService userService;
    private final UserRepository userRepository;
    private final PostRepository postRepository;
    private static final Logger logger = LoggerFactory.getLogger(PostController.class);

    @Autowired
    public PostController(PostService postService, UserService userService, UserRepository userRepository, PostRepository postRepository) {
        super();
        this.postService = postService;
        this.userService = userService;
        this.userRepository = userRepository;
        this.postRepository = postRepository;
    }

    @ApiOperation(value = "This API is used to add a new post")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Success"),
            @ApiResponse(code = 201, message = "Created"), @ApiResponse(code = 400, message = "Bad Request"),
            @ApiResponse(code = 401, message = "Unauthorized"), @ApiResponse(code = 404, message = "Not Found"),
            @ApiResponse(code = 407, message = "Proxy Authentication Required"),
            @ApiResponse(code = 500, message = "Internal Server Error"),
            @ApiResponse(code = 502, message = "Bad Gateway")
    })
    @PostMapping(value = "/api/v1/posts")
    public ResponseEntity<?> addPost(@RequestBody Map<String, Object> request) {
        if (request.containsKey("caption") && request.containsKey("uploadTime") && request.containsKey("userId")) {
            try {
                String caption = (String) request.get("caption");
                String uploadTimeStr = (String) request.get("uploadTime");
                int userId = (int) request.get("userId");
                Instant instant = Instant.parse(uploadTimeStr);
                java.sql.Date uploadTime = new java.sql.Date(instant.toEpochMilli());
                UserBean user = userService.getUserById(userId);
                logger.debug("Received JSON: {}", request);
                postService.addPost(caption, uploadTime, user);
            } catch (DateTimeParseException | ClassCastException e) {
                e.printStackTrace();
                return new ResponseEntity<>("Invalid request format", HttpStatus.BAD_REQUEST);
            }
        } else {
            // Handle missing parameters
            return new ResponseEntity<>("Missing parameters", HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    private java.sql.Date convertToSqlDate(Date date) {
        // Implementation to convert java.util.Date to java.sql.Date
        return new java.sql.Date(date.getTime());
    }

    @ApiOperation(value = "This API is used to update a post by providing a postId")
    @PutMapping(value = "/api/v1/posts/update/{postId}")
    public ResponseEntity<PostBean> updatePost(@RequestBody PostBean postBean, @PathVariable int postId) {
        PostBean updatedPost = postService.updatePost(postBean, postId);
        return new ResponseEntity<PostBean>(updatedPost, HttpStatus.OK);
    }

    @ApiOperation(value = "This API is used to retrieve all posts")
    @GetMapping(value = "/api/v1/posts")
    public ResponseEntity<List<PostBean>> getAllPosts() {
        List<PostBean> allPosts = postService.getAllPosts();
        return new ResponseEntity<>(allPosts, HttpStatus.OK);
    }

    @ApiOperation(value = "This API is used to retrieve a post based on the postId")
    @GetMapping(value = "/api/v1/posts/getPost/{postId}")
    public ResponseEntity<?> getPostById(@PathVariable int postId) {
        try {
            PostBean post = postService.getPostById(postId);
            return ResponseEntity.ok(post);
        } catch (PostNotFoundException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Post not found for postId: " + postId);
        }
    }

    @ApiOperation(value = "This API is used to delete a post based on the postId")
    @DeleteMapping(value = "/api/v1/posts/delete/{postId}")
    public ResponseEntity<String> deletePostById(@PathVariable int postId) {
        if (!postRepository.existsPostByPostId(postId)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Post not found with postId: " + postId);
        }
        postService.deletePostById(postId);
        return ResponseEntity.ok("Post deleted successfully");
    }

    @ApiOperation(value = "This API is used to get posts based on userId")
    @GetMapping(value = "/api/v1/posts/retrievePost/{userId}")
    public List<Post> getPostsFromFriends(@PathVariable int userId) {
        User user = userRepository.findById(userId).orElse(null);
        logger.info("UserId: " + userId);
        if (user != null) {
            List<Post> posts = postService.findPostsFromFriendsByUserId(userId);
            logger.info("Posts: " + posts);
            return posts;
        }
        throw new UserNotFoundException("User not found with userId: " + userId);
    }


    @ApiOperation(value = "This API is used to get media based on postId")
    @GetMapping(value = "/api/v1/posts/media/{postId}")
    public ResponseEntity<List<byte[]>> getMediaFromPost(@PathVariable int postId) {
        List<Post> posts = postRepository.findByPostId(postId);
        if (posts.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Post not found with postId: " + postId);
        }
        List<byte[]> media = postService.getMediaFromPost(postId);
        if (media == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Media not found for the post with postId: " + postId);
        }
        return ResponseEntity.ok(media);
    }

    @GetMapping("/api/v1/posts/getLatestPicture/{postId}")
    public ResponseEntity<Pictures> getLatestPictureByPostId(@PathVariable int postId) {
        Pictures latestPicture = postService.getLatestPictureByPostId(postId);
        if (latestPicture != null) {
            return ResponseEntity.ok(latestPicture);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @Transactional
    @ApiOperation(value = "This API is used to add picture")
    @PostMapping(value = "/api/v1/posts/pictures/{postId}")
    public ResponseEntity<String> addPictures(
            @PathVariable("postId") int postId,
            @RequestParam Map<String, Object> formData,
            @RequestParam("media") MultipartFile media
    ) {
        logger.info("postId: " + postId);
        if (!formData.containsKey("type") || !formData.containsKey("order")
                || !formData.containsKey("uploadTime")) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Missing required parameters");
        }

        String type = (String) formData.get("type");
        int order = Integer.parseInt((String) formData.get("order"));
        String uploadTime = formData.get("uploadTime").toString();
        // Handle 'post' if it's provided in formData
        int postValue = 0; // Default value, you can change it accordingly
        if (formData.containsKey("post")) {
            postValue = Integer.parseInt((String) formData.get("post"));
            logger.info("postId: " + postValue);
        }
        // Extract binary data from 'MultipartFile' (media)
        byte[] mediaBytes;
        try {
            mediaBytes = media.getBytes();
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to convert media to binary data");
        }
        Post post = postService.findPostByPostId(postId);
//        logger.info("Retrieved post: " + post);
        if (post == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Post not found");
        }
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss'Z'");
        java.util.Date utilDate = null;
        java.sql.Date sqlDate = null;

        try {
            utilDate = dateFormat.parse(uploadTime); // Parse the date
            sqlDate = new java.sql.Date(utilDate.getTime()); // Convert to java.sql.Date

        } catch (ParseException e) {
            // Handle the parsing exception if the date format is incorrect
            e.printStackTrace();
        }

        postRepository.addPicture(mediaBytes, type, order, sqlDate, postId);
        return ResponseEntity.status(HttpStatus.CREATED).body("Picture added successfully");
    }

    private Date parseDate(String dateStr) {
        try {
            SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss'Z'");
            java.util.Date utilDate = dateFormat.parse(dateStr);
            // Convert the utilDate to sqlDate
            Date sqlDate = new Date(utilDate.getTime());
            return sqlDate;
        } catch (ParseException e) {
            // Handle parsing exception appropriately
            throw new IllegalArgumentException("Invalid date format");
        }
    }
}
