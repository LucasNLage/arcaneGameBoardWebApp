const initState = {
    history: []
}

const gameHistoryReducer = (state = initState, action) => {
    if (action.type === "UPDATE_HISTORY") {
        return {
            history: action.history
        };
    }
    return state;
}

export default gameHistoryReducer;