import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/Product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  name: string|undefined
  description: string|undefined
  price: number|undefined
  inStock: boolean = true
  
  imageFile: File|undefined

  constructor(
    private productService: ProductService
  ) { }

  ngOnInit(): void {
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
    if(!this.name || !this.description || !this.price || !this.imageFile) {
      console.log("Empty");
      return
    }

    const product: Product = {
      name: this.name,
      description: this.description,
      price: this.price,
      inStock: this.inStock,
    }

    console.log(product);
    
    // this.productService.createProductImage(this.imageFile).subscribe()
    this.productService.createProduct(product).subscribe()
  }

}
