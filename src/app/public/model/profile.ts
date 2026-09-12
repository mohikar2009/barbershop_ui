export interface Profile{
  name:string;
  family:string;
  age?:number;
  email?:string;
  phone:number;
  password:any;
  confirmPassword:any;
}
export interface LoginModel{
    phone:number;
    password:any;
}
export interface SendOtp{
  phone:number
}
export interface VerifyOtp{
  code:number
}
export interface ChangePassword{
  password:any;
  confirmPassword:any;
}