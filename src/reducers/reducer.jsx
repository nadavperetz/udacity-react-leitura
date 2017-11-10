import {combineReducers} from 'redux';

// import {GET_COMMENT} from '../actions/comments'
// import {GET_POST} from '../actions/posts'
import {GOT_CATEGORIES} from '../actions/categories'

const initialPostState = {
  id: null,
  timestamp: Date.now(),
  title: null,
  body: null,
  author: null,
  category: null,
  voteScore: 0,
  deleted: false
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