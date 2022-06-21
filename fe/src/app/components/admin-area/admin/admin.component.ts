import { Component, OnInit } from '@angular/core';
import { AdminGuard } from '../../../services/admin.guard';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private adminguard: AdminGuard) { }
  public admin: boolean;
  ngOnInit(): void {
    this.admin = this.adminguard.canActivate();
  }

}
