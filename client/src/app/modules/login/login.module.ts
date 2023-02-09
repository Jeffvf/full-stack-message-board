import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginRoutingModule } from './login-router.module';
import { LoginComponent } from './login.component';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { ButtonModule } from 'primeng/button';
import { MessagesModule } from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import { RegisterComponent } from './register.component';



@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent
  ],
  bootstrap: [
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LoginRoutingModule,
    RippleModule,
    InputTextModule,
    ButtonModule,
    MessageModule,
    MessagesModule,
  ]
})
export class LoginModule { }  
