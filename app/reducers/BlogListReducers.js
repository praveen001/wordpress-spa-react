const initialState = {
    loading: true,
    failed: false,
    posts: {},
    postIds: [],
    total: 0
};

export default function postListReducer(state = initialState, action) {
    switch (action.type) {
        case 'LOADING_POST_LIST':
            return { ...initialState };

        case 'LOADING_POST_LIST_FAILED':
            return { ...initialState, loading: false, failed: true };

        case 'LOADED_POST_LIST':
            let posts = {}, postIds = [], total = action.payload.total;
            action.payload.posts.forEach(post => {
                posts[post.id] = post;
                postIds.push(post.id);
            });
            return { ...initialState, loading: false, failed: false, posts, postIds, total };

        default:
            return state;
    }
}