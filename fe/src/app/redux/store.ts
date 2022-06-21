import { combineReducers, createStore } from "redux";
import { authReducer } from "./auth-state";
import { categorysReducer } from "./category-state";
import { productsReducer } from "./products-state";
import { cartReducer } from "./cart-state";
import { oredersReducer } from "./oreder-stase";

const reducers = combineReducers({
    productsState: productsReducer,
    authState: authReducer,
    categorysState: categorysReducer,
    cartState: cartReducer,
    oredersState: oredersReducer

});

const store = createStore(reducers);

export default store;