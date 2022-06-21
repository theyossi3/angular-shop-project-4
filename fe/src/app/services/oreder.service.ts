import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CartCloseAction } from '../redux/cart-state';
import store from '../redux/store';
import { OrderModel } from '../models/order.model';
import { oredersDownloadedAction } from '../redux/oreder-stase';

@Injectable({
    providedIn: 'root'
})
export class OrderService {
    public ordermodel = OrderModel;
    constructor(private http: HttpClient) { }


    public async CreatNewOrder(order: OrderModel) {
        order.userid = store.getState().authState.user._id;
        order.cartid = store.getState().cartState.cart.id;
        order.totalprudacts = 0;
        order.totalprice=0;
        for (let q of store.getState().cartState.cart.cartProducts) {
            order.totalprudacts += q.quant;
            order.totalprice+=q.totalPrice;

        }
        const neworder = await this.http.post<OrderModel>(environment.creatordeurl, order).toPromise();
        store.dispatch(CartCloseAction());
    }
    public async downlodepdf(cartdata) {
        const neworder = await this.http.post<OrderModel>(environment.createpdfurl, cartdata).toPromise();
    }

    public async getAllorder() {
        if (store.getState().oredersState.oreders.length === 0) {

            const headers = { "authorization": "Bearer " + store.getState().authState.user?.token };
            const order = await this.http.get<OrderModel[]>(environment.getallorderurl).toPromise();
            store.dispatch(oredersDownloadedAction(order));
        }

        return store.getState().oredersState.oreders;
    }
    public async getordersbyuser(id: string) {
        if (store.getState().oredersState.oreders.length === 0) {

            const headers = { "authorization": "Bearer " + store.getState().authState.user?.token };
            const order = await this.http.get<OrderModel[]>(environment.getallorderbyidurl + id).toPromise();
            store.dispatch(oredersDownloadedAction(order));
        }

        return store.getState().oredersState.oreders;
    }

    public async getOneorderclint(id: any) {
        if (store.getState().oredersState.oreders.length === 0) {
            const order = await this.http.get<OrderModel[]>(environment.getallorderbyidurl + id).toPromise();
            store.dispatch(oredersDownloadedAction(order));
        }
        const oreder = store.getState().oredersState.oreders.find(p => p.id === id);
        return oreder;
    }
    public async getOneorderadmin(id: any) {
        if (store.getState().oredersState.oreders.length === 0) {
            const order = await this.http.get<OrderModel[]>(environment.getallorderurl).toPromise();
            store.dispatch(oredersDownloadedAction(order));
        }
        const oreder = store.getState().oredersState.oreders.find(p => p.id === id);
        return oreder;
    }

    public async getordercunt() {
        const order = await this.http.get<number>(environment.cuntordersurl).toPromise();
        return order;
    }
}














