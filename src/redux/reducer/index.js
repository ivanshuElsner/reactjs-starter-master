const intialState = {
    isLoggedIn: false,
    user: null,
    isLoading: false,
}

const Reducer = (state = intialState, action) => {
    switch (action.type) {
        case "LOGGED_IN": {
            state = {
                ...state,
                isLoggedIn: action.payload
            }
            break;
        }
        case "USER_HANDLER": {
            state = {
                ...state,
                user: action.payload
            }
            break;
        }
        case "IS_LOADING": {
            state = {
                ...state,
                isLoading: action.payload
            }
            break;
        }
        case "LOG_OUT": {
            state = {
                ...state,
                isLoggedIn: false,
                user: null,
                isLoading: false
            }
            break;
        }
        default:
            break;
    }
    return state;
}

export default Reducer;