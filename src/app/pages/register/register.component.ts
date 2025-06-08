import { Component, inject, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToastService } from '../../utils/toast.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent implements OnInit {
  route = inject(Router);
  fb = inject(FormBuilder);
  authService = inject(AuthService);

  toast = inject(ToastService);

  registerForm!: FormGroup;

  gotoLogin() {
    this.route.navigate(['/login']);
  }

  get f() {
    return this.registerForm.controls;
  }

  // Helper method to check for password mismatch specifically
  passwordsNotMatching(): boolean {
    if (!this.registerForm) return false;

    const password = this.registerForm.get('password')?.value || '';
    const cpassword = this.registerForm.get('cpassword')?.value || '';

    // Only show mismatch error if confirm password is filled and doesn't match
    return (
      this.registerForm.get('cpassword')?.touched === true &&
      cpassword !== '' &&
      password !== cpassword
    );
  }

  onSubmit() {
    this.registerForm.markAllAsTouched(); // Mark all fields as touched

    if (this.registerForm.valid) {
      this.authService
        .register(
          `${this.registerForm.value.fname} ${this.registerForm.value.lname}`,
          this.registerForm.value.email,
          this.registerForm.value.password
        )
        .subscribe({
          next: (res) => {
            console.log(res);
            if (res.success) {
              this.toast.show(res.message, 5, 'success');

              this.route.navigate(['/login']);
            }
          },
          error: (err) => {
            this.toast.show(err.error.message, 5, 'error');
            console.error(err);
          },
        });
    } else {
      console.log('Form errors:', this.registerForm.errors);
    }
  }

  ConfirmPasswordValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const password = control.get('password')?.value;
      const cpassword = control.get('cpassword')?.value;

      return password === cpassword ? null : { notMatching: true };
    };
  }

  ngOnInit(): void {
    this.registerForm = this.fb.group(
      {
        fname: ['', Validators.required],
        lname: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        cpassword: ['', Validators.required],
      },
      { validators: this.ConfirmPasswordValidator() }
    );
  }
}
