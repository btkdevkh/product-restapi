import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/Product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  product: Product|undefined
  productId: string|undefined

  name: string|undefined
  description: string|undefined
  price: number|undefined
  inStock: boolean = true
  
  imageFile: File|undefined

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    const id: string|null = this.route.snapshot.paramMap.get('id')

    if(id) {      
      this.productId = id
      this.productService.getProduct(id).subscribe(products => {
        this.product = products

        this.name = this.product.name
        this.description = this.product.description
        this.price = this.product.price
      })
    }
  }

  handleFileInput(e: any) {
    if(!e.target) return

    this.imageFile = e.target.files[0]
    
    if(!this.imageFile) {
      console.log("undefined");
      return
    }    
  }

  onSubmit() {
    if(!this.name || !this.description || !this.price) {
      console.log("Empty");
      return
    }

    const product: Product = {
      name: this.name,
      description: this.description,
      price: this.price,
      inStock: this.inStock,
    }

    if(this.productId) {
      this.productService.updateProduct(product, this.imageFile, this.productId).subscribe()
    } else {
      if(this.imageFile) this.productService.createProduct(product, this.imageFile).subscribe()
    }

  }

}
