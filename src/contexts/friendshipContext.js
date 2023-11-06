import React, { createContext } from 'react';
import { useQueries, useMutation, useQueryClient } from 'react-query';
import { getFollowers, getFollowed, addFriendship, deleteFriendship, checkFriendship } from '../functions/friendshipFunctions';
import { Users } from '../hooks/userHooks';

export const FriendContext = createContext();

export function FriendProvider({ children }) {
    const { userID } = Users();
    const queryClient = useQueryClient();

    // Use `useQueries` to fetch all followers and following for userID
    const results = useQueries([
        {
            queryKey: ['followers', userID],
            queryFn: () => getFollowers(userID),
            staleTime: Infinity, 
            enabled: !!userID, 
        },
        {
            queryKey: ['followed', userID],
            queryFn: () => getFollowed(userID),
            staleTime: Infinity, 
            enabled: !!userID, 
        }
    ]);
    

    // Destructure the results
    const [followersResult, followedResult] = results;

    // Map the followersResult data to an array of followers
    const followersArray = followersResult.data
        ? followersResult.data.map(follower => follower.followerId) 
        : [];

    const followedArray = followersResult.data
    ? followedResult.data.map(follower => follower.followedId)
    : [];

    //MUTATIONS

    const addFriendshipMutation = useMutation(
       ({followerId,followedId})=> addFriendship(followerId,followedId), 
        {
        onSuccess: () => {
            queryClient.invalidateQueries(['followers', userID]);
            queryClient.invalidateQueries(['followed', userID]);
        },
        onError: (error) => {
            // Handle add friendship error
            console.error('Error adding friendship:', error);
        },
    });

    const deleteFriendshipMutation = useMutation(
        ({followerId,followedId}) => deleteFriendship(followerId,followedId), 
        {
        onSuccess: () => {
            queryClient.invalidateQueries(['followers', userID]);
            queryClient.invalidateQueries(['followed', userID]);
        },
        onError: (error) => {
            // Handle delete friendship error
            console.error('Error deleting friendship:', error);
        },
    });

    const checkFriendshipMutation = useMutation(
        ({followerId,followedId}) => checkFriendship(followerId,followedId), 
        {
        onError: (error) => {
            // Handle check friendship error
            console.error('Error checking friendship:', error);
        },
    });


    // Construct the value to be provided to the context consumers
    const value = {
        followers: followersArray,
        following: followedArray || [],
        isFriendsLoading: followersResult.isLoading || followedResult.isLoading,
        friendsError: (followersResult.error || followedResult.error) ? [followersResult.error, followedResult.error] : null,
        addFriendship: addFriendshipMutation.mutate,
        deleteFriendship: deleteFriendshipMutation.mutate,
        checkFriendship: checkFriendshipMutation.mutate,
    };

    return (
        <FriendContext.Provider value={value}>
            {children}
        </FriendContext.Provider>
    );
}
