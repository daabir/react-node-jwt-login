const initialState = [];

const datareducer = (state = initialState, action) => {
    switch (action.type) {
        case "STORE":
            return action.payload;
        case "CLEAR":
            return action.payload;
        default:
            return state;
    }
};
export default datareducer;