import {fetchPosts, fetchPostsByCategory, postVotePost} from "../utils/api";

export const GOT_POSTS = 'GOT_POSTS'
export const AFTER_VOTE = 'AFTER_VOTE'

export function upVotePost(post_id) {
  return (dispatch) => {
    postVotePost(post_id, "upVote").then((post) =>
        dispatch(afterVote(post))
    )
  }
}

export function downVote(post_id) {
  return (dispatch) => {
    postVotePost(post_id, "downVote").then((post) =>
        dispatch(afterVote(post))
    )
  }
}

export function getPosts(category_path) {
  if (category_path === undefined) {
    return (dispatch) => {
      fetchPosts().then((posts) => {
            dispatch(gotPosts(posts))
          }
      );
    }
  }
  else {
    return (dispatch) => {
      fetchPostsByCategory(category_path).then((posts) => {
            dispatch(gotPosts(posts))
          }
      );
    }
  }
}

export const gotPosts = (posts) => {
  return {
    type: GOT_POSTS,
    posts
  }
};

export const afterVote = (post) => {
  return {
    type: AFTER_VOTE,
    post
  }
};

