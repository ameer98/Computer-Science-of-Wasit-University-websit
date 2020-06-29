import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IndexRoutingModule } from './index-routing.module';
import { MainComponent } from './main/main.component';
import { PdfComponent } from './pdf/pdf.component';
import { LoginComponent } from './login/login.component';
import { IndexComponent } from './index.component';
import { FormsModule, FormBuilder } from '@angular/forms';
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  declarations: [IndexComponent],

  imports: [
    CommonModule,
    FormsModule,
    IndexRoutingModule
  ],
  exports: [IndexComponent],
  providers: [FormBuilder],

})
export class IndexModule { }
