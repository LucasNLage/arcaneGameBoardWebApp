const initState = {
    history: []
}

const gameHistoryReducer = (state = initState, action) => {
    console.log("\n\naction:", action, "\nother state:", action.history)
    if (action.type === "UPDATE_HISTORY") {
        return {
            history: action.history
        };
    }
    return state;
}

export default gameHistoryReducer;