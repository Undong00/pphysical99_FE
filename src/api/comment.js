import api, { jwtInstance } from "./apiConfig";

/**
 * 댓글등록
 * @param
 * @returns response
 */
export const addComment = async (value) => {
  const response = await jwtInstance.post(`/comment/` + value.postId, {
    comment: value.comment,
  });
  return response;
};

/**
 * 댓글삭제
 * @param
 * @returns response
 */
export const deleteComment = async (commentId) => {
  console.log("SDSDSDSDS", commentId);
  const response = await jwtInstance.delete(`/comment/` + commentId);
  return response;
};
