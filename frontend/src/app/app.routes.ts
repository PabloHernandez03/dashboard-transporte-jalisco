import { Routes } from '@angular/router';
import { authGuard } from './auth-guard';
import { Dashboard } from './dashboard/dashboard';
import { Login } from './login/login';

export const routes: Routes = [
  { path: 'login', component: Login },
  { path: '', component: Dashboard, canActivate: [authGuard] },
  { path: '**', redirectTo: '' },
];
