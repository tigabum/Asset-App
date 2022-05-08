// const initialState = false;

const initialState = {
    page: 1,
    product: [],
    refereshing: false,
  }
  
  const assetsReducer = (state = initialState, action) => {
    switch (action.type) {
      case "ADD_ASSETS":
        return {...state, product:action.payload};
      case "INCREMENT_PAGE":
          return {...state, page: state.page+1}
      case "REFRESH_FIRST_PAGE":
          return {...state, page: 1}
      case "SET_REFRESH":
          return {...state, refereshing:action.payload}
      default:
        return state;
    }
  };
  
  export default assetsReducer;
  