package com.example.lasya.SocialMediaApp.controller;

import com.example.lasya.SocialMediaApp.entity.Friendship;
import com.example.lasya.SocialMediaApp.entity.User;
import com.example.lasya.SocialMediaApp.service.FriendshipService;
import com.example.lasya.SocialMediaApp.service.UserService;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class FriendshipController {
    private final FriendshipService friendshipService;
    private final UserService userService;

    @Autowired
    public FriendshipController(FriendshipService friendshipService, UserService userService) {
        super();
        this.friendshipService = friendshipService;
        this.userService = userService;
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
    @GetMapping(value="/api/friendship/{userId}")
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
            @RequestParam int followerUserId,
            @RequestParam int followedUserId) {
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
    @DeleteMapping("/api/v1/friendship/{followerUserId}/{followedUserId}")
    public ResponseEntity<String> deleteFriendship(
            @PathVariable int followerUserId,
            @PathVariable int followedUserId) {
        friendshipService.deleteByFollowerUserIdAndFollowedUserId(followerUserId, followedUserId);
        return ResponseEntity.ok("Friendship deleted successfully");
    }

}

