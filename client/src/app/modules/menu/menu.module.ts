import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu.component';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';


@NgModule({
  declarations: [
    MenuComponent,
  ],
  bootstrap: [
    MenuComponent,
  ],
  imports: [
    CommonModule,
    MenubarModule,
    ButtonModule,
  ],
  exports: [
    MenuComponent
  ]
})
export class MenuModule { }
