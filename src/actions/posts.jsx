import {fetchPosts, fetchPostsByCategory, postVotePost, fetchPostById} from "../utils/api";

export const GOT_POSTS = 'GOT_POSTS'
export const GOT_POST_BY_ID = 'GOT_POST_BY_ID'
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

export function getPostById(postId) {
  return (dispatch) => {
    fetchPostById(postId).then((posts) => {
          dispatch(gotPostById(posts))
        }
    );
  }
}

export const gotPostById = (post) => {
  return {
    type: GOT_POST_BY_ID,
    post
  }
};

export const afterVote = (post) => {
  return {
    type: AFTER_VOTE,
    post
  }
};

