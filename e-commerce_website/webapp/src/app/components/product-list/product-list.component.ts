import { Component, inject, OnInit } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { Product } from '../../types/product';
import { ActivatedRoute } from '@angular/router';
import { Brand } from '../../types/brand';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, MatSelectModule, MatCardModule, FormsModule, MatButtonModule,RouterModule ],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  customerService = inject(CustomerService);
  route = inject(ActivatedRoute);

  searchTerm: string = '';
  categoryId: string = '';
  brandId: string = '';
  sortBy: string = '';
  sortOrder: number = -1;
  page: number = 1;
  pageSize: number = 6;
  isNext: boolean = true;

  products: Product[] = [];
  brands: Brand[] = [];

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.searchTerm = params['search'] || '';
      this.categoryId = params['categoryId'] || '';
      this.loadBrands();
      this.getProducts();
    });
  }

  loadBrands() {
    if (this.categoryId) {
      // Fetch products for the category and extract unique brands
      this.customerService.getProducts('', this.categoryId, '', -1, '', 1, 1000).subscribe(products => {
        const brandIds = [...new Set(products.map(p => p.brandId))];
        this.customerService.getBrands().subscribe(allBrands => {
          this.brands = allBrands.filter(brand => brand._id && brandIds.includes(brand._id));
        });
      });
    } else {
      // If no category selected, show all brands
      this.customerService.getBrands().subscribe((result) => {
        this.brands = result;
      });
    }
  }

  getProducts() {
    setTimeout(() => {
      this.customerService.getProducts(
        this.searchTerm,
        this.categoryId,
        this.sortBy,
        this.sortOrder,
        this.brandId,
        this.page,
        this.pageSize
      ).subscribe((result) => {
        this.products = result;
        this.isNext = result.length >= this.pageSize;
      });
    }, 500);
  }

  orderChange(event: any) {
    console.log('Sort Order Changed:', event.value);
    this.sortBy = 'price';
    this.sortOrder = event.value; // ✅ 'sta' problem fixed (Correct Value Assigned)
    this.getProducts();
  }
  

  pageChange(page: number) {
    if (page >= 1) {
      this.page = page;
      this.getProducts();
    }
  }
}
