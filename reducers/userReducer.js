const initialState = {
  user: null
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_USER":
        console.log('displached ', state, action);
      return {...state, user: action.payload};
    default:
      return state;
  }
};

export default userReducer;
