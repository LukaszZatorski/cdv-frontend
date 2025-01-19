import { Injectable } from '@angular/core';
import { HttpEvent, HttpRequest, HttpHandlerFn } from '@angular/common/http';
import { Observable } from 'rxjs';


export function authInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      const reqWithHeader = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${jwt}`)
      });
      return next(reqWithHeader);
    } else {
      return next(req);
    }
  }