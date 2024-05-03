import { createStore, applyMiddleware, compose, Store } from "redux";
import reducers from "./AppReducer";
import autoMergeLevel2 from "redux-persist/es/stateReconciler/autoMergeLevel2";
import thunk from "redux-thunk";
import { persistReducer, persistStore, PersistConfig } from "redux-persist";
import storage from "@react-native-async-storage/async-storage";
import { useSelector } from "react-redux";

function logger({ getState, dispatch }) {
  return (next) => (action) => {
    const returnValue = next(action);

    return returnValue;
  };
}

const middleware = [thunk, logger];

const persistConfig = {
  key: "root",
  storage,
  stateReconciler: autoMergeLevel2,
  transforms: [],
  whitelist: [
    "app",
    "account",
    "activationSubscriber",
    "subscriber",
    "topup",
    "loyalty",
    "lifestyle",
    "notification",
    "chat",
    "packageReducer",
    "serviceReducer",
    "miniApps",
    "meeStar",
  ], //add which reducer to persist
};

const composeEnhancers =
  (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      trace: true,
      traceLimit: 25,
    })) ||
  compose;

export const store = createStore(persistReducer(persistConfig, reducers));

export const persistor = persistStore(store, {}, () => {});

/**
 * hook to app's reducers state. convenient for typescripts
 * @template T
 * @param {(state:StoreState)=>T} selector
 * @returns {T}
 */
export function useAppSelector(selector) {
  return useSelector(selector);
}
