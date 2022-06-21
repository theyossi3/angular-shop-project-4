import { Component, OnDestroy, OnInit } from '@angular/core';
import { Unsubscribe } from 'redux';
import store from 'src/app/redux/store';
import { UserModel } from 'src/app/models/user.model';
@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit, OnDestroy {

    public user: UserModel;
    public isAdmin: boolean;
    private unsubscribeMe: Unsubscribe;


    ngOnInit(): void {
        this.user = store.getState().authState.user;
       
        this.unsubscribeMe = store.subscribe(() => {
            this.user = store.getState().authState.user;

        });
    }

    ngOnDestroy(): void {
        this.unsubscribeMe();
    }
}
