import { ChangeDetectorRef, Component, inject, OnDestroy, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, ValidatorFn, ValidationErrors, AbstractControl } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { interval, Subscription } from 'rxjs';
import { CustomerService } from '../../services/customer-service';
@Component({
  selector: 'app-password-recovery',
  imports: [ReactiveFormsModule, ToastModule, CommonModule],
  templateUrl: './password-recovery.html',
  styleUrl: './password-recovery.css',
})
export class PasswordRecovery implements OnDestroy {
  timer = signal(120);
  userPhone: any;
  subscription: Subscription = new Subscription();
  currentStep = 1;
  showPassword: boolean = true;
  showPasswordRepeat: boolean = true;
  form!: FormGroup;
  formverificationCode!: FormGroup;
  formChangePassword!: FormGroup;
  private messageService = inject(MessageService);
  constructor(private fb: FormBuilder, private cdr: ChangeDetectorRef, private router: Router, private customer: CustomerService) {
    this.form = fb.group({
      phone: ['', [Validators.required, Validators.pattern(/^09[0-9]{9}$/)]]
    })

    this.formverificationCode = fb.group({
      code: ['', [Validators.required, Validators.pattern(/[0-9]/g)]]
    })

    this.formChangePassword = fb.group({
      password: ['', [Validators.required, Validators.minLength(8),
      Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@#$!%&*]).{8,}$/)]],
      confirmPassword: ['', [Validators.required]
      ]
    }, { validators: passwordPatchValidator })

  }
  toggleItemPassword() {
    this.showPassword = !this.showPassword;
  }
  toggleItemPasswordRepeat() {
    this.showPasswordRepeat = !this.showPasswordRepeat;
  }

  startTime(): void {
    this.subscription.unsubscribe();
    this.timer.set(120);
    this.subscription = interval(1000).subscribe(() => {
      this.timer.update(value => value - 1)
      if (this.timer() === 0) {
        this.subscription.unsubscribe();
      }
    })
  }
  sendOtp() {
    const body = {
      'phone': this.form.get('phone')?.value
    }
    this.customer.sendOtp(body).subscribe({
      next: (res) => {
        console.log(res);
        this.currentStep = 2;
        this.startTime();
        this.messageService.add({
          severity: 'success',
          summary: 'موفقیت',
          detail: res.message,
          life: 400
        });
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'خطا',
          detail: err.error.message
        });
      }
    })
  }
  ////////////////////
  verificationCode() {
    const body = {
      'code': this.formverificationCode.get('code')?.value
    }
    this.customer.verifyOtp(body).subscribe({
      next: (res) => {
      console.log(res);
      
        this.messageService.add({
          severity: 'success',
          summary: 'موفقیت',
          detail: res.message,
          life: 400
        });
        this.userPhone = res.phone
        this.currentStep = 3;
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'خطا',
          detail: err.error.message
        });
      }
    })

  }
  /////////////////////////////
  onSubmitChange() {
    if (this.formChangePassword.invalid) {
      this.formChangePassword.markAllAsTouched();
      return;
    }
    const body = {
    'userPhone':this.userPhone,
      'password': this.formChangePassword.get('password')?.value,
      'confirmPassword': this.formChangePassword.get('confirmPassword')?.value,
    }
    this.customer.changePassword(body).subscribe({
      next: (res) => {
        this.messageService.add({
          severity: 'success',
          summary: 'موفقیت',
          detail: res.message,
          life: 400
        });
        setTimeout(() => {

          this.router.navigate(['/login'])
        }, 1200)
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'خطا',
          detail: err.error.message
        });
      }
    }
    )



  }
  onlyNumbers(event: Event) {
    const input = event.target as HTMLInputElement;
    input.value = input.value.replace(/[^0-9]/g, '');

  }
  ngOnDestroy(): void {
    this.subscription?.unsubscribe();

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