package com.example.lasya.social_media_application.service;

import com.example.lasya.social_media_application.bean.UserBean;
import com.example.lasya.social_media_application.entity.User;
import com.example.lasya.social_media_application.exception.UserNotFoundException;
import com.example.lasya.social_media_application.repository.UserRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService{
    private static final Logger logger = LoggerFactory.getLogger(UserServiceImpl.class);
    private final UserRepository userRepository;

    @PersistenceContext
    private EntityManager entityManager;

    @Autowired
    public UserServiceImpl(UserRepository userRepository) {
        super();
        this.userRepository = userRepository;
    }

    @Override
    public UserBean createUser(UserBean userBean) {
        entityManager.getEntityManagerFactory().getCache().evictAll();
        User user = new User();
        user.setUserId(userBean.getUserId());
        return getUserBean(userBean, user);
    }

    @Override
    @Transactional
    public UserBean updateUser(UserBean userBean, int userId) {
        User user = null;
        Optional<User> optionalUser = userRepository.findById(userId);
        logger.debug("optionalUser:{} ", optionalUser);
        if (optionalUser.isEmpty()) {
            throw new UserNotFoundException("Customer does not exist " + userId);
        }
        user = optionalUser.get();
        return getUserBean(userBean, user);
    }

    private UserBean getUserBean(UserBean userBean, User user) {
        user.setFirstName(userBean.getFirstName());
        user.setLastName(userBean.getLastName());
        user.setUserName(userBean.getUserName());
        user.setEmail(userBean.getEmail());
        user.setPassword(userBean.getPassword());
        user.setBio(userBean.getBio());
        user.setProfilePicture(userBean.getProfilePicture());
        user.setDateOfBirth(userBean.getDateOfBirth());
        user.setDateJoined(userBean.getDateJoined());
        user.setLastLogin(userBean.getLastLogin());
        user = userRepository.save(user);
        return getBeanFromEntity(user);
    }

    @Override
    public List<UserBean> getAllUsers() {
        List<User> users = userRepository.findAll();
        List<UserBean> userBeans;
        userBeans = users.stream().map(this::getBeanFromEntity).collect(Collectors.toList());
        return userBeans;
    }

    @Override
    public UserBean getUserById(int id) {
        User user;
        Optional<User> userById = userRepository.findById(id);
        if (userById.isEmpty()) {
            throw new UserNotFoundException("User does not exist: " + id);
        }
        user = userById.get();
        return getBeanFromEntity(user);
    }

    @Override
    public boolean deleteUserById(int id) {
        Optional<User> optionalUser = userRepository.findById(id);
        logger.debug("optionalUser:{} ", optionalUser);
        if (optionalUser.isEmpty()) {
            throw new UserNotFoundException("User does not exist: " + id);
        }
        userRepository.deleteById(id);
        return true;
    }

    @Override
    public List<UserBean> searchUsers(String searchText) {
        String searchTextLowerCase = searchText.toLowerCase();
        List<User> users = userRepository.findByFirstNameContainingIgnoreCaseOrLastNameContainingIgnoreCaseOrUserNameContainingIgnoreCaseOrEmailContainingIgnoreCase(
                searchTextLowerCase, searchTextLowerCase, searchTextLowerCase, searchTextLowerCase
        );
        List<UserBean> userBeans = users.stream()
                .map(this::getBeanFromEntity)
                .collect(Collectors.toList());
        return userBeans;
    }

    @Override
    public UserBean signUpUser(UserBean userBean) {
        User user = getEntityFromBean(userBean);
        User savedUser = userRepository.save(user);
        return getBeanFromEntity(savedUser);
    }

    @Override
    public String signInUser(String userName, String password) {
        List<User> users = userRepository.findByUserName(userName);

        if (!users.isEmpty()) {
            User user = users.get(0);
            String dbPassword = user.getPassword();

            logger.info("Database Password: " + dbPassword);

            if (password.equals(user.getPassword())) {
                // Authentication successful, return the user's ID as a String
                return String.valueOf(user.getUserId());
            }
        }

        // Authentication failed, return an error message as a String
        return "Authentication failed. Incorrect password";
    }

    @Override
    public UserBean updatePasswordByEmail(String email, String newPassword) {
        User user = userRepository.findByEmail(email);
        if (user != null) {
            user.setPassword(newPassword); // Set the new password directly
            User updatedUser = userRepository.save(user);
            return getBeanFromEntity(updatedUser);
        } else {
            throw new UserNotFoundException("User does not exist: " + email);
        }
    }

    @Override
    public UserBean updateUsernameAndBio(int userId, String newUserName, String newBio) {
        Optional<User> optionalUser = userRepository.findById(userId);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            user.setUserName(newUserName);
            user.setBio(newBio);
            User updatedUser = userRepository.save(user);
            return getBeanFromEntity(updatedUser);
        }else {
            throw new UserNotFoundException("User not found with id: " + userId);
        }
    }

    @Override
    public UserBean updateProfilePicture(int userId, byte[] newProfilePicture) {
        Optional<User> optionalUser = userRepository.findById(userId);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            user.setProfilePicture(newProfilePicture);
            User updatedUser = userRepository.save(user);
            return getBeanFromEntity(updatedUser);
        } else {
            throw new UserNotFoundException("User not found with id: " + userId);
        }
    }

    @Override
    public UserBean updateFirstNameAndLastName(int userId, String newFirstName, String newLastName) {
        Optional<User> optionalUser = userRepository.findById(userId);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            user.setFirstName(newFirstName);
            user.setLastName(newLastName);
            User updatedUser = userRepository.save(user);
            return getBeanFromEntity(updatedUser);
        }else {
            throw new UserNotFoundException("User not found with id: " + userId);
        }
    }

    @Override
    public UserBean updateBio(int userId, String newBio) {
        Optional<User> optionalUser = userRepository.findById(userId);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            user.setBio(newBio);
            User updatedUser = userRepository.save(user);
            return getBeanFromEntity(updatedUser);
        } else {
            throw new UserNotFoundException("User not found with id: " + userId);
        }
    }

    @Override
    public Optional<User> findById(int userId) {
        return userRepository.findById(userId);
    }

    @Override
    public List<UserBean> getUsersWithPagination(int offset, int pageSize) {
        Page<User> users = userRepository.findAll(PageRequest.of(offset, pageSize));
        List<UserBean> userBeans = new ArrayList<>();
        userBeans = users.stream().map(this::getBeanFromEntity).collect(Collectors.toList());
        return userBeans;
    }

    public UserBean getBeanFromEntity(User user) {
        UserBean userBean = new UserBean();
        userBean.setUserId(user.getUserId());
        userBean.setFirstName(user.getFirstName());
        userBean.setLastName(user.getLastName());
        userBean.setUserName(user.getUserName());
        userBean.setEmail(user.getEmail());
        userBean.setPassword(user.getPassword());
        userBean.setBio(user.getBio());
        userBean.setDateOfBirth(user.getDateOfBirth());
        user.setDateJoined(user.getDateJoined());
        user.setLastLogin(user.getLastLogin());
        user.setProfilePicture(user.getProfilePicture());
        return userBean;
    }

    public User getEntityFromBean(UserBean userBean) {
        User user = new User();
        user.setUserId(userBean.getUserId());
        user.setFirstName(userBean.getFirstName());
        user.setLastName(userBean.getLastName());
        user.setUserName(userBean.getUserName());
        user.setEmail(userBean.getEmail());
        user.setPassword(userBean.getPassword());
        user.setBio(userBean.getBio());
        user.setDateOfBirth(userBean.getDateOfBirth());
        user.setDateJoined(userBean.getDateJoined());
        user.setLastLogin(userBean.getLastLogin());
        user.setProfilePicture(userBean.getProfilePicture());
        return user;
    }

}
