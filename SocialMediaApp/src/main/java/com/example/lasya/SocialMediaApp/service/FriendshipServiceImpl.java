package com.example.lasya.SocialMediaApp.service;

import com.example.lasya.SocialMediaApp.entity.Friendship;
import com.example.lasya.SocialMediaApp.entity.User;
import com.example.lasya.SocialMediaApp.repository.FriendshipRepository;
import com.example.lasya.SocialMediaApp.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
    public void deleteByFollowerUserIdAndFollowedUserId(int followerUserId, int followedUserId) {
        friendshipRepository.deleteByFollowerUserIdAndFollowedUserId(followerUserId, followedUserId);
    }
}

