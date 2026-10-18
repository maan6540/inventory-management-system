import { Component, ChangeDetectorRef, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NotificationService } from '../../core/services/notification';
import { UserApi, UserFilter } from '../../core/api/user-api';

import { Dropdown } from '../../shared/components/dropdown/dropdown';
import { Table } from '../../shared/components/table/table';

import { Role } from '../../core/api/role';
import { Department } from '../../core/api/department';
import { Status } from '../../core/api/status';
import { debounceTime, forkJoin, Subject } from 'rxjs';
import { ModalService } from '../../core/services/modal';
import { Addedituserform } from '../../shared/components/addedituserform/addedituserform';
import { Delete } from '../../shared/components/delete/delete';

@Component({
  imports: [Dropdown, FormsModule, Table],
  selector: 'app-user',
  styleUrl: './user.scss',
  templateUrl: './user.html',
})
export class User implements OnInit {
  private notification = inject(NotificationService);
  private userApi = inject(UserApi);
  private rolesApi = inject(Role);
  private departmentApi = inject(Department);
  private statusApi = inject(Status);
  private changeDetector = inject(ChangeDetectorRef);

  departmentId: number | null = null;
  roleId: number | null = null;
  statusId: number | null = null;

  searchText: string | null = null;
  searchSubject = new Subject<string>();

  // users = usersdata;
  users: any[] = [];
  departments: any[] = [];
  roles: any[] = [];
  status: any[] = [];
  pageNumber = 1;
  pageSize = 10;
  totalpages = 0;
  totalItems = 0;

  ngOnInit(): void {
    this.loadData();
    this.loadUsers();

    this.searchSubject.pipe(debounceTime(500)).subscribe(() => {
      this.pageNumber = 1;
      this.loadUsers();
    });
  }

  private modalService = inject(ModalService);

  openModal() {
    this.modalService.open(Addedituserform, 'User Information', (message) => {
      this.notification.success(message);
      this.modalService.close();
      this.loadUsers();
    });
  }

  closeModal() {
    this.modalService.close();
  }

  loadData() {
    forkJoin([
      this.rolesApi.getRoles(),
      this.departmentApi.getDepartment(),
      this.statusApi.getStatus(),
    ]).subscribe({
      next: ([roles, departments, status]) => {
        this.roles = roles.data;
        this.departments = departments.data;
        this.status = status.data;
      },
    });
  }

  deleteuser(user: any) {
    this.modalService.open(
      Delete,
      'Delete User',
      (message) => {
        this.notification.success(message);
        this.modalService.close();
        this.loadUsers();
      },
      { user: user },
    );
  }

  edituser(user: any) {
    this.modalService.open(
      Addedituserform,
      'Edit User',
      (message) => {
        this.notification.success(message);
        this.modalService.close();
        this.loadUsers();
      },
      { user: user },
    );
  }

  onDepartmentSelected(department: any) {
    this.departmentId = department.departmentId;
    this.pageNumber = 1;
    this.loadUsers();
  }

  onRoleSelected(role: any) {
    this.roleId = role.roleId;
    this.pageNumber = 1;
    this.loadUsers();
  }

  onStatusSelected(status: any) {
    this.statusId = status.statusId;
    this.pageNumber = 1;
    this.loadUsers();
  }

  onSearch() {
    this.searchSubject.next(this.searchText ?? '');
  }

  onPageChange(pageNumber: number) {
    this.pageNumber = pageNumber;
    this.loadUsers();
  }
  onPageSizeChange(pageSize: number) {
    this.pageSize = pageSize;
    this.pageNumber = 1;
    this.loadUsers();
  }

  resetFilters() {
    this.departmentId = null;
    this.roleId = null;
    this.statusId = null;
    this.searchText = null;

    this.loadUsers();
  }
  loadUsers(): void {
    const filters: UserFilter = {
      search: this.searchText ?? '',
      departmentId: this.departmentId ?? undefined,
      roleId: this.roleId ?? undefined,
      statusId: this.statusId ?? undefined,
      pageNumber: this.pageNumber,
      pageSize: this.pageSize,
    };

    this.userApi.getUsers(filters).subscribe({
      next: (response) => {
        this.users = response.data.items;
        this.totalpages = response.data.totalPages;
        this.totalItems = response.data.totalItems;
        this.changeDetector.detectChanges();
      },
    });
  }
}
