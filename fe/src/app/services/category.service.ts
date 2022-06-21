import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import ProductModel from '../models/product.model';
import { categorysDownloadedAction, categorysAddedAction, categorysUpdatedAction, categorysDeletedAction } from '../redux/category-state';
import { productsDownloadedAction } from '../redux/products-state';
import CategoryModel from '../models/category.model';
import store from '../redux/store';

@Injectable({
    providedIn: 'root'
})
export class CategoryService {

    constructor(private http: HttpClient) { }
    public async addcatgory(catrgory) {
        const categorys = await this.http.post<CategoryModel>(environment.addcategoriesurl, catrgory).toPromise();
        store.dispatch(categorysAddedAction(categorys));

    }
    public async getAllCategorys() {
        if (store.getState().categorysState.categorys.length === 0) {

            const categorys = await this.http.get<CategoryModel[]>(environment.Categoriesallurl).toPromise();
            store.dispatch(categorysDownloadedAction(categorys));

        }

        return store.getState().categorysState.categorys;
    }

    // Get  products by category : 
    public async getProductByCategory(id: string) {

        if (store.getState().productsState.products.length === 0) {
            const products = await this.http.get<ProductModel[]>(environment.productsUrl).toPromise();
            store.dispatch(productsDownloadedAction(products));
        }
        const product = store.getState().productsState.products.filter(p => p.categoryId === id);
        return product;
    }
}
