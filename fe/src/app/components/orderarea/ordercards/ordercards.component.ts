import { Component, Input, OnInit } from '@angular/core';
import { NotifyService } from 'src/app/services/notify.service';
import { OrderService } from 'src/app/services/oreder.service';
import CartModel from 'src/app/models/cart.model';
import CartItemModel from 'src/app/models/cartitem.model';
import { OrderModel } from 'src/app/models/order.model';
import { environment } from 'src/environments/environment';
import store from 'src/app/redux/store';
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-ordercards',
  templateUrl: './ordercards.component.html',
  styleUrls: ['./ordercards.component.css']
})
export class OrdercardsComponent implements OnInit {

  public cart: CartModel;
  public imageUrl = environment.productImagesUrl;
  public cartitemmodel: CartItemModel[];
  constructor(
    private Order: OrderService,
    private notify: NotifyService,
    private cartservice: CartService,) { }

  ngOnInit(): void {
  }

}
