package com.example.lasya.SocialMediaApp.controller;

import com.example.lasya.SocialMediaApp.entity.Like;
import com.example.lasya.SocialMediaApp.service.LikeService;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class LikeController {
    private final LikeService likeService;

    @Autowired
    public LikeController(LikeService likeService) {
        super();
        this.likeService = likeService;
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
    @GetMapping(value = "/api/v1/likes/{postId}")
    public ResponseEntity<List<Like>> getLikesByPostId(@PathVariable int postId) {
        return new ResponseEntity<List<Like>>(likeService.findByPost_PostId(postId), HttpStatus.OK);
    }

    @ApiOperation(value = "This API is used to add a like to a post based on postId")
    @PostMapping(value = "/api/v1/likes")
    public ResponseEntity<String> addLikeToPost(@PathVariable int postId) {
        return likeService.addLikeToPost(postId);
    }

    @ApiOperation(value = "This API is used to delete a like by providing likeId")
    @DeleteMapping(value = "/api/v1/likes/{likeId}")
    public ResponseEntity<String> deleteLikeById(@PathVariable int likeId) {
        return likeService.deleteLikeById(likeId);
    }
}

