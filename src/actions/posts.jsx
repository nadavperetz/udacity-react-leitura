export const GET_POST = 'GET_POST'

export function getPost ({postId}) {
  return {
    type : GET_POST,
    postId,
  }

}