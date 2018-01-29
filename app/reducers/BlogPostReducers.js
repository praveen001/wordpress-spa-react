const initialState = {
    loading: true,
    failed: false,
    post: {}
};

export default function postReducer(state = initialState, action) {
    switch (action.type) {
        case 'LOADING_POST':
            return { ...initialState };

        case 'LOADING_POST_FAILED':
            return { ...initialState, loading: false, failed: true };

        case 'LOADED_POST':
            return { ...initialState, loading: false, failed: false, post: action.payload.post[0] };

        default:
            return state;
    }
}