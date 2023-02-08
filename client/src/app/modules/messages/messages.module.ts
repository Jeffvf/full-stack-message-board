import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MessagesRoutingModule } from './messages-router.module';
import { MessagesComponent } from './messages.component';


@NgModule({
  declarations: [
    MessagesComponent
  ],
  bootstrap: [
    MessagesComponent
  ],
  imports: [
    CommonModule,
    MessagesRoutingModule
  ]
})
export class MessagesModule { }  
