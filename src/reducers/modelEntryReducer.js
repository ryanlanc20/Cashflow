const modelEntryReducer = (state,action) => {
    switch(action.type)
    {
        case "create":
            state[new Date().toUTCString()] = {
                "desc": "",
                "amount": "0"
            };
            return {...state};
        case "edit":
            state[action.key][action.field] = action.value;
            return {...state}
        default:
            return state;
    }
};

export default modelEntryReducer;