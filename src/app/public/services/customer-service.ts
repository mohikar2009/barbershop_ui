import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginModel, Profile, SendOtp, VerifyOtp, ChangePassword } from '../model/profile';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  private readonly api: string = 'http://localhost:8000/api';
  constructor(private http: HttpClient) {
  }
  registerCustomer(body: Profile) {
    return this.http.post<any>(`${this.api}/customer`, body);
  }
  loginCustomer(body: LoginModel) {
    return this.http.post<any>(`${this.api}/login`, body);
  }
  sendOtp(body: SendOtp) {
    return this.http.post<any>(`${this.api}/sendCode`, body)
  }
  verifyOtp(body: VerifyOtp) {
    return this.http.post<any>(`${this.api}/verifyCode`, body);
  }
  changePassword(body: ChangePassword) {
    return this.http.put<any>(`${this.api}/changePassword`, body);
  }

}
