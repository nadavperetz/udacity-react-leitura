import {combineReducers} from 'redux';

import {GOT_CATEGORIES} from '../actions/categories'
import {GOT_POST_BY_ID, GOT_POSTS, UPDATE_POST, CHANGE_COMMENT_COUNT} from "../actions/posts";
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
        }],
};

function PostStore(state = initialPostState, action) {
    switch (action.type) {
        case GOT_POSTS:
            return {
                ...state,
                posts: action.posts
            };

        case CHANGE_COMMENT_COUNT:
            let posts = state.posts.map(a => ({...a}));
            let uniquePost = state.uniquePost;
            uniquePost.commentCount = uniquePost.commentCount + action.number;
            let idx = posts.findIndex((post) => post.id === action.postId)
            if (idx >= 0){
                posts[idx].commentCount = posts[idx].commentCount + action.number;
            }
            console.log('aqui');
            console.log(posts);
            console.log(uniquePost);
            return {
                posts: posts,
                uniquePost: uniquePost

            }
        case GOT_POST_BY_ID:
            let post = action.post
            if (post.id === undefined)
                post = initialPostState.uniquePost
            return {
                ...state,
                uniquePost: post
            };

        case UPDATE_POST: {
            let posts = state.posts.map(a => ({...a}));
            let idx = posts.findIndex((post) => post.id === action.post.id)
            const deleted = action.post.deleted;
            let sameCategory = true;
            if ((action.category !== undefined ) && (action.category !== action.post.category)) {
                sameCategory = false
            }

            if (idx >= 0)
                if (!deleted && sameCategory)
                    posts[idx] = action.post;
                else
                    posts.splice(idx, 1);

            else {
                if (!deleted && sameCategory)
                    posts.push(action.post);
            }
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
                if (!action.comment.deleted)
                    comments[idx] = action.comment
                else {
                    comments.splice(idx, 1);
                }

            else {
                if (!action.comment.deleted)
                    comments.push(action.comment);
            }
            return {
                comments: comments,
                uniqueComment: action.comment
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