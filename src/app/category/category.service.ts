import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

const API_URL = 'http://localhost:8000/api/v1';

@Injectable()
export class CategoryService {
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

    public removeCategory(category: Category): Observable<boolean> {
        return this.http.delete('http://localhost:8000/api/v1/category/' + category.id)
            .map(response => {
                return !response.json().error;
            })
            .catch(this.handleError);
    }

    private handleError(error: Response | any) {
        return Observable.throw(error);
    }
}

export class Category {
    public static fromJson(json: Object): Category {
        return new Category(
            json['name'],
            json['id'],
            new Date(json['created_at']),
            new Date(json['updated_at'])
        );
    }

    constructor(public name: string, public id?: number,
        public createdAt?: Date,
        public updatedAt?: Date) {
    }
}