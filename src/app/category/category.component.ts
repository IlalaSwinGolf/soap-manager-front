import { NgModel } from '@angular/forms/src/directives';
import { Component, Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

export class Category {
  public static fromJson(json: Object): Category {
    return new Category(
      json['name'],
      new Date(json['created_at']),
      new Date(json['updated_at'])
    );
  }

  constructor(public name: string,
    public createdAt?: Date,
    public updatedAt?: Date) {
  }
}

const API_URL = 'http://localhost:8000/api/v1';
@Injectable()
export class DataService {
  constructor(protected http: Http) { }

  public getCategories(): Observable<Category[]> {
    return this.http
      .get(API_URL + '/category')
      .map(response => {
        const categories = response.json();
        console.log(categories.data);
        return categories.data.map((category) => Category.fromJson(category));
      })
      .catch(this.handleError);
  }

  public addCategory(category: Category): Observable<Category> {
    return this.http.post('http://localhost:8000/api/v1/category', category)
      .map(response => {
        return Category.fromJson(response.json().data);
      })
      .catch(this.handleError);
  }

  private handleError(error: Response | any) {
    return Observable.throw(error);
  }
}


@Component({
  selector: 'category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent {

  public categories: Category[];

  constructor(private data: DataService) {
    this.data.getCategories().subscribe((categories: Category[]) => {
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
    this.data.addCategory(new Category(f.value.name)).subscribe((category: Category) => {
      this.categories.push(category);
    });
  }
}