import { Component, OnDestroy, OnInit } from '@angular/core';
import { Unsubscribe } from 'redux';
import store from 'src/app/redux/store';
import { UserModel } from 'src/app/models/user.model';
import { OrderService } from 'src/app/services/oreder.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  public count: number;
  public user: UserModel;
  public isAdmin: boolean;
  private unsubscribeMe: Unsubscribe;
  constructor(private OrderService: OrderService) { }
  public async ngOnInit(): Promise<void> {

    this.count = await this.OrderService.getordercunt()
    

    this.user = store.getState().authState.user;
    this.unsubscribeMe = store.subscribe(() => {
      this.isAdmin = store.getState().authState.user?.isAdmin;
      this.user = store.getState().authState.user;
    });
  }

  ngOnDestroy(): void {
    this.unsubscribeMe();
  }

}
