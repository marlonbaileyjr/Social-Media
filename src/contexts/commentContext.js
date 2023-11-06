import React, { createContext } from 'react';
import { useQueries, useMutation, useQueryClient } from 'react-query';
import { getComments, addComment, deleteComment, editComment } from '../functions/commentFunction';
import { usePosts } from '../hooks/postHooks';

export const CommentContext = createContext();

export function CommentProvider({ children }) {
    const { posts, isPostsLoading } = usePosts();
    const queryClient = useQueryClient();

    // Fetch comments for all posts
    const commentQueries = useQueries(
        posts?.map(post => ({
            queryKey: ['comments', post.postId],
            queryFn: () => getComments(post.postId),
            enabled: !isPostsLoading,
        })) || []
    );    
    
    // Combine comments from queries into a map
    const comments = commentQueries.reduce((acc, commentQuery, index) => {
        if (commentQuery.data && posts) {
            acc[posts[index].postId] = commentQuery.data;
        }
        return acc;
    }, {});

    // Add comment mutation with callbacks
    const addCommentMutation = useMutation(
        ({ postId, userId, text, parentCommentId }) => addComment(postId, userId, text, parentCommentId),
        {
          onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries('comments');
          },
          onError: (error, variables, context) => {
            // Handle error
            console.error('Error adding comment:', error);
          },
        }
      );

    // Delete comment mutation with callbacks
    const deleteCommentMutation = useMutation(
        ({commentId})=>deleteComment(commentId), 
        {
        onSuccess: () => {
            queryClient.invalidateQueries('comments');
        },
        onError: (error) => {
            console.error('Error deleting comment:', error);
        },
    });

    // Edit comment mutation with callbacks
    const editCommentMutation = useMutation(
        ({commentId,newText })=>editComment(commentId,newText), 
        {
        onSuccess: () => {
            queryClient.invalidateQueries('comments');
        },
        onError: (error) => {
            console.error('Error editing comment:', error);
        },
    });



    // Context value
    const value = {
        comments,
        isCommentsLoading: commentQueries.some(query => query.isLoading),
        commentsError: commentQueries.map(query => query.error).filter(Boolean),
        addComment: addCommentMutation.mutate,
        deleteComment: deleteCommentMutation.mutate,
        editComment: editCommentMutation.mutate,
    };

    return (
        <CommentContext.Provider value={value}>
            {children}
        </CommentContext.Provider>
    );
}
