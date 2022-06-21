import { Injectable } from '@angular/core';
import CartModel from 'src/app/models/cart.model';
import CartItemModel from 'src/app/models/cartitem.model';
import ProductModel from '../models/product.model';
import store from 'src/app/redux/store';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, Observer, Subscription, Subject } from 'rxjs';
import { cartDownloadedAction, CarPriceUpdateAction, itemAddedAction } from '../redux/cart-state';
import { ProductsService } from './products.service';
@Injectable({
  providedIn: 'root'
})
export class CartService {
  public cartmodel: CartModel;
  constructor(private http: HttpClient) { }
  private subject = new Subject<any>();
  public cartproduct: ProductModel[];

  public async getcart() {
    if (store.getState().cartState.cart == null) {
      const headers = { "authorization": "Bearer " + store.getState().authState.user?.token };

      const userid = store.getState().authState.user._id;
      const cart = await this.http.get<CartModel>(environment.checkorcreatcarturl + userid).toPromise();
      store.dispatch(cartDownloadedAction(cart));
    }
    const cartdata = store.getState().cartState.cart;
    return cartdata;
  }
  public getcartitems() {
    if (store.getState().cartState.cart == null) { this.getcart() }
    return store.getState().cartState.cart.cartProducts;
  }

  public async RmoveCart(product: any, arrayindex: any) {
    const cartid = store.getState().cartState.cart.id;
    await this.http.patch<CartModel>(environment.removefromcarturl + cartid + "/" + arrayindex, product).toPromise();

  }
  public async UpdateCart(product: any, arrayindex: number) {
    product.quant += store.getState().cartState.cart.cartProducts[arrayindex].quant;
    this.subject.next(product);
    product.totalPrice += store.getState().cartState.cart.cartProducts[arrayindex].totalPrice;
    const cartid = store.getState().cartState.cart.id;
    await this.http.post<CartModel>(environment.updatecarturl + cartid, product).toPromise();
    store.dispatch(itemAddedAction(product));
    store.dispatch(CarPriceUpdateAction(store.getState().cartState.cart.overallPrice + product.totalPrice));

  }

  public async addtocart(product: any) {

    let check = false;
    for (let i = 0; i < store.getState().cartState.cart.cartProducts.length; i++) {
      if (store.getState().cartState.cart.cartProducts[i].product.id == product.product.id) {
        this.UpdateCart(product, i);
        check = true;
      }
    }
    if (!(check)) {
      const cartid = store.getState().cartState.cart.id;
      await this.http.post<CartModel>(environment.addtocarturl + cartid, product).toPromise();
      this.subject.next(product);
    }

    store.dispatch(itemAddedAction(product));
  }
  public getcartObservable(): Observable<any> {
    return this.subject.asObservable();
  }
}


