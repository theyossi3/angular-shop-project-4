import { Component, OnDestroy, OnInit } from '@angular/core';
import { Unsubscribe } from 'redux';
import store from 'src/app/redux/store';
import { UserModel } from 'src/app/models/user.model';
@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
    public user: UserModel;
    public isAdmin: boolean;
    private unsubscribeMe: Unsubscribe;
    ngOnInit(): void {
        this.user = store.getState().authState.user;
        this.isAdmin = store.getState().authState.user?.isAdmin;
        this.unsubscribeMe = store.subscribe(() => {
            this.user = store.getState().authState.user;

        });
    }

    ngOnDestroy(): void {
        this.unsubscribeMe();
    }
}
