import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FieldsetModule } from 'primeng/fieldset';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import {RippleModule} from 'primeng/ripple';


import { UserRoutingModule } from './user-routing.module';
import { UserDetailsComponent } from './user-details.component';


@NgModule({
  declarations: [
    UserDetailsComponent
  ],
  imports: [
    CommonModule,
    FieldsetModule,
    UserRoutingModule,
    AvatarModule,
    ButtonModule,
    RippleModule
  ]
})
export class UserModule { }
