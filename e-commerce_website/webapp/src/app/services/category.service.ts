import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Category } from '../types/category';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  http = inject(HttpClient);
  baseUrl = `${environment.apiUrl}/api/categories`; // ✅ Base URL Define Kiya

  constructor() { }

  getCategories() {
    return this.http.get<Category[]>(`${this.baseUrl}`);
  }

  getCategoryById(id: string) {
    return this.http.get<Category>(`${this.baseUrl}/${id}`); // ✅ Correct API Path
  }

  addCategory(name: string) {
    return this.http.post(`${this.baseUrl}`, { name });
  }

  updateCategory(id: string, name: string) {
    return this.http.put(`${this.baseUrl}/${id}`, { name }); // ✅ Correct API Path
  }

  deleteCategoryById(id: string) {
    return this.http.delete(`${this.baseUrl}/${id}`); // ✅ Correct API Path
  }
}
