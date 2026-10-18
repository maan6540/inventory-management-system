import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../../core/services/auth';
import { AsyncPipe } from '@angular/common';
import { Role } from '../../core/api/role';
import { NotificationService } from '../../core/services/notification';

@Component({
  imports: [RouterLink, AsyncPipe],
  selector: 'app-navbar',
  styleUrl: './navbar.scss',
  templateUrl: './navbar.html',
})
export class Navbar implements OnInit {
  private auth = inject(Auth);
  private rolesApi = inject(Role);
  private notification = inject(NotificationService);
  currentUser$ = this.auth.currentUser$;
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);
  roles: any[] = [];

  ngOnInit(): void {
    this.currentUser$.subscribe((user) => {
      if (this.isSuperAdmin(user?.role) && this.roles.length === 0) {
        this.rolesApi.getRoles().subscribe({
          next: (response) => {
            this.roles = response.data;
            this.cdr.detectChanges();
            console.log(this.roles);
          },
          error: () => {
            this.notification.error('Unable to load available roles.');
          },
        });
      }
    });
  }

  isSuperAdmin(role: string | undefined): boolean {
    return role?.replace(/\s+/g, '').toLowerCase() === 'superadmin';
  }

  showRole() {
    console.log('Roless');
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
