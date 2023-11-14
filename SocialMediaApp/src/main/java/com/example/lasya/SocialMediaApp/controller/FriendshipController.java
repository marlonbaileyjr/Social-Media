package com.example.lasya.SocialMediaApp.controller;

import com.example.lasya.SocialMediaApp.bean.UserBean;
import com.example.lasya.SocialMediaApp.entity.Friendship;
import com.example.lasya.SocialMediaApp.entity.User;
import com.example.lasya.SocialMediaApp.repository.UserRepository;
import com.example.lasya.SocialMediaApp.service.FriendshipService;
import com.example.lasya.SocialMediaApp.service.UserService;
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
import java.util.Optional;

@CrossOrigin
@RestController
public class FriendshipController {
    private final FriendshipService friendshipService;
    private final UserService userService;

    private final UserRepository userRepository;

    private static final Logger logger = LoggerFactory.getLogger(FriendshipController.class);

    @Autowired
    public FriendshipController(FriendshipService friendshipService, UserService userService, UserRepository userRepository) {
        super();
        this.friendshipService = friendshipService;
        this.userService = userService;
        this.userRepository = userRepository;
    }

    @ApiOperation(value = "This API is used to get followed users based on given userId")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Success"),
            @ApiResponse(code = 201, message = "Created"), @ApiResponse(code = 400, message = "Bad Request"),
            @ApiResponse(code = 401, message = "Unauthorized"), @ApiResponse(code = 404, message = "Not Found"),
            @ApiResponse(code = 407, message = "Proxy Authentication Required"),
            @ApiResponse(code = 500, message = "Internal Server Error"),
            @ApiResponse(code = 502, message = "Bad Gateway")
    })
    @PostMapping("/api/v1/addFriendship")
    public ResponseEntity<String> addFriendship(@RequestBody Map<String, Object> requestBody) {
        try {
            int followerId = (int) requestBody.get("follower");
            int followedId = (int) requestBody.get("followed");
            logger.info("followerId: " + followerId);
            logger.info("followedId: " + followedId);
            if (!userRepository.existsById(followerId) || !userRepository.existsById(followedId)) {
                return ResponseEntity.badRequest().body("Invalid user IDs.");
            }
            String uploadTimeStr = (String) requestBody.get("uploadTime");
            LocalDateTime uploadTime = LocalDateTime.parse(uploadTimeStr, DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss'Z'"));
            UserBean followerBean = userService.getUserById(followerId);
            UserBean followedBean = userService.getUserById(followedId);
            User follower = userService.getEntityFromBean(followerBean);
            User followed = userService.getEntityFromBean(followedBean);
            logger.info("followerId: {}", followerId);
            logger.info("followedId: {}", followedId);
            logger.info("uploadTime: {}", uploadTime);
            boolean existingFriendship = friendshipService.existsByFollowerAndFollowed(follower, followed);
            if (existingFriendship) {
                logger.info("Friendship already exists");
                return ResponseEntity.badRequest().body("Friendship already exists.");
            } else {
                friendshipService.addFriendship(follower, followed, uploadTime);
                return ResponseEntity.ok("Friendship created successfully");
            }
        } catch (ClassCastException e) {
            return ResponseEntity.badRequest().body("Invalid data types for followerId and followedId.");
        } catch (Exception e) {
            logger.error("Error creating friendship", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred.");
        }
    }

    @GetMapping(value = "/api/friendship/{userId}")
    public ResponseEntity<List<Friendship>> getFollowedUsers(@PathVariable int userId) {
        List<Friendship> followedUsers = friendshipService.findByFollowedUserId(userId);
        return ResponseEntity.ok(followedUsers);
    }

    @ApiOperation(value = "This API is used to get followers based on given userId")
    @GetMapping("api/v1/friendship/followers/{userId}")
    public ResponseEntity<List<Friendship>> getFollowers(@PathVariable int userId) {
        List<Friendship> followers = friendshipService.findByFollowerUserId(userId);
        return ResponseEntity.ok(followers);
    }

    @ApiOperation(value = "This API is used to check the friendship")
    @GetMapping("/api/v1/friendship/exists/{followerUserId}/{followedUserId}")
    public ResponseEntity<String> checkFriendship(
            @PathVariable int followerUserId,
            @PathVariable int followedUserId) {
        // Fetch User instances based on user ids
        Optional<User> optionalFollower = userService.findById(followerUserId);
        Optional<User> optionalFollowed = userService.findById(followedUserId);

        if (optionalFollower.isPresent() && optionalFollowed.isPresent()) {
            User follower = optionalFollower.get();
            User followed = optionalFollowed.get();
            boolean exists = friendshipService.existsByFollowerAndFollowed(follower, followed);
            if (exists) {
                return ResponseEntity.ok("Friendship exists");
            } else {
                return ResponseEntity.ok("Friendship does not exist");
            }
        } else {
            return ResponseEntity.ok("One or both users not found");
        }
    }

    @ApiOperation(value = "This API is used to delete followed users and following users")
    @DeleteMapping("/api/v1/friendship/delete/{followerUserId}/{followedUserId}")
    public ResponseEntity<String> deleteFriendship(
            @PathVariable int followerUserId,
            @PathVariable int followedUserId) {
            logger.info("followerUserId: " + followerUserId);
            logger.info("followedUserId: " + followedUserId);
            // Check if the followerUserId and followedUserId exist in the database
            Optional<User> followerUserOptional = userService.findById(followerUserId);
            Optional<User> followedUserOptional = userService.findById(followedUserId);
            if (!followerUserOptional.isPresent() || !followedUserOptional.isPresent()) {
                // If either user doesn't exist, return an error response
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("One or both of the users do not exist in the database.");
            }
            // Both users exist, proceed with deleting the friendship
            friendshipService.deleteByFollowerUserIdAndFollowedUserId(followerUserId, followedUserId);
            return ResponseEntity.ok("Friendship deleted successfully");
    }

}

