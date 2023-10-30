package com.example.lasya.SocialMediaApp.controller;

import com.example.lasya.SocialMediaApp.bean.UserBean;
import com.example.lasya.SocialMediaApp.entity.User;
import com.example.lasya.SocialMediaApp.exception.UserNotFoundException;
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

import java.sql.Date;
import java.time.LocalDate;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;

@CrossOrigin
@RestController
public class UserController {

    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        super();
        this.userService = userService;
    }
    @ApiOperation(value = "This API is used to create a new customer")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Success"),
            @ApiResponse(code = 201, message = "Created"), @ApiResponse(code = 400, message = "Bad Request"),
            @ApiResponse(code = 401, message = "Unauthorized"), @ApiResponse(code = 404, message = "Not Found"),
            @ApiResponse(code = 407, message = "Proxy Authentication Required"),
            @ApiResponse(code = 500, message = "Internal Server Error"),
            @ApiResponse(code = 502, message = "Bad Gateway")
    })
    @PostMapping(value = "/api/v1/users/signup")
    public UserBean signUpUser(@RequestBody UserBean userBean){
        return userService.signUpUser(userBean);
    }

    @ApiOperation(value = "This API is used to retrieve all users")
    @GetMapping(value = "/api/v1/users")
    public ResponseEntity<List<UserBean>> getUsers() {
        return new ResponseEntity<List<UserBean>>(userService.getAllUsers(), HttpStatus.OK);
    }

    @ApiOperation(value = "This API is used to retrieve a user by specifying an id")
    @GetMapping(value = "/api/v1/users/{userId}")
    public ResponseEntity<?> getUserById(@PathVariable int userId) {
        try {
            UserBean user = userService.getUserById(userId);
            logger.info("user: " + user);
            return ResponseEntity.ok(user);
        } catch (UserNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("User not found for userId: " + userId);
        }
    }

    @ApiOperation(value = "This API is used to delete a user by specifying an id")
    @DeleteMapping(value = "/api/v1/users/delete/{userId}")
    public ResponseEntity<String> deleteUserById(@PathVariable int userId) {
        if ((userService.findById(userId)) == null) {
            if (userService.deleteUserById(userId)) {
                return ResponseEntity.ok("User deleted successfully");
            } else {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred while deleting the user.");
            }
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User with ID " + userId + " not found in the database.");
        }
    }

    @ApiOperation(value = "This API is used to search a user by firstName, lastName, userName or email attributes")
    @GetMapping(value = "/api/v1/users/searchUser/{searchText}")
    public List<UserBean> searchUsers(@PathVariable String searchText){
        logger.info("Received searchText: {}", searchText);
        List<UserBean> result = userService.searchUsers(searchText);
        logger.info("Search result size: {}", result.size());
        return result;
    }

    @ApiOperation(value = "This API is used to sign in a user")
    @PostMapping(value = "/api/v1/users/signin")
    public ResponseEntity<String> signInUser(@RequestBody Map<String, String> credentials){
        String username = credentials.get("userName");
        String password = credentials.get("password");
        String authenticationResult = userService.signInUser(username, password);

        if (authenticationResult != null && authenticationResult.matches("\\d+")) {
            // Authentication was successful
            return ResponseEntity.ok(authenticationResult);
        } else {
            // Authentication failed, return an error message
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(authenticationResult);
        }
    }

    @ApiOperation(value = "This API is used to update password field by providing the user email field")
    @PutMapping (value = "/api/v1/users/updatePassword")
    public UserBean updatePasswordByEmail(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String newPassword = request.get("newPassword");
        return userService.updatePasswordByEmail(email, newPassword);
    }
    @ApiOperation(value = "This API is used to update username and bio fields by providing the user id field")
    @PutMapping(value = "/api/v1/users/updateUsernameAndBio")
    public UserBean updateUsernameAndBio(@RequestBody Map<String, Object> request) {
        int userId = (int) request.get("userId");
        String newUsername = (String) request.get("newUsername");
        String newBio = (String) request.get("newBio");
        return userService.updateUsernameAndBio(userId, newUsername, newBio);
    }

    @ApiOperation(value = "This API is used to update profile picture field by providing the user id field")
    @PutMapping(value = "/api/v1/users/updateProfilePicture")
    public UserBean updateProfilePicture(@PathVariable int userId, @PathVariable byte[] newProfilePicture){
        return userService.updateProfilePicture(userId, newProfilePicture);
    }

    @ApiOperation(value = "This API is used to update firstName and lastname fields by providing the user id field")
    @PutMapping(value = "/api/v1/users/updateFirstNameAndLastName")
    public UserBean updateFirstNameAndLastName(@RequestBody Map<String, Object> params) {
        int userId = (int) params.get("userId");
        String newFirstName = (String) params.get("newFirstName");
        String newLastName = (String) params.get("newLastName");
        return userService.updateFirstNameAndLastName(userId, newFirstName, newLastName);
    }

    @ApiOperation(value = "This API is used to update bio field by providing the user id field")
    @PutMapping(value = "/api/v1/users/updateBio")
    public UserBean updateBio(@RequestBody Map<String, Object> request) {
        // Directly cast 'userId' to int
        int userId = (int) request.get("userId");
        String newBio = (String) request.get("newBio");
        return userService.updateBio(userId, newBio);
    }

    @ApiOperation(value = "This API is used to retrieve all users using pagination")
    @GetMapping(value = "/api/v1/users/pagination/")
    public ResponseEntity<List<UserBean>> getUsersWithPagination(
            @RequestParam(name = "page", defaultValue = "0", required = false) int page,
            @RequestParam(name = "size", defaultValue = "5", required = false) int pageSize) {
        return new ResponseEntity<List<UserBean>>(userService.getUsersWithPagination(page, pageSize),
                HttpStatus.OK);
    }

}
