const initState = {
    theme: "main"
}

const themeReducer = (state = initState, action) => {
    console.log("update was called", action)
    if (action.type === "CHANGE_THEME") {
        return {
            history: action.theme
        };
    }
    return state;
}

export default themeReducer;