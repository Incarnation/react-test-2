//import require lib
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";
import { reducer as formReducer } from "redux-form";

//import reducers for auth and rental
import { rentalReducer, selectedRentalReducer } from "./rental-reducer";
import { authReducer } from "./auth-reducer";

//all the reducers available in redux store
export const init = () => {
  const reducer = combineReducers({
    rentals: rentalReducer,
    rental: selectedRentalReducer,
    form: formReducer,
    auth: authReducer
  });

  //for redux devtools
  //refer to https://github.com/zalmoxisus/redux-devtools-extension
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  //create redux store
  const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

  //return redux store
  return store;
};
