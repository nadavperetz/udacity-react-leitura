import {combineReducers} from 'redux';

// import {GET_COMMENT} from '../actions/comments'
// import {GET_POST} from '../actions/posts'
import {GOT_CATEGORIES} from '../actions/categories'
import {AFTER_VOTE, GOT_POST_BY_ID, GOT_POSTS} from "../actions/posts";

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
  id: null,
  parentId: null,
  timestamp: Date.now(),
  body: null,
  author: null,
  voteScore: 0,
  deleted: false,
  parentDeleted: false
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
    case AFTER_VOTE: {
      let posts = state.posts.map(a => ({...a}));
      let idx = posts.findIndex((post) => post.id === action.post.id)
      posts[idx] = action.post
      return {
        ...state,
        posts: posts
      };
    }
    default:
      return state;
  }
}

function CommentStore(state = initialCommentState, action) {
  switch (action.type) {
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