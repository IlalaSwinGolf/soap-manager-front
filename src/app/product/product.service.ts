import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { environment } from '../../environments/environment';

@Injectable()
export class ProductService {
    constructor(protected http: Http) { }

    public getAll(): Observable<Product[]> {
        return this.http
            .get(environment.API_URL + 'product')
            .map(response => {
                const products = response.json();
                return products.data.map((product) => Product.fromJson(product));
            })
            .catch(this.handleError);
    }

    public add(product: Product): Observable<Product> {
        return this.http.post(environment.API_URL + 'product', product)
            .map(response => {
                return Product.fromJson(response.json().data);
            })
            .catch(this.handleError);
    }

    public remove(product: Product): Observable<boolean> {
        return this.http.delete(environment.API_URL + 'product/' + product.id)
            .map(response => {
                return response.json().success;
            })
            .catch(this.handleError);
    }

    public edit(id: number, product: Product): Observable<Product> {
        let url = environment.API_URL + 'product/' + id;
        return this.http.put(url, { name: product.name })
            .map(response => {
                return Product.fromJson(response.json().data);
            })
            .catch(this.handleError);
    }

    private handleError(error: Response | any) {
        return Observable.throw(error);
    }
}

export class Product {
    public static fromJson(json: Object): Product {
        return new Product(
            json['name'],
            json['category_id'],            
            json['id'],
            new Date(json['created_at']),
            new Date(json['updated_at'])
        );
    }

    constructor(public name: string, public category_id: number,public id?: number,
        public createdAt?: Date,
        public updatedAt?: Date) {
    }
}