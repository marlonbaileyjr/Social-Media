package com.example.lasya.social_media_application.repository;

import com.example.lasya.social_media_application.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

    // Signup User
    User save(User user);

    // Sign In User
    Optional<User> findByUserNameAndPassword(String userName, String password);

    // Update Password by Email
    @Modifying
    @Query("UPDATE User u SET u.password = :newPassword WHERE u.email = :email")
    int updatePasswordByEmail(@Param("newPassword") String newPassword, @Param("email") String email);

    // Update Username and Bio by User ID
    @Modifying
    @Query("UPDATE User u SET u.userName = :userName, u.bio = :bio WHERE u.userId = :userId")
    int updateUsernameAndBio(@Param("userName") String userName, @Param("bio") String bio, @Param("userId") Integer userId);

    // Update Profile Picture by User ID
    @Modifying
    @Query("UPDATE User u SET u.profilePicture = :profilePicture WHERE u.userId = :userId")
    int updateProfilePicture(@Param("profilePicture") byte[] profilePicture, @Param("userId") Integer userId);

    // Update First Name and Last Name by User ID
    @Modifying
    @Query("UPDATE User u SET u.firstName = :firstName, u.lastName = :lastName WHERE u.userId = :userId")
    int updateFirstNameAndLastName(@Param("firstName") String firstName, @Param("lastName") String lastName, @Param("userId") Integer userId);

    // Update Bio by User ID
    @Modifying
    @Query("UPDATE User u SET u.bio = :bio WHERE u.userId = :userId")
    int updateBio(@Param("bio") String bio, @Param("userId") Integer userId);

    List<User> findByFirstNameContainingIgnoreCaseOrLastNameContainingIgnoreCaseOrUserNameContainingIgnoreCaseOrEmailContainingIgnoreCase(
            String firstName, String lastName, String userName, String email
    );

    @Query("SELECT u FROM User u WHERE u.userId = :userId")
    Optional<User> findById(@Param("userId") Integer userId);

    @Query("SELECT u FROM User u WHERE u.userName = :userName")
    List<User> findByUserName(String userName);

    User findByEmail(String email);
}