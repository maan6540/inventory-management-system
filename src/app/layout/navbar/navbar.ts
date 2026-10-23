import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../../core/services/auth';
import { AsyncPipe } from '@angular/common';
import { Role, RoleOption } from '../../core/api/role';
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
  roles: RoleOption[] = [];

  ngOnInit(): void {
    this.currentUser$.subscribe((user) => {
      if (user && this.roles.length === 0) {
        this.rolesApi.getRoles().subscribe({
          next: (response) => {
            this.roles = response.data;
            this.cdr.detectChanges();
          },
          error: () => {
            this.notification.error('Unable to load available roles.');
          },
        });
      }
    });
  }

  get availableRoles(): RoleOption[] {
    const user = this.auth.currentUser;

    if (!user) {
      return [];
    }

    const originalRolePriority = user.isRoleSwitched
      ? this.roles.find((role) => role.roleId === user.originalRoleId)?.priority
      : user.rolePriority;

    if (originalRolePriority === undefined) {
      return [];
    }

    return this.roles.filter(
      (role) =>
        role.roleId !== user.roleId &&
        (role.priority < originalRolePriority ||
          (user.isRoleSwitched && role.roleId === user.originalRoleId)),
    );
  }

  switchRole(role: RoleOption): void {
    this.auth.switchRole(role.roleId).subscribe({
      next: () => {
        this.notification.success(`You are now viewing the ${role.roleName} role.`);
        void this.router.navigate(['/']);
      },
      error: () => {
        this.notification.error('Unable to switch to the selected role.');
      },
    });
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
