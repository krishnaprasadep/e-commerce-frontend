import { Component, inject, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatButton } from '@angular/material/button';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToastService } from '../../utils/toast.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatButton,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  route = inject(Router);
  fb = inject(FormBuilder);
  authService = inject(AuthService);

  toast = inject(ToastService);

  loginForm!: FormGroup;

  gotoRegister() {
    this.route.navigate(['/register']);
  }

  get f() {
    return this.loginForm.controls;
  }

  submitLogin() {
    if (this.loginForm.valid) {
      this.authService
        .login(this.loginForm.value.email, this.loginForm.value.password)
        .subscribe({
          next: (res) => {
            console.log(res);
            if (res.success) {
              this.toast.show(res.message, 3, 'success');
              this.route.navigate(['/home']);
            }
          },
          error: (err) => {
            this.toast.show(err.error.message, 5, 'error');
            console.log(err);
          },
        });
    } else {
      console.log('Form errors:', this.loginForm.errors);
    }
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }
}
