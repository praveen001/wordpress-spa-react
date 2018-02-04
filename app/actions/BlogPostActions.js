import Axios from '../Axios';

export function loadingPost() {
    return {
        type: 'LOADING_POST'
    };
}

export function loadedPost(post) {
    return {
        type: 'LOADED_POST',
        payload: {
            post
        }
    };
}

export function loadingPostFailed() {
    return {
        type: 'LOADING_POST_FAILED'
    }
}

export function loadPost(slug) {
    return dispatch => {
        dispatch(loadingPost());
        return Axios.get(`/wp-json/wp/v2/posts?slug=${slug}&_embed`).then(response => {
            let post = response.data;
            dispatch(loadedPost(post));
            return post;
        }, error => {
            dispatch(loadingPostFailed());
        });
    };
}

export function postComment(postId, parentComment, comment) {
    let payload = {
        author_name: comment.name,
        author_email: comment.email,
        content: comment.comment,
        parent: parentComment,
        post: postId,
        date: new Date()
    };
    return dispatch => {
        return Axios.post(`/wp-json/wp/v2/comments`, payload).then(response => {
            dispatch(postedComment(comment, postId));
            return response.data;
        });
    }
}

export function postedComment(comment, postId) {
    return {
        type: 'POST_COMMENT',
        payload: {
            comment, postId
        }
    }
}