import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PdfComponent } from './pdf.component';


export const PdfRoutes:Routes = [
  {
    path: '',
    component: PdfComponent
  }
];
@NgModule({
  imports: [RouterModule.forChild(PdfRoutes)],
  exports: [RouterModule]
})
export class PdfRoutingModule { }
