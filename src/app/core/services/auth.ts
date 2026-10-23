import { Injectable, inject } from '@angular/core';
import { AuthApi, LoginRequest } from '../api/auth-api';
import { BehaviorSubject, switchMap, tap } from 'rxjs';
import { CurrentUser } from '../models/current-user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private currentUserSubject = new BehaviorSubject<CurrentUser | null>(null);

  currentUser$ = this.currentUserSubject.asObservable();
  private tokenKey = 'auth_token';
  private authApi = inject(AuthApi);

  private router = inject(Router);

  constructor() {
    window.addEventListener('storage', (event) => {
      if (event.key === this.tokenKey && event.newValue === null) {
        this.currentUserSubject.next(null);

        this.router.navigate(['/login']);
      }
    });
  }

  restoreSession() {
    const token = localStorage.getItem(this.tokenKey);

    if (token) {
      this.getMe().subscribe({
        next: () => {},
        error: () => {
          this.expireSession();
          void this.router.navigate(['/login'], { replaceUrl: true });
        },
      });
    }
  }
  login(credentials: LoginRequest) {
    return this.authApi.login(credentials).pipe(
      tap((response) => {
        localStorage.setItem(this.tokenKey, response.data.token);
      }),
      switchMap(() => this.getMe()),
    );
  }

  switchRole(roleId: number) {
    return this.authApi.switchRole(roleId).pipe(
      tap((response) => this.setAuthenticatedContext(response.data)),
    );
  }

  getMe() {
    return this.authApi.me().pipe(
      tap((response) => {
        this.currentUserSubject.next(response.data);
      }),
    );
  }

  get currentUser(): CurrentUser | null {
    return this.currentUserSubject.value;
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.currentUserSubject.next(null);
  }

  expireSession(): void {
    this.logout();
  }

  private setAuthenticatedContext(response: { token: string } & CurrentUser): void {
    localStorage.setItem(this.tokenKey, response.token);
    const { token: _token, ...user } = response;
    this.currentUserSubject.next(user);
  }
}
