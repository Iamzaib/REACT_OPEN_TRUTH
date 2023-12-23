const initialState = {
    chat: [],
    loading: false,
};

const chattingReducer = (state = initialState, action) => {
    switch (action.type) {
        case "CHATBOTReply":
            return {
                ...state,
                chat: action.payload,
            };
        //LOADER
        case "LOADER":
            return {
                ...state,
                loading: action.payload,
            };
        default:
            return state;
    }
};

export default chattingReducer;
