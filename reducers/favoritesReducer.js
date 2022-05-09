const initialState = {
    favouritelists: [],
}

const favoritesReducer = (state = initialState, action) => {
    switch(action.type) {
        case "FAVOURITE_LISTS_SCREEN":
            return {...state, favouritelists:action.payload}
        default:
            return state
    }
 }

 export default favoritesReducer;