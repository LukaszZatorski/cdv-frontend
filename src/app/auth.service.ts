import { Injectable } from '@angular/core';
import axios, { AxiosError } from 'axios';
import { Router } from '@angular/router';
import { JWTTokenService } from './jwt-token.service';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public router: Router, private jwtTokenService: JWTTokenService) {}

  async login(username: string, password: string): Promise<string | null> {
    try {
      const response = await axios.post(`${environment.apiUrl}login`, { username, password });
      if (response.data && response.data.token) {
        this.jwtTokenService.setToken(response.data.token);
        localStorage.setItem('jwt', response.data.token);
        localStorage.setItem('username', this.jwtTokenService.getUser());
        localStorage.setItem('roles', JSON.stringify(this.jwtTokenService.getRoles()));
        localStorage.setItem('exp', this.jwtTokenService.getExpiryTime().toString());
        this.router.navigate(['/lessons']);
        return null;
      }
    } catch (error: any) {
      console.error('Login error:', error);
      if (error.response && error.response.status === 401) {
        return 'Invalid username or password';
      }
    }
    return 'An unknown error occurred';
  }

  isLoggedIn(): boolean {
    const jwt = localStorage.getItem('jwt');
    return !!jwt;
  }

  logout(): void {
    localStorage.removeItem('jwt');
    localStorage.removeItem('username');
    localStorage.removeItem('roles');
    localStorage.removeItem('exp');
    this.router.navigate(['/']);
  }
}