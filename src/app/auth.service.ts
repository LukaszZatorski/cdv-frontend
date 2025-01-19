import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JWTTokenService } from './jwt-token.service';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

interface JWT {
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public router: Router, private jwtTokenService: JWTTokenService, private http: HttpClient) {}

  login(username: string, password: string): Observable<JWT | null> {
    return this.http.post<JWT>(`${environment.apiUrl}login`, { username, password }, { observe: 'response' }).pipe(
      map(response => {
        if (response.body) {
          this.jwtTokenService.setToken(response.body.token);
          localStorage.setItem('jwt', response.body.token);
          localStorage.setItem('username', this.jwtTokenService.getUser());
          localStorage.setItem('roles', JSON.stringify(this.jwtTokenService.getRoles()));
          localStorage.setItem('exp', this.jwtTokenService.getExpiryTime().toString());
          this.router.navigate(['/lessons']);
          return response.body;
        }
        return null;
      }),
      catchError(error => {
        console.error('Login request failed', error);
        return throwError(() => new Error(error))
      })
    );
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