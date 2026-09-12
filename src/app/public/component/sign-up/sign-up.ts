import { Component, inject } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, ValidationErrors, AbstractControl, ValidatorFn } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { Router } from '@angular/router';
import { CustomerService } from '../../services/customer-service';
import { Profile } from '../../model/profile';

@Component({
  selector: 'app-sign-up',
  imports: [CommonModule, ReactiveFormsModule, ToastModule],
  templateUrl: './sign-up.html',
  styleUrl: './sign-up.css',

})
export class SignUp {
  showPassword: boolean = true;
  showPasswordRepeat: boolean = true;
  form: FormGroup;
  private messageService = inject(MessageService);

  constructor(private fb: FormBuilder, private router: Router, private customerService: CustomerService) {
    this.form = this.fb.group({
      'name': ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      'family': ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      'age': ['', [Validators.min(14), Validators.max(95)]],
      'phone': ['', [Validators.required, Validators.pattern(/^09[0-9]{9}$/)]],
      'email': ['', Validators.email],
      'password': ['', [Validators.required, Validators.minLength(8),
      Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@#$!%&*]).{8,}$/)]],
      'confirmPassword': ['', [Validators.required]
      ]
    }, { validators: passwordPatchValidator })
  }

  onlyNumbers(event: Event) {
    const input = event.target as HTMLInputElement;
    input.value = input.value.replace(/[^0-9]/g, '');

  }
  toggleItemPassword() {
    this.showPassword = !this.showPassword;
  }
  toggleItemPasswordRepeat() {
    this.showPasswordRepeat = !this.showPasswordRepeat;
  }
  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const body: Profile = {
      name: this.form.get('name')?.value,
      family: this.form.get('family')?.value,
      age: this.form.get('age')?.value,
      email: this.form.get('email')?.value,
      phone: this.form.get('phone')?.value,
      password: this.form.get('password')?.value,
      confirmPassword: this.form.get('confirmPassword')?.value
    }
    this.customerService.registerCustomer(body).subscribe({
      next: (res: any) => {
        console.log(res);


        this.messageService.add({
          severity: 'success',
          summary: 'موفقیت',
          detail: res.message,
          life: 700
        });
        setTimeout(() => {
          this.router.navigate(['/login'])
        }, 1200)

      },
      error: (err: any) => {
        console.log(err);

        this.messageService.add({
          severity: 'error',
          summary: 'خطا',
          detail: err.error.message
        });
      }
    })


  }
  login() {
    this.router.navigate(['/login'])
  }


}
export const passwordPatchValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const password = control.get('password')?.value;
  const confirmPassword = control.get('confirmPassword')?.value;
  if (password !== confirmPassword) {
    return { passwordMismatch: true }
  }
  return null;
}