import { Routes, CanActivateFn } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LessonListComponent } from './lesson/lesson-list.component';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';

const loginGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  if (authService.isLoggedIn()) {
    authService.router.navigate(['/lessons']); // Redirect to lessons if logged in
    return false;
  }
  return true;
};

export const routes: Routes = [
  { 
    path: '', 
    component: LoginComponent,
    canActivate: [loginGuard]
  },
  { path: 'lessons', component: LessonListComponent },
  { path: '**', redirectTo: '' }
];
