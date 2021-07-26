const initState = {
    history: []
}

const gameHistoryReducer = (state = initState, action) => {
    console.log("WE IN THE REDUCER:", action)
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