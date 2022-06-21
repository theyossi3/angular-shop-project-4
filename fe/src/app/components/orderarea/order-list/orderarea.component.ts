import { Component, OnInit } from '@angular/core';
import { NotifyService } from 'src/app/services/notify.service';
import { OrderService } from 'src/app/services/oreder.service';
import { OrderModel } from 'src/app/models/order.model';
import { environment } from 'src/environments/environment';
import store from 'src/app/redux/store';
@Component({
  selector: 'app-orderarea',
  templateUrl: './orderarea.component.html',
  styleUrls: ['./orderarea.component.css']
})
export class OrderareaComponent implements OnInit {
  public admin: boolean;

  public orders: OrderModel[];
  public pageOforder: Array<any>;
  S: any;
  constructor(private OrderService: OrderService,
    private notify: NotifyService) { }

  async ngOnInit() {

    try {
      if (store.getState().authState.user.isAdmin) {
        this.orders = await this.OrderService.getAllorder();
      }
      else {

        this.orders = await this.OrderService.getordersbyuser(store.getState().authState.user._id);
      }
    }
    catch (err) {
      this.notify.error(err);
    }
  }

}
