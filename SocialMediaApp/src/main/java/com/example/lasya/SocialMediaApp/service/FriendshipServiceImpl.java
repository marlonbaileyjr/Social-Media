package com.example.lasya.SocialMediaApp.service;

import com.example.lasya.SocialMediaApp.entity.Friendship;
import com.example.lasya.SocialMediaApp.entity.User;
import com.example.lasya.SocialMediaApp.repository.FriendshipRepository;
import com.example.lasya.SocialMediaApp.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Date;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class FriendshipServiceImpl implements FriendshipService{
    private static final Logger logger = LoggerFactory.getLogger(FriendshipServiceImpl.class);
    private final FriendshipRepository friendshipRepository;
    private final UserRepository userRepository;

    @Autowired
    public FriendshipServiceImpl(FriendshipRepository friendshipRepository, UserRepository userRepository) {
        super();
        this.friendshipRepository = friendshipRepository;
        this.userRepository = userRepository;
    }

    @Override
    @Transactional
    public Friendship addFriendship(User follower, User followed, LocalDateTime uploadTime) {
        logger.info("Inside addFriendship service impl");

        // Check if the friendship already exists
        List<Friendship> existingFriendships = friendshipRepository.findByFollowerAndFollowed(follower, followed);
        if (!existingFriendships.isEmpty()) {
            // Friendship already exists, return the first one
            Friendship existingFriendship = existingFriendships.get(0);
            logger.info("Friendship already exists");
            return existingFriendship;
        }
        // Convert LocalDateTime to Date
        Date sqlUploadTime = Date.valueOf(uploadTime.toLocalDate());
        friendshipRepository.addFriendship(follower.getUserId(), followed.getUserId(), sqlUploadTime);
        Friendship friendship = new Friendship();
        friendship.setFollower(follower);
        friendship.setFollowed(followed);
        friendship.setUploadTime(uploadTime);
        logger.info("Friendship created: " + friendship);
        return friendship;
    }


    @Override
    public List<Friendship> findByFollowedUserId(int userId) {
        return friendshipRepository.findByFollowedUserId(userId);
    }

    @Override
    public List<Friendship> findByFollowerUserId(int userId) {
        return friendshipRepository.findByFollowerUserId(userId);
    }

    @Override
    public boolean existsByFollowerAndFollowed(User follower, User followed) {
        return friendshipRepository.existsByFollowerAndFollowed(follower, followed);
    }

    @Override
    @Transactional
    public void deleteByFollowerUserIdAndFollowedUserId(int followerUserId, int followedUserId) {
        logger.info("inside deleteByFollowerUserIdAndFollowedUserId method");
        friendshipRepository.deleteByFollowerUserIdAndFollowedUserId(followerUserId, followedUserId);
    }
}

