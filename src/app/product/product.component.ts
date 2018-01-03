import { NgModel } from '@angular/forms/src/directives';
import { Component } from '@angular/core';
import { Product, ProductService } from './product.service';

@Component({
  selector: 'product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent{

  public products: Product[];

  constructor(private service: ProductService) {
  }

}