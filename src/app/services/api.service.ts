import { Injectable } from '@angular/core';
import { MasterService } from '../master';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = '';

  constructor(private http: HttpClient, private masterService: MasterService) { 
    this.apiUrl = this.masterService.apiUrl;
  }

  getCategories() {
    return this.http.get(`${this.apiUrl}/api/categories`);
  }
}
