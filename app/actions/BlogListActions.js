import Axios from '../Axios';

export function loadingPostList() {
    return {
        type: 'LOADING_POST_LIST'
    };
}

export function loadedPostList(posts, total) {
    return {
        type: 'LOADED_POST_LIST',
        payload: {
            posts, total
        }
    };
}

export function loadingPostListFailed() {
    return {
        type: 'LOADING_POST_LIST_FAILED'
    }
}

export function loadPostList(page) {
    return dispatch => {
        dispatch(loadingPostList());
        return Axios.get(`/wp-json/wp/v2/posts?page=${page}&context=embed&_embed`).then(response => {
            let posts, total;
            posts = response.data;
            total = response.headers['X-WP-Total'];
            dispatch(loadedPostList(posts, total));
            return posts;
        }, error => {
            console.log(error);
            dispatch(loadingPostListFailed());
        });
    };
}