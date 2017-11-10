export const GET_COMMENT = 'GET_COMMENT'

export function getComment ({commentId}) {
  return {
    type: GET_COMMENT,
    commentId,
  }
}
