import React, { createContext } from 'react';
import { useQueries, useMutation, useQueryClient } from 'react-query';
import { getLikes, addLike, deleteLike } from '../functions/likeFunctions';
import { usePosts } from '../hooks/postHooks';

export const LikeContext = createContext();

export function LikeProvider({ children }) {
    const { posts, isPostsLoading } = usePosts();
    const queryClient = useQueryClient();

    // Fetch likes for all posts in parallel
    const likesResults = useQueries(
        posts?.map(post => ({
            queryKey: ['likes', post.postId],
            queryFn: () => getLikes(post.postId),
            staleTime: Infinity,
            enabled: !isPostsLoading,
        })) || []
    );

    // Create a map with postId as the key and the count of likes as the value
    const likesCount = likesResults.reduce((acc, result, index) => {
        if (posts && result.data) {
            acc[posts[index].postId] = result.data.length;
        }
        return acc;
    }, {});

    // Add like mutation with callbacks
    const addLikeMutation = useMutation(
        ({ userId, postId }) => addLike(userId, postId),
        {
            onSuccess: () => {
                queryClient.invalidateQueries('likes');
            },
            onError: (error) => {
                console.error('Error adding like:', error);
            },
            onSettled: () => {
                queryClient.invalidateQueries('likes');
            },
        }
    );

    // Delete like mutation with callbacks
    const deleteLikeMutation = useMutation(
        ({likeId})=>deleteLike(likeId), 
        {
        onSuccess: () => {
            queryClient.invalidateQueries('likes');
        },
        onError: (error) => {
            console.error('Error deleting like:', error);
        },
        onSettled: () => {
            queryClient.invalidateQueries('likes');
        },
    });

    // The value provided to the context consumers
    const value = {
        likes: likesCount,
        isLoading: likesResults.some(query => query.isLoading),
        errors: likesResults.map(query => query.error).filter(Boolean),
        addLike: addLikeMutation.mutate,
        deleteLike: deleteLikeMutation.mutate,
    };

    return (
        <LikeContext.Provider value={value}>
            {children}
        </LikeContext.Provider>
    );
}
