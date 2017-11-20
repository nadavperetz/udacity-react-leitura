import {combineReducers} from 'redux';

// import {GET_COMMENT} from '../actions/comments'
// import {GET_POST} from '../actions/posts'
import {GOT_CATEGORIES} from '../actions/categories'
import {UPDATE_POST, GOT_POST_BY_ID, GOT_POSTS} from "../actions/posts";
import {GET_ALL_POST_COMMENTS, UPDATE_COMMENT} from "../actions/comments";

const initialPostState = {
  posts: [],
  uniquePost: {
    id: null,
    timestamp: Date.now(),
    title: null,
    body: null,
    author: null,
    category: null,
    voteScore: 0,
    commentCount: 0,
    deleted: false
  }
};

const initialCommentState = {
  comments: [],
  uniqueComment: {
    id: null,
    parentId: null,
    timestamp: Date.now(),
    body: null,
    author: null,
    voteScore: 0,
    deleted: false,
    parentDeleted: false
  }
};

const defaultCategories = {
  categories: [
    {
      name: 'all',
      path: 'all'
    }]
};

function PostStore(state = initialPostState, action) {
  switch (action.type) {
    case GOT_POSTS:
      return {
        ...state,
        posts: action.posts
      };
    case GOT_POST_BY_ID:
      return {
        ...state,
        uniquePost: action.post
      };
    case UPDATE_POST: {
      let posts = state.posts.map(a => ({...a}));
      let idx = posts.findIndex((post) => post.id === action.post.id)
      if (idx >= 0)
        posts[idx] = action.post
      else
        posts.push(action.post);
      return {
        posts: posts,
        uniquePost: action.post
      };
    }
    default:
      return state;
  }
}

function CommentStore(state = initialCommentState, action) {
  switch (action.type) {

    case GET_ALL_POST_COMMENTS:
      return {
        ...state,
        comments: action.comments
      }
    case UPDATE_COMMENT:
      let comments = state.comments.map(a => ({...a}));
      let idx = comments.findIndex((comment) => comment.id === action.comment.id)
      if (idx >= 0)
        comments[idx] = action.comment
      else
        comments.push(action.comment);
      return{
        comments: comments,
        uniqueComment:action.comment
      }
    default:
      return state;
  }
}

function CategoryStore(state = defaultCategories, action) {
  switch (action.type) {
    case GOT_CATEGORIES:
      return {
        ...state,
        categories: action.categories
      };
    default:
      return state;
  }
}


export default combineReducers({
  PostStore,
  CommentStore,
  CategoryStore
});