import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { loginAuth } from 'src/app/shared/loginAuth';
import { LoginComponent } from './login.component';
import { RegisterComponent } from './register.component';



const routes: Routes = [
  {
    path: '', component: LoginComponent, canActivate: [loginAuth],
  },
  {
    path: 'register', component: RegisterComponent, canActivate: [loginAuth],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  providers: [loginAuth],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
