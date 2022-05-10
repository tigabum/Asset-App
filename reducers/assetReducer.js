// const initialState = false;

const initialState = {
    asset: {},
    favourite:{},
    priceTimeSeries: [],
  }
  
  const assetReducer = (state = initialState, action) => {
    switch (action.type) {
      case "ADD_ASSET":
        return {...state, asset:{...action.payload}};
      case "ADD_ASSET_PRICE_TIME_SERIES":
        return {...state, priceTimeSeries:action.payload};
      case "CHANGE_FAVOURITE":
        return {...state, favourite:{...state.favourite, [action.payload]:!state.favourite[action.payload]}}
      case "UPDATE_FROM_LOCAL":
        return {...state, favourite:action.payload || {}}
      default:
        return state;
    }
  };
  
  export default assetReducer;
  