import { Routes } from '@angular/router';
import {Dashboard} from './features/dashboard/dashboard';
export const routes: Routes = [
    {
        path: '',
        component: Dashboard,
    },
    { 
        path: 'users', 
        loadComponent: ()=> import ('./features/user/user').then(m => m.User), 
    }
];
