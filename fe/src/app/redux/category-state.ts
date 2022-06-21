import CategoryModel from 'src/app/models/category.model';

// Products State: 
export class categorysState {
    public categorys: CategoryModel[] = [];
}

// Product Action Types:
export enum categorysActionType {
    categorysDownloaded = "categorysDownloaded",
    categorysAdded = "categorysAdded",
    categorysUpdated = "categorysUpdated",
    categorysDeleted = "categorysDeleted"
}

// Product Action: 
export interface categorysAction {
    type: categorysActionType;
    payload: any;
    // More specific type list:
    // payload: CategoryModel[] | CategoryModel | number;
}

// Product Action Creators: 
export function categorysDownloadedAction(categorys: CategoryModel[]): categorysAction {
    return { type: categorysActionType.categorysDownloaded, payload: categorys };
}
export function categorysAddedAction(categorys: CategoryModel): categorysAction {
    return { type: categorysActionType.categorysAdded, payload: categorys };
}
export function categorysUpdatedAction(categorys: CategoryModel): categorysAction {
    return { type: categorysActionType.categorysUpdated, payload: categorys };
}
export function categorysDeletedAction(id: string): categorysAction {
    return { type: categorysActionType.categorysDeleted, payload: id };
}

// Products Reducer:
export function categorysReducer(currentState: categorysState = new categorysState(), action: categorysAction): categorysState {

    const newState = { ...currentState };

    switch (action.type) {
        case categorysActionType.categorysDownloaded: // Here payload is all products (CategoryModel[])
            newState.categorys = action.payload;
            break;
        case categorysActionType.categorysAdded: // Here payload is the added product (CategoryModel)
            newState.categorys.push(action.payload);
            break;
        case categorysActionType.categorysUpdated: { // Here payload is the updated product (CategoryModel)
            const index = newState.categorys.findIndex(p => p.id === action.payload.id);
            newState.categorys[index] = action.payload;
            break;
        }
        case categorysActionType.categorysDeleted: { // Here payload is the deleted product's id (number)
            const index = newState.categorys.findIndex(p => p.id === action.payload);
            newState.categorys.splice(index, 1);
            break;
        }
    }

    return newState;
}