import { ProductsService } from './../../../services/products.service';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import ProductModel from 'src/app/models/product.model';
import { NotifyService } from 'src/app/services/notify.service';
import { environment } from 'src/environments/environment';
import { AdminGuard } from '../../../services/admin.guard';
import store from 'src/app/redux/store';
import CategoryModel from 'src/app/models/category.model';
import { CategoryService } from 'src/app/services/category.service';
@Component({
    selector: 'app-add-product',
    templateUrl: './add-product.component.html',
    styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {

    // We must create an empty object for the Two-Way Binding:
    public product = new ProductModel();
    public imageVisited: boolean;
    public admin: boolean;
    public category: CategoryModel[];
    constructor(
        private adminguard: AdminGuard,
        private myProductsService: ProductsService,
        private myRouter: Router,
        private notify: NotifyService,
        private mycategoryService: CategoryService) { }
    async ngOnInit() {
        this.category = await this.mycategoryService.getAllCategorys();
        this.admin = store.getState().authState.user.isAdmin;
        if (!this.admin) {

            this.notify.success("you are not allowed here");
            this.myRouter.navigateByUrl("/home");
        }
    }

    public saveImage(args: Event): void {
        this.product.image = (args.target as HTMLInputElement).files;
    }

    public imageBlur(): void {
        this.imageVisited = true;
    }

    public async send() {
        try {

            await this.myProductsService.addProduct(this.product);
            this.notify.success("Product has been added.");
            this.myRouter.navigateByUrl("/products");
        }
        catch (err) {
            this.notify.error(err);
        }
    }

}
