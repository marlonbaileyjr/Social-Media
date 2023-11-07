import { createContext } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { createPost, fetchPosts, deletePost, getPostByPostId, updatePost, uploadPostPicture, getPostMedia, retrieveFriendPosts  } from '../functions/postFunctions';
import { Users } from '../hooks/userHooks';

export const PostContext = createContext();

export function PostProvider({ children }) {
    const { userID, loggedin } = Users();
    const queryClient = useQueryClient();

    // Fetch all posts using React Query, but only if logged in
    const { data: posts, isLoading: isPostsLoading, error: postsError } = useQuery('posts', fetchPosts, {
        staleTime: Infinity,
        enabled: loggedin,
    });

    // Fetch friend posts using React Query, but only if logged in and userID is defined
    const { data: friendPosts, isLoading: isFriendPostsLoading, error: friendPostsError } = useQuery(
        ['friendPosts', userID],
        () => retrieveFriendPosts(userID),
        {
            staleTime: Infinity,
            enabled: loggedin && !!userID && !!posts,
        }
    );
    

    // Filter out the user's own posts from the fetched posts
    const userPosts = posts?.filter((post) => post.userId === userID) || [];

        //fetch postbyid
        const usePostDetails = (postId) => {
            return useQuery(['postDetails', postId], () => getPostByPostId(postId), {
                enabled: !!postId,
            });
        };
        
        const usePostMediaDetails = (postId) => {
            return useQuery(['postMedia', postId], () => getPostMedia(postId), {
                enabled: !!postId,
            });
        };

    // Mutation to create a new post
    const createPostMutation = useMutation(
        ({ caption, userId }) => createPost(caption, userId),
        {
          onSuccess: () => {
            queryClient.invalidateQueries('posts');
          },
          onError: (error) => {
            console.error("Error creating the post:", error);
          },
          onSettled: () => {
          },
        }
      );

    // Mutation to delete a post
    const deletePostMutation = useMutation(
        ({postId}) => deletePost(postId),
        {
        onSuccess: () => {
            queryClient.invalidateQueries('posts');
        },
        // Optionally, add onError or onSettled callbacks
    });

    // Mutation to update a post
    const updatePostMutation = useMutation(
        ({postId, caption, userID}) => updatePost(postId, caption, userID), 
        {
        onSuccess: () => {
            queryClient.invalidateQueries('posts');
        },
        // Optionally, add onError or onSettled callbacks
    });

    // Mutation to upload post picture
    const uploadPostPictureMutation = useMutation(
        ({ postId, order, mediaFile}) => uploadPostPicture(postId, order, mediaFile),
        {
        onSuccess: () => {
            queryClient.invalidateQueries('posts');
        },
        // Optionally, add onError or onSettled callbacks
    }
    );




    return (
        <PostContext.Provider value={{
            posts,
            friendPosts,
            userPosts,
            isPostsLoading,
            isFriendPostsLoading,
            postsError,
            friendPostsError,
            usePostDetails,
            usePostMediaDetails,
            createPostMutation,
            deletePost: deletePostMutation.mutate,
            updatePost: updatePostMutation.mutate,
            uploadPostPicture: uploadPostPictureMutation.mutate,

        }}>
            {children}
        </PostContext.Provider>
    );
}
