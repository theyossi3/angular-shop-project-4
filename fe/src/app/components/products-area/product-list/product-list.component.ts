import { ProductsService } from './../../../services/products.service';
import { Component, OnInit, OnDestroy, ViewChild, ChangeDetectorRef } from '@angular/core';
import ProductModel from 'src/app/models/product.model';
import { NotifyService } from 'src/app/services/notify.service';
import CategoryModel from 'src/app/models/category.model';
import { CategoryService } from 'src/app/services/category.service';
import { Subscription, Subject } from 'rxjs';
import store from 'src/app/redux/store';

@Component({
    selector: 'app-product-list',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
    public admin: boolean;
    private Subscription: Subscription;
    public products: ProductModel[];
    public pageOfproducts: Array<any>;
    S: any;
    public category: CategoryModel[];
    constructor(private myProductsService: ProductsService,
        private notify: NotifyService,
        private myCategoryService: CategoryService

    ) { }

    async ngOnInit() {
        this.Subscription = this.myProductsService.getcartObservable().subscribe(getitemdata => {
            if (getitemdata && getitemdata.length > 0) {
                this.products = getitemdata;
            }
            else { this.products }

        });
        try {
            this.category = await this.myCategoryService.getAllCategorys();
            this.products = await this.myProductsService.getAllProducts();
            this.admin = store.getState().authState.user.isAdmin;
        }
        catch (err) {
            this.notify.error(err);
        }
    }



    async UpdateCategory(id: string) {
        this.products = await this.myCategoryService.getProductByCategory(id);
    }

async getall(){
    this.products = await this.myProductsService.getAllProducts();
}



}
