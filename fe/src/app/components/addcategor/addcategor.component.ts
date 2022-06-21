import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NotifyService } from 'src/app/services/notify.service';
import { environment } from 'src/environments/environment';
import { AdminGuard } from '../../services/admin.guard';
import { FormGroup, FormControl } from '@angular/forms';
import CategoryModel from 'src/app/models/category.model';
import { CategoryService } from 'src/app/services/category.service';
@Component({
  selector: 'app-addcategor',
  templateUrl: './addcategor.component.html',
  styleUrls: ['./addcategor.component.css']
})
export class AddcategorComponent implements OnInit {
  public category = new CategoryModel();
  constructor(private notify: NotifyService, private categoryservice: CategoryService, private myRouter: Router,) { }

  ngOnInit(): void {
  }
  public async addc() {
    try {
      await this.categoryservice.addcatgory(this.category);
      this.myRouter.navigateByUrl("/home");
    }
    catch (err) {
      this.notify.error(err);
    }
  }
}
