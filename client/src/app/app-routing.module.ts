import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { MessagesComponent } from './modules/messages/messages.component';

const routes: Routes = [
  // { path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: '',
    loadChildren: () => import('./modules/messages/messages.module')
      .then(m => m.MessagesModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./modules/login/login.module')
      .then(m => m.LoginModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
