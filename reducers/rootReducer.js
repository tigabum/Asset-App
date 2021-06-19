import { combineReducers } from "redux";
import userLocationReducer from "./userLocationReducer";
import searchBarReducer from "./searchBarReducer";
import userReducer from "./userReducer";

const rootReducer = combineReducers({
  userLocation: userLocationReducer,
  searchBar: searchBarReducer,
  userSession: userReducer
});

export default rootReducer;