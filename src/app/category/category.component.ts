import { NgModel } from '@angular/forms/src/directives';
import { Component } from '@angular/core';
import { Category, CategoryService } from './category.service';


@Component({
  selector: 'category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent {

  public categories: Category[];

  constructor(private service: CategoryService) {
    this.service.getCategories().subscribe((categories: Category[]) => {
      let sortedCategories = categories.sort((c1, c2) => {
        if (c1.name > c2.name) {
          return 1;
        }
        if (c1.name < c2.name) {
          return -1;
        }
        return 0;
      });
      this.categories = sortedCategories;
    });
  }

  addCategory(f) {
    console.log(f);
    this.service.addCategory(new Category(f.value.name)).subscribe((category: Category) => {
      this.categories.push(category);
    });
  }

  removeCategory(category: Category, $event) {
    $event.stopPropagation();
    $event.preventDefault();
    this.service.removeCategory(category).subscribe((success: boolean) => {
      console.log(success);
      if (success) {
        let index = this.categories.indexOf(category);
        if (index != -1) {
          this.categories.splice(index, 1);
        }
      }
    });
  }
}