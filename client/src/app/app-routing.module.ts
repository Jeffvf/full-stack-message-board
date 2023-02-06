import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MessageDetailsComponent } from './message-details/message-details.component';
import { MessagesComponent } from './messages/messages.component';

const routes: Routes = [
  { path: '', component: MessagesComponent },
  { path: 'login', component: LoginComponent},
  { path: 'details/:id', component: MessageDetailsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
