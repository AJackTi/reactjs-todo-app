let initState = {

    color: "#FFFFFF"
};

export default function themeReducer(state = initState, action) {
    debugger;
    switch (action.type) {
        case 'CHANGE_THEME':
            console.log('themeReducer: ' + JSON.stringify(state))
            return Object.assign({}, state, {color: action.payload.color});
        default:

            return initState;

    }

}