import { Component, OnInit } from '@angular/core';
import CategoryModel from 'src/app/models/category.model';
import { CategoryService } from 'src/app/services/category.service';
import { NotifyService } from 'src/app/services/notify.service';
@Component({
  selector: 'app-categorylist',
  templateUrl: './categorylist.component.html',
  styleUrls: ['./categorylist.component.css']
})
export class CategorylistComponent implements OnInit {
 
  public category: CategoryModel[];

  constructor(private mycategoryService: CategoryService, private notify: NotifyService) { }

  async ngOnInit() {
    try {

      this.category = await this.mycategoryService.getAllCategorys();

    }
    catch (err) {
      this.notify.error(err);
    }
  }

}