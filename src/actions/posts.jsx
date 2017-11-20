import {v4} from 'node-uuid'

import {fetchPosts, fetchPostsByCategory, postVotePost, fetchPostById, putEditPost, createPost} from "../utils/api";

export const GOT_POSTS = 'GOT_POSTS'
export const GOT_POST_BY_ID = 'GOT_POST_BY_ID'
export const UPDATE_POST = 'UPDATE_POST'

export function votePost(postId, voteType) {
  return (dispatch) => {
    postVotePost(postId, voteType).then((post) =>
        dispatch(updatePost(post))
    )
  }
}

export function editPost(post) {
  return (dispatch) => {
    if (post.id !== undefined) {
      putEditPost(post).then((post) =>
          dispatch(updatePost(post))
      )
    }
    else{
      post.id = v4()
      createPost(post).then((post) =>
          dispatch(updatePost(post))
      )
    }
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

export const updatePost = (post) => {
  return {
    type: UPDATE_POST,
    post
  }
};

