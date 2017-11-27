import {
    fetchCommentsByPostId,
    fetchCreateNewComment,
    fetchEditComment,
    postVoteComment,
    fetchDeleteComment
} from "../utils/api";
import {updateCommentCount} from "./posts";

export const UPDATE_COMMENT = 'UPDATE_COMMENT'
export const GET_ALL_POST_COMMENTS = 'GET_ALL_POST_COMMENTS'


export function getAllPostComments(postId) {
    return (dispatch) => {
        fetchCommentsByPostId(postId).then((comments) => {
                dispatch(gotCommentsByPostId(comments))
            }
        );
    }
}

export function voteComment(postId, voteType) {
    return (dispatch) => {
        postVoteComment(postId, voteType).then((comment) =>
            dispatch(updateComment(comment))
        )
    }

}

export function createNewComment(comment) {
    return (dispatch) => {
        fetchCreateNewComment(comment).then(() => {
                dispatch(addComment(comment))
            }
        )
        dispatch(updateCommentCount(comment, 1))

    }
}

export function editComment(comment) {
    return (dispatch) => {
        fetchEditComment(comment).then(() => {
                dispatch(addComment(comment))
            }
        );
    }
}

export function deleteComment(comment) {
    return (dispatch) => {
        fetchDeleteComment(comment).then(() => {
                dispatch(updateComment(comment))
            }
        );
        dispatch(updateCommentCount(comment, -1))
    }
}

export function gotCommentsByPostId(comments) {
    return {
        type: GET_ALL_POST_COMMENTS,
        comments
    }
}

export const addComment = (comment) => {
    return {
        type: UPDATE_COMMENT,
        comment
    }
};


export function updateComment(comment) {
    return {
        type: UPDATE_COMMENT,
        comment
    }
}

