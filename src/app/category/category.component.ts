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
    this.service.getAll().subscribe((categories: Category[]) => {
      this.categories = categories;
    });
  }

  add(f) {
    this.service.add(new Category(f.value.name)).subscribe((category: Category) => {
      this.categories.push(category);
    });
  }

  remove(category: Category, $event) {
    this.stopPropagation($event);
    this.service.remove(category).subscribe((success: boolean) => {
      if (success) {
        this.removeCategoryFromList(category);
      }
    });
  }

  removeCategoryFromList(category: Category) {
    let index = this.categories.indexOf(category);
    if (index != -1) {
      this.categories.splice(index, 1);
    }
  }

  edit(category: Category, $event) {
    this.stopPropagation($event);
    this.service.edit(category.id, category).subscribe((editedCategory: Category) => {
      this.removeCategoryFromList(category);
      this.categories.push(editedCategory);
    });
  }

  toggleEdit(category: Category, $event) {
    this.stopPropagation($event);
    category.displayEdit = !category.displayEdit;
    console.log(category.displayEdit);
  }

  stopPropagation($event) {
    $event.stopPropagation();
    $event.preventDefault();
  }
}