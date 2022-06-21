import { OrderModel } from "../models/order.model";

// oreders State: 
export class oredersState {
    public oreders: OrderModel[] = [];
}

// oreder Action Types:
export enum orederActionType {
    oredersDownloaded = "oredersDownloaded",
    orederAdded = "orederAdded",
    orederUpdated = "orederUpdated",
    orederDeleted = "orederDeleted"
}

// oreder Action: 
export interface orederAction {
    type: orederActionType;
    payload: any;
    // More specific type list:
    // payload: orederModel[] | orederModel | number;
}

// oreder Action Creators: 
export function oredersDownloadedAction(oreders: OrderModel[]): orederAction {
    return { type: orederActionType.oredersDownloaded, payload: oreders };
}
export function orederAddedAction(oreder: OrderModel): orederAction {
    return { type: orederActionType.orederAdded, payload: oreder };
}
export function orederUpdatedAction(oreder: OrderModel): orederAction {
    return { type: orederActionType.orederUpdated, payload: oreder };
}
export function orederDeletedAction(id: string): orederAction {
    return { type: orederActionType.orederDeleted, payload: id };
}

// oreders Reducer:
export function oredersReducer(currentState: oredersState = new oredersState(), action: orederAction): oredersState {

    const newState = { ...currentState };

    switch (action.type) {
        case orederActionType.oredersDownloaded: // Here payload is all oreders (orederModel[])
            newState.oreders = action.payload;
            break;
        case orederActionType.orederAdded: // Here payload is the added oreder (orederModel)
            newState.oreders.push(action.payload);
            break;
        case orederActionType.orederUpdated: { // Here payload is the updated oreder (orederModel)
            const index = newState.oreders.findIndex(o => o.id === action.payload.id);
            newState.oreders[index] = action.payload;
            break;
        }
        case orederActionType.orederDeleted: { // Here payload is the deleted oreder's id (number)
            const index = newState.oreders.findIndex(o => o.id === action.payload);
            newState.oreders.splice(index, 1);
            break;
        }
    }

    return newState;
}