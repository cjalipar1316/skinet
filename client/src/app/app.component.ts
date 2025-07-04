import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './layout/header/header.component';
import { environment } from '../environment';
import { HttpClient } from '@angular/common/http';
import { Product } from './shared/models/product';
import { Pagination } from './shared/models/pagination';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  private http = inject(HttpClient);
  title = 'Skinet';
  products: Product[] = [];

  ngOnInit(): void {
    this.http.get<Pagination<Product>>(environment.baseUrl+"products").subscribe({
      next: response => {
        this.products = response.data;
      },
      error: error => {
        console.error(error);
      }
    });
  }
}
