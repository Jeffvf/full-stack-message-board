import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { logoutAuth } from 'src/app/shared/logoutAuth';
import { UserDeleteComponent } from './user-delete.component';
import { UserDetailsComponent } from './user-details.component';
import { UserUpdateComponent } from './user-update.component';



const routes: Routes = [
  {
    path: 'user/:id',
    children: [
      { path: '', component: UserDetailsComponent, canActivate: [logoutAuth] },
      { path: 'update', component: UserUpdateComponent, canActivate: [logoutAuth] },
      { path: 'delete', component: UserDeleteComponent, canActivate: [logoutAuth] },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  providers: [logoutAuth],
  exports: [RouterModule]
})
export class UserRoutingModule { }
