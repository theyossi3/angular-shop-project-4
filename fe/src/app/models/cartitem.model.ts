import ProductModel from 'src/app/models/product.model';

class CartItemModel {
    product: ProductModel;
    quant: Number;
    totalPrice: Number;

}

export default CartItemModel;