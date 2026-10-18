import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from '../../../core/services/auth';
import { NotificationService } from '../../../core/services/notification';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-login',
  styleUrl: './login.scss',
  templateUrl: './login.html',
})
export class Login {
  private notification = inject(NotificationService);
  authService = inject(Auth);
  router = inject(Router);
  loginForm = new FormGroup({
    username: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(5)],
    }),
    password: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(5)],
    }),
  });

  get username() {
    return this.loginForm.get('username');
  }
  get password() {
    return this.loginForm.get('password');
  }

  login() {
    // this.loginForm.markAllAsTouched();

    // if (this.loginForm.invalid) {
    //   return;
    // }
    var authResponse = this.authService.login(this.loginForm.getRawValue());
    authResponse.subscribe({
      next: (response) => {
        console.log(response);
        this.router.navigate(['/']);
      },
      error: (error) => {
        const message = error.error?.message ?? 'Unable to sign in. Please try again.';

        this.notification.error(message);
      },
    });

    // this.router.navigate(['']);
  }
}
