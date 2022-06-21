import CartModel from '../models/cart.model';
// cart State: 
export class cartState {
    public cart: CartModel[] = [];
}

// cart Action Types:
export enum cartActionType {
    cartDownloaded = "cartDownloaded",
    cartAdded = "cartAdded",
    cartUpdated = "cartUpdated",
    cartDeleted = "cartDeleted"
}

// cart Action: 
export interface cartAction {
    type: cartActionType;
    payload: any;
    // More specific type list:
    // payload: CartModel [] | CartModel  | number;
}

// cart Action Creators: 
export function cartDownloadedAction(cart: CartModel[]): cartAction {
    return { type: cartActionType.cartDownloaded, payload: cart };
}
export function cartAddedAction(cart: CartModel): cartAction {
    return { type: cartActionType.cartAdded, payload: cart };
}
export function cartUpdatedAction(cart: CartModel): cartAction {
    return { type: cartActionType.cartUpdated, payload: cart };
}
export function cartDeletedAction(id: string): cartAction {
    return { type: cartActionType.cartDeleted, payload: id };
}

// cart Reducer:
export function cartReducer(currentState: cartState = new cartState(), action: cartAction): cartState {

    const newState = { ...currentState };

    switch (action.type) {
        case cartActionType.cartDownloaded: // Here payload is all cart (CartModel [])
            newState.cart = action.payload;
            break;
        case cartActionType.cartAdded: // Here payload is the added cart (CartModel )
            newState.cart.push(action.payload);
            break;
        case cartActionType.cartUpdated: { // Here payload is the updated cart (CartModel )
            const index = newState.cart.findIndex(p => p.id === action.payload.id);
            newState.cart[index] = action.payload;
            break;
        }
        case cartActionType.cartDeleted: { // Here payload is the deleted cart's id (number)
            const index = newState.cart.findIndex(p => p.id === action.payload);
            newState.cart.splice(index, 1);
            break;
        }
    }

    return newState;
}