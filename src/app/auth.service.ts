import { Injectable } from '@angular/core';
import axios from 'axios';
import { Router } from '@angular/router';
import { JWTTokenService } from './jwt-token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://127.0.0.1:8000/api/';

  constructor(public router: Router, private jwtTokenService: JWTTokenService) {}

  async login(username: string, password: string): Promise<void> {
    try {
      const response = await axios.post(`${this.apiUrl}login`, { username, password });
      if (response.data && response.data.token) {
        this.jwtTokenService.setToken(response.data.token);
        localStorage.setItem('jwt', response.data.token);
        localStorage.setItem('username', this.jwtTokenService.getUser());
        localStorage.setItem('roles', JSON.stringify(this.jwtTokenService.getRoles()));
        localStorage.setItem('exp', this.jwtTokenService.getExpiryTime().toString());
        this.router.navigate(['/lessons']);
      }
    } catch (error) {
      console.error('Login error:', error);
    }
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