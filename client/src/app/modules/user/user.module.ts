import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FieldsetModule } from 'primeng/fieldset';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { InputTextModule } from 'primeng/inputtext';
import { MessagesModule } from 'primeng/messages';
import {MessageModule} from 'primeng/message';


import { UserRoutingModule } from './user-routing.module';
import { UserDetailsComponent } from './user-details.component';
import { UserFormsComponent } from './user-forms.component';
import { UserUpdateComponent } from './user-update.component';
import { UserDeleteComponent } from './user-delete.component';


@NgModule({
  declarations: [
    UserDetailsComponent,
    UserUpdateComponent,
    UserFormsComponent,
    UserDeleteComponent,
  ],
  imports: [
    CommonModule,
    FieldsetModule,
    UserRoutingModule,
    AvatarModule,
    ButtonModule,
    RippleModule,
    ReactiveFormsModule,
    MessageModule,
    MessagesModule,
    InputTextModule,
  ],
  exports: [
    UserFormsComponent,
  ]
})
export class UserModule { }
