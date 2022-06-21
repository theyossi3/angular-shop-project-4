import ProductModel from "./product.model";
class CartModel {
    public id: string;
    public userid: string;
    public cartProducts: [{
        product: ProductModel,
        quant: number,
        totalPrice: number
    }];

    public creationdate: Date;
    public isactive: boolean;
    public overallPrice: number;
}

export default CartModel;