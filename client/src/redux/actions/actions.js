export const logIn = (data) => {
    return { type: "LOGIN", payload: data}
}

export const refreshTkn = ({accessToken, refreshToken}) => {
    return { type: "REFRESH", payload: {accessToken, refreshToken}}
}

export const loggedIn = (data) => {
    return { type: "LOGGEDIN", payload: data}
}

export const logOut = () => {
    return { type: "LOGGEDOUT"}
}

export const storeData = (data) => {
    return { type: "STORE", payload: data}
}

export const clearData = (data) => {
    return { type: "CLEAR", payload: data}
}