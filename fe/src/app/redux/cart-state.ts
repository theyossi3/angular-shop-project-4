import { flush } from "@angular/core/testing";
import CartModel from "../models/cart.model";
import CartItemModel from "../models/cartitem.model";
//Cart State
export class CartState {
    public cart: CartModel = null as any;
    public constructor() {
        const cart = JSON.parse(sessionStorage.getItem("cart"));
        if (cart) {
            this.cart = cart;
        }
    }
}
//Cart Action Type
export enum CartActionType {
    CartClose = "CartClose",
    CartDownloaded = "CartDownloaded",
    CartAddItems = "CartAddItems",
    CartRmoveItem = "CartRmoveItem",
    CartResetState = "CartResetState",
    CarPriceUpdate = "CarPriceUpdate",
    CartUpdate = "CartUpdate",
    userlogout = "userlogout",
    cartlock = "cartlock"
}
// Cart Action
export interface CartAction {
    type: CartActionType;
    payload?: any;
}

export function cartDownloadedAction(cart: CartModel): CartAction {
    return { type: CartActionType.CartDownloaded, payload: cart };
}
export function cartlockAction(state: boolean): CartAction {
    return { type: CartActionType.cartlock, payload: state };
}
export function CartCloseAction(): CartAction {
    return { type: CartActionType.CartClose, payload: false };
}
export function CartUpdateAction(cart: CartModel): CartAction {
    return { type: CartActionType.CarPriceUpdate, payload: cart, };
}
export function CarPriceUpdateAction(price: number): CartAction {
    return { type: CartActionType.CarPriceUpdate, payload: price };
}
export function itemDeletedAction(item: number): CartAction {
    return { type: CartActionType.CartRmoveItem, payload: item, };
}
export function itemAddedAction(item: CartModel): CartAction {

    return { type: CartActionType.CartAddItems, payload: item };
}
export function userlogoutAction(): CartAction {
    return { type: CartActionType.userlogout, payload: null };
}
export function cartReducer(currentState: CartState = new CartState(),
    action: CartAction): CartState {
    const newState = { ...currentState };


    switch (action.type) {
        case CartActionType.CartRmoveItem:
            newState.cart.cartProducts.slice(action.payload, 1);
            break;
        case CartActionType.cartlock:
            newState.cart.isactive = action.payload;
            break;
        case CartActionType.userlogout:
            newState.cart = null;
            break;
        case CartActionType.CarPriceUpdate:
            newState.cart.overallPrice = action.payload;
            break;
        case CartActionType.CartDownloaded:
            newState.cart = action.payload;

            break;
        case CartActionType.CartClose:
            newState.cart.isactive = action.payload;
            break;
        case CartActionType.CartResetState:
            newState.cart = null as any;
            break;
        case CartActionType.CartAddItems:
            let check = true;
            for (let c of newState.cart.cartProducts) {
                if (c.product.id == action.payload.product.id) {
                    c.quant = action.payload.quant;
                    c.totalPrice = action.payload.totalPrice;
                    check = false;
                    break;
                }
            }
            if (check) {
                newState.cart.cartProducts.push(action.payload);
            }

            break;
    }
    return newState;
}