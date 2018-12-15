import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';

const components = [
  HeaderComponent,
  FooterComponent
];

const modules = [
  CommonModule,
  RouterModule,
  ReactiveFormsModule
];

@NgModule({
  imports: [
    ...modules
  ],
  exports: [
    ...components,
    ...modules
  ],
  declarations: [...components]
})
export class SharedModule { }
