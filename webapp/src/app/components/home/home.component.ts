import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerService } from '../../services/customer.service';
import { Product } from '../../types/product';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { ProductCardComponent } from '../product-card/product-card.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MatCardModule, RouterLink, ProductCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  customerService = inject(CustomerService);
  products: Product[] = [];

  ngOnInit() {
    this.customerService.getProducts('', '', '', -1, '', 1, 100).subscribe(products => {
      this.products = products;
    });
  }
}
