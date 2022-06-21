import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { LayoutComponent } from './components/layout-area/layout/layout.component';
import { HeaderComponent } from './components/layout-area/header/header.component';
import { FooterComponent } from './components/layout-area/footer/footer.component';
import { MenuComponent } from './components/layout-area/menu/menu.component';
import { LogoComponent } from './components/layout-area/logo/logo.component';
import { HomeComponent } from './components/home-area/home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { ProductListComponent } from './components/products-area/product-list/product-list.component';
import { AboutComponent } from './components/about-area/about/about.component';
import { ContactUsComponent } from './components/contact-us-area/contact-us/contact-us.component';
import { Page404Component } from './components/layout-area/page404/page404.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { ProductCardComponent, addtocartDialog } from './components/products-area/product-card/product-card.component';
import { ProductDetailsComponent } from './components/products-area/product-details/product-details.component';
import { AddProductComponent } from './components/products-area/add-product/add-product.component';
import { PleaseWaitComponent } from './components/shared-area/please-wait/please-wait.component';
import { UpdateProductComponent } from './components/products-area/update-product/update-product.component';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { RegisterComponent } from './components/auth-area/register/register.component';
import { LoginComponent } from './components/auth-area/login/login.component';
import { LogoutComponent } from './components/auth-area/logout/logout.component';
import { AuthMenuComponent } from './components/auth-area/auth-menu/auth-menu.component';
import { JwtInterceptor } from './services/jwt.interceptor';
import { AdminComponent } from './components/admin-area/admin/admin.component';
import { ValidateEqualModule } from "ng-validate-equal";
import { CartComponent, orderDialog } from './components/cart-area/cart/cart.component';
import { SearchComponent } from './components/home-area/search/search.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSidenavModule } from '@angular/material/sidenav';
import { CommonModule } from '@angular/common';
import { OrderareaComponent } from './components/orderarea/order-list/orderarea.component';
import { OrdercardsComponent } from './components/orderarea/ordercards/ordercards.component';
import { AddcategorComponent } from './components/addcategor/addcategor.component';

@NgModule({
    declarations: [
        orderDialog,
        addtocartDialog,
        SearchComponent,
        LayoutComponent,
        HeaderComponent,
        FooterComponent,
        MenuComponent,
        LogoComponent,
        HomeComponent,
        ProductListComponent,
        AboutComponent,
        ContactUsComponent,
        Page404Component,
        ProductCardComponent,
        ProductDetailsComponent,
        AddProductComponent,
        PleaseWaitComponent,
        UpdateProductComponent,
        RegisterComponent,
        LoginComponent,
        LogoutComponent,
        AuthMenuComponent,
        AdminComponent,
        CartComponent,
        OrderareaComponent,
        OrdercardsComponent,
        AddcategorComponent,


    ],
    imports: [
        CommonModule,
        MatSidenavModule,
        BrowserAnimationsModule,
        BrowserModule,
        FormsModule,
        HttpClientModule,
        ReactiveFormsModule,
        NgxPaginationModule,
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatDialogModule,
        ValidateEqualModule,

    ],

    // Tell Angular to create a DI object from ArrayService for the entire app: 
    // providers: [ArrayService],

    // Register the interceptor so any request will invoke it: 
    providers: [{
        provide: HTTP_INTERCEPTORS, // Register the interceptor
        useClass: JwtInterceptor, // Our interceptor class
        multi: true // Can register it several times if needed
    }],

    bootstrap: [LayoutComponent]

})
export class AppModule { }
