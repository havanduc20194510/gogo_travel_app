import { combineReducers } from "redux";
import modal from "../slice/ModalSlice";
import app from "../slice/AppSlice";
import account from "../slice/AccountSlice";
import classes from "../slice/ClassSlice";
const reducers = combineReducers({
  modal,
  app,
  account,
  classes,
});

/**
 *
 * @type {import('react').Reducer<import('app/types').StoreState, {payload: object}>}
 */
const rootReducer = (state, action) => {
  return reducers(state, action);
};

export default rootReducer;
