import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PdfRoutingModule } from './pdf-routing.module';
import { PdfComponent } from './pdf.component';
import { NavbarComponent } from '../navbar/navbar.component';


@NgModule({
  declarations: [PdfComponent],
  imports: [
    CommonModule,
    PdfRoutingModule
  ],
  exports: [PdfComponent],

})
export class PdfModule { }
