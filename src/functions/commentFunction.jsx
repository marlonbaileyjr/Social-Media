import axios from "axios";
import { formatDate } from "./formatDate";

async function getComments(postId) {
  const url = `http://localhost:8080/api/v1/comment/post/${postId}`;
  try {
    const response = await axios.get(url);

    return response.data;
  } catch (error) {
    console.error('Error fetching comments:', error);
    return null;
  }
}

async function addComment(postId, userId, text, parentCommentId) {
  console.log(postId, userId, text, parentCommentId)
  try {
    const commentBody = {
      userId,
      text,
      parentCommentId,
      uploadTime: formatDate(new Date())
    };
    const url = `http://localhost:8080/api/v1/comment/add/${postId}`;
    const response = await axios.post(url, commentBody);
    console.log('Comment posted successfully:', response.data);
  } catch (error) {
    console.error('Error posting comment:', error.response ? error.response.data : error.message);
  }
}

async function deleteComment(commentId) {
  const url = `http://localhost:8080/api/v1/comment/delete/${commentId}`;
  try {
    await axios.delete(url);
    console.log(`Comment with commentId ${commentId} deleted successfully.`);
  } catch (error) {
    console.error(`An error occurred while deleting the comment: ${error.message}`);
  }
}

async function editComment(commentId, newText) {
  const url = `http://localhost:8080/api/v1/comment/edit/${commentId}`;
  const body = {
    text: newText
  };
  try {
    const response = await axios.put(url, body);
    console.log('Comment updated successfully:', response.data);
  } catch (error) {
    console.error('There was a problem updating the comment:', error);
  }
}

export { getComments, addComment, deleteComment, editComment };
