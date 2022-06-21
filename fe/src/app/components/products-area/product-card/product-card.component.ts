import { Component, Input, Inject } from '@angular/core';
import { MatDialogModule, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';
import { FormGroup, FormControl } from '@angular/forms';
import { CartService } from '../../../services/cart.service';
import { NotifyService } from 'src/app/services/notify.service';
import { ProductsService } from './../../../services/products.service';
import { ActivatedRoute, Router } from '@angular/router';
import ProductModel from 'src/app/models/product.model';
import store from 'src/app/redux/store';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  public registration: FormGroup;


  @Input()
  public product: ProductModel;
  public amount: number;
  public imageUrl = environment.productImagesUrl;
  public admin: boolean;
  public i=0; 

  public constructor(  private mycartservice: CartService, 
     private myProductsService: ProductsService,
      private myRouter: Router,
       private Notify: NotifyService,
        public dialog: MatDialog) { }

  async ngOnInit() {
    this.admin = store.getState().authState.user.isAdmin;
  }
 
  public async delete() {
    try {
        const answer = confirm("Are you sure?");
        if (!answer) return;
        await this.myProductsService.deleteProduct(this.product.id);
        this.Notify.success("Product has been deleted.")
        this.myRouter.navigateByUrl("/products");
    }
    catch (err) {
        this.Notify.error(err);
    }
}

  openDialog(): void {

    const dialogRef = this.dialog.open(addtocartDialog, {
      width: '100%',
      data: this.product,
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }
}
@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: './addtocart.html',
  styleUrls: ['./addtocart.css']
})

export class addtocartDialog {
  public amount: number;
  public price: number = 0;
  public imageUrl = environment.productImagesUrl;
  constructor(
    private Notify: NotifyService,
    private mycartservice: CartService,
    public dialogRef: MatDialogRef<addtocartDialog>,
    @Inject(MAT_DIALOG_DATA) public data: ProductModel,
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
  //on 
  changeprice(amount: number) {
    if (amount = null) return;
    this.price = this.amount * this.data.price;
  }
  public async addtocart(price: any): Promise<void> {
    try {
      if (this.amount == null) { this.amount = 1 }
      const pruduct = {
        product: this.data,
        quant: this.amount,
        totalPrice: (this.amount * this.data.price)
      }
      await this.mycartservice.addtocart(pruduct);
      this.amount = null;
    }
    catch (err: any) {
    

      this.Notify.error(err)

    }
  }
}