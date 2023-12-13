const initialState = [];

const loginreducer = (state = initialState, action) => {
    switch (action.type) {
        case "LOGIN":
            return action.payload;
        case "REFRESH":
            return state.map((item)=>({
                ...item,
                accessToken: action.payload.accessToken,
                refreshToken: action.payload.refreshToken
            }));
        default:
            return state;
    }
};
export default loginreducer;