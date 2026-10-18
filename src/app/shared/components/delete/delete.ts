import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, Input } from '@angular/core';
import { ModalService } from '../../../core/services/modal';
import { UserApi } from '../../../core/api/user-api';

@Component({
  imports: [],
  selector: 'app-delete',
  styleUrl: './delete.scss',
  templateUrl: './delete.html',
})
export class Delete {
  private modalService = inject(ModalService);
  private userApi = inject(UserApi);
  @Input() user: any;
  errorMessage = '';
  isDeleting = false;

  confirm() {
    this.errorMessage = '';
    this.isDeleting = true;

    this.userApi.removeUser(this.user.id).subscribe({
      next: (response) => {
        this.isDeleting = false;
        this.modalService.complete(response.message);
      },
      error: (error: HttpErrorResponse) => {
        this.isDeleting = false;
        this.errorMessage = this.getErrorMessage(error);
      },
    });
  }

  closeModal() {
    this.modalService.close();
  }

  private getErrorMessage(error: HttpErrorResponse): string {
    if (typeof error.error === 'string' && error.error.trim()) {
      return error.error;
    }

    if (error.error?.message && typeof error.error.message === 'string') {
      return error.error.message;
    }

    return 'Unable to delete this user. Please try again.';
  }
}
