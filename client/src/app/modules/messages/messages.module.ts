import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MessagesRoutingModule } from './messages-router.module';
import { MessagesComponent } from './messages.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FieldsetModule } from 'primeng/fieldset';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputTextModule } from 'primeng/inputtext';
import { MessageFormComponent } from './message-form.component';
import { MessagesModule as PrimeMessagesModule } from 'primeng/messages';
import {MessageModule} from 'primeng/message';


@NgModule({
  declarations: [
    MessagesComponent,
    MessageFormComponent,
  ],
  bootstrap: [
    MessagesComponent,
    MessageFormComponent,
  ],
  imports: [
    CommonModule,
    MessagesRoutingModule,
    FieldsetModule,
    ButtonModule,
    DialogModule,
    InputTextareaModule,
    ReactiveFormsModule,
    InputTextModule,
    PrimeMessagesModule,
    MessageModule,
    
  ]
})
export class MessagesModule { }  
