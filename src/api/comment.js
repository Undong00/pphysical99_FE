import api, {jwtInstance} from "./apiConfig";

/**
 * 댓글등록
 * @param
 * @returns response
 */
export const addComment = async (value) => {
  const response = await jwtInstance.get(`/comment/`+value.postId, value.comment); // TODO 백앤드에서 지정한 url로 변경
    return response;
};

/**
 * 댓글삭제
 * @param
 * @returns response
 */
export const deleteComment = async (commentId) => {
    const response = await jwtInstance.delete(`/comment/`+commentId); // TODO 백앤드에서 지정한 url로 변경
    return response;
};
