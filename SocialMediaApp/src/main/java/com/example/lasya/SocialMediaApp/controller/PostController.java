package com.example.lasya.SocialMediaApp.controller;

import com.example.lasya.SocialMediaApp.bean.PostBean;
import com.example.lasya.SocialMediaApp.bean.UserBean;
import com.example.lasya.SocialMediaApp.entity.Post;
import com.example.lasya.SocialMediaApp.service.PostService;
import com.example.lasya.SocialMediaApp.service.UserService;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.Date;
import java.util.List;

@RestController
public class PostController {

    private final PostService postService;
    private final UserService userService;

    @Autowired
    public PostController(PostService postService, UserService userService ) {
        super();
        this.postService = postService;
        this.userService = userService;
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
    public ResponseEntity<Void> addPost(@RequestParam String caption,
                                        @RequestParam Date uploadTime,
                                        @RequestParam int userId) {
        java.sql.Date sqlUploadTime = convertToSqlDate(uploadTime);
        UserBean user = userService.getUserById(userId);
        postService.addPost(caption, sqlUploadTime, user);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    private java.sql.Date convertToSqlDate(Date date) {
        // Implementation to convert java.util.Date to java.sql.Date
        return new java.sql.Date(date.getTime());
    }

    @ApiOperation(value = "This API is used to update a post by providing a postId")
    @PutMapping(value = "/api/v1/posts/{postId}")
    public ResponseEntity<PostBean> updatePost(@RequestBody PostBean postBean, @PathVariable int postId){
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
    @GetMapping(value = "/api/v1/posts/{postId}")
    public PostBean getPostById(@PathVariable int postId){
        return postService.getPostById(postId);
    }

    @ApiOperation(value = "This API is used to delete a post based on the postId")
    @DeleteMapping(value = "/api/v1/posts/{postId}")
    public boolean deletePostById(@PathVariable int postId){
        return postService.deletePostById(postId);
    }

    @ApiOperation(value = "This API is used to get posts based on userId")
    @GetMapping(value = "/api/v1/posts/{userId}")
    public List<Post> getPostsFromFriends(@PathVariable int userId){
        return postService.getPostsFromFriends(userId);
    }

    @ApiOperation(value = "This API is used to get media based on postId")
    @GetMapping(value = "/api/v1/posts/media/{postId}")
    public List<byte[]> getMediaFromPost(@PathVariable int postId){
        return postService.getMediaFromPost(postId);
    }

    @ApiOperation(value = "This API is used to add picture")
    @PostMapping(value = "/api/v1/posts/pictures")
    public ResponseEntity<Void> addPicture(@RequestParam("media") byte[] media,
                                           @RequestParam("type") String type,
                                           @RequestParam("order") int order,
                                           @RequestParam("uploadTime") @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss") Date uploadTime,
                                           @RequestBody Post post){
        postService.addPicture(media, type, order, uploadTime, post);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }
}
