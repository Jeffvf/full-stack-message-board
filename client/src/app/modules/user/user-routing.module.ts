import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserDeleteComponent } from './user-delete.component';
import { UserDetailsComponent } from './user-details.component';
import { UserUpdateComponent } from './user-update.component';



const routes: Routes = [
  {
    path: 'user/:id',
    children: [
      { path: '', component: UserDetailsComponent },
      { path: 'update', component: UserUpdateComponent },
      { path: 'delete', component: UserDeleteComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
