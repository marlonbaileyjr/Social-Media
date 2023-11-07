import React, { createContext } from 'react';
import { useQueries, useMutation, useQueryClient } from 'react-query';
import { getFollowers, getFollowed, addFriendship, deleteFriendship, checkFriendship } from '../functions/friendshipFunctions';
import { Users } from '../hooks/userHooks';

export const FriendContext = createContext();

export function FriendProvider({ children, paramUserId }){
    const { loggedin} = Users()
    const queryClient = useQueryClient();

    // Use `useQueries` to fetch all followers and following for paramUserId
    const results = useQueries([
        {
            queryKey: ['followers', paramUserId],
            queryFn: () => getFollowers(paramUserId),
            staleTime: Infinity, 
            enabled: loggedin && !(paramUserId == null)
        },
        {
            queryKey: ['followed', paramUserId],
            queryFn: () => getFollowed(paramUserId),
            enabled: loggedin && !(paramUserId == null)
        }
    ]);
    

    // Destructure the results
    const [followersResult, followedResult] = results;

    // Map the followersResult data to an array of followers
    const followersArray = followersResult.data
        ? followersResult.data.map(follower => follower.followerId) 
        : [];

    const followedArray = followedResult.data
        ? followedResult.data.map(followed => followed.followedId)
        : [];

    //MUTATIONS

    const addFriendshipMutation = useMutation(
       ({followerId,followedId})=> addFriendship(followerId,followedId), 
        {
        onSuccess: () => {
            queryClient.invalidateQueries(['followers', paramUserId]);
            queryClient.invalidateQueries(['followed', paramUserId]);
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
            queryClient.invalidateQueries(['followers', paramUserId]);
            queryClient.invalidateQueries(['followed', paramUserId]);
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

    console.log('checkfren', checkFriendshipMutation)

    // Construct the value to be provided to the context consumers
    const value = {
        followers: followersArray,
        following: followedArray,
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
