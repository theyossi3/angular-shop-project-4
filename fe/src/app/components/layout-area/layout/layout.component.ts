import { Component, OnInit } from '@angular/core';
import store from 'src/app/redux/store';
import { UserModel } from 'src/app/models/user.model';
@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit  {
    public user: UserModel;
    public isAdmin: boolean;
    ngOnInit(): void {
        this.user = store.getState().authState.user;
    }
}
