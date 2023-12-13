const initialState = false;

const loginstatereducer = (state = initialState, action) => {
    switch(action.type){
        case "LOGGEDIN":
            return action.payload;
        case "LOGGEDOUT":
            return action.payload;
        default:
            return state;
    }
}

export default loginstatereducer;