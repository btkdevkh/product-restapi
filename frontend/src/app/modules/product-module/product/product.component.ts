import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/Product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  @Input() product: Product|undefined

  constructor(
    private productService: ProductService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  updateProduct(id: number|undefined) {
    if(id) this.router.navigate(['/admin', id])
  }

  deleteProduct(id: number|undefined) {
    if(id) this.productService.deleteProduct(String(id)).subscribe()
  }

}
