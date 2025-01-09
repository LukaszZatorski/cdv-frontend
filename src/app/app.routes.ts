import { Routes, CanActivateFn } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LessonListComponent } from './lesson/lesson-list.component';
import { LessonDetailComponent } from './lesson/lesson-detail.component';
import { LessonFormComponent } from './lesson/lesson-form.component';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';

const loginGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  if (authService.isLoggedIn()) {
    authService.router.navigate(['/lessons']);
    return false;
  }
  return true;
};

const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  if (!authService.isLoggedIn()) {
    authService.router.navigate(['/']);
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
  { 
    path: 'lessons', 
    component: LessonListComponent,
    canActivate: [authGuard]
  },
  { 
    path: 'lessons/add', 
    component: LessonFormComponent,
    canActivate: [authGuard]
  },
  { 
    path: 'lessons/:id', 
    component: LessonDetailComponent,
    canActivate: [authGuard]
  },
  { 
    path: 'lessons/edit/:id', 
    component: LessonFormComponent,
    canActivate: [authGuard]
  },
  { 
    path: '**', 
    redirectTo: '' 
  }
];
