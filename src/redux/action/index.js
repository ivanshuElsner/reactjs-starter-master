export const isLoadingHandler = value => ({
    type: 'IS_LOADING',
    payload: value
})

export const loggedInHandler = value => ({
    type: 'LOGGED_IN',
    payload: value
})

export const userHandler = value => ({
    type: 'USER_HANDLER',
    payload: value
})

export const logOutHandler = () => {
    localStorage.clear();
    return {
        type: 'LOG_OUT'
    }
}