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
  console.info("[INFO] 서버에 댓글 등록 요청 후 응답값", response);
  if(response.data.success){
    return Promise.resolve(response)
  }else{
    console.error("[ERROR]"+response.data.message)
    return Promise.reject(response)
  }
};

/**
 * 댓글삭제
 * @param
 * @returns response
 */
export const deleteComment = async (commentId) => {
  const response = await jwtInstance.delete(`/comment/` + commentId);
  console.info("[INFO] 서버에 댓글 삭제 요청 후 응답값", response);
  if(response.data.success){
    return Promise.resolve(response)
  }else{
    console.error("[ERROR]"+response.data.message)
    return Promise.reject(response)
  }
};
