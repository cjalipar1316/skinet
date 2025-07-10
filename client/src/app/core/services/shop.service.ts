import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Product } from '../../shared/models/product';
import { Pagination } from '../../shared/models/pagination';
import { environment } from '../../../environment';
import { Observable } from 'rxjs';
import { ShopParams } from '../../shared/models/shopParams';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  private http = inject(HttpClient);
  types : string[] = [];
  brands : string[] = [];

  getProducts(shopParams: ShopParams): Observable<Pagination<Product>> {
    let params = new HttpParams();
    if(shopParams.brands.length > 0){
      params = params.append('brands', shopParams.brands.join(','));
    }

    if(shopParams.types.length > 0){
      params = params.append('types', shopParams.types.join(','));
    }

    if(shopParams.sort){
      params = params.append('sort', shopParams.sort);
    }

    if(shopParams.search){
      params = params.append('search', shopParams.search);
    }

    params = params.append('pageSize', shopParams.pageSize);
    params = params.append('pageIndex', shopParams.pageNumber);

    return this.http.get<Pagination<Product>>(environment.baseUrl+"products", {params});
  }

  getBrands(){
    return this.http.get<string[]>(environment.baseUrl+"products/brands").subscribe({
      next: (response) => this.brands = response
    });
  }

  getTypes(){
    return this.http.get<string[]>(environment.baseUrl+"products/types").subscribe({
      next: (response) => this.types = response
    });
  }
}
