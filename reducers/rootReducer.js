import { combineReducers } from "redux";
import assetsReducer from "./assetsReducer";
import assetReducer from "./assetReducer";
import favoritesReducer from "./favoritesReducer";


const rootReducer = combineReducers({
  assets: assetsReducer,
  asset: assetReducer,
  favorites:favoritesReducer,
});

export default rootReducer;