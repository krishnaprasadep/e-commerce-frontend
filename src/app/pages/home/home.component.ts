import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDividerModule } from '@angular/material/divider';
import { CommonModule, CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatProgressBarModule,
    MatBadgeModule,
    MatDividerModule,
    CurrencyPipe
  ],
  providers: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  categories = [
    { name: 'Electronics', icon: 'devices' },
    { name: 'Clothing', icon: 'checkroom' },
    { name: 'Books', icon: 'menu_book' },
    { name: 'Home & Kitchen', icon: 'weekend' },
  ];

  newArrivals = [
    { name: 'Wireless Earbuds', price: 99.99, rating: 4 },
    { name: 'Smart Watch', price: 199.99, rating: 5 },
    { name: 'Bluetooth Speaker', price: 79.99, rating: 3 },
    { name: 'Designer T-Shirt', price: 29.99, rating: 4 },
    { name: 'Running Shoes', price: 129.99, rating: 5 },
  ];

  deals = [
    {
      name: 'Smartphone XYZ',
      discount: 15,
      originalPrice: 799.99,
      currentPrice: 679.99,
      stockPercentage: 45,
    },
    {
      name: 'Laptop Pro',
      discount: 20,
      originalPrice: 1299.99,
      currentPrice: 1039.99,
      stockPercentage: 30,
    },
    {
      name: 'Coffee Machine',
      discount: 25,
      originalPrice: 199.99,
      currentPrice: 149.99,
      stockPercentage: 15,
    },
    {
      name: 'Fitness Tracker',
      discount: 30,
      originalPrice: 149.99,
      currentPrice: 104.99,
      stockPercentage: 60,
    },
  ];

  brands = ['Brand1', 'Brand2', 'Brand3', 'Brand4', 'Brand5', 'Brand6'];
}
