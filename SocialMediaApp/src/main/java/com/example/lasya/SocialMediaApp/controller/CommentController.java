package com.example.lasya.SocialMediaApp.controller;

import com.example.lasya.SocialMediaApp.bean.PostBean;
import com.example.lasya.SocialMediaApp.entity.Comment;
import com.example.lasya.SocialMediaApp.service.CommentService;
import com.example.lasya.SocialMediaApp.service.PostService;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;

@RestController
public class CommentController {
    private final CommentService commentService;

    private final PostService postService;

    private static final Logger logger = LoggerFactory.getLogger(CommentController.class);

    @Autowired
    public CommentController(CommentService commentService, PostService postService) {
        super();
        this.commentService = commentService;
        this.postService = postService;
    }

    @ApiOperation(value = "This API is used to get a comment based on a given postId")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Success"),
            @ApiResponse(code = 201, message = "Created"), @ApiResponse(code = 400, message = "Bad Request"),
            @ApiResponse(code = 401, message = "Unauthorized"), @ApiResponse(code = 404, message = "Not Found"),
            @ApiResponse(code = 407, message = "Proxy Authentication Required"),
            @ApiResponse(code = 500, message = "Internal Server Error"),
            @ApiResponse(code = 502, message = "Bad Gateway")
    })
    @GetMapping("/api/v1/comment/post/{postId}")
    public ResponseEntity<List<Comment>> getCommentsByPostId(@PathVariable int postId) {
        List<Comment> comments = commentService.findByPostPostId(postId);
        return ResponseEntity.ok(comments);
    }

    @ApiOperation(value = "This API is used to delete a comment based on a given commentId")
    @DeleteMapping("/api/v1/comment/{commentId}")
    public ResponseEntity<String> deleteCommentById(@PathVariable int commentId) {
        commentService.deleteByCommentId(commentId);
        return ResponseEntity.ok("Comment deleted successfully");
    }

    @ApiOperation(value = "This API is used to edit a comment based on a given commentId")
    @PutMapping("/api/v1/comment/{commentId}")
    public ResponseEntity<String> editComment(
            @PathVariable int commentId,
            @RequestBody Map<String, String> request) {
        String newText = request.get("newText");
        commentService.editComment(commentId, newText);
        return ResponseEntity.ok("Comment edited successfully");
    }

    @ApiOperation(value = "This API is used to create a new comment based on a given postId")
    @PostMapping("/api/v1/comment/add/{postId}")
    public ResponseEntity<String> addCommentToPost(
            @PathVariable int postId,
            @RequestBody Map<String, String> request) {
        String text = request.get("text");
        int userId = Integer.parseInt(request.get("userId"));
        String parentCommentIdStr = request.get("parentCommentId");
        Integer parentCommentId = null;
        if (parentCommentIdStr != null) {
            parentCommentId = Integer.parseInt(parentCommentIdStr);
        }
        String uploadTimeString = request.get("uploadTime");
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        LocalDateTime uploadTime = LocalDateTime.parse(uploadTimeString, formatter);

        // Check if the postId corresponds to an existing post in the database
        PostBean checkIfIdExists = postService.getPostById(postId);
        logger.info(String.valueOf(checkIfIdExists));
        if (postService.getPostById(postId) == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Post not found for postId: " + postId);
        }
        commentService.addCommentToPost(postId, userId, text, parentCommentId, uploadTime);
        return ResponseEntity.ok("Comment added successfully");
    }

}

