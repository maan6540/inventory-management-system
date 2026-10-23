import { ChangeDetectorRef, Component, inject, Input, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  ɵInternalFormsSharedModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { UserApi } from '../../../core/api/user-api';
import { NotificationService } from '../../../core/services/notification';
import { CreateUserRequest } from '../../../core/models/user/create-user-request';
import { forkJoin } from 'rxjs';
import { Role } from '../../../core/api/role';
import { Department } from '../../../core/api/department';
import { Status } from '../../../core/api/status';
import { Dropdown } from '../dropdown/dropdown';
import { ModalService } from '../../../core/services/modal';
import { Auth } from '../../../core/services/auth';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  imports: [ɵInternalFormsSharedModule, ReactiveFormsModule, Dropdown],
  selector: 'app-addedituserform',
  styleUrl: './addedituserform.scss',
  templateUrl: './addedituserform.html',
})
export class Addedituserform implements OnInit {
  private notification = inject(NotificationService);
  private userApi = inject(UserApi);
  private rolesApi = inject(Role);
  private departmentApi = inject(Department);
  private statusApi = inject(Status);
  private changeDetector = inject(ChangeDetectorRef);
  private modalService = inject(ModalService);
  private auth = inject(Auth);

  @Input() user: any;

  departments: any[] = [];
  roles: any[] = [];
  status: any[] = [];

  isEditMode = false;
  currentUserRolePriority = 0;
  currentUserRole = '';

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

        if (this.isEditMode) {
          this.userInfoForm.patchValue({
            userFullname: this.user.fullName,
            userName: this.user.username,
            userEmail: this.user.email,
            userDepartment: this.user.departmentId,
            userRole: this.user.roleId,
            userStatus: this.user.statusId,
          });
        }

        this.changeDetector.detectChanges();
      }
    });
  }

  ngOnInit(): void {
    if (this.user) this.isEditMode = true;

    this.auth.currentUser$.subscribe((user) => {
      if (user) {
        this.currentUserRole = user.role;
        this.currentUserRolePriority = user.rolePriority;
      }
    });

    if (!this.isEditMode) {
      this.userPassword?.addValidators([Validators.required, Validators.minLength(5)]);

      this.userPassword?.updateValueAndValidity();
    }

    this.loadData();
  }

  userInfoForm = new FormGroup({
    userFullname: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.pattern(/^[A-Za-z ]+$/)],
    }),

    userName: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(5), Validators.pattern(/^[A-Za-z][A-Za-z0-9._-]*$/)],
    }),

    userEmail: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),

    userPassword: new FormControl('', {
      nonNullable: true,
    }),

    userDepartment: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),

    userRole: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),

    userStatus: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  onDepartmentChange(department: any) {
    this.userInfoForm.patchValue({
      userDepartment: department.departmentId,
    });

    this.userDepartment?.markAsTouched();
  }

  onRoleChange(role: any) {
    this.userInfoForm.patchValue({
      userRole: role.roleId,
    });

    this.userRole?.markAsTouched();
  }

  onStatusChange(status: any) {
    this.userInfoForm.patchValue({
      userStatus: status.statusId,
    });
    this.userStatus?.markAsTouched();
  }

  get userFullname() {
    return this.userInfoForm.get('userFullname');
  }
  get userName() {
    return this.userInfoForm.get('userName');
  }
  get userEmail() {
    return this.userInfoForm.get('userEmail');
  }

  get userPassword() {
    return this.userInfoForm.get('userPassword');
  }

  get userDepartment() {
    return this.userInfoForm.get('userDepartment');
  }
  get userRole() {
    return this.userInfoForm.get('userRole');
  }

  get userStatus() {
    return this.userInfoForm.get('userStatus');
  }

  get manageDepartment() {
    return this.userInfoForm.get('manageDepartment');
  }

  get availableRoles() {
    // Super Admin can see all roles
    if (this.currentUserRole === 'Super Admin') {
      return this.roles;
    }

    // Other roles can only see roles below them
    return this.roles.filter((role) => role.priority < this.currentUserRolePriority);
  }

  submit() {
    this.userInfoForm.markAllAsTouched();

    if (this.userInfoForm.invalid) {
      this.notification.error('Please fix the validation errors.');
      return;
    }

    const formValue = this.userInfoForm.getRawValue();

    const user: any = {
      Username: formValue.userName,
      FullName: formValue.userFullname,
      Email: formValue.userEmail,
      RoleId: Number(formValue.userRole),
      DepartmentId: Number(formValue.userDepartment),
      StatusId: Number(formValue.userStatus),
    };

    if (this.isEditMode) {
      user.UserId = this.user.userId;

      this.userApi.updateUser(this.user.id, user).subscribe({
        next: (response) => {
          this.modalService.complete(response.message);
        },
        error: (error: HttpErrorResponse) => this.handleSubmitError(error),
      });
    } else {
      user.Password = formValue.userPassword;

      this.userApi.addUser(user).subscribe({
        next: (response) => {
          this.modalService.complete(response.message);
        },
        error: (error: HttpErrorResponse) => this.handleSubmitError(error),
      });
    }
  }

  closeModal() {
    this.modalService.close();
  }

  private handleSubmitError(error: HttpErrorResponse): void {
    const message =
      typeof error.error?.message === 'string'
        ? error.error.message
        : 'Unable to save the user. Please try again.';

    this.notification.error(message);
  }
}
