import { Routes } from '@angular/router';
import { SignUp } from './public/component/sign-up/sign-up';
import { Login } from './public/component/login/login';
import { PasswordRecovery } from './public/component/password-recovery/password-recovery';
import { Home } from './public/component/home/home';
import { Dashboard } from './public/component/baberServices/dashboard/dashboard';
import { LoginAdmin } from './admin/component/login-admin/login-admin';
import { BaberService } from './public/component/baberServices/baber-service/baber-service';
import { BrowServices } from './public/component/baberServices/brow-services/brow-services';

export const routes: Routes = [{
    path: '', component: Home
},
{
    path: 'signUp', component: SignUp
},
{
    path: 'login', component: Login
},
{
    path: 'passwordRecovery', component: PasswordRecovery
},
{
    path: 'service', component: BaberService, children: [{
        path: '', component: Dashboard
    },{
        path:'brow' ,component:BrowServices
    }]
},
{ path: 'admin', component: LoginAdmin }
];
