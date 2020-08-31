import { createStore, applyMiddleware } from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";
import mainReducer from "./R-Reducer";


const middleware = [thunk];
const store = createStore(
  mainReducer,

  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;