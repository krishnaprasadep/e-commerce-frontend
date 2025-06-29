import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MasterService } from '../master';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = '';

  constructor(private http: HttpClient, private router: Router, private masterService: MasterService) { 
    this.apiUrl = this.masterService.apiUrl;
  }

  // Login method
  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/v1/auth/login`, { email, password })
      .pipe(
        map((response: any) => {
          if (response.success && response.data.accessToken) {
            // Store user details and jwt token in local storage
            localStorage.setItem('accessToken', response.data.accessToken);
            localStorage.setItem('user', JSON.stringify(response.data.user));
          }
          return response;
        })
      );
  }

  // Register method
  register(name: string, email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/v1/auth/register`, { name, email, password })
      .pipe(
        map((response: any) => {
          return response;
        })
      );
  }


  // Get access token
  getToken(): string | null {
    return localStorage.getItem('accessToken');
  }

  // Get current user details
  getCurrentUser(): any {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  // Check if the user is logged in
  isLoggedIn(): boolean {
    return this.getToken() !== null;
  }

  // Logout method
  logout(): void {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  // Get user role
  getUserRole(): string | null {
    const user = this.getCurrentUser();
    return user ? user.role : null;
  }
}
