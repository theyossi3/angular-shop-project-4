import { ProductsService } from './../../../services/products.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import ProductModel from 'src/app/models/product.model';
import { NotifyService } from 'src/app/services/notify.service';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.css']
})
export class SearchComponent {
    public product: ProductModel[];
    public textToSearch: string;
    constructor(
        private myActivatedRoute: ActivatedRoute,
        private notify: NotifyService,
        private myRouter: Router,
        private myProductsService: ProductsService,) { }

    public async search() {
        try {

            const name = this.textToSearch.charAt(0).toUpperCase() + this.textToSearch.slice(1);  // Take a route parameter named id

            await this.myProductsService.getOneProductbyname(name);


        }
        catch (err) {
            this.notify.error(err);
        }
    }
}


