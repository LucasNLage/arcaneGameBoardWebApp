const initState = {
    history: []
}

const gameHistoryReducer = (state = initState, action) => {
    if (action.type === "UPDATE_HISTORY") {
        return {
            history: action.history
        };
    }
    if (action.type === "CLEAR_HISTORY") {
        return {
            history: []
        };
    }
    return state;
}

export default gameHistoryReducer;