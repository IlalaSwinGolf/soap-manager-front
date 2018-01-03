import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { environment } from '../../environments/environment';
import { Product } from '../product/product.service';


@Injectable()
export class CategoryService {
    constructor(protected http: Http) { }

    public getAll(): Observable<Category[]> {
        return this.http
            .get(environment.API_URL + 'category')
            .map(response => {
                const categories = response.json();
                return categories.data.map((category) => Category.fromJson(category));
            })
            .catch(this.handleError);
    }

    public add(category: Category): Observable<Category> {
        return this.http.post(environment.API_URL + 'category', category)
            .map(response => {
                return Category.fromJson(response.json().data);
            })
            .catch(this.handleError);
    }

    public remove(category: Category): Observable<boolean> {
        return this.http.delete(environment.API_URL + 'category/' + category.id)
            .map(response => {
                return response.json().success;
            })
            .catch(this.handleError);
    }

    public edit(id: number, category: Category): Observable<Category> {
        let url = environment.API_URL + 'category/' + id;
        return this.http.put(url, { name: category.name })
            .map(response => {
                return Category.fromJson(response.json().data);
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
            new Date(json['updated_at']),
            json['products'],
            false
        );
    }

    constructor(public name: string, public id?: number,
        public createdAt?: Date,
        public updatedAt?: Date,
        public products?: Product[],
        public displayEdit?: boolean) {
    }
}