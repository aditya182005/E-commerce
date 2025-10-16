import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../types/product';
import { Brand } from '../types/brand';
import { Category } from '../types/category';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
    private baseUrl = environment.apiUrl;
  
    constructor(private http: HttpClient) {}
  
    getNewProducts(): Observable<Product[]> {
      return this.http.get<Product[]>(`${this.baseUrl}/api/customers/new-products`);
    }

    getFeaturedProducts(): Observable<Product[]> {
      return this.http.get<Product[]>(`${this.baseUrl}/api/customers/featured-products`);
    }

    getCategories(): Observable<Category[]> {
      return this.http.get<Category[]>(`${this.baseUrl}/api/categories`);
    }

    getBrands(): Observable<Brand[]> {
      return this.http.get<Brand[]>(`${this.baseUrl}/api/brands`);
    }
  
    getProducts(
      searchTerm: string,
      categoryId: string,
      sortBy: string,
      sortOrder: number,
      brandId: string,
      page: number,
      pageSize: number
    ): Observable<Product[]> {
      return this.http.get<Product[]>(      `${this.baseUrl}/api/customers/products?searchTerm=${searchTerm}&categoryId=${categoryId}&sortBy=${sortBy}&sortOrder=${sortOrder}&brandId=${brandId}&page=${page}&pageSize=${pageSize}`
      );
    }
  
    getProductById(id: string): Observable<Product> {
      return this.http.get<Product>(`${this.baseUrl}/api/customers/product/${id}`);
    }

  deleteProduct(productId: string) {
    return this.http.delete(`${this.baseUrl}/api/products/${productId}`);
  }

  submitReview(productId: string, comment: string, rating: number = 5): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/customers/products/${productId}/reviews`, {
      comment,
      rating
    });
  }

  getReviews(productId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/api/customers/products/${productId}/reviews`);
  }

  deleteReview(reviewId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/api/customers/reviews/${reviewId}`);
  }
}
