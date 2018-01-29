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