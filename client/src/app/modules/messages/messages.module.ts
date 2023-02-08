import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MessagesRoutingModule } from './messages-router.module';
import { MessagesComponent } from './messages.component';
import {FieldsetModule} from 'primeng/fieldset';


@NgModule({
  declarations: [
    MessagesComponent
  ],
  bootstrap: [
    MessagesComponent
  ],
  imports: [
    CommonModule,
    MessagesRoutingModule,
    FieldsetModule,
  ]
})
export class MessagesModule { }  
