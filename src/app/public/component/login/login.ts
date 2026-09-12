import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { Router, RouterLink } from '@angular/router';
import { CustomerService } from '../../services/customer-service';
import { LoginModel } from '../../model/profile';
@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule, ToastModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  showPassword: boolean = true;
  form!: FormGroup;
  private messageService = inject(MessageService);
  constructor(private fb: FormBuilder, private router: Router, private customerService: CustomerService) {
    this.form = fb.group({
      phone: ['', [Validators.required, Validators.pattern(/^09[0-9]{9}$/)]],
      password: ['', [Validators.required, Validators.minLength(8),
      Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@#$!%&*]).{8,}$/)]],
    })
  }
  onlyNumbers(event: Event) {
    const input = event.target as HTMLInputElement;
    input.value = input.value.replace(/[^0-9]/g, '');

  }
  toggleItemPassword() {
    this.showPassword = !this.showPassword;
  
  }
  onSubmit() {
    const body: LoginModel = {
      phone: this.form.get('phone')?.value,
      password: this.form.get('password')?.value,
    }
    this.customerService.loginCustomer(body).subscribe({
      next: (res) => {
        localStorage.setItem('token',res.token);
        this.messageService.add({
          severity: 'success',
          summary: 'موفقیت',
          detail: res.message,
          life: 700
        });
        setTimeout(()=>{ this.router.navigate(['/dashboard'])},1200)
      },
      error:(err: any) => {
        console.log(err);
        this.messageService.add({
          severity: 'error',
          summary: 'خطا',
          detail: err.error.message
        });
      }
    })
  }
  signUp() {
    this.router.navigate(['/signUp'])
  }
  forgotPassword() {
    this.router.navigate(['/passwordRecovery'])
  }
 

}
