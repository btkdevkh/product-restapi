import { HttpHeaders } from "@angular/common/http"

export const API_PRODUCT_URL = "http://localhost:3000/api/products"
export const API_USER_URL = "http://localhost:3000/api/auth"

const token: string|null = localStorage.getItem('token') ? localStorage.getItem('token') : null
export const headers = { headers: new HttpHeaders({ 
  'authorization': `Bearer ${token}`,
})}
