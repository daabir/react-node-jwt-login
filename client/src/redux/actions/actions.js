export const logIn = (data) => {
    return { type: "LOGIN", payload: data}
}

export const logOut = (data) => {
    return { type: "LOGOUT", payload: data}
}

export const storeData = (data) => {
    return { type: "STORE", payload: data}
}

export const clearData = (data) => {
    return { type: "CLEAR", payload: data}
}