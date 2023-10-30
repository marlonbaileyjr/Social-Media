package com.example.lasya.SocialMediaApp.service;

import com.example.lasya.SocialMediaApp.bean.UserBean;
import com.example.lasya.SocialMediaApp.entity.User;

import java.util.List;
import java.util.Optional;

public interface UserService {

    public UserBean createUser(UserBean userBean);

    public UserBean updateUser(UserBean userBean, int userId);

    List<UserBean> getAllUsers();

    public UserBean getUserById(int userId);

    public boolean deleteUserById(int userId);

    public List<UserBean> searchUsers(String searchText);

    public UserBean signUpUser(UserBean userBean);

    public String signInUser(String userName, String password);

    public UserBean updatePasswordByEmail(String email, String newPassword);

    public UserBean updateUsernameAndBio(int userId, String newUsername, String newBio);

    public UserBean updateProfilePicture(int userId, byte[] newProfilePicture);

    public UserBean updateFirstNameAndLastName(int userId, String newFirstName, String newLastName);

    public UserBean updateBio(int userId, String newBio);

    UserBean getBeanFromEntity(User user);

    User getEntityFromBean(UserBean userBean);

    Optional<User> findById(int userId);

    public List<UserBean> getUsersWithPagination(int page, int pageSize);

}


