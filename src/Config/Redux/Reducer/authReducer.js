const reducer = (state = {}, action) => {
    switch (action.type) {
        case "update-user": {
            return { ...state, user: action.user }
        }

        default: {
            return { state }
        }
    }
}

export default reducer