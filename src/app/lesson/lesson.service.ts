import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { environment } from '../../environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Lesson } from './lesson.model';

@Injectable({
  providedIn: 'root'
})
export class LessonService {

  constructor(private authService: AuthService, private http: HttpClient) {}

  getLessons(): Observable<Lesson[]> {
    return this.http.get<Lesson[]>(`${environment.apiUrl}lessons`).pipe(
      catchError(this.handleError.bind(this))
    );
  }

  getLessonById(id: number): Observable<Lesson> {
    return this.http.get<Lesson>(`${environment.apiUrl}lessons/${id}`).pipe(
      catchError(this.handleError.bind(this))
    );
  }

  createLesson(lessonData: any): Observable<Lesson> {
    return this.http.post<Lesson>(`${environment.apiUrl}lessons`, lessonData).pipe(
      catchError(this.handleError.bind(this))
    );
  }

  updateLesson(id: number, lessonData: Lesson): Observable<Lesson> {
    return this.http.put<Lesson>(`${environment.apiUrl}lessons/${id}`, lessonData).pipe(
      catchError(this.handleError.bind(this))
    );
  }

  deleteLesson(id: number): Observable<Lesson> {
    return this.http.delete<Lesson>(`${environment.apiUrl}lessons/${id}`).pipe(
      catchError(this.handleError.bind(this))
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('Error:', error);
    if (error.error.message === 'Invalid JWT Token') {
      console.error('Invalid JWT Token, logging out');
      this.authService.logout();
    }
    return throwError(() => new Error(error.message));
  }
}
