import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_PRODUCT_URL } from '../config';
import { Product } from '../Product';

const headers = { headers: new HttpHeaders({ 
  'Content-Type': 'application/json' 
})}

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private http: HttpClient
  ) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(API_PRODUCT_URL)
  }

  getProduct(id: string): Observable<Product> {
    return this.http.get<Product>(`${API_PRODUCT_URL}/${id}`)
  }

  createProduct(product: Product): Observable<Product> {   
    return this.http.post<Product>(API_PRODUCT_URL, product, headers)
  }

  createProductImage(imageFile: File): Observable<File> {    
    const formData: any = new FormData()
    formData.append('image', imageFile)
    
    return this.http.post<File>(API_PRODUCT_URL, formData)
  }

}
