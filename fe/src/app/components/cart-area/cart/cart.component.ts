import { Component, OnInit, Inject } from '@angular/core';
import { NotifyService } from 'src/app/services/notify.service';
import { Subscription, Subject } from 'rxjs';
import { OrderService } from 'src/app/services/oreder.service';
import { CartService } from '../../../services/cart.service';
import { ProductsService } from 'src/app/services/products.service';
import { UserModel } from 'src/app/models/user.model';
import CartModel from 'src/app/models/cart.model';
import CartItemModel from 'src/app/models/cartitem.model';
import { OrderModel } from 'src/app/models/order.model';
import { MatDialogModule, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import store from 'src/app/redux/store';
import { CarPriceUpdateAction, itemDeletedAction, userlogoutAction, itemAddedAction } from '../../../redux/cart-state';



@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  public order: OrderModel;
  public cart: CartModel;
  public cartitemmodel: CartItemModel[];
  private Subscription: Subscription;
  public totalcost: number = 0;
  public textToSearch: string;
  public cartitems: boolean = false;
  public cartactive: boolean = true;
  constructor(public dialog: MatDialog, private OrderService: OrderService,
    private myProductsService: ProductsService,
    private mycartservice: CartService, private notify: NotifyService) { }


  public async ngOnInit(): Promise<void> {

    try {
      this.cart = await this.mycartservice.getcart();
      this.mycartservice.getcartitems();
      this.cartitemmodel = store.getState().cartState.cart.cartProducts;

    }
    catch (err) {
      this.notify.error(err);

    }
    this.Subscription = this.mycartservice.getcartObservable().subscribe(getitemdata => {
      if (getitemdata) {
        this.cartitems = true;

        this.getotalprice(this.totalcost, getitemdata.totalPrice)

      }
      else { this.cartitemmodel = [] }

    });


    for (let i = 0; i < this.cartitemmodel.length; i++) {
      this.cartitemmodel[i].product = await this.myProductsService.getOneProduct(this.cartitemmodel[i].product)
      this.getotalprice(this.totalcost, this.cartitemmodel[i].totalPrice)
      this.cartitems = true;
    }
  }

  public getotalprice(x: number, y: any) {
    store.dispatch(CarPriceUpdateAction(x + y));
    this.totalcost = store.getState().cartState.cart.overallPrice;
  }
  async removefromcart(p: any) {

    try {
      const answer = confirm("Are you sure?");
      if (!answer) return;
      const index = this.cartitemmodel.indexOf(p);
      this.mycartservice.RmoveCart(p, index);
      store.dispatch(CarPriceUpdateAction(this.totalcost - p.totalPrice));
      this.totalcost = store.getState().cartState.cart.overallPrice;
      this.cartitemmodel.splice(index, 1);
      store.dispatch(itemDeletedAction(index));

      if (this.cartitemmodel.length == 0) { this.cartitems = false; }

    } catch (err) {
      this.notify.error(err);
    }
  }
  openDialog(): void {


    const dialogRef = this.dialog.open(orderDialog, {
      width: '100%',

      data: this.cartitemmodel,

    });



    dialogRef.afterClosed().subscribe(result => {
      this.cartactive = store.getState().cartState.cart.isactive;
    });
  }
  async downlodereceipt() {
    try {

      await this.OrderService.downlodepdf(store.getState().cartState.cart);

    } catch {

    }

  }
  neworder() { location.reload(); }
}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: './order.html',
  styleUrls: ['./order.css']
})

export class orderDialog {
  public order = new OrderModel();
  public amount: number;
  public total: number = store.getState().cartState.cart.overallPrice;
  public user: UserModel = store.getState().authState.user


  constructor(

    private Notify: NotifyService,
    private OrderService: OrderService,
    public dialogRef: MatDialogRef<orderDialog>,
    private notify: NotifyService,
    @Inject(MAT_DIALOG_DATA) public data: CartItemModel[],
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  async addorder() {
    try {

      await this.OrderService.CreatNewOrder(this.order);
      this.notify.success("oreder as been created");


    }
    catch (err) {
      this.notify.error(err);
    }
  }


}




