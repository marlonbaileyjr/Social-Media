package com.example.lasya.SocialMediaApp.controller;

import com.example.lasya.SocialMediaApp.exception.PostNotFoundException;
import com.example.lasya.SocialMediaApp.repository.PostRepository;
import com.example.lasya.SocialMediaApp.service.LikeService;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;

@RestController
public class LikeController {
    private final LikeService likeService;

    private final PostRepository postRepository;

    Logger logger = LoggerFactory.getLogger(LikeController.class);

    @Autowired
    public LikeController(LikeService likeService, PostRepository postRepository) {
        super();
        this.likeService = likeService;
        this.postRepository = postRepository;
    }

    @ApiOperation(value = "This API is used to get likes by post id field")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Success"),
            @ApiResponse(code = 201, message = "Created"), @ApiResponse(code = 400, message = "Bad Request"),
            @ApiResponse(code = 401, message = "Unauthorized"), @ApiResponse(code = 404, message = "Not Found"),
            @ApiResponse(code = 407, message = "Proxy Authentication Required"),
            @ApiResponse(code = 500, message = "Internal Server Error"),
            @ApiResponse(code = 502, message = "Bad Gateway")
    })
    @ExceptionHandler(PostNotFoundException.class)
    @GetMapping(value = "/api/v1/likes/{postId}")
    public List<Map<String, Object>> getLikesByPostId(@PathVariable int postId) {
        if(!postRepository.existsById(postId)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Post not found: " + postId);
        }
        List<Map<String, Object>> likeData = likeService.findByPost_PostId(postId);
        if(!(likeData).isEmpty()){
            return likeData;
        }else{
            throw new PostNotFoundException("Post not found with postId: " + postId);
        }
    }

    @ApiOperation(value = "This API is used to add a like to a post based on postId")
    @PostMapping(value = "/api/v1/likes")
    public ResponseEntity<String> addLikeToPost(@RequestBody Map<String, Object> likeData) {
        int postId = (int) likeData.get("postId");
        int userId = (int) likeData.get("userId");
        String uploadTimeStr = (String) likeData.get("uploadTime");
        // Parse the uploadTime string to a Timestamp
        Timestamp uploadTime = Timestamp.valueOf(LocalDateTime.parse(uploadTimeStr, DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss'Z'")));
        likeService.addLikeToPost(userId, postId, uploadTime);
        return ResponseEntity.ok("Like added successfully.");
    }

    @ApiOperation(value = "This API is used to delete a like by providing likeId")
    @DeleteMapping(value = "/api/v1/likes/{likeId}")
    public ResponseEntity<String> deleteLikeById(@PathVariable int likeId) {
        return likeService.deleteLikeById(likeId);
    }
}

