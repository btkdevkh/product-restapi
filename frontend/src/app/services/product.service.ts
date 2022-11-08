import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_PRODUCT_URL } from '../config';
import { Product } from '../Product';

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

  createProduct(product: Product, imageFile: File): Observable<Product> {   
    const formData: FormData = new FormData()
    formData.append("product", JSON.stringify(product))
    formData.append("image", imageFile)

    return this.http.post<Product>(API_PRODUCT_URL, formData)
  }

}
