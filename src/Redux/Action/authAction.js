const updateUser = (user) => {
    // return (dispatch) => {
    //     fetch('https://jsonplaceholder.typicode.com/todos/1')
    //         .then(response => response.json())
    //         .then(data => {
    //             dispatch({
    //                 type: "UPDATE_USER",
    //                 user: data
    //             })
    //         })
    // }
    return {
        type: "UPDATE_USER",
        user
    }
}

const removeUser = () => {
    return {
        type: "REMOVE_USER"
    }
}

export {
    updateUser,
    removeUser
}